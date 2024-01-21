import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';

const activeForm = document.querySelector(`.form`);
const API_KEY = `41787862-84986491f6cfdcc41b6404efb`;
const loaderContainer = document.querySelector('.loader-container');
const loadButton = document.getElementById(`load-button`);
let page = 1;
let hits = [];
let query;
const perPage = 40;

axios.defaults.baseURL= `https://pixabay.com`;

async function getImage(query = "") {
    try {
        const response = await axios.get("/api/", {
            params: {
                key: API_KEY,
                q: query,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: true,
                page: page,
                per_page: perPage,
            },
        });
        hideLoader();
        return response.data;
    } catch (error) {
        iziToast.show({
            message: `${error}`,
            color: "red",
            position: "topRight",
        });
    }
}



function showLoader() {
    loaderContainer.style.display = 'block';
  }
 function hideLoader() {
    loaderContainer.style.display = 'none';
  }

  

activeForm.addEventListener("submit", (event) => {
    event.preventDefault();

     query = event.target.elements.query.value.trim();
     

showLoader();
loadButton.style.display = "none";

clearSearchResults();

page = 1;
       getImage(query)
    .then(({hits, totalHits}) => { 
        if (hits.length === 0) {
            
            iziToast.show({
                message: "Sorry, there are no images matching your search query. Please try again!",
                color: "red",
  position: "topRight",  
            });
        } else {
            renderImages(hits);
            if (totalHits <= perPage) {
                loadButton.style.display = "none";
            } else {
                loadButton.style.display = "block";}
        }
        event.target.reset();
        
    })
    .catch(error => {
        iziToast.show({
            message: `${error}`,
            color: "red",
position: "topRight",  
        });
    });
    
    
})


const gallery = document.querySelector(`.gallery`);

function clearSearchResults() {
    gallery.innerHTML = "";
    
}

const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: 'alt',
    close: true,
  });

 function renderImages(hits) {
    const imageHTML = hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => `
<a class="gallery-link" href="${largeImageURL}">
<img
    class="gallery-image"
    src="${webformatURL}"
    alt="${tags}"
/>
<ul class="info-list">
  <li class="info-item">
      <p class="info-title">Likes</p>
      <p class="info-value">${likes}</p>
  </li>
  <li class="info-item">
      <p class="info-title">Views</p>
      <p class="info-value">${views}</p>
  </li>
  <li class="info-item">
      <p class="info-title">Comments</p>
      <p class="info-value">${comments}</p>
  </li>
  <li class="info-item">
      <p class="info-title">Downloads</p>
      <p class="info-value">${downloads}</p>
  </li>
</ul>
</a> `).join(``)
    
     gallery.insertAdjacentHTML("beforeend",imageHTML);
     lightbox.refresh();
     
}


loadButton.addEventListener("click", () => {
    loadButton.style.display = "none";
    showLoader();
    loadMore();
    
});



async function loadMore(event) {
    
    const listItem = document.querySelector(".gallery-link:first-child");
    const itemHeight = listItem.getBoundingClientRect().height;

    try {
        page += 1;
        const { hits, totalHits } = await getImage(query, page);
        const totalPages = Math.ceil(totalHits / perPage);
        renderImages(hits);
        lightbox.refresh();
        
        if (page === totalPages) {
            
            loadButton.style.display = "none";
            iziToast.show({
                message: "We're sorry, but you've reached the end od search results",
                position: "topRight",
                messageColor: "#ffffff",
                    titleColor: "#ffffff",
                    iconColor: "#ffffff",
                    backgroundColor: "#EF4040",
            });
        } else {
            loadButton.style.display = "block";
        }
    } catch (error) {
       iziToast.show({
            message: `${error}`,
            color: "red",
position: "topRight",  
        });
    } finally {
        window.scrollBy({
            top: 2 * itemHeight,
            behavior: "smooth",
        });
    }
}
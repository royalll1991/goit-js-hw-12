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

axios.defaults.baseURL= `https://pixabay.com`;

async function getImage(query = "") {
    return await  axios.get("/api", {
        params: {
          key: API_KEY,
          q: query,
          image_type: "photo",
          orientation: "horizontal",
          safesearch: true,
          page: page,
          per_page: 40,
        },
      })
      .then((response) => {
            hideLoader();
            hits = response.data.hits;
            return response.data;
        })
        .catch((error) => {
            iziToast.show({
                message: `${error}`,
                color: "red",
                position: "topRight",
            });
        });
}


function showLoader() {
    loaderContainer.style.display = 'block';
  }
 function hideLoader() {
    loaderContainer.style.display = 'none';
  }

  

activeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = event.target.elements.query.value.trim();

showLoader();


clearSearchResults();

       getImage(query)
    .then(({hits}) => { 
        if (hits.length === 0) {
            iziToast.show({
                message: "Sorry, there are no images matching your search query. Please try again!",
                color: "red",
  position: "topRight",  
            });
        } else {
            renderImages(hits);
            
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
    
     gallery.insertAdjacentHTML("afterbegin",imageHTML);
     lightbox.refresh();
     loadButton.style.display = "block";
}


loadButton.addEventListener("click", (page) => {
    loadButton.style.display = "none";
    page++;
   loadMoreImage();
   checkLoadMoreButtonVisibility();
   smoothScrollToGallery();
})

async function loadMoreImage() {
    getImage()
    .then(({ hits }) => {
      if (hits.length > 0) {
        renderImages(hits);
        loadButton.style.display = "block";
      } else {
        loadButton.style.display = "none";
      }
    })

}
function checkLoadMoreButtonVisibility() {
   
    if (gallery.children.length >= hits.length) {
        loadButton.style.display = 'none';
        iziToast.show({
            message: "We're sorry, but you've reached the end of search results.",
            color: "blue",
            position: "topRight",
        });
    } else {
        
        loadButton.style.display = 'block';
    }
}
function smoothScrollToGallery() {
    const cardHeight = gallery.firstElementChild.getBoundingClientRect().height;
    const scrollDistance = cardHeight * 2; 
    window.scrollBy({
        top: scrollDistance,
        behavior: "smooth", 
    });
}


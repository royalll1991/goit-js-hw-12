import{i as l,S as p}from"./assets/vendor-46aac873.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const m=document.querySelector(".form"),d="41787862-84986491f6cfdcc41b6404efb",a=document.querySelector(".loader-container"),g=(i="")=>fetch(`https://pixabay.com/api/?key=${d}&q=${i}&image_type=photo&orientation=horizontal&safesearch=true`).then(o=>{if(h(),o.ok)return o.json();throw new Error("No hits")});function y(){a.style.display="block"}function h(){a.style.display="none"}m.addEventListener("submit",i=>{i.preventDefault();const o=i.target.elements.query.value.trim();y(),L(),g(o).then(({hits:r})=>{r.length===0?l.show({message:"Sorry, there are no images matching your search query. Please try again!",color:"red",position:"topRight"}):$(r),i.target.reset()}).catch(r=>{l.show({message:`${r}`,color:"red",position:"topRight"})})});const c=document.querySelector(".gallery");function L(){c.innerHTML=""}const b=new p(".gallery a",{captionDelay:250,captionsData:"alt",close:!0});function $(i){const o=i.map(({webformatURL:r,largeImageURL:n,tags:e,likes:t,views:s,comments:f,downloads:u})=>`
<a class="gallery-link" href="${n}">
<img
    class="gallery-image"
    src="${r}"
    alt="${e}"
/>
<ul class="info-list">
  <li class="info-item">
      <p class="info-title">Likes</p>
      <p class="info-value">${t}</p>
  </li>
  <li class="info-item">
      <p class="info-title">Views</p>
      <p class="info-value">${s}</p>
  </li>
  <li class="info-item">
      <p class="info-title">Comments</p>
      <p class="info-value">${f}</p>
  </li>
  <li class="info-item">
      <p class="info-title">Downloads</p>
      <p class="info-value">${u}</p>
  </li>
</ul>
</a> `).join("");c.insertAdjacentHTML("afterbegin",o),b.refresh()}
//# sourceMappingURL=commonHelpers.js.map

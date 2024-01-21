import{a as u,i as c,S as v}from"./assets/vendor-89feecc5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function l(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=l(e);fetch(e.href,o)}})();const $=document.querySelector(".form"),k="41787862-84986491f6cfdcc41b6404efb",p=document.querySelector(".loader-container"),r=document.getElementById("load-button");let a=1,f;const d=40;u.defaults.baseURL="https://pixabay.com";async function y(s=""){try{const t=await u.get("/api/",{params:{key:k,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:a,per_page:d}});return q(),t.data}catch(t){c.show({message:`${t}`,color:"red",position:"topRight"})}}function m(){p.style.display="block"}function q(){p.style.display="none"}$.addEventListener("submit",s=>{s.preventDefault(),f=s.target.elements.query.value.trim(),m(),r.style.display="none",S(),a=1,y(f).then(({hits:t,totalHits:l})=>{t.length===0?c.show({message:"Sorry, there are no images matching your search query. Please try again!",color:"red",position:"topRight"}):(b(t),l<=d?r.style.display="none":r.style.display="block"),s.target.reset()}).catch(t=>{c.show({message:`${t}`,color:"red",position:"topRight"})})});const g=document.querySelector(".gallery");function S(){g.innerHTML=""}const h=new v(".gallery a",{captionDelay:250,captionsData:"alt",close:!0});function b(s){const t=s.map(({webformatURL:l,largeImageURL:i,tags:e,likes:o,views:n,comments:L,downloads:w})=>`
<a class="gallery-link" href="${i}">
<img
    class="gallery-image"
    src="${l}"
    alt="${e}"
/>
<ul class="info-list">
  <li class="info-item">
      <p class="info-title">Likes</p>
      <p class="info-value">${o}</p>
  </li>
  <li class="info-item">
      <p class="info-title">Views</p>
      <p class="info-value">${n}</p>
  </li>
  <li class="info-item">
      <p class="info-title">Comments</p>
      <p class="info-value">${L}</p>
  </li>
  <li class="info-item">
      <p class="info-title">Downloads</p>
      <p class="info-value">${w}</p>
  </li>
</ul>
</a> `).join("");g.insertAdjacentHTML("beforeend",t),h.refresh()}r.addEventListener("click",()=>{r.style.display="none",m(),R()});async function R(s){const l=document.querySelector(".gallery-link:first-child").getBoundingClientRect().height;try{a+=1;const{hits:i,totalHits:e}=await y(f,a),o=Math.ceil(e/d);b(i),h.refresh(),a===o?(r.style.display="none",c.show({message:"We're sorry, but you've reached the end od search results",position:"topRight",messageColor:"#ffffff",titleColor:"#ffffff",iconColor:"#ffffff",backgroundColor:"#EF4040"})):r.style.display="block"}catch(i){c.show({message:`${i}`,color:"red",position:"topRight"})}finally{window.scrollBy({top:2*l,behavior:"smooth"})}}
//# sourceMappingURL=commonHelpers.js.map

import{a as u,i as c,S as w}from"./assets/vendor-89feecc5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const v=document.querySelector(".form"),k="41787862-84986491f6cfdcc41b6404efb",d=document.querySelector(".loader-container"),l=document.getElementById("load-button");let a=1,f;const p=40;u.defaults.baseURL="https://pixabay.com";async function y(s=""){try{const t=await u.get("/api/",{params:{key:k,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:a,per_page:p}});return S(),t.data}catch(t){c.show({message:`${t}`,color:"red",position:"topRight"})}}function q(){d.style.display="block"}function S(){d.style.display="none"}v.addEventListener("submit",s=>{s.preventDefault(),f=s.target.elements.query.value.trim(),q(),$(),y(f).then(({hits:t})=>{t.length===0?c.show({message:"Sorry, there are no images matching your search query. Please try again!",color:"red",position:"topRight"}):h(t),s.target.reset()}).catch(t=>{c.show({message:`${t}`,color:"red",position:"topRight"})})});const m=document.querySelector(".gallery");function $(){m.innerHTML=""}const g=new w(".gallery a",{captionDelay:250,captionsData:"alt",close:!0});function h(s){const t=s.map(({webformatURL:r,largeImageURL:i,tags:e,likes:o,views:n,comments:b,downloads:L})=>`
<a class="gallery-link" href="${i}">
<img
    class="gallery-image"
    src="${r}"
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
      <p class="info-value">${b}</p>
  </li>
  <li class="info-item">
      <p class="info-title">Downloads</p>
      <p class="info-value">${L}</p>
  </li>
</ul>
</a> `).join("");m.insertAdjacentHTML("beforeend",t),g.refresh(),l.style.display="block"}l.addEventListener("click",()=>{l.style.display="none",C()});async function C(s){l.style.display="block";const r=document.querySelector(".gallery-link:first-child").getBoundingClientRect().height;try{a+=1;const{hits:i,totalHits:e}=await y(f,a),o=Math.ceil(e/p);h(i),g.refresh(),a===o?(l.style.display="none",c.show({message:"We're sorry, but you've reached the end od search results",position:"topRight",messageColor:"#ffffff",titleColor:"#ffffff",iconColor:"#ffffff",backgroundColor:"#EF4040"})):l.style.display="block"}catch(i){console.log(i)}finally{window.scrollBy({top:2*r,behavior:"smooth"})}}
//# sourceMappingURL=commonHelpers.js.map

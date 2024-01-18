import{a as u,i as r,S as m}from"./assets/vendor-89feecc5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=i(e);fetch(e.href,s)}})();const b=document.querySelector(".form"),L="41787862-84986491f6cfdcc41b6404efb",d=document.querySelector(".loader-container"),l=document.getElementById("load-button");let w=1,f=[];u.defaults.baseURL="https://pixabay.com";async function p(o=""){return await u.get("/api",{params:{key:L,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:w,per_page:40}}).then(t=>(k(),f=t.data.hits,t.data)).catch(t=>{r.show({message:`${t}`,color:"red",position:"topRight"})})}function v(){d.style.display="block"}function k(){d.style.display="none"}b.addEventListener("submit",o=>{o.preventDefault();const t=o.target.elements.query.value.trim();v(),S(),p(t).then(({hits:i})=>{i.length===0?r.show({message:"Sorry, there are no images matching your search query. Please try again!",color:"red",position:"topRight"}):y(i),o.target.reset()}).catch(i=>{r.show({message:`${i}`,color:"red",position:"topRight"})})});const c=document.querySelector(".gallery");function S(){c.innerHTML=""}const $=new m(".gallery a",{captionDelay:250,captionsData:"alt",close:!0});function y(o){const t=o.map(({webformatURL:i,largeImageURL:a,tags:e,likes:s,views:n,comments:g,downloads:h})=>`
<a class="gallery-link" href="${a}">
<img
    class="gallery-image"
    src="${i}"
    alt="${e}"
/>
<ul class="info-list">
  <li class="info-item">
      <p class="info-title">Likes</p>
      <p class="info-value">${s}</p>
  </li>
  <li class="info-item">
      <p class="info-title">Views</p>
      <p class="info-value">${n}</p>
  </li>
  <li class="info-item">
      <p class="info-title">Comments</p>
      <p class="info-value">${g}</p>
  </li>
  <li class="info-item">
      <p class="info-title">Downloads</p>
      <p class="info-value">${h}</p>
  </li>
</ul>
</a> `).join("");c.insertAdjacentHTML("afterbegin",t),$.refresh(),l.style.display="block"}l.addEventListener("click",o=>{l.style.display="none",q(),R(),E()});async function q(){p().then(({hits:o})=>{o.length>0?(y(o),l.style.display="block"):l.style.display="none"})}function R(){c.children.length>=f.length?(l.style.display="none",r.show({message:"We're sorry, but you've reached the end of search results.",color:"blue",position:"topRight"})):l.style.display="block"}function E(){const t=c.firstElementChild.getBoundingClientRect().height*2;window.scrollBy({top:t,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map

// Shared JS for banners, product generation, sorting, and cart
const banners = [
{title:'Summer Collection - Women',img:'images/banner1.jpg',category:'women'},
{title:"Men's Essentials",img:'images/banner2.jpg',category:'men'},
{title:'Kids Special',img:'images/banner3.jpg',category:'kids'}
];


function $(sel){return document.querySelector(sel)}
function $all(sel){return Array.from(document.querySelectorAll(sel))}


// Banner rotation
function initBanners(){
const container = document.getElementById('bannerSlides');
if(!container) return;
container.innerHTML = '';
banners.forEach((b,i)=>{
const img = document.createElement('img');
img.src = b.img; img.alt = b.title; img.dataset.index = i; img.style.display = i===0?'block':'none'; img.style.cursor='pointer';
img.addEventListener('click',()=>{location.href = b.category + '.html'});
container.appendChild(img);
});
let idx=0;
setInterval(()=>{
const imgs = container.querySelectorAll('img');
imgs[idx].style.display='none';
idx = (idx+1)%imgs.length;
imgs[idx].style.display='block';
},5000);
}


// Utility to make sample products
function makeProducts(count,category){
const sizes = ['XS','S','M','L','XL'];
const arr = [];
for(let i=1;i<=count;i++){
const price = Math.floor(1000 + Math.random()*15000);
arr.push({
id:category.toLowerCase().slice(0,3)+'-'+i,
title:`${category} Item ${i}`,
price:price,
sizes:sizes.slice(0,3 + (i%3)),
img:`https://source.unsplash.com/collection/190727/800x600?sig=${Math.abs(Math.sin(i*7)*10000|0)}`,
popular: i%5===0
});
}
return arr;
}


// Render product grid into element
function renderProducts(containerId, products){
const grid = document.getElementById(containerId);
if(!grid) return;
grid.innerHTML = '';
products.forEach(p=>{
const card = document.createElement('div'); card.className='card';
card.innerHTML = `
<img src="${p.img}" alt="${p.title}">
<div class="card-body">
<div class="title">${p.title}</div>
<div class="price">LKR ${p.price.toLocaleString()}</div>
<div class="sizes">Sizes: ${p.sizes.join(', ')}</div>
<div class="actions">
<button class="add">Add to cart</button>
<button class="view">View</button>
</div>
</div>
`;
const add = card.querySelector('.add');
add.addEventListener('click',()=>{addToCart(p);});
grid.appendChild(card);
});
}
// Cart
let CART = [];
function addToCart(product){CART.push(product); updateCartCount(); alert(product.title + ' added to cart');}
function updateCartCount(){const el = document.getElementById('cartCount') || document.getElementById('cartCount2') || document.getElementById('cartCount3'); if(el) el.textContent = CART.length}


// Category page init
function initCategoryPage(category){
const key = (category||'General') + Math.random();
const products = makeProducts(20,category);
// initial render
renderProducts('productsGrid', products);
renderProducts('productsGridMen', products);
renderProducts('productsGridKids', products);


// add sorting listeners on page radios
$all('input[type=radio][name="sort"]').forEach(r=>r.addEventListener('change',()=>{
const val = document.querySelector('input[type=radio][name="sort"]:checked').value;
let sorted = [...products];
if(val==='low') sorted.sort((a,b)=>a.price-b.price);
if(val==='high') sorted.sort((a,b)=>b.price-a.price);
if(val==='popular') sorted.sort((a,b)=> (b.popular?1:0)-(a.popular?1:0));
renderProducts('productsGrid',sorted);
}));


$all('input[type=radio][name="sortMen"]').forEach(r=>r.addEventListener('change',()=>{
const val = document.querySelector('input[type=radio][name="sortMen"]:checked').value;
let sorted = [...products];
if(val==='low') sorted.sort((a,b)=>a.price-b.price);
if(val==='high') sorted.sort((a,b)=>b.price-a.price);
if(val==='popular') sorted.sort((a,b)=> (b.popular?1:0)-(a.popular?1:0));
renderProducts('productsGridMen',sorted);
}));


$all('input[type=radio][name="sortKids"]').forEach(r=>r.addEventListener('change',()=>{
const val = document.querySelector('input[type=radio][name="sortKids"]:checked').value;
let sorted = [...products];
if(val==='low') sorted.sort((a,b)=>a.price-b.price);
if(val==='high') sorted.sort((a,b)=>b.price-a.price);
if(val==='popular') sorted.sort((a,b)=> (b.popular?1:0)-(a.popular?1:0));
renderProducts('productsGridKids',sorted);
}));
}
// Image gallery
function renderImageGallery(){
const el = document.getElementById('imageGallery'); if(!el) return;
el.innerHTML='';
for(let i=1;i<=24;i++){
const img = document.createElement('img');
img.src = `https://source.unsplash.com/collection/190727/600x400?sig=${i}`;
img.alt = 'Gallery '+i; el.appendChild(img);
}
}


// on load
document.addEventListener('DOMContentLoaded',()=>{
initBanners(); updateCartCount();
document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());
for(let i=2;i<=6;i++){const y = document.getElementById('year'+i); if(y) y.textContent = new Date().getFullYear();}
});
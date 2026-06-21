// =========================
// ANIMATED COUNTERS
// =========================

const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {

```
const updateCounter = () => {

    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;

    const increment = target / 100;

    if(count < target){
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCounter, 20);
    }else{
        counter.innerText = target;
    }

};

updateCounter();
```

});

// =========================
// DARK / LIGHT MODE
// =========================

const themeBtn = document.getElementById('theme-toggle');

if(themeBtn){

themeBtn.addEventListener('click',()=>{

document.body.classList.toggle('dark-mode');

const icon = themeBtn.querySelector('i');

if(document.body.classList.contains('dark-mode')){
icon.classList.replace('fa-moon','fa-sun');
}else{
icon.classList.replace('fa-sun','fa-moon');
}

});





};

// =========================
// NAVBAR SCROLL EFFECT
// =========================

window.addEventListener('scroll', () => {

```
const navbar = document.querySelector('.navbar');

if(window.scrollY > 50){
    navbar.style.padding = "12px 8%";
    navbar.style.boxShadow = "0 5px 25px rgba(0,0,0,0.15)";
}else{
    navbar.style.padding = "18px 8%";
    navbar.style.boxShadow = "none";
}
```

});

// =========================
// SCROLL TO TOP BUTTON
// =========================

const topBtn = document.createElement('button');

topBtn.innerHTML = '↑';

topBtn.id = "topBtn";

document.body.appendChild(topBtn);

topBtn.style.position = "fixed";
topBtn.style.right = "20px";
topBtn.style.bottom = "20px";
topBtn.style.width = "50px";
topBtn.style.height = "50px";
topBtn.style.borderRadius = "50%";
topBtn.style.border = "none";
topBtn.style.cursor = "pointer";
topBtn.style.display = "none";
topBtn.style.fontSize = "22px";
topBtn.style.zIndex = "999";
topBtn.style.background = "#1e88e5";
topBtn.style.color = "white";

window.addEventListener('scroll', () => {

```
if(window.scrollY > 300){
    topBtn.style.display = "block";
}else{
    topBtn.style.display = "none";
}
```

});

topBtn.addEventListener('click', () => {

```
window.scrollTo({
    top:0,
    behavior:'smooth'
});
```

});

// =========================
// REVEAL ANIMATION
// =========================

const revealElements = document.querySelectorAll(
'.stat-card,.card,.featured h2'
);

function reveal(){

```
revealElements.forEach(el => {

    const windowHeight = window.innerHeight;
    const top = el.getBoundingClientRect().top;

    if(top < windowHeight - 100){

        el.style.opacity = "1";
        el.style.transform = "translateY(0)";

    }

});
```

}

revealElements.forEach(el => {

```
el.style.opacity = "0";
el.style.transform = "translateY(40px)";
el.style.transition = "all .8s ease";
```

});

window.addEventListener('scroll', reveal);
reveal();

// =========================
// LOADER
// =========================

window.addEventListener("load",()=>{

```
document.body.classList.add("loaded");
```

});

// =========================
// CURRENT YEAR FOOTER
// =========================

const footer = document.querySelector("footer p");

if(footer){


footer.innerHTML =
`© ${new Date().getFullYear()} JNV Chhotaudepur Alumni Network`;


}


const galleryImages =
document.querySelectorAll('.gallery-grid img');

const lightbox =
document.getElementById('lightbox');

const lightboxImg =
document.getElementById('lightboxImg');

const closeLightbox =
document.getElementById('closeLightbox');

galleryImages.forEach(img=>{

img.addEventListener('click',()=>{

lightbox.style.display='flex';
lightboxImg.src=img.src;

});

});

closeLightbox.addEventListener('click',()=>{

lightbox.style.display='none';

});

tsParticles.load("tsparticles",{
particles:{
number:{value:60},
size:{value:3},
move:{enable:true,speed:2},
links:{enable:true},
color:{value:"#ffffff"}
}
});


ScrollReveal().reveal('.hero-content, .card, .stat-card, section', {
  distance: '60px',
  duration: 1000,
  delay: 100,
  origin: 'bottom',
  reset: false
});

tsParticles.load("tsparticles", {
  particles: {
    number: { value: 60 },
    color: { value: "#3b82f6" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 3 },
    move: {
      enable: true,
      speed: 1
    }
  }
});





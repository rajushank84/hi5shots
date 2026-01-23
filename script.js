const lightbox = document.getElementById('lightbox');
const track = lightbox.querySelector('.lightbox-track');

const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');


if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('show');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('show');
    });
  });
}

// const lightbox = document.getElementById('lightbox');
const content = document.querySelector('.lightbox-content');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const closeBtn = document.querySelector('.close');
const lightboxFooter = document.querySelector('.lightbox-footer')

const counter = document.querySelector('.lightbox-counter');

let groupItems = [];
let currentIndex = 0;



let startX = 0;
let currentTranslate = 0;
let isDragging = false;

let velocity = 0;
let lastTouchX = 0;
let lastTouchTime = 0;

function openLightbox() {
  lightbox.classList.remove('hidden');
  document.body.classList.add('no-scroll');
  render();
}

function closeLightbox() {
  document.body.classList.remove('no-scroll');
  lightbox.classList.add('hidden');
  track.innerHTML = '';
}


function render() {
  if (!groupItems || groupItems.length === 0) return;

  track.innerHTML = '';

  groupItems.forEach((item) => {
    const slide = document.createElement('div');
    slide.className = 'lightbox-slide';

    const type = item.dataset.type;
    const src = item.dataset.src;

    if (type === 'image') {
      const img = new Image();
      img.src = src;
      slide.appendChild(img);
    } 
    else if (type === 'video') {
      const video = document.createElement('video');
      video.src = src;
      video.controls = true;
      video.autoplay = true;
      video.muted = true;
      video.playsInline = true;
      slide.appendChild(video);
    } 
    else {
      const link = document.createElement('a');
      link.href = src;
      link.target = '_blank';
      link.className = 'cta';
      link.textContent = 'Open 3D Walkthrough';
      slide.appendChild(link);
    }

    track.appendChild(slide);
  });

  updateSlidePosition();
}

track.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  lastTouchX = startX;
  lastTouchTime = Date.now();
  velocity = 0;
  isDragging = true;
  track.style.transition = 'none';
}, { passive: true });

track.addEventListener('touchmove', (e) => {
  if (!isDragging) return;

  const currentX = e.touches[0].clientX;
  const now = Date.now();

  velocity = (currentX - lastTouchX) / (now - lastTouchTime);
  lastTouchX = currentX;
  lastTouchTime = now;

  const diff = currentX - startX;
  const slideWidth = track.offsetWidth;
  const baseTranslate = -currentIndex * slideWidth;
  let nextTranslate = baseTranslate + diff;

  if (
    (currentIndex === 0 && diff > 0) ||
    (currentIndex === groupItems.length - 1 && diff < 0)
  ) {
    nextTranslate = baseTranslate + diff * 0.35;
  }

  currentTranslate = nextTranslate;
  track.style.transform = `translateX(${currentTranslate}px)`;
}, { passive: true });

track.addEventListener('touchend', (e) => {
  if (!isDragging) return;

  isDragging = false;
  // track.style.transition = 'transform 0.35s cubic-bezier(.22,.61,.36,1)';
  track.style.transition = 'transform 0.35s cubic-bezier(.25,.8,.25,1)';

  const slideWidth = track.offsetWidth;
  const movedBy = currentTranslate + (currentIndex * slideWidth);

  const fastSwipe = Math.abs(velocity) > 0.5;

  if ((movedBy < -slideWidth * 0.2 || fastSwipe && velocity < 0) &&
      currentIndex < groupItems.length - 1) {
    currentIndex++;
  } 
  else if ((movedBy > slideWidth * 0.2 || fastSwipe && velocity > 0) &&
      currentIndex > 0) {
    currentIndex--;
  }

  updateSlidePosition();
});

document.querySelectorAll('.thumb.with-lightbox').forEach(thumb => {
  thumb.addEventListener('click', () => {
    const grid = thumb.closest('.grid');
    if (!grid) return;
    groupItems = Array.from(grid.querySelectorAll('.thumb'));
    currentIndex = groupItems.indexOf(thumb);
    openLightbox();
  });
});

function updateSlidePosition() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  updateNavButtons();
  updateCounter();
}

function updateCounter() {
  if (!counter) return;
  counter.textContent = `${currentIndex + 1} / ${groupItems.length}`;
}

function updateNavButtons() {
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === groupItems.length - 1;

  prevBtn.style.opacity = prevBtn.disabled ? "0.4" : "1";
  nextBtn.style.opacity = nextBtn.disabled ? "0.4" : "1";
}

prevBtn.onclick = () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlidePosition();
  }
};

nextBtn.onclick = () => {
  if (currentIndex < groupItems.length - 1) {
    currentIndex++;
    updateSlidePosition();
  }
};

closeBtn.onclick = closeLightbox;

lightbox.addEventListener('click', (e) => {
  // If the click was directly on the overlay (not inside inner box)
  if (!e.target.closest('.lightbox-inner')) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
    closeLightbox();
  }
});

document.addEventListener('keydown', function (e) {
  // Only respond if lightbox is open
  if (lightbox.classList.contains('hidden')) return;

  if (e.key === 'ArrowLeft') {
    prevBtn.click();
  }

  if (e.key === 'ArrowRight') {
    nextBtn.click();
  }

  if (e.key === 'Escape') {
    closeLightbox();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const lightbox = document.getElementById("contactLightbox");
  const openButtons = document.querySelectorAll(".contact-btn");
  const closeBtn = document.getElementById("lightboxClose");
  const closeBtn2 = document.getElementById("lightboxCloseBtn");

  openButtons.forEach(btn => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeLightbox();
    }
  });
});
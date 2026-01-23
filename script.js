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

const counter = document.querySelector('.lightbox-counter');

let groupItems = [];
let currentIndex = 0;



// // --- Swipe Support for Lightbox ---

// let touchStartX = 0;
// let touchEndX = 0;
// const swipeThreshold = 50; // minimum px distance to count as swipe

// lightbox.addEventListener('touchstart', (e) => {
//   touchStartX = e.changedTouches[0].screenX;
// }, { passive: true });

// lightbox.addEventListener('touchend', (e) => {
//   touchEndX = e.changedTouches[0].screenX;
//   handleSwipe();
// }, { passive: true });

// function handleSwipe() {
//   const distance = touchEndX - touchStartX;

//   if (Math.abs(distance) < swipeThreshold) return;

//   if (distance < 0) {
//     // Swiped left → Next
//     if (currentIndex < groupItems.length - 1) {
//       currentIndex++;
//       render();
//     }
//   } else {
//     // Swiped right → Previous
//     if (currentIndex > 0) {
//       currentIndex--;
//       render();
//     }
//   }
// }

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

// const track = document.querySelector('.lightbox-track');

// const track = document.querySelector('.lightbox-track');


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

// function render() {
//   content.innerHTML = '';
//   const shimmer = document.createElement('div');
//   shimmer.className = 'shimmer';
//   content.appendChild(shimmer);

//   const item = groupItems[currentIndex];
//   const type = item.dataset.type;
//   const src = item.dataset.src;
//   const thumbnail = item.dataset.thumbnail;

//   if (type === 'image') {
//     // const img = new Image();
//     // img.onload = () => {
//     //   content.innerHTML = '';
//     //   content.appendChild(img);
//     // };
//     // img.src = src;

//     let image;
//     let imageClone;
//     let anchor;
//     // console.log(document.querySelectorAll('video'));
//     // console.log(src);
//     var matchingImages = Array.prototype.filter.call(document.querySelectorAll('.lazy-loaders img'), (item) => item.dataset?.src === src);

//     if (matchingImages.length) {
//       image = matchingImages[0];
//       imageClone = image?.cloneNode();
//       image.fetchPriority = 'high';
//       image.removeAttribute('width');
//       image.removeAttribute('height');
//       content.innerHTML = '';
//       anchor = document.createElement('a');
//       anchor.target = '_blank';
//       // anchor.href = src.replaceAll('photos-compressed', 'photos');
//       anchor.href = src;
//       anchor.appendChild(image);
//       content.appendChild(anchor);
//       // content.appendChild(image);
//       document.querySelector('.lazy-loaders').appendChild(imageClone);
//     } else {
//       image = new Image();
//       image.src = src;
//       image.fetchPriority = 'high';
//       // image.onload = () => {
//         content.innerHTML = '';
//         // content.appendChild(image);
//         anchor = document.createElement('a');
//         anchor.target = '_blank';
//         // anchor.href = src.replaceAll('photos-compressed', 'photos');
//         anchor.href = src;
//         anchor.appendChild(image);
//         content.appendChild(anchor);

//         imageClone = image?.cloneNode();
//         imageClone.width = '1';
//         imageClone.height = '1';
//         imageClone.dataset.src = src;
//         imageClone.fetchPriority = 'auto';
//         imageClone.loading = 'eager';
//         document.querySelector('.lazy-loaders').appendChild(imageClone);
//       // };
//     }
//   }
//   // else if (type === 'video') {
//   //   // // const video = document.createElement('video');
//   //   // // video.src = src;
//   //   // // video.controls = true;
//   //   // // video.autoplay = false;
//   //   // // video.muted = false;
//   //   // // video.playsInline = true;
//   //   // // const videoThumbnail = document.createElement('img');
//   //   // // videoThumbnail.classList.add("video-player-thumbnail");
//   //   // // videoThumbnail.src=thumbnail;

//   //   // let video;
//   //   // let videoClone;
//   //   // // console.log(document.querySelectorAll('video'));
//   //   // // console.log(src);
//   //   // var matchingVideos = Array.prototype.filter.call(document.querySelectorAll('video'), (item) => item.dataset?.src === src);
//   //   // if (matchingVideos.length) {
//   //   //   video = matchingVideos[0];
//   //   //   videoClone = video.cloneNode();
//   //   //   video.pause();
//   //   //   video.currentTime = 0;
//   //   //   video.controls = true;
//   //   //   video.autoplay = false;
//   //   //   video.muted = false;
//   //   //   video.loop = false;
//   //   //   video.playsInline = true;
//   //   //   video.removeAttribute('width');
//   //   //   video.removeAttribute('height');
//   //   //   content.innerHTML = '';
//   //   //   content.appendChild(video);
//   //   //   document.querySelector('.lazy-loaders').appendChild(videoClone);
//   //   //   video.play();
//   //   //   // content.appendChild(videoThumbnail);
//   //   // } else {
//   //   //   video = document.createElement('video');
//   //   //   video.src = src;
//   //   //   video.controls = true;
//   //   //   video.autoplay = false;
//   //   //   video.muted = false;
//   //   //   video.loop = false;
//   //   //   video.playsInline = true;
//   //   //   content.appendChild(video);
//   //   //   video.onloadeddata = () => {
//   //   //     content.innerHTML = '';
//   //   //     content.appendChild(video);
//   //   //     video.play();
//   //   //     // content.appendChild(videoThumbnail);
//   //   //   };
//   //   // }

//   //   // // const videoThumbnail = document.createElement('img');
//   //   // // videoThumbnail.classList.add("video-player-thumbnail");
//   //   // // videoThumbnail.src=thumbnail;

//   //   // video.onplay = () => {
//   //   //   // videoThumbnail.style.display = 'none';
//   //   //   if (video.requestFullscreen) 
//   //   //       video.requestFullscreen();
//   //   //   else if (video.webkitRequestFullscreen) 
//   //   //       video.webkitRequestFullscreen();
//   //   //   else if (video.msRequestFullScreen) 
//   //   //     video.msRequestFullScreen();
//   //   // };
//   //   // // video.onplaying = () => {
//   //   // //   videoThumbnail.style.display = 'none';
//   //   // // };
//   //   // video.onended = () => {
//   //   //   document.exitFullscreen();
//   //   //   // videoThumbnail.style.display = 'inline';
//   //   // };
//   //   // // video.onpause = () => {
//   //   // //   document.exitFullscreen();
//   //   // //   // videoThumbnail.style.display = 'inline';
//   //   // // };    
//   //   // // videoThumbnail.onclick = () => {
//   //   // //   video.play();
//   //   // // };


//   //   // // const width = window.innerWidth ? window.innerWidth - 100 : 560;
//   //   // // const height = window.innerHeight ? window.innerHeight - 200 : 315;
//   //   // // const ytEmbed = `<iframe width="${width}" height="${height}" src="${src}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
//   //   // // content.innerHTML = ytEmbed;
//   // } else {
//   //   // content.innerHTML = '';
//   //   // const link = document.createElement('a');
//   //   // link.href = src;
//   //   // link.target = '_blank';
//   //   // link.className = 'cta';
//   //   // link.textContent = 'Open 3D Walkthrough';
//   //   // content.appendChild(link);
//   // }

//   prevBtn.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
//   nextBtn.style.visibility = currentIndex === groupItems.length - 1 ? 'hidden' : 'visible';
// }

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

// prevBtn.onclick = () => {
//   if (currentIndex > 0) {
//     currentIndex--;
//     render();
//   }
// };

// nextBtn.onclick = () => {
//   if (currentIndex < groupItems.length - 1) {
//     currentIndex++;
//     render();
//   }
// };

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
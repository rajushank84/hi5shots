
// const track = document.querySelector('.lightbox-track');

// const track = document.querySelector('.lightbox-track');


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


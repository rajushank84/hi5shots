
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

const lightbox = document.getElementById('lightbox');
const content = document.querySelector('.lightbox-content');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const closeBtn = document.querySelector('.close');

let groupItems = [];
let currentIndex = 0;

document.querySelectorAll('.thumb.with-lightbox').forEach(thumb => {
  thumb.addEventListener('click', () => {
    const grid = thumb.closest('.grid');
    if (!grid) return;
    groupItems = Array.from(grid.querySelectorAll('.thumb'));
    currentIndex = groupItems.indexOf(thumb);
    openLightbox();
  });
});

function openLightbox() {
  lightbox.classList.remove('hidden');
  render();
}

function closeLightbox() {
  lightbox.classList.add('hidden');
  content.innerHTML = '';
}

function render() {
  content.innerHTML = '';
  const shimmer = document.createElement('div');
  shimmer.className = 'shimmer';
  content.appendChild(shimmer);

  const item = groupItems[currentIndex];
  const type = item.dataset.type;
  const src = item.dataset.src;

  if (type === 'image') {
    const img = new Image();
    img.onload = () => {
      content.innerHTML = '';
      content.appendChild(img);
    };
    img.src = src;
  } else if (type === 'video') {
    // const video = document.createElement('video');
    // video.src = src;
    // video.controls = true;
    // video.autoplay = true;
    // video.muted = true;
    // video.playsInline = true;
    // video.onloadeddata = () => {
    //   content.innerHTML = '';
    //   content.appendChild(video);
    // };

    
    // const width = window.innerWidth ? window.innerWidth - 100 : 560;
    // const height = window.innerHeight ? window.innerHeight - 200 : 315;
    // const ytEmbed = `<iframe width="${width}" height="${height}" src="${src}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    // content.innerHTML = ytEmbed;
  } else {
    // content.innerHTML = '';
    // const link = document.createElement('a');
    // link.href = src;
    // link.target = '_blank';
    // link.className = 'cta';
    // link.textContent = 'Open 3D Walkthrough';
    // content.appendChild(link);
  }

  prevBtn.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
  nextBtn.style.visibility = currentIndex === groupItems.length - 1 ? 'hidden' : 'visible';
}

prevBtn.onclick = () => {
  if (currentIndex > 0) {
    currentIndex--;
    render();
  }
};

nextBtn.onclick = () => {
  if (currentIndex < groupItems.length - 1) {
    currentIndex++;
    render();
  }
};

closeBtn.onclick = closeLightbox;

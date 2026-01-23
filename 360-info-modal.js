document.addEventListener("DOMContentLoaded", function () {

  // Show only once per visitor (remove if you want it every time)
  // if (localStorage.getItem("tourIntroShown")) return;
  // localStorage.setItem("tourIntroShown", "true");

  // Subtle delay before appearing
  setTimeout(() => {

    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "luxTourOverlay";

    // Create modal
    const modal = document.createElement("div");
    modal.id = "luxTourModal";

    modal.innerHTML = `
      <button class="lux-close-x" aria-label="Close">&times;</button>
      
      <div class="lux-content">
        <div class="lux-video-container">
          <video class="lux-video" loading="eager" src="../../../360-illustration-trimmed.mp4" playsinline="true" muted="true" autoplay="true" loop="true"></video>
          <p class="lux-video-caption">
            (illustration)
          </p>
        </div>

        <h2>Explore at Your Own Pace</h2>

        <p class="lux-subtext">
          This is a 3D walkthrough.
        </p>

        <ul class="lux-instructions">
          <li><strong>Click and drag</strong> to look around.</li>
          <li><strong>Click arrows</strong> to move between rooms.</li>
        </ul>

        <!--p class="lux-footer">
          Take your time. Every space is yours to explore.
        </p-->

        <button class="lux-close-btn">Start</button>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(modal);

    // Lock background scroll
    document.body.style.overflow = "hidden";

    function closeLightbox() {
      overlay.classList.add("fade-out");
      modal.classList.add("fade-out");

      setTimeout(() => {
        overlay.remove();
        modal.remove();
        document.body.style.overflow = "";
      }, 350);
    }

    // Close interactions
    overlay.addEventListener("click", closeLightbox);
    modal.querySelector(".lux-close-x").addEventListener("click", closeLightbox);
    modal.querySelector(".lux-close-btn").addEventListener("click", closeLightbox);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLightbox();
    });

    // Inject Styles
    const style = document.createElement("style");
    style.innerHTML = `
      #luxTourOverlay {
        position: fixed;
        inset: 0;
        background: rgba(10, 10, 10, 0.65);
        backdrop-filter: blur(6px);
        z-index: 9998;
        opacity: 0;
        animation: overlayFadeIn 0.4s ease forwards;
      }

      #luxTourModal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.96);
        width: 92%;
        max-width: 680px;
        background: #ffffff;
        border-radius: 20px;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
        padding: 32px;
        box-sizing: border-box;
        z-index: 9999;
        opacity: 0;
        animation: modalFadeIn 0.4s ease forwards;
      }

      .lux-content {
        text-align: center;
        font-family: system-ui, sans-serif;
        margin-top: 36px;
      }

      .lux-image {
        width: 100%;
        height: auto;
        border-radius: 14px;
        margin-bottom: 20px;
      }

      h2 {
        margin: 0 0 12px 0;
        font-weight: 500;
        font-size: 26px;
        letter-spacing: 0.5px;
      }

      .lux-video-container {
        display: inline-flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        position: relative;
        border-radius: 8px;
      }

      .lux-video {
        pointer-events: none;
        width: 100%;
        height: auto;
      }

      .lux-video-caption {
        position: absolute;
        left: auto;
        right: auto;
        bottom: 0;
        background: #333;
        font-size: 16px;
        color: #fff;
        font-style: italic;
        padding: 4px 8px;
        border-radius: 8px 0 0 0;
      }

      .lux-subtext {
        font-size: 16px;
        font-weight: bold;
        color: #111;
        margin-bottom: 20px;
        line-height: 1.3;
        text-align: left;
      }

      .lux-instructions {
        text-align: left;
        margin: 0 0 20px 0;
        padding-left: 30px;
        max-width: 420px;
        color: #333;
        list-style: disc;
      }

      .lux-instructions li {
        margin-bottom: 10px;
        font-size: 15px;
        line-height: 1.6;
      }

      .lux-footer {
        font-size: 14px;
        color: #777;
        margin-bottom: 26px;
        font-style: italic;
      }

      .lux-close-x {
        position: absolute;
        top: 14px;
        right: 18px;
        background: none;
        border: none;
        font-size: 32px;
        cursor: pointer;
        opacity: 0.6;
        transition: opacity 0.2s ease;
      }

      .lux-close-x:hover {
        opacity: 1;
      }

      .lux-close-btn {
        padding: 8px 20px;
        font-size: 14px;
        font-weight: bold;
        letter-spacing: 0.5px;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        // background: #111;
        background: #1d4ed8;
        color: #fff;
        transition: all 0.25s ease;
      }

      .lux-close-btn:hover {
        // background: #000;
        // transform: translateY(-1px);
      }

      @media (max-height: 640px) {
        .lux-video-container {
          width: 405px;
          height: 225px;
        }
      }

      @media (max-height: 540px) {
        .lux-video-container {
          width: 270px;
          height: 150px;
        }
      }

      @media (max-width: 480px) {
        #luxTourModal {
          padding: 22px;
        }

        h2 {
          font-size: 22px;
        }

        .lux-close-btn {
          width: 100%;
        }
      }

      /* Animations */

      @keyframes overlayFadeIn {
        to { opacity: .5; }
      }

      @keyframes modalFadeIn {
        to { 
          opacity: 1; 
          transform: translate(-50%, -50%) scale(1);
        }
      }

      .fade-out {
        animation: fadeOut 0.35s ease forwards !important;
      }

      @keyframes fadeOut {
        to { opacity: 0; transform: translate(-50%, -50%) scale(0.96); }
      }
    `;
    document.head.appendChild(style);

  }, 300); // subtle delay
});

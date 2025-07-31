const toggleMenu = () => {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");

  toggle.classList.toggle("active");
  nav.classList.toggle("active");
};

// Optional: auto-close menu when clicking a nav link
document.querySelectorAll(".header__nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("menu-toggle").classList.remove("active");
    document.getElementById("main-nav").classList.remove("active");
  });
});

// swiper
const swiper = new Swiper(".banner-swiper", {
  loop: true,
  speed: 1000,
  parallax: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: (index, className) =>
      `<span class="${className}">${index + 1}</span>`,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

//rsvp success modal

const form = document.getElementById("rsvp-form");
const modal = document.getElementById("rsvp-success-modal");
const closeBtn = document.getElementById("modal-close-btn");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      form.reset();
      modal.style.display = "flex";
    } else {
      alert("Something went wrong. Please try again.");
    }
  } catch (error) {
    alert("Network error. Please check your connection.");
  }
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// music player
const audio = document.getElementById("weddingSong");
const toggleBtn = document.getElementById("toggleAudio");
let isPlaying = false;

// Function to update play/pause icons
function updateIcons(isPlaying) {
  toggleBtn.innerHTML = isPlaying
    ? `<ion-icon name="pause-circle-outline" style="color: var(--clr-primary); font-size: 30px;"></ion-icon>`
    : `<ion-icon name="play-circle-outline" style="color: var(--clr-primary); font-size: 30px;"></ion-icon>`;
}

// Attempt autoplay once user interacts
const triggerAutoplay = () => {
  if (!isPlaying) {
    audio
      .play()
      .then(() => {
        isPlaying = true;
        updateIcons(true);
        document.querySelector(".visualizer").classList.add("active");

        // Remove event listeners after first interaction
        ["click", "scroll", "keydown"].forEach((event) =>
          window.removeEventListener(event, triggerAutoplay)
        );
      })
      .catch((err) => {
        console.log("Autoplay blocked:", err);
      });
  }
};

// Attach autoplay trigger to user events
["click", "scroll", "keydown"].forEach((event) =>
  window.addEventListener(event, triggerAutoplay)
);

// Manual toggle button
toggleBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    isPlaying = true;
    updateIcons(true);
    document.querySelector(".visualizer").classList.add("active");
  } else {
    audio.pause();
    isPlaying = false;
    updateIcons(false);
    document.querySelector(".visualizer").classList.remove("active");
  }
});

// Set initial icon
updateIcons(false);

// share modal
const shareBtn = document.getElementById("share-btn");
const shareModal = document.getElementById("share-modal");
const closeShareBtn = document.getElementById("share-close-btn");
const copyBtn = document.getElementById("copy-btn");
const shareLink = document.getElementById("share-link");

shareBtn.addEventListener("click", () => {
  shareModal.classList.add("active");
});

closeShareBtn.addEventListener("click", () => {
  shareModal.classList.remove("active");
});

window.addEventListener("click", (e) => {
  if (e.target === shareModal) {
    shareModal.classList.remove("active");
  }
});

copyBtn.addEventListener("click", () => {
  shareLink.select();
  document.execCommand("copy");
  copyBtn.textContent = "Copied!";
  setTimeout(() => (copyBtn.textContent = "Copy"), 2000);
});

// Update social share links
const pageURL = encodeURIComponent("https://kxswedding.netlify.app");
const shareText = encodeURIComponent("Let’s celebrate with us. Join us!");

document.getElementById(
  "share-fb"
).href = `https://www.facebook.com/sharer/sharer.php?u=${pageURL}&quote=${shareText}`;

document.getElementById(
  "share-x"
).href = `https://twitter.com/intent/tweet?text=${shareText}&url=${pageURL}`;

document.getElementById(
  "share-whatsapp"
).href = `https://wa.me/?text=${shareText}%20${pageURL}`;

document.getElementById(
  "share-telegram"
).href = `https://t.me/share/url?url=${pageURL}&text=${shareText}`;

document.getElementById(
  "share-viber"
).href = `viber://forward?text=${shareText}%20${pageURL}`;

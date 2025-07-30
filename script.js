// =========================
// SLIDE NAVIGATION
// =========================
const slideNavigator = (targetClass) => {
  const slides = document.querySelectorAll(".banner__slide");
  slides.forEach((slide) => {
    slide.classList.toggle("active", slide.classList.contains(targetClass));
  });
};

// =========================
// SECTION NAVIGATION
// =========================
const sectionNavigator = (sectionName) => {
  const header = document.querySelector("header");
  const allSections = document.querySelectorAll("section");

  allSections.forEach((section) => {
    section.classList.remove("section-show");
  });

  if (sectionName === "home") {
    const banner = document.querySelector(".banner");
    if (banner) {
      banner.classList.add("section-show");
      slideNavigator("slide-1");

      document.querySelectorAll(".slide-btn").forEach((btn, index) => {
        btn.classList.toggle("active", index === 0);
      });
    }

    header.classList.remove("active");
  } else {
    const targetSection = document.querySelector(`section.${sectionName}`);
    if (targetSection) {
      targetSection.classList.add("section-show");
      header.classList.add("active");

      // ✅ FIX: Re-init GLightbox if gallery is shown
      if (sectionName === "gallery") {
        setTimeout(() => {
          initGLightbox();
        }, 100); // small delay to ensure DOM is updated
      }
    }
  }
};

// =========================
// NAVIGATION LINK HANDLING
// =========================
const updateNavLinks = (targetName) => {
  document.querySelectorAll(".header__nav-link").forEach((link) => {
    link.classList.toggle(
      "header__nav-link--active",
      link.getAttribute("data-target") === targetName
    );
  });
};

// =========================
// INITIALIZE NAVIGATION
// =========================
const initNavigation = () => {
  updateNavLinks("home");
  sectionNavigator("home");
  slideNavigator("slide-1");
};

// =========================
// LOGO CLICK HANDLER
// =========================
const initLogoClick = () => {
  const logo = document.querySelector(".header__logo");
  logo?.addEventListener("click", (e) => {
    e.preventDefault();
    sectionNavigator("home");
    updateNavLinks("home");

    if (window.innerWidth < 768) toggleMenu();
  });
};

// =========================
// SLIDE BUTTONS HANDLING
// =========================
const initSlideButtons = () => {
  const buttons = document.querySelectorAll(".slide-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      buttons.forEach((el) => el.classList.remove("active"));
      btn.classList.add("active");

      const target = btn.getAttribute("data-target");
      slideNavigator(target);
    });
  });
};

// =========================
// MOBILE MENU TOGGLE
// =========================
const toggleMenu = () => {
  const menuBtn = document.querySelector(".header__menu-toggle");
  const navMobile = document.querySelector(".header__nav--mobile");

  menuBtn?.classList.toggle("active");
  navMobile?.classList.toggle("active");
};

// =========================
// SHARE BUTTONS
// =========================
const initBannerShareModal = () => {
  const trigger = document.getElementById("banner-share-trigger");
  const modal = document.getElementById("share-modal");
  const closeBtn = document.getElementById("share-modal-close");

  if (!trigger || !modal || !closeBtn) {
    console.warn("Share modal elements not found in DOM");
    return;
  }

  const pageURL = encodeURIComponent("https://kxswedding.netlify.app");
  const shareText = encodeURIComponent("Let's celebrate with us.");

  // Facebook
  const fb = document.getElementById("share-fb");
  if (fb) {
    fb.href = `https://www.facebook.com/sharer/sharer.php?u=${pageURL}&quote=${shareText}`;
  }

  // Twitter
  const twitter = document.getElementById("share-twitter");
  if (twitter) {
    twitter.href = `https://twitter.com/intent/tweet?text=${shareText}&url=${pageURL}`;
  }

  // WhatsApp
  const whatsapp = document.getElementById("share-whatsapp");
  if (whatsapp) {
    whatsapp.href = `https://wa.me/?text=${shareText}%20${pageURL}`;
  }

  // Telegram
  const telegram = document.getElementById("share-telegram");
  if (telegram) {
    telegram.href = `https://t.me/share/url?url=${pageURL}&text=${shareText}`;
  }

  // Viber (only works on mobile/desktop apps)
  const viber = document.getElementById("share-viber");
  if (viber) {
    viber.href = `viber://forward?text=${shareText}%20${pageURL}`;
  }

  // Instagram (not a real share link; just redirect to Instagram)
  const ig = document.getElementById("share-ig");
  if (ig) {
    ig.href = "https://www.instagram.com/";
  }

  // Event handling
  trigger.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
};

// =========================
// MAP TOGGLE
// =========================
const toggleMap = () => {
  const map = document.getElementById("map-container");
  if (map) {
    const isVisible = map.style.display === "block";
    map.style.display = isVisible ? "none" : "block";
  }
};

// =========================
// GALLERY INIT
// =========================
const initGallery = () => {
  const grid = document.querySelector(".gallery__grid");
  if (!grid) return;

  const iso = new Isotope(grid, {
    itemSelector: ".gallery__item",
    layoutMode: "masonry",
    percentPosition: true,
  });

  const filterButtons = document.querySelectorAll(".gallery__filter-button");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");
      iso.arrange({ filter });

      filterButtons.forEach((b) => b.classList.remove("is-checked"));
      btn.classList.add("is-checked");
    });
  });
};

// =========================
// RSVP FORM SUBMISSION
// =========================
const initRSVPForm = () => {
  const form = document.getElementById("rsvp-form");
  const modal = document.getElementById("rsvp-modal");
  const modalClose = document.getElementById("rsvp-modal-close");

  if (!form || !modal || !modalClose) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        form.reset();
        modal.style.display = "block";
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      alert("Network error. Please check your connection.");
    }
  });

  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
};

// =========================
// RSVP BUTTONS (Inside Banner)
// =========================
const initRSVPButtons = () => {
  document.querySelectorAll(".banner__rsvp-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      sectionNavigator("rsvp");
      updateNavLinks("rsvp");

      if (window.innerWidth < 768) toggleMenu();
    });
  });
};

// =========================
// SWIPER SLIDER
// =========================
const initSwiper = () => {
  new Swiper(".banner-swiper", {
    loop: true,
    speed: 1000,
    parallax: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
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
};

document.addEventListener("DOMContentLoaded", () => {
  initSwiper();
  initRSVPButtons();
});

const initHeaderNavLinks = () => {
  document.querySelectorAll(".header__nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = this.getAttribute("data-target");

      // Navigate to the target section
      sectionNavigator(target);

      // Set active state on nav links
      document.querySelectorAll(".header__nav-link").forEach((el) => {
        el.classList.remove("header__nav-link--active");
      });
      this.classList.add("header__nav-link--active");

      // Close mobile menu if on mobile
      if (window.innerWidth < 768) toggleMenu();
    });
  });
};

let lightboxInstance;

const initGLightbox = () => {
  if (lightboxInstance) {
    lightboxInstance.destroy();
  }

  lightboxInstance = GLightbox({
    selector: ".glightbox",
    touchNavigation: true,
    loop: true,
    closeButton: true,
  });

  console.log("GLightbox re-initialized:", lightboxInstance.elements);
};

// =========================
// INITIALIZE ON PAGE LOAD
// =========================
window.addEventListener("load", () => {
  initNavigation();
  initLogoClick();
  initHeaderNavLinks();
  initSlideButtons();
  initGallery();
  initRSVPForm();
  initBannerShareModal();
  initGLightbox();
});

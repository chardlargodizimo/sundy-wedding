// toggle background active
const slideNavigator = (name) => {
  let slides = document.querySelectorAll(".bg-slide");
  slides.forEach((slide) => {
    slide.classList.remove("active");
    if (slide.classList.contains(name)) {
      slide.classList.add("active");
    }
  });
};

//switch background
window.addEventListener("load", () => {
  const slideBtnList = document.querySelectorAll(".slide-btn");
  slideBtnList.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      slideBtnList.forEach((el) => {
        el.classList.remove("active");
      });
      this.classList.add("active");
      slideNavigator(this.getAttribute("data-target"));
    });
  });
});

//activate sections
const sectionNavigator = (name) => {
  let sections = document.querySelectorAll("section");
  let header = document.querySelector("header");
  sections.forEach((section) => {
    section.classList.remove("section-show");
    if (section.classList.contains(name)) {
      section.classList.add("section-show");
      header.classList.add("active");
    }
  });
};

//navigation to sections
window.addEventListener("load", () => {
  const navList = document.querySelectorAll(".nav-btn");
  navList.forEach((nav) => {
    nav.addEventListener("click", function (e) {
      e.preventDefault();
      navList.forEach((el) => {
        el.classList.remove("active");
      });
      this.classList.add("active");
      sectionNavigator(this.getAttribute("data-target"));
      screen.width < 768 && toggleMenu();
    });
  });
});

//reset header to initial state
const resetHeader = () => {
  let header = document.querySelector("header");
  header.classList.remove("active");
};

//initial navigation
const initNavigation = () => {
  const navList = document.querySelectorAll(".nav-btn");
  navList.forEach((el) => {
    el.classList.remove("active");
    if (el.getAttribute("data-target") === "about") {
      el.classList.add("active");
    }
  });
  sectionNavigator("about");
};

// toggle menu
const toggleMenu = () => {
  const menu = document.querySelector(".menu");
  const navMobile = document.querySelector(".nav-mobile");
  menu.classList.toggle("active");
  navMobile.classList.toggle("active");
};

//share

const shareButton = document.getElementById("share-button");
const fbBtn = document.getElementById("fb-share");
const twitterBtn = document.getElementById("twitter-share");
const whatsappBtn = document.getElementById("whatsapp-share");
const fallbackContainer = document.getElementById("share-fallback");

const shareData = {
  title: "Kim & Sundy's Wedding",
  text: "You're invited to Kim & Sundy's special day!",
  url: window.location.href,
};

shareButton.addEventListener("click", async (e) => {
  e.preventDefault();

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      console.log("Shared successfully!");
    } catch (err) {
      console.error("Error sharing:", err);
    }
  } else {
    // Show fallback links if native sharing is not supported
    fallbackContainer.style.display = "flex";
  }
});

// Set fallback links dynamically
const encodedURL = encodeURIComponent(shareData.url);
const encodedText = encodeURIComponent(shareData.text);

fbBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`;
twitterBtn.href = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedURL}`;
whatsappBtn.href = `https://wa.me/?text=${encodedText}%20${encodedURL}`;

// Open in new tab
[fbBtn, twitterBtn, whatsappBtn].forEach((btn) => {
  btn.setAttribute("target", "_blank");
  btn.setAttribute("rel", "noopener noreferrer");
});

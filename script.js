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

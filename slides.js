const slides = Array.from(document.querySelectorAll(".slide"));
const progressBar = document.querySelector(".progress-bar");
const slideCount = document.querySelector(".slide-count");

let currentSlide = 0;

function clampSlide(index) {
  return Math.max(0, Math.min(index, slides.length - 1));
}

function updateSlide(index) {
  currentSlide = clampSlide(index);

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === currentSlide);
  });

  const percent = ((currentSlide + 1) / slides.length) * 100;
  progressBar.style.width = `${percent}%`;
  slideCount.textContent = `${currentSlide + 1} / ${slides.length}`;
  window.location.hash = `slide-${currentSlide + 1}`;
}

function goNext() {
  updateSlide(currentSlide + 1);
}

function goPrevious() {
  updateSlide(currentSlide - 1);
}

document.addEventListener("keydown", (event) => {
  const forwardKeys = [" ", "ArrowRight", "ArrowDown", "PageDown", "Enter"];
  const backKeys = ["ArrowLeft", "ArrowUp", "PageUp", "Backspace"];

  if (forwardKeys.includes(event.key)) {
    event.preventDefault();
    goNext();
  }

  if (backKeys.includes(event.key)) {
    event.preventDefault();
    goPrevious();
  }

  if (event.key === "Home") {
    event.preventDefault();
    updateSlide(0);
  }

  if (event.key === "End") {
    event.preventDefault();
    updateSlide(slides.length - 1);
  }

  if (event.key.toLowerCase() === "f") {
    event.preventDefault();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }
});

document.addEventListener("click", (event) => {
  const midpoint = window.innerWidth / 2;
  if (event.clientX >= midpoint) {
    goNext();
  } else {
    goPrevious();
  }
});

function initialSlideFromHash() {
  const match = window.location.hash.match(/slide-(\d+)/);
  if (!match) return 0;
  return Number(match[1]) - 1;
}

updateSlide(initialSlideFromHash());

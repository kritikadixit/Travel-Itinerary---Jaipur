// ---------- NAV TOGGLE ----------
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");
navToggle?.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));
  mainNav.classList.toggle("show");
  mainNav.setAttribute("aria-hidden", String(expanded));
});

// ---------- IMAGE MODAL ----------
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalClose = document.getElementById("modalClose");

document.querySelectorAll("img").forEach(img => {
  if (!img.closest(".hero")) {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => openModal(img.src, img.alt));
  }
});
function openModal(src, alt) {
  modalImg.src = src;
  modalImg.alt = alt;
  modal.setAttribute("aria-hidden", "false");
  modal.style.visibility = "visible";
  modal.style.opacity = "1";
  modalClose?.focus();
}
function closeModal() {
  modal.setAttribute("aria-hidden", "true");
  modal.style.opacity = "0";
  setTimeout(() => {
    modal.style.visibility = "hidden";
    modalImg.src = "";
  }, 200);
}
modalClose?.addEventListener("click", closeModal);
modal?.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeModal(); });

// ---------- CONSULTATION TOGGLE ----------
const consultToggle = document.getElementById("consultToggle");
const priceNote = document.querySelector(".price-note");
consultToggle?.addEventListener("change", () => {
  priceNote.textContent = consultToggle.checked ? "per day + consultation" : "per day";
});

// ---------- PRINT ----------
const downloadBtn = document.querySelector(".btn-ghost");
downloadBtn?.addEventListener("click", () => window.print());

// ---------- HOTEL CAROUSELS ----------
document.querySelectorAll("[data-carousel]").forEach(carousel => {
  const track = carousel.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const prevBtn = carousel.querySelector(".prev");
  const nextBtn = carousel.querySelector(".next");
  let index = 0;
  function updateSlide() { track.style.transform = `translateX(-${index * 100}%)`; }
  prevBtn.addEventListener("click", () => { index = (index - 1 + slides.length) % slides.length; updateSlide(); });
  nextBtn.addEventListener("click", () => { index = (index + 1) % slides.length; updateSlide(); });
});

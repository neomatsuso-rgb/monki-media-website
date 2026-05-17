const themes = ["lime", "coral", "blue", "pink", "ink"];
const body = document.body;
const sections = [...document.querySelectorAll("[data-theme]")];

const observer = new IntersectionObserver(
  (entries) => {
    const active = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (active) {
      body.dataset.theme = active.target.dataset.theme;
    }
  },
  { threshold: [0.35, 0.55, 0.75] }
);

sections.forEach((section) => observer.observe(section));

const menuButton = document.querySelector(".menu-toggle");
const siteMenu = document.querySelector(".site-menu");
const menuLinks = [...document.querySelectorAll(".site-menu a")];

function updateScrollState() {
  document.body.classList.toggle("scrolled", window.scrollY > window.innerHeight * 0.2);
}

function setMenu(open) {
  document.body.classList.toggle("menu-open", open);
  menuButton?.setAttribute("aria-expanded", String(open));
  siteMenu?.setAttribute("aria-hidden", String(!open));
}

menuButton?.addEventListener("click", () => {
  setMenu(!document.body.classList.contains("menu-open"));
});

menuLinks.forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenu(false);
  }
});

window.addEventListener("scroll", updateScrollState, { passive: true });
updateScrollState();

let idleTheme = themes.indexOf(body.dataset.theme);
window.setInterval(() => {
  if (window.scrollY < 18) {
    idleTheme = (idleTheme + 1) % themes.length;
    body.dataset.theme = themes[idleTheme];
  }
}, 2600);

const canvas = document.querySelector("#grain");
const ctx = canvas.getContext("2d");
let width = 0;
let height = 0;

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function drawGrain() {
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < 1100; i += 1) {
    const alpha = Math.random() * 0.45;
    ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
    ctx.fillRect(Math.random() * width, Math.random() * height, 1, 1);
  }
}

resizeCanvas();
drawGrain();
window.addEventListener("resize", () => {
  resizeCanvas();
  drawGrain();
});
window.setInterval(drawGrain, 140);

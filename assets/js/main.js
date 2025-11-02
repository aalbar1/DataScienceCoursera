document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".menu");

  if (navToggle && menu) {
    navToggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (menu.classList.contains("is-open")) {
          menu.classList.remove("is-open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  const ticker = document.querySelector(".ticker-items");
  if (ticker) {
    const items = Array.from(ticker.children);
    // Duplicate items to ensure seamless looping animation
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      ticker.appendChild(clone);
    });
  }

  const yearHolder = document.getElementById("current-year");
  if (yearHolder) {
    yearHolder.textContent = String(new Date().getFullYear());
  }
});

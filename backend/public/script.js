/* =====================================================
   GLOBAL SELECTORS
===================================================== */
const form = document.getElementById("myForm");
const result = document.getElementById("result");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");
const header = document.querySelector(".navbar");

/* =====================================================
   HELPER FUNCTIONS
===================================================== */
function throttle(fn, delay) {
  let lastTime = 0;
  return function () {
    const now = new Date().getTime();
    if (now - lastTime >= delay) {
      fn();
      lastTime = now;
    }
  };
}

/* =====================================================
   FORM SUBMISSION (FRONTEND → BACKEND)
===================================================== */
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("name");
    const name = nameInput.value.trim();

    if (!name) {
      result.textContent = "❌ Please enter your name";
      return;
    }

    result.textContent = "Sending data to backend...";

    try {
      const response = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
      });

      const data = await response.json();

      result.textContent = data.message;
      nameInput.value = "";
    } catch (error) {
      console.error(error);
      result.textContent = "❌ Server error";
    }
  });
}

/* =====================================================
   NAVBAR ACTIVE LINK ON SCROLL
===================================================== */
function setActiveLink() {
  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", throttle(setActiveLink, 100));

/* =====================================================
   NAVBAR SHADOW ON SCROLL
===================================================== */
function handleNavbarStyle() {
  if (window.scrollY > 20) {
    header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.6)";
  } else {
    header.style.boxShadow = "none";
  }
}

window.addEventListener("scroll", throttle(handleNavbarStyle, 50));

/* =====================================================
   SCROLL REVEAL ANIMATION (PURE JS)
===================================================== */
const revealElements = document.querySelectorAll(
  ".section, .skill-card, .project-card"
);

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 120) {
      el.classList.add("revealed");
    }
  });
}

window.addEventListener("scroll", throttle(revealOnScroll, 80));
revealOnScroll();

/* =====================================================
   SMOOTH SCROLL FOR NAV LINKS
===================================================== */
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

/* =====================================================
   HERO TEXT TYPING EFFECT
===================================================== */
const heroTitle = document.querySelector(".hero h1 span");

if (heroTitle) {
  const text = heroTitle.textContent;
  heroTitle.textContent = "";
  let index = 0;

  function typeEffect() {
    if (index < text.length) {
      heroTitle.textContent += text.charAt(index);
      index++;
      setTimeout(typeEffect, 80);
    }
  }

  window.addEventListener("load", typeEffect);
}

/* =====================================================
   BACK TO TOP BUTTON (DYNAMIC)
===================================================== */
const backToTop = document.createElement("button");
backToTop.textContent = "↑";
backToTop.className = "back-to-top";
document.body.appendChild(backToTop);

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

function toggleBackToTop() {
  if (window.scrollY > 400) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
}

window.addEventListener("scroll", throttle(toggleBackToTop, 100));

/* =====================================================
   THEME DEBUG (FUTURE EXTENSION)
===================================================== */
const theme = {
  current: "dark",
  toggle() {
    this.current = this.current === "dark" ? "light" : "dark";
    console.log("Theme switched to:", this.current);
  }
};

// future use:
// theme.toggle();

/* =====================================================
   PERFORMANCE LOG
===================================================== */
window.addEventListener("load", () => {
  console.log("🚀 Portfolio fully loaded");
  console.log("Sections:", sections.length);
  console.log("Skills:", document.querySelectorAll(".skill-card").length);
});

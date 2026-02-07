/* =========================================
   1. LENIS (Smooth Scroll)
   ========================================= */
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true
});
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

/* =========================================
   2. PRELOADER ANIMATION
   ========================================= */
const tl = gsap.timeline();
let counter = { value: 0 };

tl.to(counter, {
    value: 100,
    duration: 2,
    ease: "power4.out",
    onUpdate: () => {
        document.querySelector(".counter").textContent = Math.round(counter.value) + "%";
    }
});

tl.to(".preloader", {
    y: "-100%",
    duration: 1,
    ease: "power4.inOut"
});

tl.from(".hero-badge", { y: 20, opacity: 0, duration: 0.5 })
  .from(".glitch-text", { y: 50, opacity: 0, duration: 1 }, "-=0.3")
  .from(".hero-sub", { y: 30, opacity: 0, duration: 0.8 }, "-=0.5")
  .from(".btn-group", { y: 20, opacity: 0, duration: 0.5 }, "-=0.3");

/* =========================================
   3. TEXT DECODING (Hacker Effect)
   ========================================= */
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function decodeText(element) {
    let iterations = 0;
    const originalText = element.dataset.text;
    if(!originalText) return; 

    const interval = setInterval(() => {
        element.innerText = originalText.split("")
            .map((letter, index) => {
                if (index < iterations) return originalText[index];
                return letters[Math.floor(Math.random() * 36)];
            }).join("");

        if (iterations >= originalText.length) clearInterval(interval);
        iterations += 1 / 3;
    }, 30);
}

window.onload = () => {
    const title = document.querySelector(".glitch-text");
    if(title) setTimeout(() => decodeText(title), 2200);
};

/* =========================================
   4. CURSOR FOLLOWER
   ========================================= */
const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
    gsap.to(follower, { x: e.clientX - 20, y: e.clientY - 20, duration: 0.2 });
});

document.querySelectorAll("a, button, .project-card, .bento-card").forEach(el => {
    el.addEventListener("mouseenter", () => {
        gsap.to(follower, { scale: 1.5, borderColor: "#00f2ff", duration: 0.3 });
    });
    el.addEventListener("mouseleave", () => {
        gsap.to(follower, { scale: 1, borderColor: "#00f2ff", duration: 0.3 });
    });
});

/* =========================================
   5. BACKGROUND PARTICLES
   ========================================= */
tsParticles.load("particles-js", {
    fpsLimit: 60,
    particles: {
        number: { value: 60, density: { enable: true, area: 800 } },
        color: { value: "#00f2ff" },
        shape: { type: "circle" },
        opacity: { value: 0.3 },
        size: { value: 2 },
        links: { enable: true, distance: 150, color: "#00f2ff", opacity: 0.2, width: 1 },
        move: { enable: true, speed: 1.5, direction: "none" }
    },
    interactivity: {
        events: { onHover: { enable: true, mode: "grab" }, onClick: { enable: true, mode: "push" } },
        modes: { grab: { distance: 140, links: { opacity: 1 } } }
    }
});

/* =========================================
   6. SCROLL ANIMATIONS
   ========================================= */
gsap.utils.toArray('.section').forEach(section => {
    gsap.from(section.querySelectorAll('.bento-card, .project-card, .timeline-item'), {
        scrollTrigger: { trigger: section, start: "top 80%" },
        y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out"
    });
});

/* =========================================
   7. FORM HANDLING
   ========================================= */
const form = document.getElementById("contactForm");
const result = document.getElementById("result");

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const btn = form.querySelector("button");
        const originalText = btn.innerText;
        
        btn.innerText = "TRANSMITTING...";
        setTimeout(() => {
            btn.innerText = "SENT";
            result.innerText = "Message received. Initiating response protocol.";
            result.style.color = "#00f2ff";
            result.style.marginTop = "1rem";
            form.reset();
            setTimeout(() => {
                btn.innerText = originalText;
                result.innerText = "";
            }, 3000);
        }, 1500);
    });
}
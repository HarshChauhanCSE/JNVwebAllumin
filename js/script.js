
document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // MOBILE MENU
    // =========================

    window.toggleMenu = function () {
        const navLinks = document.querySelector(".nav-links");
        if (navLinks) {
            navLinks.classList.toggle("active");
        }
    };

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            document.querySelector(".nav-links")?.classList.remove("active");
        });
    });

    // =========================
    // ANIMATED COUNTERS
    // =========================

    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {

        const updateCounter = () => {

            const target = parseInt(counter.dataset.target) || 0;
            const count = parseInt(counter.innerText) || 0;
            const increment = Math.ceil(target / 100);

            if (count < target) {
                counter.innerText = count + increment;
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target;
            }
        };

        updateCounter();
    });

    // =========================
    // DARK MODE
    // =========================

    const themeBtn = document.getElementById("theme-toggle");

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");

        if (themeBtn) {
            themeBtn.innerHTML =
                '<i class="fa-solid fa-sun"></i>';
        }
    }

    if (themeBtn) {

        themeBtn.addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");

            const icon = themeBtn.querySelector("i");

            if (document.body.classList.contains("dark-mode")) {

                icon?.classList.replace("fa-moon", "fa-sun");
                localStorage.setItem("theme", "dark");

            } else {

                icon?.classList.replace("fa-sun", "fa-moon");
                localStorage.setItem("theme", "light");
            }
        });
    }

    // =========================
    // NAVBAR EFFECT
    // =========================

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (!navbar) return;

        if (window.scrollY > 50) {

            navbar.style.padding = "12px 8%";
            navbar.style.boxShadow =
                "0 5px 25px rgba(0,0,0,.15)";

        } else {

            navbar.style.padding = "18px 8%";
            navbar.style.boxShadow =
                "0 4px 20px rgba(0,0,0,.08)";
        }
    });

    // =========================
    // SCROLL TO TOP
    // =========================

    const topBtn = document.createElement("button");

    topBtn.id = "topBtn";
    topBtn.innerHTML = "↑";

    Object.assign(topBtn.style, {
        position: "fixed",
        right: "20px",
        bottom: "20px",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        display: "none",
        fontSize: "22px",
        zIndex: "999",
        background: "#1e88e5",
        color: "#fff"
    });

    document.body.appendChild(topBtn);

    window.addEventListener("scroll", () => {
        topBtn.style.display =
            window.scrollY > 300 ? "block" : "none";
    });

    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // =========================
    // REVEAL ANIMATION
    // =========================

    const revealElements = document.querySelectorAll(
        ".stat-card, .card, .featured h2"
    );

    revealElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "all .8s ease";
    });

    function reveal() {

        revealElements.forEach(el => {

            const top = el.getBoundingClientRect().top;

            if (top < window.innerHeight - 100) {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            }
        });
    }

    window.addEventListener("scroll", reveal);
    reveal();

    // =========================
    // FOOTER YEAR
    // =========================

    const footerText = document.querySelector("footer p");

    if (footerText) {
        footerText.innerHTML =
            `© ${new Date().getFullYear()} JNV Chhotaudepur Alumni Network`;
    }

    // =========================
    // LIGHTBOX
    // =========================

    const galleryImages =
        document.querySelectorAll(".gallery-grid img");

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImg =
        document.getElementById("lightboxImg");

    const closeLightbox =
        document.getElementById("closeLightbox");

    if (
        galleryImages.length &&
        lightbox &&
        lightboxImg &&
        closeLightbox
    ) {

        galleryImages.forEach(img => {

            img.addEventListener("click", () => {

                lightbox.style.display = "flex";
                lightboxImg.src = img.src;
            });
        });

        closeLightbox.addEventListener("click", () => {
            lightbox.style.display = "none";
        });

        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = "none";
            }
        });
    }

    // =========================
    // SCROLL REVEAL
    // =========================

    if (typeof ScrollReveal !== "undefined") {

        ScrollReveal().reveal(
            ".hero-content, .card, .stat-card, section",
            {
                distance: "60px",
                duration: 1000,
                delay: 100,
                origin: "bottom",
                reset: false
            }
        );
    }

    // =========================
    // TS PARTICLES
    // =========================

    if (
        typeof tsParticles !== "undefined" &&
        document.getElementById("tsparticles")
    ) {

        tsParticles.load("tsparticles", {

            particles: {
                number: { value: 60 },
                color: { value: "#3b82f6" },
                shape: { type: "circle" },
                opacity: { value: 0.5 },
                size: { value: 3 },

                move: {
                    enable: true,
                    speed: 1
                },

                links: {
                    enable: true,
                    distance: 150,
                    opacity: 0.4
                }
            }
        });
    }

});

// =========================
// LOADER
// =========================

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});


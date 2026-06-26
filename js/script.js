// =========================
// LOADER
// =========================

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

// =========================
// MAIN
// =========================

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

    // Close menu when any nav link is clicked
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            document.querySelector(".nav-links")?.classList.remove("active");
        });
    });

    // Close menu when clicking outside navbar
    document.addEventListener("click", (e) => {
        const navbar = document.querySelector(".navbar");
        const navLinks = document.querySelector(".nav-links");
        if (navbar && navLinks && !navbar.contains(e.target)) {
            navLinks.classList.remove("active");
        }
    });

    // =========================
    // ANIMATED COUNTERS
    // (starts only when visible on screen)
    // =========================

    const counters = document.querySelectorAll(".counter");

    if (counters.length) {

        const counterObserver = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const counter = entry.target;
                const target = parseInt(counter.dataset.target) || 0;
                let count = 0;
                const increment = Math.ceil(target / 100);

                const updateCounter = () => {
                    count += increment;
                    if (count < target) {
                        counter.innerText = count.toLocaleString();
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.innerText = target.toLocaleString();
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter); // run only once
            });

        }, { threshold: 0.4 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // =========================
    // DARK MODE
    // =========================

    const themeBtn = document.getElementById("theme-toggle");

    // Apply saved theme on load
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        if (themeBtn) {
            themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
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
    // NAVBAR SHRINK ON SCROLL
    // =========================

    const navbar = document.querySelector(".navbar");
    const isMobile = () => window.innerWidth <= 992;

    window.addEventListener("scroll", () => {
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.style.padding = isMobile() ? "10px 20px" : "12px 8%";
            navbar.style.boxShadow = "0 5px 25px rgba(0,0,0,.15)";
        } else {
            navbar.style.padding = isMobile() ? "12px 20px" : "18px 8%";
            navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,.08)";
        }
    });

    // =========================
    // SCROLL TO TOP BUTTON
    // =========================

    const topBtn = document.createElement("button");
    topBtn.id = "topBtn";
    topBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    topBtn.setAttribute("aria-label", "Scroll to top");
    document.body.appendChild(topBtn);

    window.addEventListener("scroll", () => {
        topBtn.classList.toggle("visible", window.scrollY > 300);
    });

    topBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // =========================
    // SCROLL REVEAL ANIMATION
    // (IntersectionObserver — no library needed)
    // =========================

    const revealElements = document.querySelectorAll(
        ".stat-card, .card, .featured h2, .section-desc"
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                revealObserver.unobserve(entry.target); // animate only once
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.classList.add("reveal-hidden");
        revealObserver.observe(el);
    });

    // =========================
    // FOOTER YEAR (auto update)
    // =========================

    const footerText = document.querySelector("footer p");
    if (footerText) {
        footerText.innerHTML =
            `© ${new Date().getFullYear()} JNV Chhotaudepur Alumni Network`;
    }

    // =========================
    // LIGHTBOX (Gallery Page)
    // =========================

    const galleryImages = document.querySelectorAll(".gallery-grid img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const closeLightboxBtn = document.getElementById("closeLightbox");

    if (galleryImages.length && lightbox && lightboxImg && closeLightboxBtn) {

        const openLightbox = (src) => {
            lightboxImg.src = src;
            lightbox.classList.add("active");
            document.body.style.overflow = "hidden"; // prevent scroll behind lightbox
        };

        const closeLightboxFn = () => {
            lightbox.classList.remove("active");
            document.body.style.overflow = "";
        };

        galleryImages.forEach(img => {
            img.addEventListener("click", () => openLightbox(img.src));
        });

        closeLightboxBtn.addEventListener("click", closeLightboxFn);

        // Close on background click
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) closeLightboxFn();
        });

        // Close on Escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") closeLightboxFn();
        });
    }

    // =========================
    // TS PARTICLES
    // (mobile pe kam particles for performance)
    // =========================

    if (
        typeof tsParticles !== "undefined" &&
        document.getElementById("tsparticles")
    ) {
        const isMobileDevice = window.innerWidth <= 768;

        tsParticles.load("tsparticles", {
            fpsLimit: 60,
            particles: {
                number: {
                    value: isMobileDevice ? 25 : 60
                },
                color: { value: "#3b82f6" },
                shape: { type: "circle" },
                opacity: {
                    value: 0.5
                },
                size: {
                    value: { min: 1, max: 4 }
                },
                move: {
                    enable: true,
                    speed: isMobileDevice ? 0.6 : 1.2,
                    outModes: { default: "bounce" }
                },
                links: {
                    enable: true,
                    distance: 150,
                    color: "#3b82f6",
                    opacity: 0.4,
                    width: 1
                }
            },
            interactivity: {
                events: {
                    onHover: {
                        enable: !isMobileDevice, // hover effect only on desktop
                        mode: "grab"
                    }
                }
            },
            detectRetina: true
        });
    }

});
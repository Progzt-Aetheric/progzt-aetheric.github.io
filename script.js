/* =========================================================
   PROGZT AETHERIC
   Website Interactions
========================================================= */


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuButton = document.getElementById("menuButton");
const mobileNav = document.getElementById("mobileNav");

if (menuButton && mobileNav) {

    function setMobileMenuOpen(isOpen) {

        mobileNav.classList.toggle("open", isOpen);

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        mobileNav.setAttribute(
            "aria-hidden",
            String(!isOpen)
        );

    }

    menuButton.addEventListener("click", () => {

        setMobileMenuOpen(
            !mobileNav.classList.contains("open")
        );

    });


    mobileNav
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener("click", () => {

                setMobileMenuOpen(false);

            });

        });

    document.addEventListener("click", event => {

        if (
            mobileNav.classList.contains("open") &&
            !mobileNav.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {
            setMobileMenuOpen(false);
        }

    });

    document.addEventListener("keydown", event => {

        if (event.key === "Escape" && mobileNav.classList.contains("open")) {
            setMobileMenuOpen(false);
            menuButton.focus();
        }

    });

    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {
            setMobileMenuOpen(false);
        }

    }, { passive: true });

}


/* =========================================================
   COMMAND PALETTE
========================================================= */

const commandButton = document.getElementById("commandButton");
const commandPalette = document.getElementById("commandPalette");
const commandSearch = document.getElementById("commandSearch");
const commandClose = document.getElementById("commandClose");
const commandResults = Array.from(
    document.querySelectorAll(".command-result")
);
const commandEmpty = document.getElementById("commandEmpty");

if (commandButton && commandPalette && commandSearch) {

    function openCommandPalette() {

        if (mobileNav && mobileNav.classList.contains("open")) {
            mobileNav.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
            mobileNav.setAttribute("aria-hidden", "true");
        }

        if (!commandPalette.open) {
            commandPalette.showModal();
        }

        commandSearch.focus();

    }

    commandButton.addEventListener("click", openCommandPalette);

    commandClose?.addEventListener("click", () => {
        commandPalette.close();
        commandButton.focus();
    });

    commandPalette.addEventListener("click", event => {

        if (event.target === commandPalette) {
            commandPalette.close();
            commandButton.focus();
        }

    });

    commandResults.forEach(result => {

        result.addEventListener("click", () => {
            commandPalette.close();
        });

    });

    commandSearch.addEventListener("input", () => {

        const query = commandSearch.value.trim().toLocaleLowerCase();
        let hasMatches = false;

        commandResults.forEach(result => {

            const matches = result.textContent
                .trim()
                .toLocaleLowerCase()
                .includes(query);

            result.hidden = !matches;
            hasMatches ||= matches;

        });

        commandEmpty.hidden = hasMatches;

    });

    document.addEventListener("keydown", event => {

        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
            event.preventDefault();
            openCommandPalette();
        }

    });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("visible");

                observer.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

    document.documentElement.classList.add("js");
}


/* =========================================================
   COUNTERS
========================================================= */

const counters =
    document.querySelectorAll("[data-number]");

if ("IntersectionObserver" in window) {

    const counterObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                const counter =
                    entry.target;

                const target =
                    Number(
                        counter.dataset.number
                    );

                const duration = 1300;

                const startTime =
                    performance.now();


                function updateCounter(currentTime) {

                    const progress =
                        Math.min(
                            (currentTime - startTime) /
                            duration,
                            1
                        );


                    const eased =
                        1 -
                        Math.pow(
                            1 - progress,
                            3
                        );


                    const current =
                        Math.floor(
                            eased * target
                        );


                    counter.textContent =
                        current.toLocaleString(
                            "en-US"
                        );


                    if (progress < 1) {

                        requestAnimationFrame(
                            updateCounter
                        );

                    } else {

                        counter.textContent =
                            target.toLocaleString(
                                "en-US"
                            );

                    }

                }


                requestAnimationFrame(
                    updateCounter
                );


                observer.unobserve(counter);

            });

        },
        {
            threshold: 0.5
        }
    );


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });
}


/* =========================================================
   HEADER SHADOW
========================================================= */

const header =
    document.getElementById("header");


window.addEventListener(
    "scroll",
    () => {

        if (!header) {
            return;
        }

        if (window.scrollY > 30) {

            header.style.boxShadow =
                "0 10px 35px rgba(15, 23, 42, 0.06)";

        } else {

            header.style.boxShadow =
                "none";

        }

    },
    {
        passive: true
    }
);


/* =========================================================
   CURRENT YEAR
========================================================= */

const yearElements =
    document.querySelectorAll(
        "[data-current-year]"
    );

yearElements.forEach(element => {

    element.textContent =
        new Date().getFullYear();

});


/* =========================================================
   HERO PARTICLE NETWORK
========================================================= */

const particleCanvas = document.querySelector(".hero-particles");
const particleContext = particleCanvas?.getContext("2d", {
    alpha: true,
    desynchronized: true
});
const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

if (particleCanvas && particleContext && !reduceMotion.matches) {

    const hero = particleCanvas.closest(".hero");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const particles = [];
    const pointer = {
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0,
        active: false,
        attracting: false
    };

    let canvasWidth = 0;
    let canvasHeight = 0;
    let animationFrame = 0;
    let previousFrameTime = 0;
    let heroIsVisible = true;

    function resizeParticleCanvas() {

        const bounds = hero.getBoundingClientRect();
        const resolution = Math.min(window.devicePixelRatio || 1, 1.5);

        canvasWidth = bounds.width;
        canvasHeight = bounds.height;
        particleCanvas.width = Math.round(canvasWidth * resolution);
        particleCanvas.height = Math.round(canvasHeight * resolution);
        particleContext.setTransform(resolution, 0, 0, resolution, 0, 0);

        const minimumCount = coarsePointer.matches ? 18 : 28;
        const maximumCount = coarsePointer.matches ? 36 : 76;
        const areaPerParticle = coarsePointer.matches ? 19000 : 14500;
        const particleCount = Math.min(
            maximumCount,
            Math.max(minimumCount, Math.round(canvasWidth * canvasHeight / areaPerParticle))
        );

        particles.length = 0;

        for (let index = 0; index < particleCount; index += 1) {
            particles.push({
                x: Math.random() * canvasWidth,
                y: Math.random() * canvasHeight,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                radius: 1 + Math.random() * 1.2
            });
        }

    }

    function setPointerPosition(event) {

        const bounds = hero.getBoundingClientRect();

        pointer.targetX = event.clientX - bounds.left;
        pointer.targetY = event.clientY - bounds.top;
        pointer.active = true;

    }

    function animateParticles(timestamp) {

        animationFrame = 0;

        if (!heroIsVisible || document.hidden) {
            return;
        }

        if (timestamp - previousFrameTime < 1000 / 60 - 1) {
            animationFrame = requestAnimationFrame(animateParticles);
            return;
        }

        const frameScale = previousFrameTime
            ? Math.min((timestamp - previousFrameTime) / (1000 / 60), 2)
            : 1;

        previousFrameTime = timestamp;
        pointer.x += (pointer.targetX - pointer.x) * 0.08;
        pointer.y += (pointer.targetY - pointer.y) * 0.08;

        particleContext.clearRect(0, 0, canvasWidth, canvasHeight);

        for (const particle of particles) {

            if (pointer.active) {
                const deltaX = particle.x - pointer.x;
                const deltaY = particle.y - pointer.y;
                const distance = Math.hypot(deltaX, deltaY);
                const influenceRadius = coarsePointer.matches ? 115 : 145;

                if (distance > 0 && distance < influenceRadius) {
                    const direction = pointer.attracting ? -1 : 1;
                    const force = (1 - distance / influenceRadius) * 0.018 * direction;
                    particle.vx += (deltaX / distance) * force * frameScale;
                    particle.vy += (deltaY / distance) * force * frameScale;
                }
            }

            particle.vx *= 0.995;
            particle.vy *= 0.995;
            particle.x += particle.vx * frameScale;
            particle.y += particle.vy * frameScale;

            if (particle.x < 0 || particle.x > canvasWidth) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvasHeight) particle.vy *= -1;

            particle.x = Math.max(0, Math.min(canvasWidth, particle.x));
            particle.y = Math.max(0, Math.min(canvasHeight, particle.y));
        }

        const connectionDistance = coarsePointer.matches ? 105 : 130;
        const connectionDistanceSquared = connectionDistance * connectionDistance;

        for (let firstIndex = 0; firstIndex < particles.length; firstIndex += 1) {

            const first = particles[firstIndex];

            for (let secondIndex = firstIndex + 1; secondIndex < particles.length; secondIndex += 1) {

                const second = particles[secondIndex];
                const deltaX = second.x - first.x;
                const deltaY = second.y - first.y;
                const distanceSquared = deltaX * deltaX + deltaY * deltaY;

                if (distanceSquared < connectionDistanceSquared) {
                    const alpha = (1 - Math.sqrt(distanceSquared) / connectionDistance) * 0.24;
                    particleContext.strokeStyle = `rgba(20, 110, 245, ${alpha})`;
                    particleContext.beginPath();
                    particleContext.moveTo(first.x, first.y);
                    particleContext.lineTo(second.x, second.y);
                    particleContext.stroke();
                }
            }

            particleContext.beginPath();
            particleContext.arc(first.x, first.y, first.radius + 2, 0, Math.PI * 2);
            particleContext.fillStyle = "rgba(20, 110, 245, 0.12)";
            particleContext.fill();

            particleContext.beginPath();
            particleContext.arc(first.x, first.y, first.radius, 0, Math.PI * 2);
            particleContext.fillStyle = "rgba(45, 123, 255, 0.72)";
            particleContext.fill();
        }

        animationFrame = requestAnimationFrame(animateParticles);

    }

    function updateAnimationState() {

        if (heroIsVisible && !document.hidden && !animationFrame) {
            previousFrameTime = 0;
            animationFrame = requestAnimationFrame(animateParticles);
        } else if ((!heroIsVisible || document.hidden) && animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = 0;
        }

    }

    resizeParticleCanvas();

    window.addEventListener("resize", resizeParticleCanvas, { passive: true });
    hero.addEventListener("pointermove", setPointerPosition, { passive: true });
    hero.addEventListener("pointerdown", event => {
        setPointerPosition(event);
        pointer.attracting = true;
    }, { passive: true });
    hero.addEventListener("pointerleave", event => {
        if (event.pointerType === "mouse") pointer.active = false;
    }, { passive: true });
    hero.addEventListener("pointerup", event => {
        pointer.attracting = false;
        if (event.pointerType !== "mouse") pointer.active = false;
    }, { passive: true });
    hero.addEventListener("pointercancel", () => {
        pointer.active = false;
        pointer.attracting = false;
    }, { passive: true });

    document.addEventListener("visibilitychange", updateAnimationState);

    if ("IntersectionObserver" in window) {
        const heroObserver = new IntersectionObserver(entries => {
            heroIsVisible = entries[0].isIntersecting;
            updateAnimationState();
        });

        heroObserver.observe(hero);
    }

    updateAnimationState();
}

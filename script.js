
/* ==========================================
   CHHIRUSH WEB DEVELOPER
   ULTRA SMOOTH ANIMATED EDITION

   COMPLETE SCRIPT.JS

   FEATURES:
   01. CINEMATIC PAGE LOADER
   02. GOLDEN CUSTOM CURSOR
   03. SMOOTH CURSOR GLOW
   04. ANIMATED GOLD PARTICLES
   05. SCROLL REVEAL ANIMATIONS
   06. 3D TILT CARDS
   07. MAGNETIC BUTTONS
   08. MOBILE NAVIGATION
   09. BACK TO TOP BUTTON
   10. AUTOMATIC COPYRIGHT YEAR
   11. WHATSAPP ENQUIRY FORM
   12. PERFORMANCE OPTIMIZATION
========================================== */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

    /* ======================================
       BASIC SETTINGS
    ====================================== */

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const isTouchDevice = window.matchMedia(
        "(hover: none), (pointer: coarse)"
    ).matches;

    const isMobile = window.innerWidth <= 760;

    const canUseMouseEffects =
        !reduceMotion && !isTouchDevice;


    /* ======================================
       01. CINEMATIC LOADING SCREEN
    ====================================== */

    const pageLoader = document.getElementById("pageLoader");

    function hidePageLoader() {

        if (!pageLoader) {
            return;
        }

        pageLoader.classList.add("is-hidden");

        pageLoader.setAttribute(
            "aria-hidden",
            "true"
        );

        window.setTimeout(function () {

            pageLoader.style.display = "none";

        }, 800);

    }

    if (pageLoader) {

        if (reduceMotion) {

            hidePageLoader();

        } else {

            const loaderStarted = performance.now();

            function finishLoading() {

                const elapsed =
                    performance.now() - loaderStarted;

                const minimumDuration = 1700;

                const remaining = Math.max(
                    0,
                    minimumDuration - elapsed
                );

                window.setTimeout(
                    hidePageLoader,
                    remaining
                );

            }

            if (document.readyState === "complete") {

                finishLoading();

            } else {

                window.addEventListener(
                    "load",
                    finishLoading,
                    { once: true }
                );

            }

            // Safety fallback:
            // Never leave visitors stuck on the loader.

            window.setTimeout(
                hidePageLoader,
                4500
            );

        }

    }


    /* ======================================
       02. GOLDEN CUSTOM CURSOR
    ====================================== */

    const customCursor = document.getElementById(
        "customCursor"
    );

    const cursorGlow = document.getElementById(
        "cursorGlow"
    );

    if (
        canUseMouseEffects &&
        customCursor &&
        cursorGlow
    ) {

        let mouseX = -100;
        let mouseY = -100;

        let glowX = -100;
        let glowY = -100;

        let cursorFrame = null;

        let cursorVisible = false;

        function updateCursor() {

            // Small cursor follows the mouse directly.

            customCursor.style.transform =
                "translate3d(" +
                (mouseX - 5.5) +
                "px, " +
                (mouseY - 5.5) +
                "px, 0)";

            // Larger glow follows smoothly.

            glowX += (mouseX - glowX) * 0.15;

            glowY += (mouseY - glowY) * 0.15;

            const glowWidth = cursorGlow.offsetWidth;
            const glowHeight = cursorGlow.offsetHeight;

            cursorGlow.style.transform =
                "translate3d(" +
                (glowX - glowWidth / 2) +
                "px, " +
                (glowY - glowHeight / 2) +
                "px, 0)";

            cursorFrame = window.requestAnimationFrame(
                updateCursor
            );

        }

        document.addEventListener(
            "pointermove",
            function (event) {

                if (event.pointerType === "touch") {
                    return;
                }

                mouseX = event.clientX;
                mouseY = event.clientY;

                if (!cursorVisible) {

                    cursorVisible = true;

                    document.body.classList.add(
                        "cursor-active"
                    );

                }

                if (cursorFrame === null) {

                    glowX = mouseX;
                    glowY = mouseY;

                    updateCursor();

                }

            },
            { passive: true }
        );

        document.addEventListener(
            "pointerleave",
            function () {

                document.body.classList.remove(
                    "cursor-active"
                );

                cursorVisible = false;

            }
        );

        const hoverTargets = document.querySelectorAll(
            "a, button, .tilt-card, input, select, textarea"
        );

        hoverTargets.forEach(function (element) {

            element.addEventListener(
                "pointerenter",
                function () {

                    document.body.classList.add(
                        "cursor-hover"
                    );

                }
            );

            element.addEventListener(
                "pointerleave",
                function () {

                    document.body.classList.remove(
                        "cursor-hover"
                    );

                }
            );

        });

        document.addEventListener(
            "visibilitychange",
            function () {

                if (document.hidden) {

                    if (cursorFrame !== null) {

                        cancelAnimationFrame(
                            cursorFrame
                        );

                        cursorFrame = null;

                    }

                } else if (cursorVisible) {

                    if (cursorFrame === null) {

                        updateCursor();

                    }

                }

            }
        );

    }


    /* ======================================
       03. ANIMATED GOLDEN PARTICLES
    ====================================== */

    const particleCanvas = document.getElementById(
        "particleCanvas"
    );

    if (
        particleCanvas &&
        !reduceMotion
    ) {

        const context = particleCanvas.getContext(
            "2d",
            { alpha: true }
        );

        if (context) {

            let particles = [];

            let canvasWidth = 0;
            let canvasHeight = 0;

            let animationFrame = null;

            let lastFrameTime = 0;

            const particleCount = isMobile ? 22 : 55;

            const frameInterval = isMobile ? 40 : 25;


            /* CREATE PARTICLE */

            function createParticle() {

                return {

                    x: Math.random() * canvasWidth,

                    y: Math.random() * canvasHeight,

                    radius:
                        Math.random() * 1.5 + 0.5,

                    speedX:
                        (Math.random() - 0.5) * 0.35,

                    speedY:
                        -(Math.random() * 0.35 + 0.1),

                    opacity:
                        Math.random() * 0.55 + 0.15,

                    pulse:
                        Math.random() * Math.PI * 2

                };

            }


            /* RESIZE CANVAS */

            function resizeCanvas() {

                const pixelRatio = Math.min(
                    window.devicePixelRatio || 1,
                    2
                );

                canvasWidth = window.innerWidth;
                canvasHeight = window.innerHeight;

                particleCanvas.width = Math.round(
                    canvasWidth * pixelRatio
                );

                particleCanvas.height = Math.round(
                    canvasHeight * pixelRatio
                );

                particleCanvas.style.width =
                    canvasWidth + "px";

                particleCanvas.style.height =
                    canvasHeight + "px";

                context.setTransform(
                    pixelRatio,
                    0,
                    0,
                    pixelRatio,
                    0,
                    0
                );

                particles = [];

                for (
                    let i = 0;
                    i < particleCount;
                    i++
                ) {

                    particles.push(
                        createParticle()
                    );

                }

            }


            /* DRAW PARTICLES */

            function drawParticles(timestamp) {

                animationFrame = null;

                if (
                    timestamp - lastFrameTime <
                    frameInterval
                ) {

                    animationFrame =
                        requestAnimationFrame(
                            drawParticles
                        );

                    return;

                }

                lastFrameTime = timestamp;

                context.clearRect(
                    0,
                    0,
                    canvasWidth,
                    canvasHeight
                );

                particles.forEach(function (particle) {

                    particle.x += particle.speedX;
                    particle.y += particle.speedY;

                    particle.pulse += 0.025;

                    if (particle.y < -10) {

                        particle.y =
                            canvasHeight + 10;

                        particle.x =
                            Math.random() *
                            canvasWidth;

                    }

                    if (particle.x < -10) {

                        particle.x =
                            canvasWidth + 10;

                    }

                    if (
                        particle.x >
                        canvasWidth + 10
                    ) {

                        particle.x = -10;

                    }

                    const pulseOpacity =
                        particle.opacity *
                        (
                            0.75 +
                            Math.sin(
                                particle.pulse
                            ) * 0.25
                        );

                    context.beginPath();

                    context.arc(
                        particle.x,
                        particle.y,
                        particle.radius,
                        0,
                        Math.PI * 2
                    );

                    context.fillStyle =
                        "rgba(244, 199, 107, " +
                        Math.max(
                            0.05,
                            pulseOpacity
                        ) +
                        ")";

                    context.fill();

                });

                animationFrame =
                    requestAnimationFrame(
                        drawParticles
                    );

            }


            /* START PARTICLES */

            function startParticles() {

                if (animationFrame !== null) {
                    return;
                }

                lastFrameTime = 0;

                animationFrame =
                    requestAnimationFrame(
                        drawParticles
                    );

            }


            /* STOP PARTICLES */

            function stopParticles() {

                if (animationFrame !== null) {

                    cancelAnimationFrame(
                        animationFrame
                    );

                    animationFrame = null;

                }

            }


            resizeCanvas();

            startParticles();


            /* RESIZE PERFORMANCE */

            let resizeTimer;

            window.addEventListener(
                "resize",
                function () {

                    clearTimeout(resizeTimer);

                    resizeTimer = setTimeout(
                        resizeCanvas,
                        180
                    );

                },
                { passive: true }
            );


            /* PAUSE WHEN TAB IS HIDDEN */

            document.addEventListener(
                "visibilitychange",
                function () {

                    if (document.hidden) {

                        stopParticles();

                    } else {

                        startParticles();

                    }

                }
            );

        }

    }


    /* ======================================
       04. SCROLL REVEAL ANIMATIONS
    ====================================== */

    const revealElements = document.querySelectorAll(
        ".reveal"
    );

    if (revealElements.length > 0) {

        if (
            reduceMotion ||
            !("IntersectionObserver" in window)
        ) {

            revealElements.forEach(
                function (element) {

                    element.classList.add(
                        "is-visible"
                    );

                }
            );

        } else {

            const revealObserver =
                new IntersectionObserver(

                    function (entries, observer) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target.classList.add(
                                        "is-visible"
                                    );

                                    observer.unobserve(
                                        entry.target
                                    );

                                }

                            }
                        );

                    },

                    {
                        threshold: 0.08,

                        rootMargin:
                            "0px 0px -25px 0px"
                    }

                );

            revealElements.forEach(
                function (element) {

                    revealObserver.observe(
                        element
                    );

                }
            );

            document.body.classList.add(
                "animations-ready"
            );

        }

    }


    /* ======================================
       05. 3D TILT CARDS
    ====================================== */

    if (canUseMouseEffects) {

        const tiltCards = document.querySelectorAll(
            ".tilt-card"
        );

        tiltCards.forEach(function (card) {

            let tiltFrame = null;

            let targetX = 0;
            let targetY = 0;

            let currentX = 0;
            let currentY = 0;

            let hovering = false;


            function animateTilt() {

                currentX += (
                    targetX - currentX
                ) * 0.18;

                currentY += (
                    targetY - currentY
                ) * 0.18;

                card.style.transform =
                    "perspective(1000px) " +
                    "rotateX(" +
                    currentX +
                    "deg) " +
                    "rotateY(" +
                    currentY +
                    "deg)";

                if (
                    hovering ||
                    Math.abs(
                        targetX - currentX
                    ) > 0.05 ||
                    Math.abs(
                        targetY - currentY
                    ) > 0.05
                ) {

                    tiltFrame =
                        requestAnimationFrame(
                            animateTilt
                        );

                } else {

                    tiltFrame = null;

                    card.style.transform = "";

                }

            }


            function startTilt() {

                if (tiltFrame === null) {

                    tiltFrame =
                        requestAnimationFrame(
                            animateTilt
                        );

                }

            }


            card.addEventListener(
                "pointerenter",
                function () {

                    hovering = true;

                    startTilt();

                }
            );


            card.addEventListener(
                "pointermove",
                function (event) {

                    const rect =
                        card.getBoundingClientRect();

                    const centerX =
                        rect.left +
                        rect.width / 2;

                    const centerY =
                        rect.top +
                        rect.height / 2;

                    const x =
                        (
                            event.clientX -
                            centerX
                        ) /
                        (rect.width / 2);

                    const y =
                        (
                            event.clientY -
                            centerY
                        ) /
                        (rect.height / 2);

                    targetY = x * 6;
                    targetX = -y * 6;

                    const mouseX =
                        (
                            (
                                event.clientX -
                                rect.left
                            ) /
                            rect.width
                        ) * 100;

                    const mouseY =
                        (
                            (
                                event.clientY -
                                rect.top
                            ) /
                            rect.height
                        ) * 100;

                    card.style.setProperty(
                        "--mouse-x",
                        mouseX + "%"
                    );

                    card.style.setProperty(
                        "--mouse-y",
                        mouseY + "%"
                    );

                    startTilt();

                },
                { passive: true }
            );


            card.addEventListener(
                "pointerleave",
                function () {

                    hovering = false;

                    targetX = 0;
                    targetY = 0;

                    startTilt();

                }
            );

        });

    }


    /* ======================================
       06. MAGNETIC BUTTONS
    ====================================== */

    if (canUseMouseEffects) {

        const magneticButtons =
            document.querySelectorAll(
                ".magnetic-button"
            );

        magneticButtons.forEach(
            function (button) {

                button.addEventListener(
                    "pointermove",
                    function (event) {

                        const rect =
                            button.getBoundingClientRect();

                        const centerX =
                            rect.left +
                            rect.width / 2;

                        const centerY =
                            rect.top +
                            rect.height / 2;

                        const moveX =
                            (
                                event.clientX -
                                centerX
                            ) * 0.13;

                        const moveY =
                            (
                                event.clientY -
                                centerY
                            ) * 0.13;

                        button.style.transform =
                            "translate3d(" +
                            moveX +
                            "px, " +
                            moveY +
                            "px, 0)";

                    },
                    { passive: true }
                );

                button.addEventListener(
                    "pointerleave",
                    function () {

                        button.style.transform = "";

                    }
                );

            }
        );

    }


    /* ======================================
       07. MOBILE NAVIGATION
    ====================================== */

    const menuButton = document.querySelector(
        ".menu-toggle"
    );

    const navLinks = document.querySelector(
        ".nav-links"
    );

    if (menuButton && navLinks) {

        function closeMenu() {

            navLinks.classList.remove(
                "open"
            );

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            menuButton.textContent = "☰";

        }


        menuButton.addEventListener(
            "click",
            function () {

                const isOpen =
                    navLinks.classList.toggle(
                        "open"
                    );

                menuButton.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

                menuButton.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Close navigation menu"
                        : "Open navigation menu"
                );

                menuButton.textContent =
                    isOpen ? "✕" : "☰";

            }
        );


        document.querySelectorAll(
            ".nav-links a"
        ).forEach(function (link) {

            link.addEventListener(
                "click",
                closeMenu
            );

        });


        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Escape") {

                    closeMenu();

                }

            }
        );


        document.addEventListener(
            "click",
            function (event) {

                if (
                    navLinks.classList.contains(
                        "open"
                    ) &&
                    !navLinks.contains(
                        event.target
                    ) &&
                    !menuButton.contains(
                        event.target
                    )
                ) {

                    closeMenu();

                }

            }
        );


        window.addEventListener(
            "resize",
            function () {

                if (window.innerWidth > 760) {

                    closeMenu();

                }

            },
            { passive: true }
        );

    }


    /* ======================================
       08. BACK TO TOP BUTTON
    ====================================== */

    const backToTop = document.getElementById(
        "backToTop"
    );

    if (backToTop) {

        let scrollTicking = false;

        function updateBackToTop() {

            if (window.scrollY > 450) {

                backToTop.classList.add(
                    "is-visible"
                );

            } else {

                backToTop.classList.remove(
                    "is-visible"
                );

            }

            scrollTicking = false;

        }

        window.addEventListener(
            "scroll",
            function () {

                if (!scrollTicking) {

                    requestAnimationFrame(
                        updateBackToTop
                    );

                    scrollTicking = true;

                }

            },
            { passive: true }
        );

        updateBackToTop();

    }


    /* ======================================
       09. AUTOMATIC COPYRIGHT YEAR
    ====================================== */

    const currentYear = document.getElementById(
        "currentYear"
    );

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* ======================================
       10. WHATSAPP CONTACT FORM
    ====================================== */

    const contactForm = document.getElementById(
        "contactForm"
    );

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                /* CUSTOMER NAME */

                const name = document
                    .getElementById("clientName")
                    .value
                    .trim();


                /* BUSINESS NAME */

                const business = document
                    .getElementById("businessName")
                    .value
                    .trim();


                /* WEBSITE TYPE */

                const websiteType = document
                    .getElementById("websiteType")
                    .value;


                /* PROJECT DETAILS */

                const details = document
                    .getElementById("projectDetails")
                    .value
                    .trim();


                /* VALIDATION */

                if (
                    !name ||
                    !business ||
                    !details
                ) {

                    alert(
                        "Please fill all required fields."
                    );

                    return;

                }


                /* CREATE MESSAGE */

                const message = [

                    "Hello Chhirush Web Developer!",

                    "",

                    "I want to develop a website.",

                    "",

                    "Name: " + name,

                    "Business: " + business,

                    "Website Type: " + websiteType,

                    "Requirements: " + details,

                    "",

                    "Please share the next steps."

                ].join("\n");


                /* BUSINESS WHATSAPP NUMBER */

                const whatsappNumber =
                    "919116102041";


                /* CREATE WHATSAPP URL */

                const whatsappURL =

                    "https://wa.me/" +

                    whatsappNumber +

                    "?text=" +

                    encodeURIComponent(
                        message
                    );


                /* OPEN WHATSAPP */

                window.location.href =
                    whatsappURL;

            }
        );

    }


    /* ======================================
       11. PAGE VISIBILITY OPTIMIZATION
    ====================================== */

    document.addEventListener(
        "visibilitychange",
        function () {

            if (document.hidden) {

                document.body.classList.remove(
                    "cursor-active"
                );

            }

        }
    );


    /* ======================================
       12. INITIALIZATION COMPLETE
    ====================================== */

    console.log(
        "CHHIRUSH WEB DEVELOPER"
    );

    console.log(
        "Ultra Smooth Animated Edition Loaded"
    );

});

/* ==========================================
   END OF COMPLETE SCRIPT.JS
========================================== */

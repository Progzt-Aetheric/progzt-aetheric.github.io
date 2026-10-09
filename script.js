/* =========================================================
   PROGZT AETHERIC
   Website Interactions
========================================================= */

const translations = {
    ar: {
        navHome: "الرئيسية", navAbout: "عن الشركة", navSectors: "القطاعات", navCompanies: "الشركات", navTimeline: "المسيرة", navFounder: "المؤسس",
        mainNav: "التنقل الرئيسي", footerNav: "التنقل في التذييل", socialLinks: "روابط التواصل", languageToggleAria: "التبديل إلى الإنجليزية", openSearch: "فتح البحث والأوامر", openMenu: "فتح القائمة",
        searchTitle: "البحث في الموقع", closeSearch: "إغلاق البحث", searchLabel: "ابحث عن قسم", searchPlaceholder: "ابحث عن قسم...", sectionsLabel: "أقسام الموقع", searchEmpty: "لا توجد أقسام مطابقة.",
        heroTitleLead: "نبني البرمجيات.", heroTitleAccent: "نطوّر المستقبل.", heroDescription: "Progzt Aetheric هي مؤسسة للذكاء الاصطناعي وهندسة البرمجيات (AI Enterprise)، متخصصة في الأنظمة الذكية على الويب، وبُنى الوكلاء المخصصة، ومشروع Monster AI.", heroPrimary: "اكتشف Progzt Aetheric", heroSecondary: "قطاعات التطوير",
        aboutLabel: "01 — عن الشركة", aboutTitleLead: "شركة تطوير", aboutTitleAccent: "متعددة القطاعات.", aboutBodyOne: "Progzt Aetheric هي شركة برمجيات وذكاء اصطناعي متعددة القطاعات، تطور المواقع والألعاب والتطبيقات والأنظمة وتجارب المستخدم.", aboutBodyTwo: "نعمل على بناء منتجات رقمية عملية وأنظمة ذكية، من الفكرة والهندسة إلى تجربة الاستخدام.",
        statSectors: "قطاعًا", statCompanies: "شركة تابعة", statPeople: "شخصًا ضمن المنظومة", statFounded: "عام التأسيس",
        developmentLabel: "02 — مجالات التطوير", developmentTitleLead: "مجالات", developmentTitleAccent: "التطوير", sectorWebTitle: "تطوير المواقع", sectorWebDescription: "تطوير وبناء المواقع والمنتجات الرقمية.", sectorGamesTitle: "تطوير الألعاب", sectorGamesDescription: "تطوير الألعاب والمشروعات الترفيهية الرقمية.", sectorAppsTitle: "التطبيقات", sectorAppsDescription: "إنشاء التطبيقات والمنتجات البرمجية.", sectorSystemsTitle: "الأنظمة", sectorSystemsDescription: "تطوير الأنظمة والحلول البرمجية.", sectorDesignTitle: "تصميم الواجهات", sectorDesignDescription: "إنشاء وتصميم واجهات المستخدم والتجارب الرقمية.",
        companiesLabel: "03 — المنظومة", ecosystemTitleLead: "منظومة", companiesDescription: "شركات وقطاعات متخصصة تعمل ضمن منظومة Progzt Aetheric.", unitedDescription: "الكيان الذي تطورت من خلاله منظومة الشركات والقطاعات متعددة الخدمات.", intelligenceDescription: "قطاع متخصص في الذكاء الاصطناعي والتقنيات البرمجية.", tsdDescription: "قطاع تقني بدأ كفريق داخل Progzt Intelligence.", studiosDescription: "قطاع ضمن Progzt United لتطوير المشروعات الرقمية.", legendDescription: "شركة ضمن المنظومة تعمل في الألعاب والتطبيقات والتصميم.", zoroDescription: "شركة ضمن المنظومة تعمل في الألعاب والتطبيقات والتصميم.",
        brandLabel: "Progzt Aetheric", ownershipTitleLead: "علامات وحقوق", ownershipTitleAccent: "ضمن المنظومة", trademarkLabel: "علامة تجارية", organizationSectorLabel: "قطاع ضمن المنظومة",
        historyLabel: "04 — المسيرة", historyTitleLead: "مسيرة", historyTitleAccent: "التطور", timeline2017: "تأسيس Progzt United وبدء نشاطها في تطوير الألعاب الإلكترونية.", timeline2020: "تأسيس Progzt Intelligence وإطلاق مشروع Progzt AI لاحقًا.", timeline2022: "تأسيس Progzt TSD بعد أن بدأ كفريق داخل Progzt Intelligence.", timelineGrowthTitle: "توسع المنظومة", timeline2023: "توسع نشاط Progzt United وازدياد فرق العمل ضمن المنظومة.", timelineExpansionTitle: "شراكة NVB والتوسع", timeline2024: "توسع الأعمال عبر شراكة NVB وإطلاق قطاعات وشركات جديدة.", timeline2025: "إدراج Progzt United كشركة قانونية ناشئة وتأسيس Progzt Studios.", timeline2026: "تغيير اسم الشركة إلى Progzt Aetheric.",
        founderLabel: "05 — المؤسس", founderRole: "المؤسس والمطور الرئيسي", founderFirstName: "محمد السيد", founderLastName: "عتمان", founderBioOne: "محمد السيد عتمان (Mohamed Elsayed Otman) هو مؤسس Progzt Aetheric والمطور الرئيسي. بدأت مسيرته في تصميم واجهات البرمجيات عبر الإنترنت تحت اسم Progzt عام 2016.", founderBioTwo: "في عام 2017 أسس Progzt United، التي بدأت بتطوير الألعاب الإلكترونية ثم توسعت إلى قطاعات وشركات متعددة.", founderBioThree: "في عام 2020 أسس Progzt Intelligence وأطلق مشروع Progzt AI، ثم أسس Progzt TSD عام 2022.", founderBioFour: "في عام 2024 توسعت أعماله عبر شراكة NVB وتأسيس قطاعات وشركات جديدة في التقنية والألعاب والتصميم.", founderBioFive: "في عام 2025 أُدرجت Progzt United كشركة قانونية ناشئة، وفي عام 2026 أصبحت Progzt Aetheric.", founderQuote: "العلم ليس بالصغر",
        closingTagline: "البرمجيات • الذكاء الاصطناعي • الأنظمة الرقمية", backToTop: "العودة إلى الأعلى", footerTagline: "الذكاء الاصطناعي • البرمجيات • الأنظمة الرقمية"
    },
    en: {
        navHome: "Home", navAbout: "About", navSectors: "Sectors", navCompanies: "Companies", navTimeline: "Journey", navFounder: "Founder",
        mainNav: "Main navigation", footerNav: "Footer navigation", socialLinks: "Social links", languageToggleAria: "Switch to Arabic", openSearch: "Open search and commands", openMenu: "Open menu",
        searchTitle: "Search the site", closeSearch: "Close search", searchLabel: "Search sections", searchPlaceholder: "Search sections...", sectionsLabel: "Site sections", searchEmpty: "No matching sections.",
        heroTitleLead: "We build software.", heroTitleAccent: "We shape what’s next.", heroDescription: "Progzt Aetheric is an AI and software engineering enterprise focused on intelligent web systems, custom agent architectures, and Monster AI.", heroPrimary: "Discover Progzt Aetheric", heroSecondary: "Explore our work",
        aboutLabel: "01 — ABOUT", aboutTitleLead: "An engineering", aboutTitleAccent: "organization across disciplines.", aboutBodyOne: "Progzt Aetheric is a software and AI organization spanning web, games, applications, systems, and digital experiences.", aboutBodyTwo: "We build useful digital products and intelligent systems, from engineering foundations to the details of the user experience.",
        statSectors: "sectors", statCompanies: "companies", statPeople: "people in the ecosystem", statFounded: "founded",
        developmentLabel: "02 — CAPABILITIES", developmentTitleLead: "What we", developmentTitleAccent: "build", sectorWebTitle: "Web engineering", sectorWebDescription: "Websites and digital products, built for real use.", sectorGamesTitle: "Game development", sectorGamesDescription: "Games and interactive digital experiences.", sectorAppsTitle: "Applications", sectorAppsDescription: "Applications and software products.", sectorSystemsTitle: "Systems", sectorSystemsDescription: "Software systems and purpose-built solutions.", sectorDesignTitle: "Interface design", sectorDesignDescription: "User interfaces and thoughtful digital experiences.",
        companiesLabel: "03 — ECOSYSTEM", ecosystemTitleLead: "A connected", companiesDescription: "Specialized companies and teams working across the Progzt Aetheric ecosystem.", unitedDescription: "The organization through which the multi-sector company ecosystem developed.", intelligenceDescription: "A team focused on artificial intelligence and software technology.", tsdDescription: "A technology unit that began as a team within Progzt Intelligence.", studiosDescription: "A Progzt United team developing digital projects.", legendDescription: "A company in the ecosystem working across games, apps, and design.", zoroDescription: "A company in the ecosystem working across games, apps, and design.",
        brandLabel: "PROGZT AETHERIC", ownershipTitleLead: "Brands and rights", ownershipTitleAccent: "across the ecosystem", trademarkLabel: "Trademark", organizationSectorLabel: "Ecosystem unit",
        historyLabel: "04 — JOURNEY", historyTitleLead: "A decade of", historyTitleAccent: "building", timeline2017: "Progzt United was founded and began developing online games.", timeline2020: "Progzt Intelligence was founded, followed by the Progzt AI project.", timeline2022: "Progzt TSD was established after starting as a team within Progzt Intelligence.", timelineGrowthTitle: "A growing ecosystem", timeline2023: "Progzt United expanded its work and teams across the ecosystem.", timelineExpansionTitle: "NVB partnership and expansion", timeline2024: "The organization expanded through the NVB partnership and new ventures.", timeline2025: "Progzt United was registered as a startup, and Progzt Studios was established.", timeline2026: "The company became Progzt Aetheric.",
        founderLabel: "05 — FOUNDER", founderRole: "Founder & Lead Developer", founderFirstName: "Mohamed Elsayed", founderLastName: "Otman", founderBioOne: "Mohamed Elsayed Otman is the founder and lead developer of Progzt Aetheric. His journey began in online software interface design under the Progzt name in 2016.", founderBioTwo: "In 2017, he founded Progzt United, which began with online game development and grew into a multi-sector ecosystem.", founderBioThree: "He founded Progzt Intelligence in 2020 and launched Progzt AI, then established Progzt TSD in 2022.", founderBioFour: "In 2024, his work expanded through the NVB partnership and new technology, gaming, and design ventures.", founderBioFive: "Progzt United was registered as a startup in 2025 and became Progzt Aetheric in 2026.", founderQuote: "Knowledge has no age",
        closingTagline: "Software • Artificial intelligence • Digital systems", backToTop: "Back to top", footerTagline: "AI • SOFTWARE • DIGITAL SYSTEMS"
    }
};

const translationToggle = document.querySelector("[data-language-toggle]");

function setLanguage(language) {

    const selectedLanguage = language === "en" ? "en" : "ar";
    const dictionary = translations[selectedLanguage];

    document.documentElement.lang = selectedLanguage;
    document.documentElement.dir = selectedLanguage === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const translation = dictionary[element.dataset.i18n];
        if (translation !== undefined) element.textContent = translation;
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(element => {
        const translation = dictionary[element.dataset.i18nAria];
        if (translation !== undefined) element.setAttribute("aria-label", translation);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
        const translation = dictionary[element.dataset.i18nPlaceholder];
        if (translation !== undefined) element.setAttribute("placeholder", translation);
    });

    if (translationToggle) {
        translationToggle.textContent = selectedLanguage === "ar" ? "EN" : "AR";
        translationToggle.setAttribute("aria-pressed", String(selectedLanguage === "en"));
    }

    const searchField = document.getElementById("commandSearch");
    if (searchField) searchField.value = "";
    document.querySelectorAll(".command-result").forEach(result => {
        result.hidden = false;
    });

    const emptySearchMessage = document.getElementById("commandEmpty");
    if (emptySearchMessage) emptySearchMessage.hidden = true;

    try {
        localStorage.setItem("progzt-language", selectedLanguage);
    } catch {
        // The language toggle remains usable when storage is unavailable.
    }
}

if (translationToggle) {
    translationToggle.addEventListener("click", () => {
        setLanguage(document.documentElement.lang === "ar" ? "en" : "ar");
    });

    let savedLanguage = "ar";
    try {
        savedLanguage = localStorage.getItem("progzt-language") || "ar";
    } catch {
        savedLanguage = "ar";
    }
    setLanguage(savedLanguage);
}


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
   THREE.JS HERO SCENE
========================================================= */

const heroCanvas = document.getElementById("hero-3d-canvas");
const heroSection = heroCanvas?.closest(".hero");

if (heroCanvas && heroSection && window.THREE) {

    const THREE = window.THREE;
    const isMobileViewport = window.matchMedia("(max-width: 767px)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    const pointer = new THREE.Vector2(0, 0);
    const targetRotation = new THREE.Vector2(0, 0);
    const structure = new THREE.Group();

    let renderer;
    let animationFrame = 0;
    let heroIsVisible = true;
    let previousFrameTime = 0;

    camera.position.z = 8;
    structure.position.set(1.6, 0.05, 0);
    scene.add(structure);

    try {
        renderer = new THREE.WebGLRenderer({
            canvas: heroCanvas,
            alpha: true,
            antialias: false,
            powerPreference: "low-power"
        });
    } catch (error) {
        console.warn("Three.js hero background is unavailable.", error);
    }

    if (renderer) {

        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(Math.min(
            window.devicePixelRatio || 1,
            isMobileViewport.matches ? 1 : 1.5
        ));

        const shape = new THREE.IcosahedronGeometry(1.75, 2);
        const wireframe = new THREE.LineSegments(
            new THREE.EdgesGeometry(shape),
            new THREE.LineBasicMaterial({
                color: 0x35d8ff,
                transparent: true,
                opacity: 0.78
            })
        );
        const orbit = new THREE.Mesh(
            new THREE.TorusGeometry(2.15, 0.008, 4, 96),
            new THREE.MeshBasicMaterial({
                color: 0x147eff,
                transparent: true,
                opacity: 0.48
            })
        );

        orbit.rotation.set(0.9, 0.3, 0.2);
        structure.add(wireframe, orbit);

        const particleCount = isMobileViewport.matches ? 110 : 320;
        const particlePositions = new Float32Array(particleCount * 3);

        for (let index = 0; index < particleCount; index += 1) {
            particlePositions[index * 3] = (Math.random() - 0.5) * 11;
            particlePositions[index * 3 + 1] = (Math.random() - 0.5) * 6.5;
            particlePositions[index * 3 + 2] = (Math.random() - 0.5) * 5;
        }

        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(particlePositions, 3)
        );

        const particleField = new THREE.Points(
            particleGeometry,
            new THREE.PointsMaterial({
                color: 0x52cfff,
                size: isMobileViewport.matches ? 0.035 : 0.04,
                transparent: true,
                opacity: 0.62,
                sizeAttenuation: true,
                depthWrite: false
            })
        );

        scene.add(particleField);

        function resizeHeroScene() {

            const bounds = heroSection.getBoundingClientRect();

            if (!bounds.width || !bounds.height) return;

            renderer.setPixelRatio(Math.min(
                window.devicePixelRatio || 1,
                isMobileViewport.matches ? 1 : 1.5
            ));
            renderer.setSize(bounds.width, bounds.height, false);
            camera.aspect = bounds.width / bounds.height;
            camera.updateProjectionMatrix();
            structure.position.x = isMobileViewport.matches ? 0.7 : 1.6;
            structure.position.y = isMobileViewport.matches ? 0.85 : 0.05;
            structure.scale.setScalar(isMobileViewport.matches ? 0.72 : 1);
            particleField.geometry.setDrawRange(
                0,
                isMobileViewport.matches ? 110 : 320
            );
            particleField.material.size = isMobileViewport.matches ? 0.035 : 0.04;
        }

        function updatePointer(event) {

            const bounds = heroSection.getBoundingClientRect();

            pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
            pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
            targetRotation.y = pointer.x * 0.28;
            targetRotation.x = pointer.y * 0.18;
        }

        function renderScene(timestamp) {

            animationFrame = 0;

            if (!heroIsVisible || document.hidden) return;

            if (timestamp - previousFrameTime < 1000 / 60 - 1) {
                animationFrame = requestAnimationFrame(renderScene);
                return;
            }

            const frameScale = previousFrameTime
                ? Math.min((timestamp - previousFrameTime) / (1000 / 60), 2)
                : 1;

            previousFrameTime = timestamp;
            structure.rotation.y += (targetRotation.y - structure.rotation.y) * 0.035 * frameScale;
            structure.rotation.x += (targetRotation.x - structure.rotation.x) * 0.035 * frameScale;
            structure.rotation.z += 0.0015 * frameScale;
            particleField.rotation.y += 0.00035 * frameScale;
            particleField.rotation.x += 0.00012 * frameScale;

            renderer.render(scene, camera);
            animationFrame = requestAnimationFrame(renderScene);
        }

        function updateAnimationState() {

            if (reduceMotion.matches) {
                renderer.render(scene, camera);
                return;
            }

            if (heroIsVisible && !document.hidden && !animationFrame) {
                previousFrameTime = 0;
                animationFrame = requestAnimationFrame(renderScene);
            } else if ((!heroIsVisible || document.hidden) && animationFrame) {
                cancelAnimationFrame(animationFrame);
                animationFrame = 0;
            }

        }

        resizeHeroScene();
        window.addEventListener("resize", resizeHeroScene, { passive: true });
        heroSection.addEventListener("pointermove", updatePointer, { passive: true });
        heroSection.addEventListener("pointerdown", updatePointer, { passive: true });
        document.addEventListener("visibilitychange", updateAnimationState);

        if ("IntersectionObserver" in window) {
            const heroObserver = new IntersectionObserver(entries => {
                heroIsVisible = entries[0].isIntersecting;
                updateAnimationState();
            });

            heroObserver.observe(heroSection);
        }

        updateAnimationState();
    }
}


/* =========================================================
   AETHERIC BOT INTRO
========================================================= */

const aethericBot = document.getElementById("aethericBot");
const aethericBotGreeting = document.getElementById("aethericBotGreeting");

if (aethericBot && aethericBotGreeting) {

    const reducedMotionPreference = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );
    let introStarted = false;

    function updateBotGreeting() {

        const isArabic = document.documentElement.lang
            .toLowerCase()
            .startsWith("ar");

        aethericBotGreeting.textContent = isArabic
            ? "النظام متصل. أهلًا بك، سيدي."
            : "System Online. Welcome, Sir.";

    }

    function startBotIntro() {

        if (introStarted) return;
        introStarted = true;
        updateBotGreeting();

        if (reducedMotionPreference.matches) {
            aethericBot.classList.add("is-visible", "is-greeting");

            window.setTimeout(() => {
                aethericBot.classList.remove("is-greeting");
            }, 2800);

            return;
        }

        aethericBot.addEventListener("animationend", event => {

            if (event.target !== aethericBot) return;

            if (event.animationName === "aetheric-bot-entry") {
                aethericBot.classList.remove("is-entering");
                aethericBot.classList.add("is-arrived", "is-waving", "is-greeting");

                window.setTimeout(() => {
                    aethericBot.classList.remove("is-arrived", "is-waving", "is-greeting");
                    aethericBot.classList.add("is-settling");
                }, 2300);
            }

            if (event.animationName === "aetheric-bot-settle") {
                aethericBot.classList.remove("is-settling");
                aethericBot.classList.add("is-idle");
            }

        });

        window.requestAnimationFrame(() => {
            aethericBot.classList.add("is-entering");
        });

    }

    const languageObserver = new MutationObserver(updateBotGreeting);
    languageObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["lang"]
    });

    if (document.readyState === "complete") {
        startBotIntro();
    } else {
        window.addEventListener("load", startBotIntro, { once: true });
    }
}

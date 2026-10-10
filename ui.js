(() => {
    const page = document.body;
    const languageButtons = document.querySelectorAll("[data-language-toggle]");
    const translations = document.querySelectorAll("[data-ar][data-en]");
    const labels = document.querySelectorAll("[data-ar-label][data-en-label]");
    const placeholders = document.querySelectorAll("[data-placeholder-ar][data-placeholder-en]");

    function setLanguage(language, persist = true) {
        const activeLanguage = language === "en" ? "en" : "ar";
        const isEnglish = activeLanguage === "en";

        document.documentElement.lang = activeLanguage;
        document.documentElement.dir = isEnglish ? "ltr" : "rtl";

        translations.forEach(element => {
            element.textContent = element.dataset[activeLanguage];
        });

        labels.forEach(element => {
            element.setAttribute("aria-label", element.dataset[`${activeLanguage}Label`]);
        });

        placeholders.forEach(element => {
            element.setAttribute("placeholder", element.dataset[`placeholder${isEnglish ? "En" : "Ar"}`]);
        });

        const title = page.dataset[`title${isEnglish ? "En" : "Ar"}`];
        if (title) {
            document.title = title;
        }

        const description = page.dataset[`description${isEnglish ? "En" : "Ar"}`];
        const descriptionMeta = document.querySelector('meta[name="description"]');
        if (description && descriptionMeta) {
            descriptionMeta.content = description;
        }

        languageButtons.forEach(button => {
            button.textContent = isEnglish ? "AR" : "EN";
            button.setAttribute("aria-label", isEnglish ? "Switch to Arabic" : "Switch to English");
        });

        if (persist) {
            try {
                localStorage.setItem("progzt-language", activeLanguage);
            } catch {
                // Language switching still works when storage is unavailable.
            }
        }
    }

    let savedLanguage = document.documentElement.lang;
    try {
        savedLanguage = localStorage.getItem("progzt-language") || savedLanguage;
    } catch {
        // Use the document's default language when storage is unavailable.
    }

    setLanguage(savedLanguage, false);

    languageButtons.forEach(button => {
        button.addEventListener("click", () => {
            setLanguage(document.documentElement.lang === "ar" ? "en" : "ar");
        });
    });
})();
(() => {
    const widget = document.querySelector("[data-assistant-widget]");
    const panel = document.querySelector("#assistantPanel");
    const form = document.querySelector("[data-assistant-form]");
    const input = form?.querySelector("textarea");
    const messagesElement = document.querySelector("[data-assistant-messages]");
    const status = document.querySelector("[data-assistant-status]");
    const submitButton = form?.querySelector("button[type='submit']");
    const toggles = document.querySelectorAll("[data-assistant-toggle]");
    const closeButton = document.querySelector("[data-assistant-close]");

    if (!widget || !panel || !form || !input || !messagesElement || !status) {
        return;
    }

    const endpoint = window.AETHERIC_ASSISTANT_ENDPOINT;
    const history = [];
    const text = (arabic, english) => document.documentElement.lang === "en" ? english : arabic;
    const routes = {
        home: "./index.html",
        about: "./about.html",
        founder: "./founder.html",
        search: "./search.html",
        contact: "./contact.html"
    };
    const routeLabels = {
        home: text("الرئيسية", "home page"),
        about: text("عنّا", "about page"),
        founder: text("المؤسس", "founder page"),
        search: text("البحث", "search page"),
        contact: text("التواصل", "contact page")
    };

    function setOpen(open) {
        panel.setAttribute("aria-hidden", String(!open));
        toggles.forEach(button => button.setAttribute("aria-expanded", String(open)));
        if (open) {
            if (!messagesElement.childElementCount) {
                addMessage(text(
                    "مرحبًا، أنا Aetheric Intelligence System. اسألني عن المنظومة أو اطلب الانتقال إلى إحدى صفحاتها.",
                    "Hello, I’m the Aetheric Intelligence System. Ask about the organization or request one of its pages."
                ), "assistant");
            }
            input.focus();
        }
    }

    function appendInline(parent, source) {
        const tokenPattern = /\[([^\]]+)\]\((https:\/\/[^\s)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
        let cursor = 0;
        let match;

        while ((match = tokenPattern.exec(source))) {
            parent.append(document.createTextNode(source.slice(cursor, match.index)));
            if (match[1]) {
                const link = document.createElement("a");
                link.href = match[2];
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                link.textContent = match[1];
                parent.append(link);
            } else if (match[3]) {
                const code = document.createElement("code");
                code.textContent = match[3];
                parent.append(code);
            } else if (match[4] || match[5]) {
                const emphasis = document.createElement(match[4] ? "strong" : "em");
                emphasis.textContent = match[4] || match[5];
                parent.append(emphasis);
            }
            cursor = tokenPattern.lastIndex;
        }

        parent.append(document.createTextNode(source.slice(cursor)));
    }

    function renderCodeBlock(container, source, language) {
        const block = document.createElement("div");
        block.className = "assistant-code-block";
        const toolbar = document.createElement("div");
        toolbar.className = "assistant-code-toolbar";
        const languageLabel = document.createElement("span");
        languageLabel.textContent = language || "code";
        const copyButton = document.createElement("button");
        copyButton.type = "button";
        copyButton.className = "assistant-copy-code";
        copyButton.textContent = text("نسخ الكود", "Copy code");
        const pre = document.createElement("pre");
        const code = document.createElement("code");
        const normalizedLanguage = language.toLowerCase().replace(/[^a-z0-9_+-]/g, "");

        if (window.hljs && normalizedLanguage && window.hljs.getLanguage(normalizedLanguage)) {
            code.className = `language-${normalizedLanguage} hljs`;
            code.innerHTML = window.hljs.highlight(source, { language: normalizedLanguage }).value;
        } else if (window.hljs) {
            code.className = "hljs";
            code.innerHTML = window.hljs.highlightAuto(source).value;
        } else {
            code.textContent = source;
        }

        copyButton.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(source);
                copyButton.textContent = text("تم النسخ", "Copied");
            } catch {
                copyButton.textContent = text("تعذر النسخ", "Copy failed");
            }
        });

        toolbar.append(languageLabel, copyButton);
        pre.append(code);
        block.append(toolbar, pre);
        container.append(block);
    }

    function renderMarkdown(container, source) {
        const lines = source.replace(/\r\n/g, "\n").split("\n");
        let paragraph = [];
        let list = null;
        let index = 0;

        function flushParagraph() {
            if (paragraph.length) {
                const element = document.createElement("p");
                appendInline(element, paragraph.join(" "));
                container.append(element);
                paragraph = [];
            }
        }

        function flushList() {
            if (list) {
                container.append(list);
                list = null;
            }
        }

        while (index < lines.length) {
            const line = lines[index];
            const fence = line.match(/^```\s*([\w.+-]*)\s*$/);

            if (fence) {
                flushParagraph();
                flushList();
                const codeLines = [];
                index += 1;
                while (index < lines.length && !/^```\s*$/.test(lines[index])) {
                    codeLines.push(lines[index]);
                    index += 1;
                }
                renderCodeBlock(container, codeLines.join("\n"), fence[1] || "text");
            } else if (!line.trim()) {
                flushParagraph();
                flushList();
            } else if (/^#{1,3}\s/.test(line)) {
                flushParagraph();
                flushList();
                const heading = document.createElement("h3");
                appendInline(heading, line.replace(/^#{1,3}\s+/, ""));
                container.append(heading);
            } else if (/^\s*[-*]\s+/.test(line)) {
                flushParagraph();
                if (!list) {
                    list = document.createElement("ul");
                }
                const item = document.createElement("li");
                appendInline(item, line.replace(/^\s*[-*]\s+/, ""));
                list.append(item);
            } else if (/^>\s?/.test(line)) {
                flushParagraph();
                flushList();
                const quote = document.createElement("blockquote");
                appendInline(quote, line.replace(/^>\s?/, ""));
                container.append(quote);
            } else {
                flushList();
                paragraph.push(line.trim());
            }
            index += 1;
        }

        flushParagraph();
        flushList();
    }

    function addMessage(content, role) {
        const message = document.createElement("article");
        message.className = "assistant-message";
        message.dataset.role = role;
        if (role === "assistant") {
            renderMarkdown(message, content);
        } else {
            const paragraph = document.createElement("p");
            paragraph.textContent = content;
            message.append(paragraph);
        }
        messagesElement.append(message);
        messagesElement.scrollTop = messagesElement.scrollHeight;
    }

    function findRequestedRoute(value) {
        const normalized = value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const destinations = [
            ["contact", /\b(contact|contact us|contact page)\b|تواصل(?:\s+معنا)?|صفحة\s+التواصل/],
            ["founder", /\b(founder|founder page)\b|المؤسس|صفحة\s+المؤسس/],
            ["about", /\b(about|about us|about page)\b|عن(?:\s+نا)?|من\s+نحن/],
            ["search", /\b(search|search page)\b|بحث|ابحث/],
            ["home", /\b(home|home page|homepage)\b|الرئيسية|الصفحة\s+الرئيسية/]
        ];
        const destination = destinations.find(([, pattern]) => pattern.test(normalized));
        if (!destination) {
            return null;
        }

        const asksToNavigate = /\b(go|take me|navigate|open|visit|show me)\b|اذهب|روح|وديني|خذني|افتح|انتقل|أبغى|ابغى|اريد|عايز|وريني/.test(normalized);
        const asksToSearch = destination[0] === "search" && /ابحث|أبقى أبحث|ابغى ابحث|أبغى أبحث|اريد ان ابحث|عايز ابحث/.test(normalized);
        const asksToContact = destination[0] === "contact" && /تواصل\s+معنا/.test(normalized);
        return asksToNavigate || asksToSearch || asksToContact ? destination[0] : null;
    }

    async function submitQuestion(event) {
        event.preventDefault();
        const question = input.value.trim();
        if (!question) {
            return;
        }

        addMessage(question, "user");
        input.value = "";
        status.textContent = "";

        const destination = findRequestedRoute(question);
        if (destination) {
            addMessage(text(`جارٍ فتح صفحة ${routeLabels[destination]}...`, `Opening the ${routeLabels[destination]}...`), "assistant");
            window.location.assign(routes[destination]);
            return;
        }

        if (!endpoint) {
            status.textContent = text("المساعد غير مهيأ بعد. أضف عنوان Cloudflare Worker في إعدادات المساعد.", "The assistant is not configured yet. Add the Cloudflare Worker URL to the assistant configuration.");
            return;
        }

        history.push({ role: "user", content: question });
        submitButton.disabled = true;
        status.textContent = text("جارٍ التفكير...", "Thinking...");

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: history.slice(-12) })
            });
            const payload = await response.json();
            if (!response.ok) {
                throw new Error(payload.error || "Assistant request failed");
            }

            const reply = String(payload.reply || "");
            const navigation = reply.match(/\[\[navigate:(home|about|founder|search|contact)\]\]/i);
            const cleanReply = reply.replace(/\s*\[\[navigate:(?:home|about|founder|search|contact)\]\]\s*/ig, "").trim();
            if (cleanReply) {
                addMessage(cleanReply, "assistant");
                history.push({ role: "assistant", content: cleanReply });
            }
            if (navigation) {
                window.location.assign(routes[navigation[1].toLowerCase()]);
                return;
            }
            status.textContent = "";
        } catch {
            history.pop();
            status.textContent = text("تعذر الاتصال بالمساعد الآن. حاول مرة أخرى بعد قليل.", "The assistant is unavailable right now. Please try again shortly.");
        } finally {
            submitButton.disabled = false;
        }
    }

    toggles.forEach(button => button.addEventListener("click", () => {
        setOpen(panel.getAttribute("aria-hidden") === "true");
    }));
    closeButton?.addEventListener("click", () => setOpen(false));
    form.addEventListener("submit", submitQuestion);
    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && panel.getAttribute("aria-hidden") === "false") {
            setOpen(false);
        }
    });
})();
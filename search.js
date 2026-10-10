const form = document.querySelector("#searchForm");
const input = document.querySelector("#query");
const status = document.querySelector("#searchStatus");
const results = document.querySelector("#searchResults");

function setLocalizedText(element, arabic, english) {
    element.dataset.ar = arabic;
    element.dataset.en = english;
    element.textContent = document.documentElement.lang === "en" ? english : arabic;
}

function translateSearchUi() {
    document.querySelectorAll("#searchStatus[data-ar], #searchResults [data-ar]").forEach(element => {
        element.textContent = element.dataset[document.documentElement.lang === "en" ? "en" : "ar"];
    });
}

window.addEventListener("progzt-language-change", translateSearchUi);

function makeResult(title, description, url) {
    const article = document.createElement("article");
    article.className = "result-item";

    const heading = document.createElement("h3");
    const link = document.createElement("a");
    link.textContent = title;
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    heading.append(link);
    article.append(heading);

    if (description) {
        const summary = document.createElement("p");
        summary.textContent = description;
        article.append(summary);
    }

    return article;
}

function collectTopics(topics) {
    return topics.flatMap(topic => {
        if (topic.Topics) {
            return collectTopics(topic.Topics);
        }

        if (topic.Text && topic.FirstURL) {
            return [{ title: topic.Text, url: topic.FirstURL }];
        }

        return [];
    });
}

function addFullSearchLink(query) {
    const link = document.createElement("a");
    link.href = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    setLocalizedText(link, "عرض نتائج الويب الكاملة على DuckDuckGo ↗", "View full web results on DuckDuckGo ↗");

    const paragraph = document.createElement("p");
    paragraph.className = "text-link";
    paragraph.append(link);
    results.append(paragraph);
}

function displayResponse(data, query) {
    results.replaceChildren();

    const heading = document.createElement("h2");
    setLocalizedText(heading, "نتائج فورية وموضوعات ذات صلة", "Instant answers and related topics");
    results.append(heading);

    if (data.AbstractText && data.AbstractURL) {
        results.append(makeResult(data.Heading || query, data.AbstractText, data.AbstractURL));
    }

    if (data.Answer) {
        results.append(makeResult(data.Heading || (document.documentElement.lang === "en" ? "Instant answer" : "إجابة فورية"), data.Answer, data.AnswerURL || data.AbstractURL || `https://duckduckgo.com/?q=${encodeURIComponent(query)}`));
    }

    for (const item of data.Results || []) {
        if (item.Text && item.FirstURL) {
            results.append(makeResult(item.Text, "", item.FirstURL));
        }
    }

    for (const topic of collectTopics(data.RelatedTopics || []).slice(0, 12)) {
        results.append(makeResult(topic.title, "", topic.url));
    }

    const hasInstantAnswer = results.querySelector(".result-item");
    if (!hasInstantAnswer) {
        const message = document.createElement("p");
        message.className = "search-note";
        setLocalizedText(message, "لا تتوفر إجابة فورية لهذا البحث. يمكنك فتح نتائج الويب الكاملة أدناه.", "No instant answer is available. You can open the full web results below.");
        results.append(message);
    }

    addFullSearchLink(query);
}

async function search(query) {
    setLocalizedText(status, "جارٍ البحث...", "Searching...");
    results.replaceChildren();

    const endpoint = new URL("https://api.duckduckgo.com/");
    endpoint.search = new URLSearchParams({
        q: query,
        format: "json",
        no_html: "1",
        skip_disambig: "1"
    });

    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`DuckDuckGo returned HTTP ${response.status}`);
        }

        const data = await response.json();
        displayResponse(data, query);
        status.textContent = "";
        delete status.dataset.ar;
        delete status.dataset.en;
    } catch (error) {
        setLocalizedText(status, "تعذر تحميل الإجابة الفورية. تحقق من اتصالك أو افتح نتائج الويب الكاملة.", "Could not load instant answers. Check your connection or open the full web results.");
        results.replaceChildren();
        addFullSearchLink(query);
        console.error("DuckDuckGo Instant Answer request failed.", error);
    }
}

form.addEventListener("submit", event => {
    event.preventDefault();
    const query = input.value.trim();
    if (query) {
        search(query);
    }
});

const initialQuery = new URLSearchParams(window.location.search).get("q");
if (initialQuery) {
    input.value = initialQuery;
    search(initialQuery);
}

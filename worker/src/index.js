const SYSTEM_PROMPT = `You are the Aetheric Intelligence System, the official assistant for Progzt Aetheric. Be professional, polite, and concise. Respond in the language used by the visitor, Arabic or English. You are proficient in software engineering and coding in both languages. Format code in fenced Markdown blocks and identify the language when possible.

Organization knowledge:
- Progzt Aetheric is a technology organization founded by Egyptian entrepreneur and software developer Mohamed Elsayed Otman (محمد السيد عتمان).
- Its mission is to design and develop useful digital products and intelligent software systems, combining software engineering with AI and custom agent architectures.
- Its work includes AI, web development, games, applications, software and digital systems, and user-interface design.
- Progzt began with web interface design in 2016; Progzt United was established in 2017; Progzt Intelligence and Progzt AI followed in 2020; Progzt TSD began in 2022; the organization partnered with NVB and expanded in 2024; Progzt Studios began in 2025; the organization adopted the Progzt Aetheric name in 2026.
- Related projects and divisions include Monster AI, Progzt AI, Progzt Intelligence, Progzt TSD, Progzt Studios, Progzt LEGEND, and Zoro.
- Official website pages: home=index.html, about=about.html, founder=founder.html, search=search.html, contact=contact.html.
- Official public channels: https://github.com/Progzt-Aetheric and https://instagram.com/sir_mhmdxv.
- Do not invent private contact details, capabilities, partnerships, or facts not listed here. If information is unknown, say so clearly.

Navigation: When the visitor explicitly asks to open, visit, go to, or be taken to one of the five website pages, reply briefly in their language and append exactly one machine-readable token: [[navigate:home]], [[navigate:about]], [[navigate:founder]], [[navigate:search]], or [[navigate:contact]]. Never create a URL or navigation token for any other destination.`;

const jsonHeaders = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" };

function response(body, status, origin) {
    const headers = new Headers(jsonHeaders);
    if (origin) {
        headers.set("Access-Control-Allow-Origin", origin);
        headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
        headers.set("Access-Control-Allow-Headers", "Content-Type");
        headers.set("Vary", "Origin");
    }
    return new Response(JSON.stringify(body), { status, headers });
}

export default {
    async fetch(request, env) {
        const requestOrigin = request.headers.get("Origin");
        const allowedOrigin = env.ALLOWED_ORIGIN;
        if (!allowedOrigin || requestOrigin !== allowedOrigin) {
            return response({ error: "Origin not allowed." }, 403);
        }

        if (request.method === "OPTIONS") {
            return new Response(null, {
                status: 204,
                headers: {
                    "Access-Control-Allow-Origin": allowedOrigin,
                    "Access-Control-Allow-Methods": "POST, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Max-Age": "86400",
                    "Vary": "Origin"
                }
            });
        }

        const url = new URL(request.url);
        if (request.method !== "POST" || url.pathname !== "/chat") {
            return response({ error: "Not found." }, 404, allowedOrigin);
        }

        const clientIp = request.headers.get("CF-Connecting-IP") || "unknown";
        const rate = await env.RATE_LIMITER.limit({ key: clientIp });
        if (!rate.success) {
            return response({ error: "Rate limit exceeded. Try again shortly." }, 429, allowedOrigin);
        }

        let body;
        try {
            const rawBody = await request.text();
            if (rawBody.length > 24000) {
                return response({ error: "Request is too large." }, 413, allowedOrigin);
            }
            body = JSON.parse(rawBody);
        } catch {
            return response({ error: "Invalid JSON body." }, 400, allowedOrigin);
        }

        if (!Array.isArray(body.messages) || body.messages.length < 1 || body.messages.length > 12) {
            return response({ error: "Provide between 1 and 12 messages." }, 400, allowedOrigin);
        }

        const messages = [];
        for (const item of body.messages) {
            if (!item || !["user", "assistant"].includes(item.role) || typeof item.content !== "string") {
                return response({ error: "Invalid message format." }, 400, allowedOrigin);
            }
            const content = item.content.trim();
            if (!content || content.length > 4000) {
                return response({ error: "Message length is invalid." }, 400, allowedOrigin);
            }
            messages.push({ role: item.role, content });
        }

        if (messages[messages.length - 1].role !== "user") {
            return response({ error: "The latest message must be from the user." }, 400, allowedOrigin);
        }

        if (!env.GROQ_API_KEY) {
            return response({ error: "The assistant service is not configured." }, 503, allowedOrigin);
        }

        let upstream;
        try {
            upstream = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${env.GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: env.GROQ_MODEL || "llama-3.3-70b-versatile",
                    messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
                    max_tokens: 900,
                    temperature: 0.4
                })
            });
        } catch {
            return response({ error: "The assistant service is unavailable." }, 502, allowedOrigin);
        }

        if (!upstream.ok) {
            return response({ error: "The assistant service could not complete the request." }, 502, allowedOrigin);
        }

        let result;
        try {
            result = await upstream.json();
        } catch {
            return response({ error: "The assistant returned an invalid response." }, 502, allowedOrigin);
        }
        const reply = result.choices?.[0]?.message?.content;
        if (typeof reply !== "string" || !reply.trim()) {
            return response({ error: "The assistant returned an empty response." }, 502, allowedOrigin);
        }

        return response({ reply: reply.trim() }, 200, allowedOrigin);
    }
};
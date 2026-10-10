# Progzt Aetheric

The official website for Progzt Aetheric. The site uses static HTML pages with a shared
monochrome stylesheet and client-side Arabic/English language toggle. The search page
uses DuckDuckGo's Instant Answer API. The Aetheric assistant uses a Cloudflare Worker
proxy so the Groq API key is never sent to the browser.

## Pages

- `index.html` — Home
- `about.html` — Organization overview
- `founder.html` — Founder profile and organization journey
- `search.html` — DuckDuckGo Instant Answer search
- `contact.html` — Contact channels

## Assistant setup

The public site cannot safely store a Groq API key. Revoke any key shared in chat or
committed to source, then create a replacement and store it as a Cloudflare Worker
secret. Never add the key to a website JavaScript file.

1. From `worker/`, authenticate Wrangler and set the secret:

	```sh
	npx wrangler login
	npx wrangler secret put GROQ_API_KEY
	npx wrangler deploy
	```

2. Copy the deployed Worker URL and append `/chat`.
3. Set `window.AETHERIC_ASSISTANT_ENDPOINT` in `assistant-config.js` to that HTTPS URL.
4. Publish the updated site. The Worker is limited to the GitHub Pages origin and
	includes a per-IP rate limit; configure a unique rate-limit namespace if `1001` is
	already in use in the Cloudflare account.

The assistant is intentionally inactive until its deployed Worker URL is configured.

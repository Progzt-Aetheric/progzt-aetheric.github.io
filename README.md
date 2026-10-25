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

## Google Indexing API

The `Request Google indexing update` workflow can be run manually or is triggered
when site files change. Add the complete service-account JSON as the repository
Actions secret `GOOGLE_INDEXING_CREDENTIALS_JSON`; do not commit credentials.
For local runs, place credentials in the ignored `scripts/google_credentials.json`
file or set `GOOGLE_APPLICATION_CREDENTIALS` to a credentials file path, then run:

```sh
python -m pip install -r scripts/requirements.txt
python scripts/indexing.py
```

Google's Indexing API is restricted to eligible pages such as job postings and
livestream pages. A regular website homepage may be rejected by Google even when
the API request and credentials are configured correctly. For general site
discovery, submit `https://progzt-aetheric.github.io/sitemap.xml` in Google Search
Console.

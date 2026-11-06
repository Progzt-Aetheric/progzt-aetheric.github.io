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

## Community blog setup

The community section on `blog.html` uses Firebase Authentication (Google) and Cloud
Firestore. It reads published articles for everyone; only the verified owner account
`progzt9@gmail.com` can publish or delete them. Google sign-in requires users to complete
a public username and avatar URL before continuing.

1. The Firebase web app configuration for `progzt-39599` is in `firebase-config.js`.
   Firebase web API keys identify a project; never put service-account credentials or
   other server secrets in the site.
2. In Firebase Authentication, enable the Google provider and add
   `progzt-aetheric.github.io` to the authorized domains. For local testing, add
   `localhost` as well.
3. Create a Cloud Firestore database and publish `firestore.rules` in the Firebase
   console. The rules allow public article reads, owner-only article publishing/deletion,
   and user-managed profile fields while preventing users from granting themselves the
   verified badge. Owner access is enforced against the verified Firebase token.
4. Deploy the site over HTTPS and test Google sign-in, required profile onboarding,
   profile editing, and owner publishing/deletion.

Article documents are stored in Firestore's `posts` collection. User profile documents are
stored in `users` and are readable only by the signed-in user. Setting a user's
`isVerified` field to `true` must be done through a trusted Firebase console/admin process;
users cannot change that field themselves.

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
Actions secret `GOOGLE_CREDENTIALS`; the workflow passes it to the script as the
`GOOGLE_CREDENTIALS` environment variable. Do not commit credentials. For local
runs, set `GOOGLE_CREDENTIALS` to the complete service-account JSON before running:

```sh
python -m pip install -r scripts/requirements.txt
python scripts/indexing.py
```

Google's Indexing API is restricted to eligible pages such as job postings and
livestream pages. A regular website homepage may be rejected by Google even when
the API request and credentials are configured correctly. For general site
discovery, submit `https://progzt-aetheric.github.io/sitemap.xml` in Google Search
Console.

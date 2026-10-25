# srdjankojic.com

Personal site of Srdjan Kojic. Plain HTML, CSS and a little JavaScript, no build step.

Live at https://srdjankojic.com, served by a Cloudflare Worker with static assets. The old address, https://skojic.vercel.app, redirects every path to the new domain (see `vercel.json`).

## Run locally

```sh
npx wrangler dev --port 8787
```

Then open http://localhost:8787. This serves `site/` the way Cloudflare does: clean URLs, `_headers` and the 404 page.

## Deploy

```sh
npx wrangler deploy
```

Verify a deploy by downloading a file over HTTPS and comparing it with the local copy, for example `curl -s https://srdjankojic.com/ | cmp - site/index.html`.

## Files

- `site/`: everything that is published. Nothing outside it is uploaded.
- `site/index.html`: home page, meta tags and structured data
- `site/work/`: case studies
- `site/styles.css`: the whole design. Colours for dark and light are variables at the top.
- `site/main.js`: the ⌘K / Ctrl+K command menu and the theme switch
- `site/logo/symbols.svg`: the sk logo, drawn from Schibsted Grotesk letterforms as outlines. Pages use it with `<use href="/logo/symbols.svg#sk-check">`.
- `site/fonts/`: Schibsted Grotesk, self-hosted, Latin subset (SIL Open Font License, see `site/fonts/OFL.txt`)
- `site/img/og.png`: the preview image shown when the link is shared
- `site/_headers`: security headers and caching
- `wrangler.jsonc`: the Worker and its custom domains
- `vercel.json`: the permanent redirect from the old address

## Common edits

- **Add a project:** copy one `<li>` in the "Selected work" list in `site/index.html`, newest first.
- **Add a screenshot to a case study:** save the 1600 px original plus 800 px and 1200 px WebP copies (`name-800.webp`, `name-1200.webp`), and copy the `srcset` and `sizes` from an existing `<img>`. Phones then download the small copy.
- **Add a page:** copy a case study, change the canonical URL and the Open Graph tags, and add the page to `site/sitemap.xml`.
- **Change an image, font or the logo:** files in `site/img/`, `site/fonts/` and `site/logo/` are cached for a year. A changed file needs a new file name, or returning visitors keep the old one.
- **The header is repeated on every page.** If you change it, change it on all of them.

## Content security

The Content Security Policy in `site/_headers` allows scripts, styles, fonts and images from this site only. Inline `style=""` is blocked, so styles go in `site/styles.css`, and code goes in `site/main.js`.

One inline script is allowed, by its hash: the one-line theme snippet at the end of every page's `<head>`, which sets light or dark before the page paints. It must be identical on every page. If you change it, recompute the hash and replace the `sha256-…` value in `site/_headers`:

```sh
python3 -c "import re,hashlib,base64;s=re.search(r'<script>(.*?)</script>',open('site/index.html').read()).group(1);print('sha256-'+base64.b64encode(hashlib.sha256(s.encode()).digest()).decode())"
```

If the hash and the snippet ever disagree, browsers block the snippet: the site still works, in dark mode, and ignores a saved light choice.

# skojic.github.io

Personal site of Srdjan Kojic. Plain HTML, CSS and a little JavaScript, no build step.

## Run locally

```sh
python3 -m http.server 4173
```

Then open http://127.0.0.1:4173.

## Files

- `index.html`: all content, meta tags and structured data
- `styles.css`: the whole design (colours and spacing are variables at the top)
- `main.js`: the ⌘K / Ctrl+K command menu
- `fonts/`: Archivo, self-hosted (SIL Open Font License, see `fonts/OFL.txt`)
- `img/og.png`: the preview image shown when the link is shared
- `vercel.json`: security and caching headers for Vercel
- `robots.txt`, `sitemap.xml`: for search engines

## Common edits

- **Add a project:** copy one `<li class="project">` block in `index.html`, newest first.
- **Add the photo:** save it as `img/srdjan-kojic.webp` and swap the placeholder `div` in the About section for the `img` line in the comment above it.
- **Change the address:** the site URL appears in `index.html` (canonical, Open Graph, structured data), `robots.txt` and `sitemap.xml`. Search for `skojic.vercel.app`.

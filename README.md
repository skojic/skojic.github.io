# skojic.github.io (redirect)

This branch only redirects skojic.github.io to https://srdjankojic.com, keeping the path. The site itself is on the master branch.

GitHub Pages can't send a real HTTP redirect, so both pages use a script (which keeps the path) with a meta refresh as a fallback. `404.html` is identical to `index.html`, so deep links such as `/work/figma-to-code` land on the same page on the new domain.

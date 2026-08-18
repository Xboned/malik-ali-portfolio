## Learned User Preferences

- Portfolio should look like the PSP XMB Figma (horizontal categories, vertical items). Use Sharlene Yap’s saved desktop only as interaction inspiration, not a layout to copy.
- Want animated undulating wave motion behind the XMB, similar to Shar’s site, not a still or slowly panning photo.
- Category titles should be the same white as the item labels, not default black button text.
- Use the frontend resume, not the Mattel Assistant Web Producer PDF. On the site, name the download `Malik Ali Resume.pdf` (no “Frontend”, no underscores).
- Host on Cloudflare from GitHub as a Worker with static assets. Match Tempura’s `_headers`, training-crawler `robots.txt`, and `/.well-known/security.txt`.
- Public recruiter-facing URL is the real-name domain `malikalidev.com`, not the GitHub username.

## Learned Workspace Facts

- Vite + React + TypeScript app published as a Cloudflare Worker with static assets (`wrangler.jsonc` name `malik-ali-portfolio`, assets `./dist`).
- Live domain is `malikalidev.com` (apex and `www` as Worker custom domains). GitHub remote is `https://github.com/Xboned/malik-ali-portfolio.git`. Production branch is `main`; preview branch is `develop`.
- Visual source is Figma file `eqfMG2SXk0cCzs9mQ9G8QS` (Portfolio, node 1:3). Type is self-hosted Anek Latin.
- Resume source of truth is `Documents/Resume/Malik_Ali_Resume_Frontend.html` (and matching PDF). Copies in this repo are `public/resume.html` and `public/Malik Ali Resume.pdf`.
- Tempura marketing site at `Documents/Contract Work/Tempura/website` is the reference for security headers, robots, and `security.txt`.
- Work to feature: Tempura Inc. (Front-End Developer, May 2026–Present), independent Nest & Nooks (Shopify) and Sculpt Spa (React booking), CoScript (UX, Aug 2024–May 2026), Steelgem (Marketing Assistant).
- GitHub is `Xboned`. LinkedIn is `linkedin.com/in/malik-ali-msa`.

# Malik Ali portfolio

PSP XMB-style front-end portfolio. Categories move left and right. Items move up and down. Enter opens a panel.

The visual comes from the Figma file [Portfolio](https://www.figma.com/design/eqfMG2SXk0cCzs9mQ9G8QS/Portfolio?node-id=1-3). Icons and the wave background are exported from that file. Type is Anek Latin, self-hosted.

## Local

```bash
npm install
npm run dev
```

## Cloudflare

This repo is a static Vite app published as a Worker with [static assets](https://developers.cloudflare.com/workers/static-assets/).

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler versions upload` (preview) / project default (production) |
| Output directory | `dist` |
| Production branch | `main` |
| Preview branch | `develop` |

Live site: [malikalidev.com](https://malikalidev.com/). Apex and `www` are Custom Domains on the Worker.

Connect the GitHub repo in **Workers & Pages → Import a repository**. Pushes to `develop` should stay on a preview URL. Merges to `main` go live.

`wrangler.jsonc` points assets at `./dist` and attaches `malikalidev.com` plus `www.malikalidev.com`. `_headers` is copied from `public/` into that build. `robots.txt` allows search and AI answers (`search=yes, ai-input=yes`) and blocks training crawlers (`ai-train=no`). `/.well-known/security.txt` points vulnerability reports at the contact email.

To publish from this folder without git:

```bash
npm run build
npx wrangler deploy
```

## Layout

```
src/data.ts           Categories, items, copy
src/App.tsx           XMB shell, keyboard, panels
public/assets/        Wave + XMB icons from Figma
public/fonts/         Anek Latin
public/resume.html                       Print-ready resume
public/Malik Ali Resume.pdf              PDF of the same resume
```

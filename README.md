# Yash Mishra — Applied AI Engineer

Personal site for **Yash Mishra** (SIES GST, Mumbai).  
Static single-page app. No backend. No API keys.

Live source: [github.com/mav1730/yash-mishra](https://github.com/mav1730/yash-mishra)

For the full system map — how it was built, why each library is here, and how pages talk to each other — see **[ARCHITECTURE.md](./ARCHITECTURE.md)**.

---

## What this is

A cream / ink / crimson editorial portfolio. The brief was applied AI, not a chatbot landing page.

Locked line on the site:

> If you’re nothing without AI, you shouldn’t have it.

Work shown:

| Piece | Status | Notes |
| --- | --- | --- |
| Legal Metrology Checker | Shipped | Real project, public GitHub |
| CodeBench Agent | In build | Sample case |
| AgentJudge + Router | In build | Sample case |
| BeaconOps | Live | Linked from Playground |

Contact (email, phone, LinkedIn, Instagram) is only in the **Talk** window. It is not duplicated in this README.

---

## Stack

| Layer | Choice | Version |
| --- | --- | --- |
| Language | TypeScript | ~6.0 |
| UI | React | 19 |
| Routing | react-router-dom | 7 |
| Build | Vite (`appType: 'spa'`) | 8 |
| Motion | GSAP + ScrollTrigger | 3 |
| Scroll | Lenis | 1.3 |
| Lint | oxlint | 1.75 |
| Fonts | Playfair Display, Newsreader, Oswald | Google Fonts |
| Hosting | Static `dist/` on Vercel or Netlify | — |

There is no server, database, auth, or analytics SDK in this repo.

---

## Pages

| Path | File | What you see |
| --- | --- | --- |
| `/` | `src/pages/Home.tsx` | Bill-style hero, intro + portrait, selected work, quote, license card, large footer |
| `/work` | `src/pages/Work.tsx` | Three case studies |
| `/playground` | `src/pages/Playground.tsx` | Hover plates, BeaconOps |
| `/manifesto` | `src/pages/Manifesto.tsx` | Stuff list (hover follow image) |
| `/pinart` | `src/pages/Pinart.tsx` | ASCII self-portrait field + mouse image trail |
| `*` | `src/pages/NotFound.tsx` | 404 |

Nav: **Work · Playground · Manifesto · PINART · Talk**.

---

## Run locally

Need Node 20+ and npm.

```bash
git clone https://github.com/mav1730/yash-mishra.git
cd yash-mishra
npm install
npm run dev
```

Vite prints a local URL (usually `http://127.0.0.1:5173`).

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server + HMR |
| `npm run lint` | oxlint |
| `npm run build` | `tsc -b` then Vite production bundle |
| `npm run preview` | Serve `dist/` locally |

Skip the boot wipe while developing:

```
http://127.0.0.1:5173/?ready=1
```

Jump to a home section:

```
http://127.0.0.1:5173/?ready=1&section=license
```

---

## Deploy (free)

This is a static SPA. The host only needs to serve `dist/` and send unknown paths to `index.html`.

### Vercel

1. Import `mav1730/yash-mishra`.
2. Framework preset: **Vite**.
3. Build command: `npm run build`.
4. Output: `dist`.

`vercel.json` already rewrites `/(.*)` → `/index.html`.

### Netlify

Same build settings. `public/_redirects` already has:

```
/*    /index.html   200
```

### After a change

```bash
npm run lint
npm run build
git add -A
git commit -m "Describe the change."
git push origin main
```

---

## Project map

```
src/
  main.tsx                 entry — strips the HTML boot splash, mounts React
  App.tsx                  router + shell (grain, cursor, nav, routes)
  index.css                design tokens and all layout
  data/content.ts          profile, nav, projects, stuff, playground
  context/Transition.tsx   boot + page wipe (clip-path curtain)
  lib/useLenis.ts          smooth scroll, shared Lenis handle
  lib/usePageReveal.ts     inner-page title / card entrance
  pages/                   one file per route
  components/              nav, talk modal, license, PINART trail, footer
public/images/             photos and generated stills
```

Copy, titles, and links are edited in **`src/data/content.ts`** only. Do not hard-code profile data in pages.

---

## Design lock

- Background cream `#efe8dc`, ink `#111110`, lamp red `#c4171d`.
- Display: **Playfair Display**. Body: **Newsreader**. Labels: **Oswald**.
- Custom cursor on fine pointers (hidden on touch).
- Film grain + vignette sit above the page, below the nav.

References used while building (ideas stolen, not cloned): Synapser (wipe), Bill Chien (name + photo hero), stillmakingstuff (stuff list + contact window), vshslv.com (PINART trail + ASCII field).

---

## License

Private portfolio. Photos are Yash’s. Do not republish the stills as your own.

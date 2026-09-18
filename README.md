# Giancarlo Poémape — Portfolio

An explorable, top-down "data pipeline" world: a meme-cat walks a river connecting five stations (About, Experience, Skills, Workshop, Contact), collects fragments of career story along the way, and runs into real career-challenge "obstacles" and LinkedIn-recommendation NPCs on the path.

Live at [giposmart.com](https://giposmart.com).

## Stack

- React 18 + Vite 4, no TypeScript
- Tailwind CSS
- [`@emailjs/browser`](https://www.emailjs.com/) for the contact form
- No game engine/canvas library — the world is plain React + CSS/SVG, kept deliberately "skin-agnostic" (see below)

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

The contact form needs EmailJS credentials to actually send. Create a `.env` (gitignored) with:

```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

Without it, the game still runs fully — only the contact form send will fail.

Other scripts:

```bash
npm run build     # production build -> dist/
npm run preview   # serve the production build locally
npm run lint      # eslint, zero warnings allowed
```

## Project structure

```
src/
  content/        single source of truth for real CV data: profile, experience,
                   skills, projects, fragments, obstacles, recommendations
  i18n/            EN (default) / ES translations + LanguageContext + pickLang()
  game/
    layout.js       world size, zone/fragment/obstacle/NPC coordinates
    collision.js     AABB collision + corridor-leash movement gating
    corridor.js      keeps the player within a leash of the river path/content
    useGameLoop.js   requestAnimationFrame loop with delta-time
    useInput.js      keyboard + touch d-pad input
    useFootsteps.js  footstep + reward sound effects
    skins/cssSkin.jsx  the ONLY file that renders the world (river, buildings,
                        player sprite, NPCs, dialogue bubbles, fragments...)
  ui/              HUD, title screen, station panels, journal, touch controls
```

**Skin-agnostic by design**: `game/*.js` knows nothing about how anything is drawn — only positions, radii, and state. All rendering lives in `game/skins/cssSkin.jsx`. Swapping in a real pixel-art tileset later means writing a new skin file and changing one import, not touching game logic.

**Bilingual content**: any content entry that needs translation is shaped as `{ ...facts, en: {...}, es: {...} }`; `pickLang(entry, lang)` resolves it. Station names on the world map and LinkedIn recommendation quotes are intentionally left untranslated (quotes are verbatim, unmodified).

## Deployment

`.github/workflows/main.yml` deploys automatically on every push to `main`: builds with Vite, then syncs `dist/` to an S3 bucket (`aws s3 sync --delete`) via a GitHub OIDC role — no long-lived AWS credentials stored in the repo. `main` is production; do feature work on a branch and merge in.

# Abhinay Visuals — Portfolio

A cinematic, scroll-driven portfolio for **Abhinay Singh**: Video Editor · Graphic Designer · Visual Storyteller.
It's a static site built with plain HTML, CSS and vanilla JavaScript. GSAP, ScrollTrigger and Lenis load from a CDN, so there's no build step and nothing to `npm install`.

---

## 1. Open in VS Code

1. Open **VS Code** → **File → Open Folder…** → pick this folder (`portfolio 1`).
2. When VS Code asks you to install the **recommended extensions**, click **Install All**. The recommendations are Live Server, Prettier, EditorConfig and Markdown All in One.
3. Optional: make the `code` command work in Terminal. Press `Cmd+Shift+P`, type **"Shell Command: Install 'code' command in PATH"** and press Enter.

## 2. Run the site

**Requirement:** [Node.js](https://nodejs.org) 18 or newer. Check with `node -v`.

Pick one of these:

| Method | How |
|---|---|
| **One-click task** (recommended) | `Cmd+Shift+B`, or **Terminal → Run Task… → Start site**, then open http://localhost:5173 |
| **Run & Debug** | Press `F5` and choose **"Open site in Chrome"**. This starts the server and opens Chrome with the debugger attached. |
| **Terminal** | `npm run dev` |
| **Live Server extension** | Right-click `index.html` → **Open with Live Server** (port 5500) |

> Use one of these servers instead of opening `index.html` by double-clicking it. Video scrubbing needs a real server that supports byte ranges, and `npm run dev` provides that.

Stop the server with `Ctrl+C` in its terminal.

---

## 3. Project structure

```
portfolio 1/
├── index.html          ← all page content and sections
├── style.css           ← design tokens (colors, fonts), components, sections, responsive rules
├── script.js           ← animations, scroll scenes, work grid, lightbox. PROJECTS list at the top.
├── BUILD-PLAN.md       ← the full creative brief + implementation spec
├── README.md           ← this file
├── package.json        ← `npm run dev`
├── scripts/serve.mjs   ← tiny zero-dependency local server
├── assets/
│   ├── favicon.svg
│   ├── img/            ← photos, work thumbnails, og-image.jpg
│   └── video/          ← drop the three generated videos here (see §5)
├── media /             ← original reference images (folder name ends with a space)
└── .vscode/            ← VS Code tasks, debug config, settings, extension list
```

---

## 4. Common edits

| I want to… | Edit |
|---|---|
| Change colors | `style.css` → `:root` at the top (`--rec` is the red accent) |
| Change fonts | `index.html` `<head>` Google Fonts link + `style.css` `--f-*` variables |
| Edit headlines / copy | `index.html`: each section is labelled `SC.00 HERO`, `SC.01 STATS`, … |
| Change stats | `index.html` → `.stats`: edit `data-count="3"` (the number animates to that value) |
| **Add real projects** | `script.js` → the `PROJECTS` array at the very top (see below) |
| Contact links | `index.html` → `#contact` section and the footer |

### Adding your real work

Each project in `script.js` looks like this:

```js
{
  title: 'Passport to Somewhere',
  type: 'Reel',            // label shown on the card
  cat: 'reel',             // filter: reel | promo | design | motion
  ratio: '9:16',           // 9:16, 16:9 or 4:5
  category: 'Travel',
  year: '2026',
  thumb: 'assets/img/work-01.svg',   // cover image (jpg/png/webp/svg)
  video: '',               // optional: full video shown in the lightbox, e.g. 'assets/video/work/passport.mp4'
  preview: '',             // optional: short muted clip that plays on hover
  desc: 'One or two sentences about the project.'
}
```

⚠️ The 8 projects in the grid right now are **placeholders** with invented titles and descriptions. Replace them with your real work before you publish.

---

## 5. Adding the cinematic videos (Higgsfield Seedance 2.0)

The site checks for these files and switches from photos to video scrubbing on its own:

| File | Section |
|---|---|
| `assets/video/v1-editor.mp4` (+ optional `v1-editor-720.mp4` for phones) | Hero |
| `assets/video/v2-process.mp4` (+ `-720`) | Story |
| `assets/video/v3-result.mp4` (+ `-720`) | Selected Work intro |

Until those files exist, the browser console shows harmless `404` messages for them.

Prompts, identity reference and camera direction are in **BUILD-PLAN.md §5–6**.
To make scrubbing smooth, re-encode each clip with dense keyframes. This needs ffmpeg: install it with `brew install ffmpeg`.

```bash
ffmpeg -i raw.mp4 -vf "scale=1920:-2,fps=24" -c:v libx264 -preset slow -crf 22 -g 2 -keyint_min 2 -bf 0 -pix_fmt yuv420p -movflags +faststart -an assets/video/v1-editor.mp4
ffmpeg -i raw.mp4 -vf "scale=1280:-2,fps=24" -c:v libx264 -crf 25 -g 4 -bf 0 -pix_fmt yuv420p -movflags +faststart -an assets/video/v1-editor-720.mp4
```

---

## 6. Publishing

The whole folder is a static site, so you can upload it to any static host:

- **Netlify / Vercel:** drag and drop the folder, or connect a Git repo. No build command; the publish directory is `/`.
- **GitHub Pages:** push to a repo → Settings → Pages → deploy from the `main` branch root.
- **Hostinger / cPanel:** upload `index.html`, `style.css`, `script.js` and `assets/` into `public_html`.

You don't need to upload `media /`, `scripts/`, `.vscode/`, `BUILD-PLAN.md` or `README.md`.

---

## 7. Notes

- **Accessibility:** if a visitor's system has "Reduce motion" turned on, the site shows a calm static version.
- **Returning visitors:** the loading slate plays once per browser session.
- **Debugging:** open DevTools and use `lenis.scrollTo('#work')` to jump to any section.

# ABHINAY VISUALS — Master Build Plan

> **Creative brief + implementation spec for Claude Code**
> Client: Abhinay Singh · Brand: Abhinay Visuals
> Deliverable: Static cinematic portfolio site (`index.html`, `style.css`, `script.js`, `/assets`)
> Stack: HTML · CSS · vanilla JS · GSAP + ScrollTrigger + Lenis (CDN)
> Version 1.0 · 25 Sep 2026

---

## PART I — CREATIVE BRIEF

---

## 1. Website Overview

**What it is:** A personal brand and creative portfolio for Abhinay Singh, a video editor, graphic designer and visual storyteller working under the name **Abhinay Visuals**.

**What it must do:**
1. Show within 3 seconds that this person is skilled with both **motion and design**, through the site itself and before any project is opened.
2. Move visitors toward **View My Work** (primary) and then **Let's Work Together** (conversion).
3. Work as a living portfolio. Projects and stats need to be easy to swap as the body of work grows.

**The big idea: "The site is the edit."**
The whole site is built like a film in an editing suite. Scroll works as the playhead. A timecode HUD counts frames as you move. Sections are labelled as scenes (`SC.01`, `SC.02`...). Transitions behave like cuts, cross-dissolves and match-cuts. A visitor doesn't read about Abhinay's editing skill. They scrub through it.

**Primary audience:** Brands, small businesses, founders, creators and agencies that need reels, promo videos, social creatives and motion content. That includes travel, immigration and service businesses, where Abhinay already has experience.

**Primary CTA:** `View My Work` → `#work`
**Secondary CTA:** `Let's Work Together` → `#contact`

---

## 2. Core Positioning

**Positioning statement**
> For brands and creators who need content that actually gets watched, Abhinay Visuals is a one-person creative studio that combines video editing, graphic design and motion under one eye, so every frame, font and cut tells the same story.

**The one-liner (refined from your answer)**
> I turn ideas into videos and visuals that stop the scroll and say exactly what you mean.

**Headline system**
| Use | Line |
|---|---|
| Hero headline | **Behind every great visual is an editor.** |
| Hero sub | Video Editor · Graphic Designer · Visual Storyteller |
| Manifesto | **Good editing doesn't just make a video look better. It makes people *feel* something.** |
| Mission | Abhinay Visuals exists to turn ordinary ideas into visual experiences people can see and *feel*. |
| Work intro | Selected cuts. Real briefs, finished frames. |
| Final CTA | **Got an idea? Let's make people feel it.** |

**Differentiator:** Most clients hire an editor *and* a designer and then spend time making the two agree. Abhinay is both. Thumbnail, reel, poster and motion title come from one visual language. **One vision, every format.**

---

## 3. Brand Personality

| Trait | Is | Is not |
|---|---|---|
| **Cinematic** | Considered framing, light, pacing | Over-graded, cheesy trailer voice |
| **Premium** | Restraint, space, detail | Flashy, cluttered, "template" |
| **Creative** | Unexpected transitions, kinetic type | Gimmicky effects for their own sake |
| **Modern** | Clean grid, variable type, smooth motion | Trend-chasing neon |
| **Bold** | Huge type, confident statements | Loud or arrogant |
| **Minimal** | One accent, lots of black | Empty or cold |

**Voice:** Short sentences, film language (cut, frame, scene, take, render). First person and warm. Confident without hype.

**Brand archetype:** *The Creator*, with a touch of *The Magician* (turning the ordinary into something felt).

---

## 4. Visual Direction

**Mood:** A professional editing suite at 2 AM. Monitor glow on a dark room. A red REC light. The quiet focus of someone who cares about every frame.

**Pillars of the look**
- **Dark cinematic:** deep black canvas, charcoal layers, off-white type.
- **One accent: "REC Red"** (`#FF3B2F`). It's taken from the red arc in Abhinay's existing brand graphic and the universal record light. It's used sparingly: playhead, REC dot, hover states, key words.
- **Letterbox framing:** 2.39:1 bars animate open and closed at scene changes.
- **Editorial grid:** 12 columns, big asymmetry, huge type bleeding off the edges.
- **Editor HUD:** mono timecode, scene labels, frame counters and safe-area corner brackets on media.
- **Texture:** subtle animated film grain over everything, plus a faint vignette.

**Reference images (in `/media ` folder)**
| File | Role |
|---|---|
| `Gemini_Generated_Image_bl6crzbl6crzbl6c.png` | **PRIMARY identity reference.** Clear frontal face. Use for every Higgsfield generation. |
| `Gemini_Generated_Image_9bfe2x9bfe2x9bfe 2.jpeg` | Secondary identity and pose reference: Abhinay editing at a monitor (profile, glasses). |
| `Gemini_Generated_Image_eowdh4eowdh4eowd.png` | Secondary identity reference: Abhinay behind an ARRI cinema camera. Also used as the Story section portrait. |
| `Gemini_Generated_Image_k0cvfkk0cvfkk0cv.png` | **Environment reference** for the editing studio (Video 1 set design). |

> ⚠️ The folder is named `media ` with a **trailing space**. At build time, copy the files into `/assets/img/` with clean names (see §24).

---

## 5. Higgsfield Seedance 2.0: Asset Generation

**Model:** Seedance 2.0 (via Higgsfield)
**Resolution:** 1080p (1920×1080, 16:9)
**Duration:** 10 s each (within the 8–12 s range)
**Mode:** Image-to-video with a character/identity reference
**Identity reference (all generations):** `media /Gemini_Generated_Image_bl6crzbl6crzbl6c.png`
**Supporting references:** the `9bfe2x` editing-desk image (pose/wardrobe) and the `k0cvfk` studio image (environment for Video 1).

**Global style suffix (append to every prompt):**
> Photorealistic, cinematic 35mm film look, anamorphic lens, shallow depth of field, deep blacks, soft monitor glow, restrained red accent light, subtle film grain, teal-neutral shadows, natural skin tones, no text overlays, no watermarks, no logos, smooth stable camera, 24fps motion cadence.

**Global negative prompt:**
> cartoon, CGI plastic skin, distorted hands, extra fingers, warped face, identity drift, flicker, jitter, text artifacts, on-screen captions, brand logos, oversaturated neon, cheesy lens flares, fast shaky camera.

**Consistency rules**
- Same wardrobe in all shots featuring Abhinay: **black crew-neck knit / black overshirt, thin dark-framed glasses** (matches `9bfe2x`).
- Same key light: monitor glow as key from the front, cool rim from behind, a faint red practical (REC light / LED strip) in frame.
- Same grade: deep blacks, neutral-cool mids, warm skin.
- Every clip must **start and end on a calm, near-static frame**. This makes scroll-scrubbing smooth at both ends and lets clips loop cleanly.

**Deliverables**
| File | Source | Use |
|---|---|---|
| `assets/video/v1-editor.mp4` | Scene 1 | Hero scroll-scrub |
| `assets/video/v2-process.mp4` | Scene 2 | Story scroll-scrub |
| `assets/video/v3-result.mp4` | Scene 3 | Work intro / showreel loop |
| `assets/video/*-poster.jpg` | First frame of each | Poster + LCP image |
| `assets/img/work-01…08.jpg` | Higgsfield image gen (16:9 and 9:16) | Placeholder project thumbnails until real work is dropped in |

---

## 6. Three Cinematic Scenes

Three separate films share one grade, one light and one wardrobe. Each has its own job.

### SCENE 01: THE EDITOR
**Concept:** *Behind every great visual is an editor.*
**Job on site:** Hero. Establishes the person, the craft and the mood.
**Duration:** 10 s · **Camera:** one continuous slow dolly-in plus a slight arc.

**Prompt**
> A dark cinematic editing studio at night, modeled on the reference studio: ultrawide desk, three monitors, color-grading control panel, studio monitors, framed film posters on dark acoustic walls. The man from the identity reference (Indian, short dark hair, trimmed beard, thin dark-framed glasses, black knit top) sits at the desk, lit only by monitor glow, working on a cinematic timeline. The camera starts wide from behind his shoulder, showing the room silhouetted against the screens, then slowly dollies in and arcs to a three-quarter profile of his face lit by the monitor. In soft focus we see his fingers on the color-grading trackball, audio waveforms pulsing on screen, and the timeline playhead moving. A small red REC light glows on the desk. He pauses, leans back slightly, and a faint confident smile appears. Calm, focused, premium creative-studio atmosphere. Realistic reflections on the desk and glasses.

**Beat map (for scrub sync)**
| Time | Beat | On-site text overlay |
|---|---|---|
| 0.0–3.0 s | Wide, silhouette against screens | `ABHINAY / VISUALS` giant wordmark |
| 3.0–6.5 s | Push-in on hands, trackball, waveforms | `Video Editor · Graphic Designer · Visual Storyteller` |
| 6.5–10 s | Three-quarter face, lean back, smile | **Behind every great visual is an editor.** + CTAs |

### SCENE 02: THE CREATIVE PROCESS
**Concept:** *From an idea to something people can see and feel.*
**Job on site:** Story section. The transformation, and Abhinay's journey.
**Duration:** 10 s · **Camera:** slow orbit/push around a floating composition, match-cut into the edit suite.

**Prompt**
> A cinematic sequence showing an idea becoming a finished visual. It opens on a blank, softly glowing digital canvas floating in a black void. A single white cursor line appears, then bold typography assembles letter by letter, photographs slide in, color swatches bloom, and motion-graphic shapes animate into place, building layer by layer into a polished poster design. The camera slowly orbits the floating layers, which separate in 3D depth like an exploded design file. The layers then compress back into a single frame that match-cuts onto a monitor in the dark studio, where the man from the identity reference (same glasses, black knit top) watches the finished piece play on his timeline, lit by the screen, with a subtle nod of approval. Deep black background, soft volumetric light, a restrained red accent in the design. Elegant, precise, magical but grounded.

**Beat map**
| Time | Beat | On-site chapter |
|---|---|---|
| 0–2.5 s | Blank canvas, cursor | CH.01 The Fascination |
| 2.5–6 s | Type, images, color, motion assemble | CH.02 The Craft |
| 6–8 s | Exploded layers orbit | CH.03 The Toolkit |
| 8–10 s | Match-cut to Abhinay at monitor | CH.04 Today |

### SCENE 03: THE FINAL RESULT
**Concept:** *The work, finished and alive.*
**Job on site:** Work section intro. An energetic showreel moment before the project grid.
**Duration:** 10 s · **Camera:** a fast but smooth tracking move along a wall of screens with whip-transitions.

**Prompt**
> A cinematic showcase of finished creative work in a dark gallery space. The camera glides along a curved wall of large, glowing vertical and horizontal screens showing polished social media reels, travel videos with sweeping landscapes, bold promotional posters with strong typography, motion-graphic title animations, and cinematic film frames. Smooth whip-pan transitions between screens. Close-up details of crisp typography, color-graded footage and the edges of screens. Subtle floating dust particles catch the light. At the end the camera pulls back to reveal the man from the identity reference standing calmly in silhouette in front of the full wall of screens, which glow around him. Premium lighting, deep blacks, restrained red accents, energetic yet elegant pacing.

**Beat map**
| Time | Beat |
|---|---|
| 0–7 s | Screen-to-screen tracking and whip-pans (plays as an autoplay loop behind `SELECTED WORK` kinetic title) |
| 7–10 s | Pull back to silhouette (scroll-scrubbed as the transition into the grid) |

---

## PART II — SITE ARCHITECTURE & SECTIONS

---

## 7. Website Structure

```
[Preloader: timecode slate]
[Fixed HUD: logo · nav · timecode · REC dot · scroll "timeline" scrubber]

SC.00  HERO             #top       Video 1 scrubbed · pinned 300vh
SC.01  STATS STRIP      #stats     Kinetic marquee + counters
SC.02  MISSION          #mission   Word-by-word manifesto reveal
SC.03  PILLARS          #services  3 disciplines · horizontal pinned scroll
SC.04  STORY            #story     Video 2 scrubbed · 4 chapters · portrait
SC.05  SERVICES / PROCESS #process What you get + how it works (Brief → Cut → Craft → Deliver)
SC.06  SELECTED WORK    #work      Video 3 intro + filterable project grid + lightbox
SC.07  FINAL CTA        #contact   "Let's make people feel it." + contact
       FOOTER                      Giant wordmark · socials · IST clock · rewind
```

**Navigation (top bar):** `AV` monogram (left) · `Work` `Services` `Story` `Contact` (center/right) · `Let's Talk ●` pill button (right).
**Timecode HUD (bottom-left, fixed):** `SC.03 · 00:01:12:08`. The scene number updates per section and the timecode maps to scroll progress at 24 fps.
**Timeline scrubber (bottom, fixed, thin):** a full-width 1px track with section "clip" segments and a red playhead that follows scroll. Clicking a segment jumps to that section (Lenis `scrollTo`).

---

## 8. Hero Section (SC.00)

**Layout:** Full-viewport, pinned for **300vh** of scroll. `v1-editor.mp4` fills the screen (object-fit: cover) under a 40% black gradient at the bottom and a vignette. Letterbox bars (top/bottom, ~12vh each) start closed and open during the preloader exit.

**Content & choreography (tied to video beats)**
1. **0–33% scroll:** A giant `ABHINAY` (top line) and `VISUALS` (bottom line), set in Archivo at `wdth 125 / wght 800` and ~22vw, sit edge to edge. On scroll the lines split horizontally (top moves left, bottom moves right) and the width axis squeezes `125 → 62`, so the type seems to compress through the lens.
2. **33–66%:** The wordmark exits. The role line types on in mono with a blinking red cursor: `Video Editor · Graphic Designer · Visual Storyteller`.
3. **66–100%:** The headline reveals line by line (masked slide-up):
   **Behind every great visual**
   ***is an editor.*** (Instrument Serif italic, "editor" in REC Red)
   Two CTAs fade in: `View My Work →` (solid off-white, magnetic) and `Let's Work Together` (ghost outline).
4. A **scroll cue** (bottom-center) shows a small playhead icon plus `SCROLL TO PLAY` in mono, and fades after the first scroll.

**Micro-copy (top-right corner bracket):** `ABHINAY SINGH — EST. PORTFOLIO 2026 — INDIA`.

---

## 9. Animated Stats Strip (SC.01)

**Layout:** Full-width band, charcoal background, 1px top and bottom hairlines. Two layers:
1. **Kinetic marquee** (outlined huge type, infinite, scroll-velocity-reactive, reverses direction with scroll direction):
   `EDIT ✦ DESIGN ✦ MOTION ✦ SOUND ✦ STORY ✦ COLOR ✦`
2. **Four stat cells** (counters animate from 0 when entering view):

| Big figure | Label | Sub |
|---|---|---|
| **3+** | Years crafting visuals | Taken from your existing brand graphic. Confirm it. |
| **03** | Disciplines, one vision | Editing · Design · Motion |
| **05+** | Content genres | Reels · Promo · Travel · Immigration · Business |
| **∞** | Frames considered | Every cut is a decision |

> 🔁 **Swap-ready:** each counter is `<span data-count="3" data-suffix="+">`. When verified numbers exist (projects shipped, clients, total views), replace the values in HTML and the animation keeps working. **No fabricated client counts or view numbers ship in v1.**

---

## 10. Mission Section (SC.02)

**Layout:** Pinned 150vh. One massive paragraph (~6vw, Archivo 500) in a max-width column, left-aligned.

**Copy**
> Abhinay Visuals exists to turn **ordinary ideas** into **visual experiences**. Through creative editing, thoughtful design and honest storytelling, I help brands and creators say what they mean and make people ***feel*** it.

**Animation:** Every word starts at 12% opacity. Scroll scrubs each word to 100% in sequence, like a karaoke or subtitle read. Key phrases (**ordinary ideas**, **visual experiences**) light up in off-white, then *feel* flips to REC Red italic serif with a tiny scale pop. A small label `SC.02 — WHY` sits top-left in mono.

---

## 11. Three Pillars Section (SC.03)

**Layout:** Heading `What I do` (kinetic split-letters), then a **pinned horizontal scroll** of 3 full-height panels (each ~80vw on desktop). Vertical scroll drives horizontal travel.

| # | Title | Line | Deliverables (tag chips) |
|---|---|---|---|
| **01** | **Video Editing** | Cuts with rhythm, stories with pace. | Reels · Short-form · Promo videos · Cinematic edits · Storytelling edits · Color correction · Sound design · B-roll integration |
| **02** | **Graphic Design** | Designs that stop the thumb. | Social creatives · Promo posts · Posters · Ads · Thumbnails · Campaign creatives · Visual branding |
| **03** | **Motion & Creative** | Movement that makes it memorable. | Motion graphics · Animated social content · AI-assisted visuals · Creative transitions · Title animations · VFX |

**Panel anatomy:** A giant outlined numeral (`01`, ~30vw, stroke-only) behind the content. Title in Archivo 800. A one-line promise in serif italic. Chips in mono. A media window (16:9, corner brackets) showing a muted autoplay loop cut from the generated videos, or a work still. Hovering the media window speeds playback to 1.5× and shows a red `● LIVE` tag.

---

## 12. Story Section (SC.04)

**Layout:** Pinned **400vh**. `v2-process.mp4` is scroll-scrubbed at full bleed. Chapter text cards sit on the left third with a dark gradient. A chapter index on the right (`CH.01–04`) lights up the active one.

**Copy (improved from your answer)**

**CH.01 — The Fascination**
It started with a simple question: why does the same footage feel completely different in someone else's hands? Music, typography, motion and a well-placed cut can change how a whole story feels. I wanted to know how.

**CH.02 — The Craft**
So I learned by doing. Reels, promotional videos, travel and immigration stories, cinematic edits, graphics. Every project taught me something about pace, clarity, and what makes people keep watching.

**CH.03 — The Toolkit**
Editing. Design. Motion. Sound. AI-assisted visuals. I don't treat them as separate services. They're one language, and I use all of it to tell one story.

**CH.04 — Today**
Today I build content that looks good *and* says something clearly. I believe good editing doesn't just make a video look better.

**Closing manifesto (after unpin, full-screen, huge):**
> **It makes people *feel* something.**

The portrait (`abhinay-camera.jpg`, from the ARRI image) is revealed via a clip-path wipe (like a transition in an NLE) beside the manifesto, with the signature `Abhinay Singh` in thin script (SVG path drawn on scroll, echoing the signature in the brand graphic).

---

## 13. Product / Service Section — "How We Work" (SC.05)

**Purpose:** Make hiring feel easy and clear.

**Part A: Process timeline** (4 steps on a horizontal "timeline track" with a playhead that moves as you scroll):
| Step | Name | Description |
|---|---|---|
| 01 | **Brief** | We talk goals, audience, platform and vibe. You share footage, assets, references. |
| 02 | **Cut** | I build the first edit: structure, pacing, music, story. |
| 03 | **Craft** | Color, sound, motion, typography, graphics. The polish that makes it premium. |
| 04 | **Deliver** | Platform-ready exports (9:16, 1:1, 16:9), thumbnails and revisions until it's right. |

**Part B: "Who it's for"** (3 cards, hover-tilt):
- **Brands & Businesses:** promo videos, ads, campaign creatives.
- **Creators & Personal Brands:** reels, YouTube edits, thumbnails, a consistent look.
- **Services & Agencies:** travel, immigration, consulting; content that builds trust.

Each card ends with `Start a project →` linking to `#contact`.

---

## 14. Featured Work / Content Section (SC.06)

**Intro (pinned 200vh):** `v3-result.mp4`. Beats 0–7 s autoplay as a muted loop while the giant kinetic title `SELECTED WORK` scales down from 30vw to 8vw and docks top-left. Scroll then scrubs the 7–10 s pull-back, and the screen "cuts" (a 2-frame white flash) into the grid.

**Filter bar:** `All` · `Reels` · `Promo` · `Design` · `Motion`. Filtering uses a GSAP Flip-style reflow (FLIP done manually in vanilla JS).

**Grid:** Asymmetric editorial masonry that mixes 9:16 (reels) and 16:9 (promo) cards, plus 4:5 (posters).

**Card anatomy:** Media (image thumbnail; on hover, swaps to a muted preview `<video>` if one is provided). Top-left chip `REEL · 9:16`. Bottom: title, client/category, year. A custom cursor over cards becomes a `PLAY` disc.

**Lightbox:** Click opens a full-screen player with letterbox bars sliding in, title and description, and `Prev / Next` controls. `Esc` closes. Focus is trapped.

**Placeholder projects (replace with real work; structure lives in `script.js` as a `PROJECTS` array):**
| # | Title | Type | Ratio |
|---|---|---|---|
| 01 | Passport to Somewhere | Travel reel | 9:16 |
| 02 | New Country, New Chapter | Immigration promo | 16:9 |
| 03 | Launch Day | Product promo edit | 16:9 |
| 04 | Bold Type Poster Series | Graphic design | 4:5 |
| 05 | Title Sequence Study | Motion graphics | 16:9 |
| 06 | Daily Grind | Creator reel | 9:16 |
| 07 | Campaign Kit | Social creatives | 4:5 |
| 08 | Dreamframes | AI-assisted visuals | 16:9 |

> Each card clearly reads as a project slot. Placeholder thumbnails are generated stills in the brand grade. Swap `src` and `video` fields in `PROJECTS` to publish real work.

---

## 15. Final CTA Section (SC.07)

**Layout:** Full viewport, pure black, letterbox bars close in to frame it like the final shot.

**Copy**
> `SC.07 — FINAL CUT`
> **Got an idea?**
> ***Let's make people feel it.***

- Primary button: **`Let's Work Together`**, a giant pill (~20vw wide on desktop) with a magnetic hover and a red fill wipe on hover.
- Below it: **email** `abhinaysingh314@gmail.com` (click-to-copy with a "Copied ✓" toast) · **Instagram** [@itz._abhinay](https://www.instagram.com/itz._abhinay/) · **LinkedIn** [Abhinay Singh](https://www.linkedin.com/in/abhinay-singh-2a8821375/).
- Availability pill: `● Available for projects: Q4 2026` (red pulsing dot).

---

## 16. Footer

- A **giant wordmark** `ABHINAY VISUALS` at 100% width (fit-to-width type) that rises from below with a parallax reveal and is clipped by the viewport bottom.
- Columns: *Navigate* (Work · Services · Story · Contact) · *Social* · *Say hi* (email).
- **Live local clock:** `INDIA — 14:32 IST`.
- **"Rewind" back-to-top button:** `◀◀ REWIND`. Clicking it smooth-scrolls to top while the timecode HUD counts backwards.
- Legal line: `© 2026 Abhinay Visuals. All frames reserved.`

---

## PART III — DESIGN SYSTEM

---

## 17. Complete Visual Style Guide

### Color tokens
```css
--void:      #070707;  /* page background */
--charcoal:  #111111;  /* section layers */
--graphite:  #1B1B1B;  /* cards, panels */
--line:      #2A2A2A;  /* hairlines, borders */
--smoke:     #8C8C8C;  /* secondary text */
--ash:       #BDBDBD;  /* tertiary text / muted UI */
--bone:      #F2EFEA;  /* primary text (warm off-white) */
--rec:       #FF3B2F;  /* REC Red: the only accent */
--rec-glow:  rgba(255, 59, 47, .35);
```
**Usage ratio:** 85% void/charcoal · 12% bone/grey · **≤3% REC Red**.

### Spacing & grid
- 12-column grid, `--gutter: clamp(16px, 2vw, 32px)`, side margin `clamp(16px, 4vw, 64px)`.
- Section padding: `clamp(96px, 16vh, 200px)` top/bottom.
- Radius: `0` on media (cinematic hard frames), `999px` on pills, `4px` on chips.

### Components
- **Corner brackets:** a 12px L-shaped `--ash` stroke on all 4 corners of media (safe-area look).
- **Chips:** mono 11px uppercase, 1px `--line` border, `--smoke` text.
- **Buttons:** Primary is a bone fill with void text plus a magnetic effect and red wipe. Ghost is a 1px bone border.
- **Labels:** `SC.0X — NAME` in mono 12px, letter-spacing .12em, `--smoke`.

### Texture
- **Film grain:** an inline SVG `feTurbulence` noise tile at ~6% opacity, `mix-blend-mode: overlay`, animated by jittering `background-position` at 8 fps via CSS `steps()`.
- **Vignette:** a radial gradient overlay on video sections.
- **Scanline shimmer** (very faint) on the preloader only.

---

## 18. Typography

| Role | Font | Settings |
|---|---|---|
| **Display / kinetic** | **Archivo** (variable; `wdth 62–125`, `wght 100–900`) | Uppercase, tracking -0.03em, line-height .85 |
| **Editorial accent** | **Instrument Serif** (italic) | For emotive words: *feel*, *editor*, *it*. Tracking -0.01em |
| **Body** | **Inter** (variable) | 17–19px, line-height 1.55, `--ash` |
| **HUD / labels / timecode** | **JetBrains Mono** | 11–13px, uppercase, tracking .12em, tabular numbers |

All from Google Fonts with `display=swap`, preconnected, and only the needed axes/weights loaded.

**Type scale (fluid)**
```
--fs-mega:  clamp(80px, 22vw, 380px)   /* hero wordmark, footer */
--fs-h1:    clamp(48px, 9vw, 160px)
--fs-h2:    clamp(40px, 6vw, 104px)
--fs-h3:    clamp(28px, 3.2vw, 52px)
--fs-lead:  clamp(22px, 2.2vw, 34px)
--fs-body:  clamp(16px, 1.1vw, 19px)
--fs-mono:  12px
```

**Kinetic typography rules**
- Use the **variable width axis** as a motion tool. Headlines stretch or compress on scroll and velocity.
- Headlines reveal via **masked line slide-up** (each line in an `overflow:hidden` wrapper, `yPercent: 110 → 0`, stagger .08).
- Split text is done with a small custom vanilla splitter (chars/words/lines). No paid SplitText.
- The marquee skews up to ±8° based on Lenis velocity.

---

## 19. Animation Direction

**Principle:** *Edit, don't decorate.* Every animation should feel like a deliberate cut, dissolve or camera move.

| Token | Value |
|---|---|
| Ease primary | `expo.out` (reveals) · CSS `cubic-bezier(.16,1,.3,1)` |
| Ease cinematic | `power3.inOut` (pins, wipes) |
| Duration | Micro 0.25 s · UI 0.6 s · Reveal 1.1 s · Scene 1.6 s |
| Stagger | 0.06 (chars 0.02) |

**Signature moves**
1. **Letterbox cut:** black bars snap from 0 → 12vh → 0 in 0.5 s between major scenes.
2. **Clip-path wipe:** images reveal with `inset(0 100% 0 0) → inset(0 0 0 0)`, like an NLE wipe.
3. **Match cut:** the hero video scales into a card frame as the next section enters.
4. **Frame flash:** a 2-frame (≈80 ms) white or red flash at the Work section cut.
5. **Width squeeze:** Archivo `wdth` morph on hero and footer type.
6. **Timecode count:** the HUD counts frames with scroll and rewinds on back-to-top.

**Preloader (≈2.2 s max; skipped for returning visitors via `sessionStorage`)**
- Black screen with a mono timecode counting `00:00:00:00 → 00:00:02:00` alongside the real asset-load %.
- A slate appears: `ABHINAY VISUALS · SCENE 01 · TAKE 01`, with the clapper bar animating closed (`clack`).
- Letterbox bars open to reveal the hero video frame 0.

---

## 20. Interaction Design

- **Custom cursor:** a small bone dot plus a trailing ring (lerped). States:
  - Links/buttons: the ring grows and inverts (`mix-blend-mode: difference`).
  - Work cards: the ring becomes a red `PLAY` disc.
  - Video scrub zones: the ring shows `◀ SCRUB ▶`.
  - Hidden on touch devices.
- **Magnetic buttons:** CTAs pull toward the cursor (max 12px) and spring back with `elastic.out`.
- **Hover-to-preview:** work cards swap the still for a muted video preview after a 150 ms hover-intent delay.
- **Tilt cards:** "Who it's for" cards tilt ±6° with a moving specular highlight.
- **Click-to-copy email** with a toast.
- **Nav:** hides on scroll down, shows on scroll up. The active section is underlined with a red playhead dot.
- **Keyboard:** everything is focusable, with visible focus rings (2px REC Red outline, offset 3px). Lightbox supports `←` `→` and `Esc`.
- **Sound (optional, default OFF):** an `♪ SOUND OFF/ON` toggle in the HUD plays a subtle UI tick on the slate clap and card hovers. The choice is saved in `localStorage`.

---

## 21. Scroll Behavior

- **Lenis** smooth scroll (`lerp: 0.08`, `smoothWheel: true`), driven by GSAP's ticker, with `ScrollTrigger.update` on Lenis scroll.
- **Video scroll-scrubbing** (Hero, Story, Work pull-back):
  - `video.currentTime = progress * duration`, applied inside a rAF with a lerp (`current += (target - current) * 0.12`) so seeking stays smooth.
  - Videos are **re-encoded for scrubbing** with dense keyframes (see §24) so seeks are instant.
  - **Fallback:** if seeking is janky (Safari on low-power devices, detected by measuring `seeked` latency > 120 ms), switch to an **image-sequence canvas scrubber** (`assets/seq/v1/0001.webp…`, 96 frames at 960w, lazy-loaded).
- **Pin durations:** Hero 300vh · Mission 150vh · Pillars (horizontal) ≈ 3 × 100vh · Story 400vh · Work intro 200vh.
- **Scroll velocity** feeds the marquee skew, grain intensity and a subtle chromatic split on the hero wordmark.
- **Snap:** none (free cinematic scroll), except the HUD scrubber, which jumps to section starts.
- **`prefers-reduced-motion`:** Lenis is disabled, pins are removed, videos show their poster frame with a play button, reveals become simple fades, and the marquee stops.

---

## 22. Mobile Behavior

- **Breakpoints:** `≤ 1024px` tablet · `≤ 640px` phone. 16px side gutter, no horizontal overflow.
- **Videos:** serve `*-720.mp4` (lighter) on phones. Scrub is kept for Hero and Story but pin lengths are **halved**. The Work intro uses an autoplay loop (no scrub).
- **Pillars:** the horizontal pin becomes a **vertical stack** of full-width panels.
- **Work grid:** 1 column (reels full-width 9:16), filter bar becomes a horizontally scrollable chip row. Tap opens the lightbox (no hover previews).
- **Nav:** collapses into a `MENU` button that opens a full-screen overlay with huge stacked links (staggered reveal) and a timecode in the corner.
- **Cursor, magnetic and tilt effects are disabled** (touch).
- **HUD:** only the timecode shows (the scrubber is hidden), sitting above the safe-area inset.
- **Hero wordmark:** stacks `ABHINAY` / `VISUALS` at ~19vw so it still bleeds edge to edge.
- **Performance:** grain is a static tile (no animation) and the velocity effects are off.

---

## PART IV — IMPLEMENTATION INSTRUCTIONS FOR CLAUDE CODE

---

## 23. Technical Implementation

### 23.1 File structure
```
/ (project root)
├── index.html
├── style.css
├── script.js
├── BUILD-PLAN.md
└── assets/
    ├── video/
    │   ├── v1-editor.mp4        (1080p, scrub-encoded)
    │   ├── v1-editor-720.mp4    (mobile)
    │   ├── v1-editor-poster.jpg
    │   ├── v2-process.mp4 / -720.mp4 / -poster.jpg
    │   └── v3-result.mp4  / -720.mp4 / -poster.jpg
    ├── seq/                     (optional fallback image sequences)
    │   ├── v1/0001.webp …
    │   └── v2/0001.webp …
    ├── img/
    │   ├── abhinay-portrait.jpg   (from bl6crz)
    │   ├── abhinay-camera.jpg     (from eowdh4)
    │   ├── abhinay-editing.jpg    (from 9bfe2x)
    │   ├── studio.jpg             (from k0cvfk)
    │   ├── work-01.jpg … work-08.jpg
    │   └── og-image.jpg           (1200×630)
    └── favicon.svg                (AV monogram, red dot)
```

### 23.2 CDN libraries (end of `<body>`, `defer`)
```html
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js" defer></script>
<script src="script.js" defer></script>
```
Fonts: Google Fonts link for Archivo (wdth, wght axes), Instrument Serif (italic), Inter, JetBrains Mono, with `preconnect`.

### 23.3 `index.html` requirements
- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<section id=…>` for each scene, `<footer>`.
- Full SEO: `<title>Abhinay Visuals: Video Editor & Graphic Designer</title>`, meta description, Open Graph and Twitter cards, `theme-color #070707`, and JSON-LD `Person` schema (name, jobTitle, sameAs).
- Videos: `<video muted playsinline preload="metadata" poster="…">` with `<source>` chosen by JS based on viewport. Hero poster is `fetchpriority="high"`.
- Every decorative element gets `aria-hidden="true"`. Split-text elements keep an `aria-label` with the full sentence.
- A skip link: `Skip to work`.

### 23.4 `style.css` architecture
1. `:root` tokens (color, type, spacing, easing)
2. Reset and base (including `html.lenis` rules)
3. Layout utilities (grid, container)
4. Components (buttons, chips, brackets, cursor, HUD, grain, letterbox, preloader)
5. Sections in page order
6. Media queries (1024, 640)
7. `@media (prefers-reduced-motion: reduce)`
- Use `clamp()` for all fluid sizes and `font-variation-settings` for Archivo width.
- Use `will-change` only on elements that are actively animating (added and removed via JS).

### 23.5 `script.js` modules (plain functions, one file)
```
init()
 ├─ preloader()          timecode + asset-loading promise + slate + letterbox open
 ├─ initLenis()          Lenis ↔ gsap.ticker ↔ ScrollTrigger bridge
 ├─ splitText(el)        chars/words/lines splitter (vanilla)
 ├─ hud()                timecode (scroll→frames @24fps), scene label, scrubber segments
 ├─ videoScrub(el, opts) pinned ScrollTrigger → lerped currentTime; seek-latency fallback → canvasSequence()
 ├─ canvasSequence()     image-sequence scrubber (lazy preload, drawImage cover-fit)
 ├─ heroTimeline()       wordmark split + wdth squeeze + role typewriter + headline + CTAs
 ├─ statsStrip()         velocity marquee + counters (IntersectionObserver)
 ├─ missionReveal()      word opacity scrub
 ├─ pillarsHorizontal()  pinned x-scroll (desktop) via matchMedia
 ├─ storyChapters()      chapter swap synced to video progress + signature SVG draw
 ├─ processTimeline()    playhead across 4 steps
 ├─ workSection()        intro title dock + flash cut + PROJECTS render + filter FLIP + lightbox
 ├─ cursor()             dot + ring + contextual states (pointer:fine only)
 ├─ magnetic()           magnetic buttons
 ├─ clock()              IST clock
 └─ copyEmail()          clipboard + toast
```
- Use `gsap.matchMedia()` for desktop, mobile and reduced-motion variants.
- Call `ScrollTrigger.refresh()` after fonts load (`document.fonts.ready`) and after video metadata loads.
- The `PROJECTS` array at the top of `script.js` is the single source of truth for the work grid (title, type, ratio, year, thumb, video, description).

### 23.6 Video encoding for smooth scrubbing (ffmpeg)
```bash
# Scrub-optimized 1080p (keyframe every 2 frames, no B-frames, fast-start)
ffmpeg -i raw.mp4 -vf "scale=1920:-2,fps=24" -c:v libx264 -preset slow -crf 22 \
  -g 2 -keyint_min 2 -bf 0 -pix_fmt yuv420p -movflags +faststart -an v1-editor.mp4
# Mobile 720p
ffmpeg -i raw.mp4 -vf "scale=1280:-2,fps=24" -c:v libx264 -crf 25 -g 4 -bf 0 \
  -pix_fmt yuv420p -movflags +faststart -an v1-editor-720.mp4
# Poster
ffmpeg -i v1-editor.mp4 -vframes 1 -q:v 3 v1-editor-poster.jpg
# Fallback sequence (96 frames, 960w webp)
ffmpeg -i raw.mp4 -vf "fps=9.6,scale=960:-2" -c:v libwebp -quality 70 seq/v1/%04d.webp
```

### 23.7 Performance budget
| Metric | Target |
|---|---|
| LCP | < 2.0 s (hero poster preloaded) |
| CLS | < 0.05 (aspect-ratio on all media) |
| JS (own) | < 40 KB unminified |
| Initial transfer | < 1.5 MB before video streams |
| Each 1080p scrub video | ≤ 8 MB · 720p ≤ 3.5 MB |
| FPS while scrolling | 60 on desktop |

- Lazy-load everything below the fold (`loading="lazy"`, and only set video `src` when within 1 viewport of entering).
- Pause offscreen videos with IntersectionObserver.
- Only animate transforms and opacity (plus `font-variation-settings` on a small number of headline nodes).
- Batch DOM reads and writes and avoid layout thrash in cursor/magnetic handlers.
- If assets are missing (videos not yet generated), sections fall back to poster images or the reference stills, so the site never breaks.

### 23.8 Accessibility checklist
- Color contrast: bone on void is 17:1, smoke on void is 5.9:1 (AA).
- Reduced motion respected throughout.
- All interactive elements are keyboard reachable with visible focus.
- Lightbox is `role="dialog"`, `aria-modal`, with a focus trap and restore.
- Videos are muted and decorative (`aria-hidden`) because the copy carries the meaning.

### 23.9 Build order (for Claude Code)
1. Create `/assets` structure. Copy the reference images from `media /` to `assets/img/` with clean names and resize to ≤ 2000px, compressed.
2. Generate the Higgsfield Seedance 2.0 videos (§5–6) and work thumbnails, then download them to `/assets/video` and `/assets/img`. Encode per §23.6.
3. Write `index.html` (all sections, final copy from this plan).
4. Write `style.css` (tokens, then components, then sections, then responsive).
5. Write `script.js` (modules in the order above).
6. Preview locally. Test desktop, 768px and 375px, plus reduced motion. Check the console for errors and scrub smoothness.
7. Final polish pass: timing, easing, spacing, copy.

### 23.10 Content to confirm before launch
- [ ] "3+ years" experience figure
- [x] Contact email, Instagram, LinkedIn links (WhatsApp not provided, so it's omitted)
- [ ] Real project files (thumbnails and preview clips) to replace placeholders
- [ ] Availability window text

---

*End of Master Build Plan: Abhinay Visuals v1.0*

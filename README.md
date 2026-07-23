# AI Living Labs Foundation — Slightly Darker Hero Build

This delivery uses the approved slightly darker lavender-to-cyan AI Living Labs hero atmosphere with the original Andhra Pradesh creative map. The hero text, CTA and compact foundation cards remain accessible, responsive HTML rather than being baked into an image.

This is a true multi-page static website built without React, Angular, Vue, Node.js, npm packages, bundlers, or framework dependencies.

## Physical HTML pages

- `index.html` — Home
- `innovation-arena.html` — Innovation Arena
- `hackathon-arena.html` — Hackathon Arena
- `dev-studio.html` — Dev Studio
- `data-collection.html` — Data Collection Ecosystem
- `government-data.html` — Government Data Sandbox
- `learn.html` — Learn / Coming Soon
- `community.html` — Community / Coming Soon
- `impact.html` — Impact / Coming Soon

Shared files:

- `styles.css` — all styling and responsive layouts
- `app.js` — vanilla JavaScript rendering and interactions
- `assets/` — local images, partner marks, favicon and video

## Quick preview

You can open `index.html` directly in a modern browser. All navigation links point to physical sibling `.html` files.

For the most reliable local preview, open a terminal in this folder and run:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/index.html
```

## Deployment

Upload the complete contents of this folder to the web root. Keep all nine HTML files, `styles.css`, `app.js`, and `assets/` together with the same relative structure.

No install command, framework runtime, build process, Git workflow, or server rewrite is required. Each page can be opened or refreshed directly through its own `.html` URL.

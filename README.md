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
- `signin.html` — Portal sign in
- `signup.html` — Three-step portal account preview
- `dashboard.html` — Workspace overview
- `tracks.html` — Proposed four-track pathway
- `track.html` — Reusable track-detail page
- `usage.html` — Sample infrastructure and cluster usage
- `billing.html` — Sample plan, costs and invoice history
- `profile.html` — Session profile
- `support.html` — Preview support form

Shared files:

- `styles.css` — all styling and responsive layouts
- `app.js` — vanilla JavaScript rendering and interactions
- `portal.css` — portal design system and responsive app shell
- `portal-data.js` — proposed track content and clearly labelled sample operational data
- `portal-store.js` — local preview session and profile state
- `portal.js` — portal rendering, validation and interactions
- `assets/` — local images, partner marks, favicon, video and portal icons

## Portal preview notice

The portal is a static review prototype. Sign in accepts a valid email format and an eight-character password to create a local demo session; passwords are never stored or sent. Track progress, clusters, resource usage, costs and invoices are explicitly labelled sample data. Secure production authentication, authorization, live infrastructure telemetry and real billing require backend services.

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

Upload the complete contents of this folder to the web root. Keep all 18 HTML files, the shared CSS and JavaScript files, and `assets/` together with the same relative structure.

No install command, framework runtime, build process, Git workflow, or server rewrite is required. Each page can be opened or refreshed directly through its own `.html` URL.

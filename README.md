# KCS at York

A slideshow for directors on York University's proposed KCS rollout. Built as a static GitHub Pages site, with no runtime framework, server API, analytics, or remote font requests.

## Experience

Eight full-screen slides cover the case for change, the two KCS loops, a branching agent Solve walkthrough, readiness gates, operating roles, evidence and director commitments. Black, white and York red backgrounds, large type and diagrams support live delivery. Each default slide has no more than 65 visible words; detailed methodology and caveats live in presenter notes and the complete reading/print view.

Use the fullscreen toolbar button, arrow keys, Space or a presentation remote (Page Up / Page Down). Section links remain stable. The director discussion form opens on demand; notes remain local with text export.

The agent walkthrough includes all six combinations of missing/current/improvable knowledge and requester self-solve/agent-assisted resolution. Backtracking and restart support exploration. It performs no live Halo actions.

**Dates and local operating details are proposed.** See [SOURCES.md](SOURCES.md) before presenting as an approved plan.

## Develop

Node.js 24 is used by CI; Node 22+ is supported. Work in the existing `/workspace/KCS` checkout. Cloud tasks already have isolated workspaces; do not create an additional worktree unless explicitly requested.

```sh
npm ci --cache /tmp/york-kcs-npm-cache
npm run build
npm start
```

The static server runs on port 4173. Both the root route and `/KCS/` work locally. Relative asset URLs support GitHub project Pages. `dist/` contains the complete publishable site and can be served without Node after building.

## Validate

```sh
npm test
```

Playwright uses `/usr/bin/chromium` by default. Override `CHROMIUM_PATH` with an installed Chromium executable on another machine. CI uses the Chromium or Google Chrome already installed on the GitHub-hosted runner and sets this variable automatically, avoiding redundant browser and system-package downloads.

The suite exercises all sections and tab states, all six walkthrough routes, backtracking, storage persistence and unavailable storage, export contents, keyboard navigation and dialog focus, reading/print modes, no-JavaScript content, mobile/tablet/desktop overflow, fullscreen and presentation-remote controls, 1366×768 and 1920×1080 slide fit, a 65-word default-slide budget, and automated WCAG 2.2 AA checks with axe. Automated checks do not replace human accessibility review.

## Publish to GitHub Pages

The `Validate and deploy briefing` workflow tests pull requests and builds, tests and deploys `main` through GitHub Actions. Repository Pages source must be **GitHub Actions**. The workflow uses `pages: write` and `id-token: write` for deployment; content access is read-only.

Expected site address: `https://oathpros.github.io/KCS/`. Deployment success and the actual public HTTP response must be checked before treating that address as live.

GitHub Pages publishes this briefing. Keep future edits suitable for public access. Browser discussion notes remain on the viewer's device; clearing them affects only that browser. They are not a formal approval record.

## Content and implementation

- `src/content.js`: presentation text, source references, interactive state content, and static templates.
- `src/app.js`: navigation, accessibility behaviours, agent walkthrough state and local notes.
- `src/styles.css`: scoped responsive styles, reduced motion and print layout.
- `scripts/build.mjs`: creates the static output, versions the presentation module graph and stylesheet for cache-safe updates, and bundles locally served open-source fonts with licenses.
- `scripts/serve.mjs`: development server, not a production requirement.
- `tests/briefing.spec.js`: functional and accessibility checks.
- [SOURCES.md](SOURCES.md): provenance and factual limitations.

DM Sans and Instrument Serif are distributed with their OFL licenses in the built font directory. KCS® is a service mark of the Consortium for Service Innovation™. This is a York rollout briefing, not a Consortium-certified product.

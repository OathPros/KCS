# KCS at York

A slideshow for directors on York University's proposed KCS rollout. Built as a static GitHub Pages site, with no runtime framework, server API, analytics, or remote font requests.

## Experience

Twelve full-screen slides cover the case for change, benefits by entity and time horizon, the two KCS loops, a branching agent Solve walkthrough, launch permissions, rollout gates, communications and support, ownership, evidence, leadership questions and director commitments. Black, white and York red backgrounds, large type and diagrams support live delivery. Each default slide has no more than 65 visible words; detailed methodology and caveats live in presenter notes and the complete reading/print view.

Desktop presentation is the primary layout: type, controls and diagrams scale to the available slide area from 720p through QHD. Solve and Evolve use independently closed circular tracks with direction arrows and a two-way feedback connection. Selecting a practice highlights its corresponding arc; arrow keys move between practices within each loop. Phones retain the compact two-column practice layout.

Use the fullscreen toolbar button, arrow keys, Space or a presentation remote (Page Up / Page Down). Section links remain stable. The director discussion form opens on demand; notes remain local with text export.

The benefits explorer covers students, faculty and staff, IT agents, IT teams (including local faculty/unit teams), service owners and York leadership across launch/pilot, winter/spring 2027, and summer 2027 onward. These are expected benefits to validate, not measured savings. A complete matrix and validation prompts are included in reading/print view.

The agent walkthrough includes all six combinations of missing/current/improvable knowledge and requester self-solve/agent-assisted resolution. Backtracking and restart support exploration. It performs no live Halo actions. A keyboard-accessible workflow-map dialog shows the complete branching process.

The roadmap follows the supplied leadership and communications PDFs: planned 19 November 2026 agent launch; onboarded pilot authors in SSB, OUR, CTS and CS; winter refinement; spring adoption waves; conditional summer community self-service. Training sessions, named support and launch approval still require confirmation.

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

The suite exercises all sections and tab states, the six-entity benefits matrix, leadership Q&A, the workflow-map dialog, all six walkthrough routes, backtracking, storage persistence and unavailable storage, export contents, keyboard navigation and dialog focus, reading/print modes, no-JavaScript content, mobile/tablet/desktop overflow, fullscreen and presentation-remote controls, 1280×720 through 2560×1440 slide fit, true circular loop geometry, label separation, selected-arc highlighting, desktop reading-view legibility, a 65-word default-slide budget, and automated WCAG 2.2 AA checks with axe. Automated checks do not replace human accessibility review.

## Export a portable briefing

After `npm run build`, run `node scripts/export.mjs` to create `artifacts/KCS-leadership-briefing.html`. The single file embeds the font, styles, script and diagram; it can be opened directly without a server. The adjacent DM Sans license accompanies distribution. The original uploaded PDFs and HTML examples are not bundled.

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

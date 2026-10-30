# KCS at York

A slideshow for directors on York University's KCS rollout. Built as a static GitHub Pages site, with no runtime framework, server API, analytics, or remote font requests.

## Experience

Twelve full-screen slides cover the case for change, benefits by entity and time horizon, the two KCS loops, a complete agent Solve flow, launch permissions, rollout gates, communications and support, ownership, evidence, leadership questions and director commitments. Black, white and warm neutral fields, York-red accents, large type and diagrams support live delivery. Default slides have a 65-word budget, with allowances of 130 words for the requested complete communications/website register and 120 for coaching/council/director participation, and 160 for the three complete success aims; detailed methodology and caveats live in presenter notes and the complete reading/print view.

Desktop presentation is the primary layout: type, controls and diagrams scale to the available slide area from 720p through QHD. Solve and Evolve use independently closed circular tracks with direction arrows and a two-way feedback connection. Selecting a practice highlights its corresponding arc; arrow keys move between practices within each loop. Phones retain the compact two-column practice layout.

Use the fullscreen toolbar button, arrow keys, Space or a presentation remote (Page Up / Page Down). Section links remain stable. The director discussion form opens on demand; notes remain local with text export.

The benefits explorer covers Our customers, Our agents and Our institution across launch/pilot, winter/spring 2027, and summer 2027 onward. The user’s annotated screenshots guide the benefits: ticket-based resolution sharing, consistency, community self-service, less repeated agent work, cross-team knowledge, knowledge maintenance, evidence of service gaps and future automation. These are expected benefits to validate, not measured savings. A complete matrix and validation prompts are included in reading/print view.

The agent walkthrough includes all six combinations of missing/current/improvable knowledge and requester self-solve/agent-assisted resolution. Backtracking and restart support exploration. It performs no live Halo actions. The presentation shows the complete flow directly on the Solve Loop slide. The interactive walkthrough is preserved on its own page at `solve-loop.html`, with all six paths, backtracking and restart.

The roadmap follows the supplied leadership and communications PDFs: planned 19 November 2026 agent launch; onboarded pilot authors in SSB, OUR, CTS and CS; winter refinement; spring adoption waves; conditional summer community self-service. Training sessions, named support and launch approval still require confirmation.

**Dates and local operating details are proposed.** See [SOURCES.md](SOURCES.md) before presenting as an approved plan.

The communications slide shows the executive, pilot-manager, all-agent and pilot-participant messages, their timing and purpose, plus linked KB project, KCS @ York and Pilot Hub websites. Website roles reflect the supplied communications draft, not a live-site audit.

The coaching slide explains how coaches develop judgement using real work and how the Knowledge Council uses frontline evidence to co-create the shared content standard and address cross-team barriers. Its director call to action opens the existing local-only discussion form.

The success slide displays Better support, Healthy knowledge and Sustainable adoption together. Each aim includes its question, evidence to review and the improvement decision it informs. Full measurement cautions remain in notes and print view.

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

The suite exercises all sections and tab states, the three-group benefits matrix, leadership Q&A, the static Solve flow, all six walkthrough routes, backtracking, storage persistence and unavailable storage, export contents, keyboard navigation and dialog focus, reading/print modes, no-JavaScript content, mobile/tablet/desktop overflow, fullscreen and presentation-remote controls, 1280×720 through 2560×1440 slide fit, true circular loop geometry, label separation, selected-arc highlighting, desktop reading-view legibility, the presentation word budgets, and automated WCAG 2.2 AA checks with axe. Automated checks do not replace human accessibility review.

## Export a portable briefing

After `npm run build`, run `node scripts/export.mjs` to create `artifacts/KCS-leadership-briefing.html`. The single file embeds the font, styles, script and diagram; it can be opened directly without a server. The adjacent DM Sans license accompanies distribution. The original uploaded PDFs and HTML examples are not bundled.

The build also produces `artifacts/KCS-solve-loop-interactive.html` (a self-contained page) and `artifacts/KCS-solve-loop-embed.html` (a scoped HTML/CSS/JS block to paste into a separate page). Both preserve the interactive model independently of the deck.

## Publish to GitHub Pages

The `Validate and deploy briefing` workflow tests pull requests and builds, tests and deploys `main` through GitHub Actions. Repository Pages source must be **GitHub Actions**. The workflow uses `pages: write` and `id-token: write` for deployment; content access is read-only.

Expected site address: `https://oathpros.github.io/KCS/`. Deployment success and the actual public HTTP response must be checked before treating that address as live.

GitHub Pages publishes this briefing. Keep future edits suitable for public access. Browser discussion notes remain on the viewer's device; clearing them affects only that browser. They are not a formal approval record.

## Content and implementation

- `src/content.js`: presentation text, source references, interactive state content, and static templates.
- `src/app.js`: navigation, accessibility behaviours, and local notes.
- `src/solve-walkthrough.js`: standalone interactive walkthrough state and keyboard focus.
- `src/styles.css`: scoped responsive styles, reduced motion and print layout.
- `scripts/build.mjs`: creates the static output, versions the presentation module graph and stylesheet for cache-safe updates, and bundles locally served open-source fonts with licenses.
- `scripts/serve.mjs`: development server, not a production requirement.
- `tests/briefing.spec.js`: functional and accessibility checks.
- [SOURCES.md](SOURCES.md): provenance and factual limitations.

DM Sans and Instrument Serif are distributed with their OFL licenses in the built font directory. KCS® is a service mark of the Consortium for Service Innovation™. This is a York rollout briefing, not a Consortium-certified product.

Presentation copy uses direct leadership language throughout. Demo labels, placeholder prompts, unresolved-field messages and repeated approval disclaimers are omitted from slides, notes, print output and discussion exports. Source provenance and unresolved planning details remain documented in SOURCES.md.

The opening slide contains only “Knowledge is coming to Halo” and “November 19” on its left half. Its right half adapts the supplied curved-arrow Solve/Evolve component with keyboard-accessible loop and practice buttons. Slide and panel titles use short descriptive wording without periods.

Benefits sit immediately before the success/evidence slide. The palette uses York red (#E31837) for accents and dark red (#B5122B) where small text needs more contrast, with white, warm neutral and black fields. No slide uses a full red background.

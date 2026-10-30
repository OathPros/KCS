# Halo KB Launch & Pilot Announcement

A slideshow announcing York University's Halo knowledge base launch and KCS pilot. Built as a static GitHub Pages site, with no runtime framework, server API, analytics, or remote font requests.

## Experience

Twelve slides cover purpose, the agent Solve flow, launch permissions, the rollout, communications and websites, coaching and council, participation and recognition, benefits, success aims and questions, plus the KCS practice basis for coaching, shared standards and the council. The opening contains the interactive Solve/Evolve diagram. Large type, black/white/warm neutral surfaces and York-red accents support live delivery.

The latest user-edited `KCS-leadership-review (1).html` is the content baseline. Its deletions are preserved, the separate methodology slide is removed, and the voice is a colleague speaking with peers. Presenter notes, note controls, the notes keyboard shortcut and the print companion are removed from the source and HTML export. Reading and print views contain the slides only. The final commitments slide, its capture button and the now-unused local discussion form are removed. The deck ends with questions for discussion.

Use fullscreen, arrow keys, Space or a presentation remote (Page Up / Page Down). Section links remain stable. The opening loop supports mouse and keyboard selection of its eight practices. Desktop presentation scales from 720p through QHD; smaller screens use a scrolling document layout.

Benefits cover Our customers, Our agents and York across launch/pilot, winter/spring 2027 and summer 2027 onward. These are expected benefits, not measured York savings. The roadmap follows the supplied planning PDFs: 19 November 2026 agent launch, onboarded pilot authors in SSB/OUR/CTS/CS, winter refinement, spring adoption waves and readiness-based summer community self-service. See [SOURCES.md](SOURCES.md) for provenance and planning limitations.

The communications register lists the pilot-manager briefing, all-agent announcement and pilot invitation. Three linked websites show their distinct purposes: announce the change and tool, explain the methodology and prepare pilots. Coaching develops judgement through real tickets; the council brings evidence together to co-create the standard and remove workflow barriers. The recognition slide pairs four desired behaviours with practical recognition, then asks us to name contributions, explain their impact and thank people in team meetings and one-to-ones. The success slide shows Better support, Healthy knowledge and Sustainable adoption together.

The static Solve slide shows every main branch. The interactive agent walkthrough is preserved independently at `solve-loop.html`, with all six routes, backtracking and restart. It performs no live Halo actions.

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

The suite checks slide navigation, tab states, keyboard controls, all six standalone walkthrough routes, responsive layouts, desktop slide fit, reading/print views, no-JavaScript content and automated WCAG 2.2 AA accessibility. Regression checks ensure uploaded deletions remain removed and presenter notes are absent from HTML, controls and printing. Automated checks do not replace human accessibility review.

## Export a portable briefing

After `npm run build`, run `node scripts/export.mjs` to create `artifacts/Halo-KB-Launch-and-Pilot-Announcement.html`. The single file embeds the font, styles, script and diagram; it can be opened directly without a server. The adjacent DM Sans license accompanies distribution. The original uploaded PDFs and HTML examples are not bundled.

The build also produces `artifacts/KCS-solve-loop-interactive.html` (a self-contained page) and `artifacts/KCS-solve-loop-embed.html` (a scoped HTML/CSS/JS block to paste into a separate page). Both preserve the interactive model independently of the deck.

## Publish to GitHub Pages

The `Validate and deploy briefing` workflow tests pull requests and builds, tests and deploys `main` through GitHub Actions. Repository Pages source must be **GitHub Actions**. The workflow uses `pages: write` and `id-token: write` for deployment; content access is read-only.

Expected site address: `https://oathpros.github.io/KCS/`. Deployment success and the actual public HTTP response must be checked before treating that address as live.

GitHub Pages publishes this briefing. Keep future edits suitable for public access.

## Content and implementation

- `src/content.js`: presentation text, interactive state content and static templates.
- `src/app.js`: navigation, tab interactions and accessibility behaviours.
- `src/solve-walkthrough.js`: standalone interactive walkthrough state and keyboard focus.
- `src/styles.css`: scoped responsive styles, reduced motion and print layout.
- `scripts/build.mjs`: creates the static output, versions the presentation module graph and stylesheet for cache-safe updates, and bundles locally served open-source fonts with licenses.
- `scripts/serve.mjs`: development server, not a production requirement.
- `tests/briefing.spec.js`: functional and accessibility checks.
- [SOURCES.md](SOURCES.md): provenance and factual limitations.

DM Sans and Instrument Serif are distributed with their OFL licenses in the built font directory. KCS® is a service mark of the Consortium for Service Innovation™. This is a York rollout briefing, not a Consortium-certified product.

Presentation copy uses short titles without periods and a peer-to-peer voice. The palette uses York red (#E31837) and dark red (#B5122B) accents with white, warm neutral and black fields. Benefits sit immediately before evidence. No slide uses a full red background.

Generate the current review with `npm run build` then `node scripts/export.mjs artifacts/Halo-KB-Launch-and-Pilot-Announcement.html`. Exporting does not commit, publish or push changes.

The coaching slide now has the requested “Committing to future success” title and no capture button. The following slide links three KCS practice facts to how we will apply them and asks whether protected coaching/improvement time improves service outcomes relative to the capacity invested. These are practice recommendations, not an empirical estimate of individual intervention ROI. The FAQs discuss local responsibility, limited authoring, existing documentation, possible errors, expansion delays and the absence of measured York savings or a launch AI commitment. The first FAQ and user-supplied Copenhagen example are retained.

The benefits tabs share a single continuous baseline; the active third is red, and the horizon panels have no duplicate top rules. The communications and website registers share intrinsic grid rows so their matching rows align. Both layouts adapt on phones.

The browser title and Open Graph/Twitter metadata use “Halo KB Launch & Pilot Announcement” so shared links identify the launch and pilot. Audience-role labels have been removed from presentation metadata, source code and documentation.

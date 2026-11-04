# cv-web

Personal CV website of **Gonzalo Fourtané** — a single-page application to quickly show who I am, what I do and how to get in touch (LinkedIn, GitHub, email).

> 🚧 Work in progress. The site is not published until all content is reviewed.

## Stack

- [Angular 22](https://angular.dev) — standalone components, signals, new control flow, zoneless
- TypeScript (strict)
- SCSS + CSS custom properties (dark theme, no UI library)
- [Transloco](https://jsverse.gitbook.io/transloco) — runtime i18n (EN / ES)
- Vitest (unit tests), angular-eslint (lint)
- GitHub Actions (CI) + GitHub Pages (hosting)

## Requirements

- Node.js `^22.22.3` or `>=24.15` (see `.nvmrc` → `nvm use`)
- npm

## Run locally

```bash
nvm use
npm ci
npm start          # http://localhost:4200
```

Other scripts:

```bash
npm run lint       # ESLint
npm test           # unit tests (Vitest)
npm run build      # production build → dist/cv-web/browser
```

## Deploy

The site is deployed to GitHub Pages by the `deploy.yml` workflow
(build with `--base-href /cv-web/`, then `actions/upload-pages-artifact` + `actions/deploy-pages`).

Until the content is approved, deploy is **manual**: *Actions → Deploy → Run workflow*.

## Workflow

- Backlog = GitHub Issues.
- One branch per issue: `feat/<n>-name`.
- PR referencing `Closes #n`, squash merge. No direct commits to `main`.

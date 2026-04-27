# Playwright JavaScript Framework

Production-ready Playwright test framework with:

- Multi-browser execution (`chromium`, `firefox`, `webkit`)
- HTML, JSON, and JUnit reporting
- Retry and worker strategy for CI
- Trace, screenshot, and video artifacts on failures
- Separate API and Web test organization
- Page Object Model starter structure

## 1) Install

```bash
npm install
npm run install:browsers
```

## 2) Configure environment

Copy `.env.example` to `.env` and update values:

```bash
BASE_URL=https://playwright.dev
```

## 3) Run tests

```bash
npm test
```

Useful commands:

- `npm run test:headed`
- `npm run test:debug`
- `npm run test:ui`
- `npm run test:smoke`
- `npm run test:chrome`
- `npm run report`

## 4) Folder structure

```text
tests/
  api/
  fixtures/
  pages/
  web/
playwright.config.js
```

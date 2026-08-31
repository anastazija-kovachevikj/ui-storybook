# UI Components Storybook

The component library and its interactive Storybook documentation, extracted from the ClaimUW dashboard.

## Run locally

```powershell
npm ci
npm run storybook
```

Then open `http://localhost:6006`.

## Build the static site

```powershell
npm run build-storybook
```

The generated `storybook-static` folder is intentionally not committed. It can be published through GitHub Pages, Chromatic, or another static hosting provider.

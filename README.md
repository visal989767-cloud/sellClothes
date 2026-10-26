# Thread&Co Angular clothing store

A responsive, multi-page demo store built with Angular. The structure follows
the `core`, `pages`, and `shared` layout:

```text
src/app/
  core/                 Product data, types, and cart/order service
  pages/
    cart/
    catalog/
    checkout/
    invoice/
    not-found/
    order-history/
    product-detail/
  shared/               Header, footer, and reusable product card
```

## Run locally

Install the dependencies once, then start the Angular development server:

```bash
npm ci
npm start
```

The app uses hash-based routes so product, cart, checkout, and invoice links
work when hosted as a static site on GitHub Pages. Sample orders and cart items
are saved in the current browser only. Payments are demo-only; no real payments
are processed.

## Publish on GitHub Pages

This repository is configured to build and deploy with the workflow in
`.github/workflows/pages.yml`.

1. In the GitHub repository, open **Settings > Pages** and set the build source
   to **GitHub Actions**.
2. Open the **Actions** tab and check the "Deploy static site to GitHub Pages"
   workflow. It runs on pushes to `main` and can also be started manually.
3. After a successful deployment, visit:
   <https://visal989767-cloud.github.io/sellClothes/>

The workflow builds the Angular app for the repository's Pages URL and
publishes `dist/threadco/browser`.

# @trollhag/store-front

A minimalist product listing POC with infinite load, and category and search filtering.

This is a [Next.js](https://nextjs.org/) project bootstrapped using [`create-next-app`](https://github.com/vercel/next.js/tree/HEAD/packages/create-next-app) with Material UI installed.

## Getting started

Installing dependencies:

```bash
npm install
npx playwright install-deps
```

Run in development mode:

```bash
npm run dev
```

Run tests:

```bash
npm t
```

Run in production mode:

```bash
npm ci
npm run build
npm run start
```

## Assumptions based on loose requirements

- Filtering products (either by category or search) is done server side to prevent issues for example when loading more products and no new products appears because the result did not match the filters; and avoid forcing to load all products.

## Mistakes made

- Tests were supposed to be unit tests, but are now end-to-end tests.


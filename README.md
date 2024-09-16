# @trollhag/store-front

This is a [Next.js](https://nextjs.org/) project bootstrapped using [`create-next-app`](https://github.com/vercel/next.js/tree/HEAD/packages/create-next-app) with Material UI installed.

## Getting started

Run in development mode:

```bash
npm install
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

## Assumtions based on loose requirements

- Filtering products (either by category or search) is done server side to prevent issues for example when loading more products and no new products appears because the result did not match the filters; and avoid forcing to load all products.

## Misstakes made

- Tests where supposed to be unit tests, but is now end-to-end tests. 
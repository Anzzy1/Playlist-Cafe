# Playlist Cafe Antipolo

Landing page built with [Astro](https://astro.build), Tailwind CSS v4 and TypeScript. GSAP drives the scroll motion, and Lenis adds smooth scrolling on desktop.

```sh
npm install
npm run dev       # local dev server (also reachable from your phone on the same Wi-Fi)
npm run build     # static site -> dist/
npm run preview   # serve the built site
```

- `src/data/site.ts`: contact info, the full menu, highlights and gallery photos
- `src/components/`: one component per page section
- `src/scripts/`: client-side behaviour (nav, menu sheet, lightbox, motion)
- `src/assets/`: source photos, converted to responsive WebP at build time

# Zafeer Rangoonwala portfolio

React, TypeScript and Vite. The hero scene uses Three.js through React Three Fiber and loads lazily.

## Scripts

- `npm run dev` starts the dev server
- `npm run build` type checks and builds
- `npm run lint` runs ESLint

## Structure

- `src/index.css` design tokens (spacing, radius, colors), named text styles, buttons, motion
- `src/App.css` layout for each section
- `src/components` nav, buttons, reveal hook, 3D hero scene
- `src/sections` page sections
- `src/data` projects and copy. Edit `content.ts` for text, stats and FAQ.

## Motion layer

- `src/motion/progress.ts` scroll progress (`--p`) for the pinned hero, timeline and project rail
- `src/motion/CursorField.tsx` pointer particle trail and click bursts
- `src/motion/eggs.tsx` three easter eggs: Konami code, five clicks on the logo, typing `kafka`
- `src/components/Sandbox.tsx` the draggable cube physics playground

Every effect checks `prefers-reduced-motion` and falls back to a static layout.

## Placeholders

Anything marked `ABC` is a value still needed. Hover or focus it to see what to fill in. Search for `<Placeholder` in `src/sections` and `placeholder:` in `src/data/content.ts`, then replace the component with the real text.

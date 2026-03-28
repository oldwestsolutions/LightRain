# LightRa.in — Merchant Dashboard (Demo SPA)

A dark, cyber-minimal single-page application for **LightRain** (www.lightra.in): a mocked high-risk crypto payment experience for THC and cannabis merchants. Built with **Create React App**–style tooling (no Vite), **React 19**, **TypeScript**, **Tailwind CSS**, **Zustand**, and **Lucide React**.

## Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** (comes with Node)

## Quick start (from scratch)

If you are cloning into an empty folder, scaffold with Create React App using the TypeScript template, then add dependencies:

```bash
npx create-react-app . --template typescript
```

Then install the additional packages used by this project:

```bash
npm install zustand lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Replace the generated `tailwind.config.js`, `postcss.config.js`, and `src/index.css` with this repo’s versions, and copy over the `src` files as needed.

## Run this repository

From the project root:

```bash
npm install
npm start
```

The app opens at [http://localhost:3000](http://localhost:3000).

- **Demo login:** email `demo@lightra.in`, password `demo123` (any password works; auth is mocked).
- After login, a **500ms** loading state runs, then the dashboard appears.
- Use **Copy** on the federation address to see a toast: “Address copied!”
- **Send Payment** and **View Profile** open modals with mock forms and details.

## Production build

```bash
npm run build
```

Static output is written to `build/`. Serve it with any static host or `npx serve -s build`.

## Tech stack

| Layer        | Choice                          |
| ------------ | ------------------------------- |
| UI           | React 19 + TypeScript           |
| Styling      | Tailwind CSS 3                  |
| Icons        | Lucide React                    |
| State        | Zustand (auth + toast)          |
| Bundler      | react-scripts (CRA / webpack)     |

There is **no backend**; merchants, login, and payments are entirely client-side mocks.

## Project layout

- `src/App.tsx` — routes between login and dashboard via Zustand
- `src/main.tsx` — React 19 `createRoot` entry
- `src/index.tsx` — CSS import + loads `main`
- `src/index.css` — Tailwind directives + scanline utility
- `src/store/` — `useAuthStore`, `useToastStore`
- `src/data/merchants.ts` — fake merchant directory
- `src/components/` — Login, Dashboard, Navbar, MerchantCard, Modal, Toast, wallet/payment modals

## License

Private / demo use. Not financial or legal advice.

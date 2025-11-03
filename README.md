# Dura Fulfillment Dashboard

A real-time React dashboard powered by Material UI for visualizing warehouse performance metrics retrieved from the Goedgepickt platform.

## Getting started

```bash
npm install
npm run dev
```

The app is built with Vite and TypeScript. The development server defaults to `http://localhost:5173`.

## Environment variables

The frontend expects a backend proxy that exposes a `/dashboard` endpoint aggregating data from Goedgepickt. Configure a `.env` file at the project root to point to your backend:

```env
VITE_API_BASE_URL=https://your-backend.example.com
```

If you run the dashboard against a secured backend that requires a bearer token, set `VITE_GOEDGEPIKT_API_KEY` as well. Credentials should never be hard-coded in the frontend bundle.

## Data refresh

Data refreshes automatically every 30 seconds via the `useDashboardData` hook, which composes the UI cards and charts with up-to-date metrics. A manual refresh button is available on each card.

## Available scripts

- `npm run dev` – start the development server
- `npm run build` – type-check and generate a production build
- `npm run preview` – locally preview the production bundle

## Tech stack

- React 18 with functional components and hooks
- Material UI for the component library and theming
- Recharts for visual progress charts
- Vite for fast bundling and hot-module replacement

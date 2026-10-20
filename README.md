# Orbit 360

**The Community Matters 2 app suite.** One launchpad for every CM2 application. ORBIT stands for **O**utcomes, **R**ecords, **B**ehavioral **I**nsights & **T**racking.

## What's inside

- **Suite (home):** an instrument-style drawing where every app orbits the CM2 core, plus a numbered index of the suite and the four ORBIT pillars.
- **Apps:** every app as a card, filterable by area. Each app has its own page at `/apps/<id>`.
- **Insights:** the four ORBIT pillars and the apps that feed each one.
- **Roadmap:** what's planned, building and live.
- **View inside Orbit:** open an app inside the suite, or in a new tab.
- **Search:** press `Ctrl/⌘ + K`.
- **Paper and Night themes.**

## Managing the apps (office only)

Visitors can't add or change anything. The app list lives in one file:

- **Apps:** `src/data/apps.ts` (the `SUITE` list)
- **Roadmap:** `src/data/roadmap.ts`
- **Logos:** put the image in `public/logos/` and set `logo: '/logos/<file>.png'`

To add an app, copy an existing entry in `SUITE`, change its fields, then commit and push. Vercel redeploys automatically. Leave `url: ''` and set `status: 'building'` for an app that isn't live yet.

## Apps in the suite

| App | Link |
|---|---|
| Extraordinary Youth Summer Camp | https://eyscorbitcampmanagement.vercel.app/ |
| Ignite Academy | https://igniteacademy-orcin.vercel.app/ |
| CM2 Digital Presence | https://cm-2-digital-presence.vercel.app/ |
| CM2 Community Center (2D & 3D block) | In development |
| Community Input Survey | https://cm2-survey.vercel.app/ |
| Opinion Live Wall | https://cm2-survey.vercel.app/display |
| CM2 Website | https://www.communitymatters2.org/ |

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve the production build
```

Stack: Vite, React 18, TypeScript, Tailwind CSS, lucide-react, React Router. Fonts: Fraunces, Schibsted Grotesk, IBM Plex Mono.

## Deploy to Vercel

1. Import this repo in Vercel. It detects Vite automatically.
2. Build command: `npm run build`. Output directory: `dist`.
3. `vercel.json` already rewrites all routes to `index.html`, so deep links like `/apps` work.

## Next steps

- An admin panel with sign-in, if the office wants to manage apps without editing code.
- Single sign-on across CM2 apps.
- Live data in the Insights dashboards.

© Community Matters 2 Inc.

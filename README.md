# Orbit 360

**The Community Matters 2 app suite.** One launchpad for every CM2 application. ORBIT stands for **O**utcomes, **R**ecords, **B**ehavioral **I**nsights & **T**racking.

## What's inside

- **Orbit hero:** every app circles the CM2 core on animated rings. Hover a planet to preview it, click to open it.
- **App library:** search, filter by category and status, pin, reorder, edit, and remove apps.
- **Add apps:** name, link, description, category, status, accent color, tags, and an optional logo upload.
- **Open inside Orbit:** view an app inside the suite, or launch it in a new tab.
- **Command palette:** press `Ctrl/⌘ + K` to search and launch anything.
- **Insights:** the four ORBIT pillars and the apps that feed each one, ready for dashboards.
- **Lab:** a roadmap board (Ideas → Building → Live). Promote a live item into the suite in one click.
- **Settings:** light/dark theme, JSON export/import, reset to defaults.

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

To change the built-in apps, edit `src/data/apps.ts`. Apps added from the UI are saved in the browser (localStorage).

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve the production build
```

Stack: Vite, React 18, TypeScript, Tailwind CSS, Framer Motion, lucide-react, React Router.

## Deploy to Vercel

1. Import this repo in Vercel. It detects Vite automatically.
2. Build command: `npm run build`. Output directory: `dist`.
3. `vercel.json` already rewrites all routes to `index.html`, so deep links like `/apps` work.

## Next steps

- A shared database (for example Supabase or Vercel Postgres) so the whole team sees the same app list.
- Single sign-on across CM2 apps.
- Live data in the Insights dashboards.

© Community Matters 2 Inc.

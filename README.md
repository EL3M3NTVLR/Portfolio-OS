# AritraOS

Aritra Banerjee's portfolio, built as a small operating system. Vite + React 19, plain CSS, no backend.

## Run
```bash
npm install
npm run dev        # local preview
npm run build      # builds to dist/ and runs the audit
```

## Where things live
- `src/data/profile.js`: name, copy, five flagship case files, journey, résumé path
- `src/data/projects.json`: the 22 archive projects (cover, tag, link)
- `public/assets/`: portraits, covers, résumé, `03-companion/` (avatar art)
- `src/apps.jsx`: every app window. `src/App.jsx`: desktop, windows, dock, search. `src/Companion.jsx`: Lyadh.

## Deploy (Vercel)
Import the repo in Vercel, framework Vite, build `npm run build`, output `dist`. Point `aritrabjee.vercel.app` at it.

## Analytics
Google Analytics 4 (`src/analytics.js`) loads only after the visitor accepts the banner. ID comes from `VITE_GA_MEASUREMENT_ID` in Vercel, with the public ID as a fallback. Events: app_open, project_view, case_file_view, film_play, outbound_click, email_click, resume_download, theme_change, search_used. Vercel Analytics (cookieless) stays on.

## Storage
Only in the visitor's browser: theme, icon positions and companion position. Nothing is sent anywhere except analytics events after consent. Contact uses `mailto:`.

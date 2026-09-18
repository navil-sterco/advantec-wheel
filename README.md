# Advantec Wheels — AI Search

A Next.js (App Router) front end for the Advantec Wheels AI-search API, in a light "showroom" theme built around the brand's red/black wheel mark. Results are revealed progressively — the answer types out word by word, then each content block ("Note", "List", "Stats", "Contacts", "Links") fades in one at a time — simulating a chunked/streaming response even though the upstream API returns one JSON payload.

## Structure

- `app/api/search/route.ts` — server route that proxies `GET https://project-demo.in/advantecwheels/api/ai-search?q=...` (avoids CORS, keeps the upstream URL off the client).
- `components/SearchExperience.tsx` — search bar + orchestration of the loading → typing → block-reveal sequence.
- `components/Loader.tsx` — loading state with cycling status lines, shown while waiting on the API.
- `components/TypewriterText.tsx` — word-by-word text reveal for the answer paragraph.
- `components/ResultBlocks.tsx` — renders `richtext`, `list`, `stats`, `contact`, `cards`, and `links` blocks, plus a generic fallback renderer for any block shape the API adds later (so nothing from the response is ever dropped, even before this front end is updated to model it explicitly).
- `lib/types.ts` — response typings matching the API's `blocks` shape.
- `public/logo.png` — the Advantec Wheels roundel used in the header.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000 and search (try "How could I buy?").

Note: the display/body/mono fonts (Sora, Inter, IBM Plex Mono) load from Google Fonts via `next/font/google` at build time, so an internet connection is needed for `npm run build` / `npm run dev` to fetch them the first time.

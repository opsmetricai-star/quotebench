# QuoteBench

AI software pricing benchmarks, contract review and negotiation planning. Next.js 16, React 19, Tailwind 4, Supabase, Gemini.

## Setup
1. `npm install`
2. Copy `.env.example` to `.env.local` and fill it in (never commit it).
3. In the Supabase SQL editor, run `supabase/schema.sql` (tables, RLS, signup trigger, private `contracts` bucket).
4. In Supabase Auth settings add `http://localhost:3000/auth/callback` and your production URL + `/auth/callback` as redirect URLs.
5. `npm run dev`

## Deploy (Vercel)
Import the repo and set every variable from `.env.example`. Set `NEXT_PUBLIC_SITE_URL` to the production URL.

## Payments
Plans link to Selar checkout. A redirect is never treated as payment proof: an admin (`ADMIN_EMAILS`) verifies the payment in Selar and activates the plan at `/app/admin`, which records the order reference.

## Known limitations
- Benchmarks are AI estimates, not verified transaction data; the UI labels them as such.
- Contract text is analysed from pasted text or .txt uploads; PDF/DOCX are stored but not parsed.
- No automated Selar webhook yet; activation is manual.
- No supplier outreach automation; negotiation is plan-and-track.
- Customer logos, testimonials and blog posts are placeholders.

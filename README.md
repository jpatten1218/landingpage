# Whole Dad Movement — Landing Page

1:1 coaching landing page for **wholedadmovement.com**.

- **Stack:** Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS v4 · TypeScript
- **Fonts:** Anton (display), Oswald (subhead), Inter (body)
- **Brand:** Deep Black `#050505` · Rust Orange `#D85A1F` · Marbled Bone `#EDE3D2`
- **Database:** Supabase (project: `whole-dad-movement`, ref: `oxvobrtbeyqhyzfqvjjs`, region: `us-east-1`)

---

## Local development

```bash
npm install
cp .env.local.example .env.local
# fill in SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (see below)
npm run dev
```

Open <http://localhost:3000>.

## Environment variables

| Var | Where to find it | Used by |
|---|---|---|
| `SUPABASE_URL` | Supabase dashboard → Project Settings → API → Project URL | `/api/apply` route |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase dashboard → Project Settings → API → `service_role` (secret) | `/api/apply` route |
| `NEXT_PUBLIC_SITE_URL` | Your live URL, e.g. `https://coaching.wholedadmovement.com` | OG / canonical metadata |

> ⚠️ The `service_role` key is **secret** — never commit it, never expose it to the browser. It's only read server-side inside `/api/apply`.

For this project:
- **SUPABASE_URL** = `https://oxvobrtbeyqhyzfqvjjs.supabase.co`
- **SUPABASE_SERVICE_ROLE_KEY** = grab from <https://supabase.com/dashboard/project/oxvobrtbeyqhyzfqvjjs/settings/api>

## Database

Schema is in `supabase/migrations/0001_applications.sql` and has already been applied to the live project. Single table:

```text
public.applications
  id uuid PK · created_at · full_name · email · phone · age · role
  struggle · story · readiness · investment · consent
  user_agent · referer · status (default 'new')
```

RLS is enabled with **no public policies** — only the server-side service-role key can read or write. The Next.js API route at `/api/apply` is the only writer.

To re-apply or extend the schema, drop a new migration in `supabase/migrations/` and run it via the Supabase CLI or the dashboard SQL editor.

## Deploy to Vercel

1. Push this repo to GitHub (already on branch `claude/whole-dad-landing-page-3csKD`).
2. In Vercel → **New Project** → import the repo.
3. Framework preset: **Next.js** (auto-detected).
4. Add the env vars above under **Settings → Environment Variables**.
5. Deploy.

### Point `coaching.wholedadmovement.com` at Vercel

This is set up on the `coaching.` subdomain — the root `wholedadmovement.com` is untouched.

1. Vercel project → **Settings → Domains** → add `coaching.wholedadmovement.com`.
2. At your registrar, add **one DNS record** on the root zone:
   - **Type:** `CNAME`
   - **Name / Host:** `coaching`
   - **Value / Target:** `cname.vercel-dns.com`
   - **TTL:** Auto / 3600
3. Wait 1–10 minutes for propagation. Vercel auto-provisions the SSL cert. Done.

## Project structure

```text
src/
  app/
    layout.tsx              # fonts + metadata
    page.tsx                # the landing page (all sections)
    globals.css             # brand tokens, distress textures, rings
    api/apply/route.ts      # POST /api/apply → Supabase insert
  components/
    ApplicationForm.tsx     # client form, validation, fetch to /api/apply
  lib/
    supabase.ts             # server-side Supabase client
supabase/
  migrations/
    0001_applications.sql   # applications table
```

## Editing copy

All copy lives in `src/app/page.tsx` — every section is a named React function (`Hero`, `PainValidation`, `TheDrift`, `Story`, `GroundFramework`, `OfferBreakdown`, `NotForYou`, `FAQ`, `ApplySection`, `Footer`). Quotes and headlines use HTML entities (`&apos;`, `&ldquo;`, `&rdquo;`) because they render through `dangerouslySetInnerHTML`.

The application form questions are in `src/components/ApplicationForm.tsx` in the `STRUGGLES`, `READINESS`, and `INVESTMENT` arrays.

import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Diagnostic endpoint. Reports which env vars are SET (booleans only — no
// secret values ever leave the server). Visit this URL in a browser to
// confirm Vercel is actually injecting the env vars at request time.

export async function GET() {
  const url = process.env.SUPABASE_URL ?? "";
  const supabaseUrlHost = (() => {
    try {
      return url ? new URL(url).host : null;
    } catch {
      return "INVALID_URL";
    }
  })();

  // Try to ping Supabase REST root with the service-role key. A 200 / 404 /
  // 401 all tell us something useful and don't expose any data.
  let supabasePing: { reachable: boolean; status: number | null; note?: string } = {
    reachable: false,
    status: null,
  };
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const res = await fetch(
        `${process.env.SUPABASE_URL.replace(/\/$/, "")}/rest/v1/applications?select=id&limit=1`,
        {
          headers: {
            apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          },
          cache: "no-store",
        }
      );
      supabasePing = {
        reachable: true,
        status: res.status,
        note:
          res.status === 200
            ? "ok"
            : res.status === 401
            ? "service-role key rejected"
            : res.status === 404
            ? "applications table not found"
            : `unexpected ${res.status}`,
      };
    } catch (e) {
      supabasePing = {
        reachable: false,
        status: null,
        note: e instanceof Error ? e.message.slice(0, 120) : "fetch failed",
      };
    }
  }

  return NextResponse.json(
    {
      env: {
        SUPABASE_URL: !!process.env.SUPABASE_URL,
        SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        RESEND_API_KEY: !!process.env.RESEND_API_KEY,
        NOTIFY_EMAIL: !!process.env.NOTIFY_EMAIL,
        RESEND_FROM: !!process.env.RESEND_FROM,
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? null,
      },
      supabase: {
        host: supabaseUrlHost,
        ping: supabasePing,
      },
      vercel: {
        env: process.env.VERCEL_ENV ?? null, // production | preview | development
        url: process.env.VERCEL_URL ?? null,
        region: process.env.VERCEL_REGION ?? null,
      },
      now: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}

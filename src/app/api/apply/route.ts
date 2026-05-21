import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendApplicationEmail, type ApplicationRecord } from "@/lib/email";

export const runtime = "nodejs";

type Payload = {
  full_name?: unknown;
  email?: unknown;
  phone?: unknown;
  age?: unknown;
  role?: unknown;
  struggle?: unknown;
  story?: unknown;
  readiness?: unknown;
  investment?: unknown;
  consent?: unknown;
};

function s(v: unknown, max = 2000): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim();
  if (!t) return null;
  return t.slice(0, max);
}

function fail(error: string, code: string, status = 500) {
  return NextResponse.json({ ok: false, error, code }, { status });
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return fail("Bad JSON", "BAD_JSON", 400);
  }

  const full_name = s(body.full_name, 200);
  const email = s(body.email, 320);
  const story = s(body.story, 5000);
  const consent = body.consent === true;

  if (!full_name || !email || !story || !consent) {
    return fail("Missing required fields.", "BAD_INPUT", 400);
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return fail("Email looks off.", "BAD_EMAIL", 400);
  }

  const phone = s(body.phone, 40);
  const role = s(body.role, 200);
  const struggle = s(body.struggle, 500);
  const readiness = s(body.readiness, 200);
  const investment = s(body.investment, 200);

  let age: number | null = null;
  if (typeof body.age === "string" && body.age.trim()) {
    const n = parseInt(body.age, 10);
    if (Number.isFinite(n) && n > 0 && n < 120) age = n;
  } else if (typeof body.age === "number") {
    if (Number.isFinite(body.age) && body.age > 0 && body.age < 120)
      age = body.age;
  }

  const record: ApplicationRecord = {
    full_name,
    email,
    phone,
    age,
    role,
    struggle,
    story,
    readiness,
    investment,
    consent,
    user_agent: req.headers.get("user-agent")?.slice(0, 500) ?? null,
    referer: req.headers.get("referer")?.slice(0, 500) ?? null,
    submitted_at: new Date().toISOString(),
  };

  // Distinguish "env missing" from "Supabase rejected the insert"
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error(
      "[apply] Env missing — SUPABASE_URL set:",
      !!process.env.SUPABASE_URL,
      "SUPABASE_SERVICE_ROLE_KEY set:",
      !!process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    return fail(
      "Supabase env vars are missing on the server. Check Vercel env config and redeploy.",
      "ENV_MISSING",
      500
    );
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("applications").insert({
      full_name: record.full_name,
      email: record.email,
      phone: record.phone,
      age: record.age,
      role: record.role,
      struggle: record.struggle,
      story: record.story,
      readiness: record.readiness,
      investment: record.investment,
      consent: record.consent,
      user_agent: record.user_agent,
      referer: record.referer,
    });

    if (error) {
      console.error("[apply] Supabase insert error:", error);
      return NextResponse.json(
        {
          ok: false,
          error: "Could not save application.",
          code: "DB_INSERT_FAILED",
          detail: error.message,
        },
        { status: 500 }
      );
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[apply] DB threw:", msg);
    return NextResponse.json(
      {
        ok: false,
        error: "Server hit an unexpected DB error.",
        code: "DB_THREW",
        detail: msg.slice(0, 300),
      },
      { status: 500 }
    );
  }

  // Email is best-effort. DB insert already succeeded — never fail the request
  // on email problems, just log them so they show up in Vercel function logs.
  try {
    await sendApplicationEmail(record);
  } catch (err) {
    console.error("[apply] Email send error (non-fatal):", err);
  }

  return NextResponse.json({ ok: true });
}

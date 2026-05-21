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

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Bad JSON" }, { status: 400 });
  }

  const full_name = s(body.full_name, 200);
  const email = s(body.email, 320);
  const story = s(body.story, 5000);
  const consent = body.consent === true;

  if (!full_name || !email || !story || !consent) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields." },
      { status: 400 }
    );
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Email looks off." },
      { status: 400 }
    );
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
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { ok: false, error: "Could not save application." },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Apply route DB error:", err);
    return NextResponse.json(
      { ok: false, error: "Server is misconfigured. Try again later." },
      { status: 500 }
    );
  }

  // Email is best-effort. DB insert already succeeded — never fail the request
  // on email problems, just log them so they show up in Vercel function logs.
  try {
    await sendApplicationEmail(record);
  } catch (err) {
    console.error("Email send error (non-fatal):", err);
  }

  return NextResponse.json({ ok: true });
}

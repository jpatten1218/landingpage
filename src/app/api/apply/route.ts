import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

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

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("applications").insert({
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
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { ok: false, error: "Could not save application." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Apply route error:", err);
    return NextResponse.json(
      { ok: false, error: "Server is misconfigured. Try again later." },
      { status: 500 }
    );
  }
}

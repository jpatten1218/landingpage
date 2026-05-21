"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const STRUGGLES = [
  "I&apos;m drifting — I don&apos;t feel like myself anymore",
  "I&apos;ve been Day 1 for weeks — nothing sticks",
  "I&apos;m mentally absent at home and my family is noticing",
  "I&apos;m physically wrecked — weight, sleep, energy",
  "I&apos;m successful on paper but feel empty",
  "Something else (I&apos;ll share on the call)",
];

const READINESS = [
  "Ready now — I want to start in the next 30 days",
  "Soon — within the next 60–90 days",
  "Just exploring — gathering information",
];

const INVESTMENT = [
  "Yes — I&apos;m ready to invest at this level",
  "Need to understand the value first",
  "Honestly, no — I&apos;m looking for free or low-cost",
];

type FieldErrors = Partial<Record<string, string>>;

export function ApplicationForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      full_name: String(fd.get("full_name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      age: String(fd.get("age") || "").trim(),
      role: String(fd.get("role") || "").trim(),
      struggle: String(fd.get("struggle") || ""),
      story: String(fd.get("story") || "").trim(),
      readiness: String(fd.get("readiness") || ""),
      investment: String(fd.get("investment") || ""),
      consent: fd.get("consent") === "on",
    };

    const localErrors: FieldErrors = {};
    if (!payload.full_name) localErrors.full_name = "Required.";
    if (!payload.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(payload.email))
      localErrors.email = "A real email, please.";
    if (!payload.struggle) localErrors.struggle = "Pick the closest one.";
    if (!payload.story || payload.story.length < 30)
      localErrors.story = "Give me at least a couple of sentences.";
    if (!payload.consent)
      localErrors.consent = "I need your okay to follow up.";
    if (Object.keys(localErrors).length) {
      setErrors(localErrors);
      setStatus("idle");
      return;
    }

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        code?: string;
        detail?: string;
      };
      if (!res.ok || !data.ok) {
        const parts = [data.error || "Something went sideways. Try again."];
        if (data.code) parts.push(`[${data.code}]`);
        if (data.detail) parts.push(data.detail);
        setErrorMsg(parts.join(" "));
        setStatus("error");
        return;
      }
      setStatus("ok");
    } catch {
      setErrorMsg("Network error. Try again in a minute.");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return <SubmittedScreen />;
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-6 brackets border border-bone/20 p-6 sm:p-10"
    >
      <Field
        label="Full name"
        name="full_name"
        type="text"
        autoComplete="name"
        error={errors.full_name}
        required
      />
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          error={errors.email}
          required
        />
        <Field
          label="Phone (optional)"
          name="phone"
          type="tel"
          autoComplete="tel"
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Age"
          name="age"
          type="number"
          placeholder="e.g. 42"
        />
        <Field
          label="What you do for work"
          name="role"
          type="text"
          placeholder="e.g. Director of Sales, Eng VP, Founder"
        />
      </div>

      <Select
        label="Which one hits closest right now?"
        name="struggle"
        options={STRUGGLES}
        error={errors.struggle}
      />

      <Textarea
        label="In your own words — what&apos;s actually going on?"
        name="story"
        rows={5}
        placeholder="The stuff you don&apos;t say out loud. Where you&apos;re drifting. Where your wife or kids are noticing. What you&apos;ve already tried. Be real."
        error={errors.story}
      />

      <Select
        label="How ready are you to start?"
        name="readiness"
        options={READINESS}
      />

      <Select
        label="Are you ready to invest at the 1:1 coaching level?"
        name="investment"
        options={INVESTMENT}
      />

      <label className="flex items-start gap-3 text-bone-dim font-body text-sm">
        <input
          type="checkbox"
          name="consent"
          className="mt-1 h-4 w-4 accent-rust"
        />
        <span>
          You can email or text me to follow up on this application. I
          understand I&apos;m not signing up for marketing emails.
        </span>
      </label>
      {errors.consent && (
        <p className="-mt-3 font-sub uppercase text-xs tracking-widest text-rust">
          {errors.consent}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-rust w-full py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending…" : "Submit Application"}
      </button>

      {status === "error" && (
        <p className="font-sub uppercase tracking-widest text-rust text-sm">
          {errorMsg}
        </p>
      )}
    </form>
  );
}

function SubmittedScreen() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div
      ref={ref}
      className="distress relative overflow-hidden border-2 border-rust bg-deep-black"
      role="status"
      aria-live="polite"
    >
      {/* Concentric orange rings + radial vignette as a "stamp" backdrop */}
      <div
        className="absolute inset-0 rings opacity-60"
        style={{ backgroundSize: "560px 560px", backgroundPosition: "center" }}
        aria-hidden
      />
      <div className="absolute inset-0 vignette" aria-hidden />

      <div className="relative px-6 py-12 sm:px-12 sm:py-16 text-center">
        <div className="mx-auto inline-flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="Whole Dad Movement"
            width={160}
            height={160}
            priority
            className="h-24 w-24 sm:h-32 sm:w-32 object-contain drop-shadow-[0_4px_24px_rgba(216,90,31,0.35)]"
          />
        </div>

        <div className="mt-6 inline-flex items-center gap-2 font-sub uppercase tracking-[0.4em] text-rust text-[10px] sm:text-xs">
          <span className="inline-block h-px w-8 bg-rust" />
          Application Received
          <span className="inline-block h-px w-8 bg-rust" />
        </div>

        <h3 className="mt-5 font-display uppercase text-bone leading-[0.95] text-4xl sm:text-5xl lg:text-6xl">
          First step.
          <br />
          <span className="text-rust">Taken.</span>
        </h3>

        <p className="mt-6 mx-auto max-w-xl font-sub uppercase tracking-wider text-bone text-base sm:text-lg leading-relaxed">
          You just did something most guys won&apos;t.
          <br />
          Thank you for showing up real.
        </p>

        <div className="mt-10 mx-auto max-w-xl text-left brackets border border-bone/15 p-5 sm:p-7">
          <div className="font-sub uppercase tracking-widest text-rust text-xs mb-4">
            What happens next
          </div>
          <ol className="space-y-4">
            <NextStep
              n="01"
              title="I read your application."
              body="Personally. Every word. Usually today or tomorrow."
            />
            <NextStep
              n="02"
              title="If we&apos;re a fit — I email you back inside 48 hours."
              body="With a link to book a real conversation. No automated funnel."
            />
            <NextStep
              n="03"
              title="If we&apos;re not — you still get a real answer."
              body="And a pointer to something better suited to where you are."
            />
          </ol>
        </div>

        <p className="mt-8 mx-auto max-w-xl font-body text-bone-dim text-sm leading-relaxed">
          Watch your inbox &mdash; including spam &mdash; for a reply from{" "}
          <span className="text-bone">josh@wholedadmovement.com</span>.
          Haven&apos;t heard back in 72 hours? Email me direct.
        </p>

        <div className="mt-10 font-sub uppercase tracking-[0.3em] text-rust text-xs sm:text-sm">
          Daily is daily.
          <br className="sm:hidden" />
          <span className="hidden sm:inline"> · </span>
          Where your feet are is where you should be.
        </div>
      </div>
    </div>
  );
}

function NextStep({
  n,
  title,
  body,
}: {
  n: string;
  title: string;
  body: string;
}) {
  return (
    <li className="flex gap-4">
      <span className="font-display text-rust text-2xl sm:text-3xl leading-none shrink-0 w-9">
        {n}
      </span>
      <div>
        <div
          className="font-sub uppercase tracking-wider text-bone text-sm sm:text-base leading-snug"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p
          className="mt-1 font-body text-bone-dim text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </div>
    </li>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  placeholder,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="font-sub uppercase tracking-widest text-xs text-bone-dim block mb-2">
        {label}
        {required && <span className="text-rust ml-1">*</span>}
      </span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full bg-deep-black border border-bone/25 px-4 py-3 font-body text-bone placeholder:text-bone-dim/60 focus:outline-none focus:border-rust"
      />
      {error && (
        <span className="font-sub uppercase tracking-widest text-xs text-rust mt-1 block">
          {error}
        </span>
      )}
    </label>
  );
}

function Textarea({
  label,
  name,
  rows = 4,
  placeholder,
  error,
}: {
  label: string;
  name: string;
  rows?: number;
  placeholder?: string;
  error?: string;
}) {
  return (
    <label className="block">
      <span
        className="font-sub uppercase tracking-widest text-xs text-bone-dim block mb-2"
        dangerouslySetInnerHTML={{ __html: label }}
      />
      <textarea
        name={name}
        rows={rows}
        placeholder={placeholder?.replace(/&apos;/g, "'")}
        className="w-full bg-deep-black border border-bone/25 px-4 py-3 font-body text-bone placeholder:text-bone-dim/60 focus:outline-none focus:border-rust resize-y"
      />
      {error && (
        <span className="font-sub uppercase tracking-widest text-xs text-rust mt-1 block">
          {error}
        </span>
      )}
    </label>
  );
}

function Select({
  label,
  name,
  options,
  error,
}: {
  label: string;
  name: string;
  options: string[];
  error?: string;
}) {
  return (
    <label className="block">
      <span className="font-sub uppercase tracking-widest text-xs text-bone-dim block mb-2">
        {label}
      </span>
      <select
        name={name}
        defaultValue=""
        className="w-full bg-deep-black border border-bone/25 px-4 py-3 font-body text-bone focus:outline-none focus:border-rust appearance-none"
      >
        <option value="" disabled>
          — Pick one —
        </option>
        {options.map((o, i) => (
          <option
            key={i}
            value={o.replace(/&apos;/g, "'").replace(/&ldquo;|&rdquo;/g, '"')}
          >
            {o.replace(/&apos;/g, "'").replace(/&ldquo;|&rdquo;/g, '"')}
          </option>
        ))}
      </select>
      {error && (
        <span className="font-sub uppercase tracking-widest text-xs text-rust mt-1 block">
          {error}
        </span>
      )}
    </label>
  );
}

"use client";

import { useState } from "react";

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
      };
      if (!res.ok || !data.ok) {
        setErrorMsg(data.error || "Something went sideways. Try again.");
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
    return (
      <div className="brackets border border-rust p-8 lg:p-10">
        <div className="font-sub uppercase tracking-widest text-rust text-xs">
          Got it
        </div>
        <h3 className="mt-2 font-display text-3xl sm:text-4xl uppercase text-bone leading-tight">
          Your application is in.
        </h3>
        <p className="mt-4 font-body text-bone-dim leading-relaxed">
          I read every application personally. If we&apos;re a fit, you&apos;ll
          get a reply from me within 48 hours with a link to book a call. If
          you don&apos;t hear back inside 72 hours, check your spam — and then
          email me at <span className="text-bone">josh@wholedadmovement.com</span>.
        </p>
        <p className="mt-4 font-sub uppercase tracking-widest text-rust text-sm">
          Daily is daily. Where your feet are is where you should be.
        </p>
      </div>
    );
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

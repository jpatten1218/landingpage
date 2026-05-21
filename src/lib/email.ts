export type ApplicationRecord = {
  full_name: string;
  email: string;
  phone: string | null;
  age: number | null;
  role: string | null;
  struggle: string | null;
  story: string;
  readiness: string | null;
  investment: string | null;
  consent: boolean;
  user_agent: string | null;
  referer: string | null;
  submitted_at: string;
};

const DEFAULT_TO = "josh@wholedadmovement.com";
const DEFAULT_FROM = "Whole Dad Movement <onboarding@resend.dev>";

export async function sendApplicationEmail(
  record: ApplicationRecord
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "[email] RESEND_API_KEY not set — skipping notification email."
    );
    return;
  }

  const to = process.env.NOTIFY_EMAIL || DEFAULT_TO;
  const from = process.env.RESEND_FROM || DEFAULT_FROM;

  const subject = `New 1:1 application — ${record.full_name}`;
  const html = renderHtml(record);
  const text = renderText(record);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      reply_to: record.email,
      html,
      text,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status}: ${body.slice(0, 500)}`);
  }
}

function escape(s: string | null | undefined): string {
  if (!s) return "";
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string | number | null | undefined): string {
  const v = value === null || value === undefined || value === "" ? "—" : value;
  return `
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #1f1f1f;font-family:Arial,sans-serif;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#d85a1f;width:160px;vertical-align:top;">${escape(label)}</td>
      <td style="padding:10px 16px;border-bottom:1px solid #1f1f1f;font-family:Arial,sans-serif;font-size:14px;color:#ede3d2;vertical-align:top;">${escape(String(v))}</td>
    </tr>
  `;
}

function renderHtml(r: ApplicationRecord): string {
  const story = escape(r.story).replace(/\n/g, "<br>");
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#050505;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#050505;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;background:#0b0b0b;border:1px solid #1f1f1f;">
            <tr>
              <td style="padding:24px 24px 8px 24px;border-bottom:2px solid #d85a1f;">
                <div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:#d85a1f;">Whole Dad Movement · New Application</div>
                <h1 style="margin:8px 0 0 0;font-family:'Impact','Arial Black',sans-serif;font-size:32px;letter-spacing:.02em;text-transform:uppercase;color:#ede3d2;">${escape(r.full_name)}</h1>
                <div style="margin-top:6px;font-family:Arial,sans-serif;font-size:13px;color:#c9bea6;">
                  <a href="mailto:${escape(r.email)}" style="color:#d85a1f;text-decoration:none;">${escape(r.email)}</a>${r.phone ? ` &nbsp;·&nbsp; ${escape(r.phone)}` : ""}
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:0;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                  ${row("Age", r.age)}
                  ${row("Role", r.role)}
                  ${row("Biggest struggle", r.struggle)}
                  ${row("Readiness", r.readiness)}
                  ${row("Investment", r.investment)}
                  ${row("Submitted", r.submitted_at)}
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 24px;border-top:1px solid #1f1f1f;">
                <div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#d85a1f;margin-bottom:10px;">In his own words</div>
                <div style="font-family:Georgia,serif;font-size:15px;line-height:1.6;color:#ede3d2;border-left:3px solid #d85a1f;padding-left:14px;">${story}</div>
              </td>
            </tr>

            <tr>
              <td style="padding:16px 24px;border-top:1px solid #1f1f1f;background:#070707;">
                <div style="font-family:Arial,sans-serif;font-size:13px;color:#c9bea6;">
                  Hit <strong>Reply</strong> to respond — it goes straight to ${escape(r.email)}.
                </div>
                ${r.referer ? `<div style="font-family:Arial,sans-serif;font-size:11px;color:#7a7060;margin-top:6px;">Referer: ${escape(r.referer)}</div>` : ""}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function renderText(r: ApplicationRecord): string {
  return [
    `WHOLE DAD MOVEMENT — NEW APPLICATION`,
    ``,
    `Name:        ${r.full_name}`,
    `Email:       ${r.email}`,
    `Phone:       ${r.phone || "—"}`,
    `Age:         ${r.age ?? "—"}`,
    `Role:        ${r.role || "—"}`,
    `Struggle:    ${r.struggle || "—"}`,
    `Readiness:   ${r.readiness || "—"}`,
    `Investment:  ${r.investment || "—"}`,
    `Submitted:   ${r.submitted_at}`,
    ``,
    `--- IN HIS OWN WORDS ---`,
    ``,
    r.story,
    ``,
    `Reply to this email to respond — it goes to ${r.email}.`,
  ].join("\n");
}

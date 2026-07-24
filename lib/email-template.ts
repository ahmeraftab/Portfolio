import { SITE } from "@/lib/constants";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const SANS = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const MONO = "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";
const TEAL = "#1fe6c4";
const INK = "#05070a";

export function contactEmailHtml({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const receivedAt = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:#f2f4f7;font-family:${SANS};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f4f7;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e8ec;">
            <tr>
              <td style="background-color:${INK};padding:28px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-family:${MONO};color:#ffffff;font-size:15px;letter-spacing:0.02em;">
                      Ahmer Aftab<span style="color:${TEAL};">.</span>
                    </td>
                    <td align="right" style="font-family:${MONO};color:${TEAL};font-size:11px;letter-spacing:0.08em;text-transform:uppercase;">
                      New Message
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 4px;font-family:${SANS};font-size:12px;text-transform:uppercase;letter-spacing:0.06em;color:#8a97a8;">
                  From
                </p>
                <p style="margin:0 0 24px;font-family:${SANS};font-size:16px;color:${INK};">
                  <strong>${safeName}</strong>
                  &nbsp;&lt;<a href="mailto:${safeEmail}" style="color:#0d9c8a;text-decoration:none;">${safeEmail}</a>&gt;
                </p>
                <p style="margin:0 0 4px;font-family:${SANS};font-size:12px;text-transform:uppercase;letter-spacing:0.06em;color:#8a97a8;">
                  Message
                </p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f7f9fb;border-radius:12px;border:1px solid #e5e8ec;margin-top:8px;">
                  <tr>
                    <td style="padding:18px 20px;font-family:${SANS};font-size:15px;line-height:1.6;color:#1a2027;">
                      ${safeMessage}
                    </td>
                  </tr>
                </table>
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px;">
                  <tr>
                    <td style="border-radius:999px;background-color:${TEAL};">
                      <a href="mailto:${safeEmail}" style="display:inline-block;padding:12px 24px;font-family:${SANS};font-size:14px;font-weight:600;color:${INK};text-decoration:none;">
                        Reply to ${safeName}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 32px;background-color:#f7f9fb;border-top:1px solid #e5e8ec;">
                <p style="margin:0;font-family:${MONO};font-size:11px;color:#8a97a8;">
                  Received ${receivedAt} via the contact form at
                  <a href="${SITE.url}" style="color:#8a97a8;">${SITE.url.replace(/^https?:\/\//, "")}</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function contactEmailText({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  return `From: ${name} <${email}>\n\n${message}`;
}

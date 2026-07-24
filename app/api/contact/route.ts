import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema } from "@/lib/validations";
import { SITE } from "@/lib/constants";
import { contactEmailHtml, contactEmailText } from "@/lib/email-template";

// Very small in-memory rate limiter (per server instance) to deter spam.
// Fine for a low-traffic portfolio; swap for a durable store (e.g. Upstash
// Redis) if you deploy somewhere with multiple concurrent instances.
const submissions = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (submissions.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  submissions.set(ip, timestamps);
  return timestamps.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Try again in a minute." }, { status: 429 });
  }

  const json = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input." }, { status: 400 });
  }

  const { name, email, message } = parsed.data;

  // TODO: Set GMAIL_USER and GMAIL_APP_PASSWORD in your environment
  // (.env.local / Vercel project settings) to actually send email.
  // GMAIL_USER is your Gmail address; GMAIL_APP_PASSWORD is a 16-character
  // App Password generated at https://myaccount.google.com/apppasswords
  // (requires 2-Step Verification to be enabled on the account).
  // Until both are set, submissions are validated and logged but not emailed.
  const gmailUser = process.env.GMAIL_USER;
  const gmailPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPassword) {
    console.log("[contact] GMAIL_USER / GMAIL_APP_PASSWORD not set — logging submission instead of sending.", {
      name,
      email,
      message,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailPassword },
    });

    await transporter.sendMail({
      from: `"${name} (via portfolio)" <${gmailUser}>`,
      to: SITE.email,
      replyTo: email,
      subject: `New message from ${name} via portfolio`,
      text: contactEmailText({ name, email, message }),
      html: contactEmailHtml({ name, email, message }),
    });
    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error("[contact] Failed to send email", error);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 502 });
  }
}

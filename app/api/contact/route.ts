import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { sendContactEmails, type ContactSubmission } from "@/lib/email";
import {
  CONTACT_RATE_LIMIT,
  contactRateLimitKeys,
  getClientIp,
  getRateLimitStatus,
  recordRateLimitFailure,
} from "@/lib/security-rate-limit";

const VALID_INTENTS = new Set(["ecommerce", "formazione", "speech"]);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ error: "Origine non consentita" }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }

  // Honeypot: bots receive a generic success without generating email.
  if (text(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const submission: ContactSubmission = {
    intent: text(body.intent, 20) as ContactSubmission["intent"],
    dimension: text(body.dimension, 160),
    name: text(body.name, 120),
    email: text(body.email, 254).toLowerCase(),
    company: text(body.company, 160),
    role: text(body.role, 160),
    message: text(body.message, 4000),
  };

  if (
    !VALID_INTENTS.has(submission.intent) ||
    !submission.dimension ||
    !submission.name ||
    !EMAIL_PATTERN.test(submission.email) ||
    !submission.company ||
    !submission.role ||
    submission.message.length < 10 ||
    body.privacy !== true
  ) {
    return NextResponse.json({ error: "Controlla i campi obbligatori e riprova." }, { status: 400 });
  }

  const requestHeaders = await headers();
  const ip = getClientIp(requestHeaders);
  const keys = contactRateLimitKeys(submission.email, ip);
  const currentLimit = await getRateLimitStatus(keys);
  if (currentLimit.blocked) {
    return NextResponse.json(
      { error: "Hai inviato troppe richieste. Riprova più tardi." },
      { status: 429, headers: { "Retry-After": String(currentLimit.retryAfterSeconds) } },
    );
  }

  const consumed = await recordRateLimitFailure(keys, CONTACT_RATE_LIMIT);
  if (consumed.blocked) {
    return NextResponse.json(
      { error: "Hai inviato troppe richieste. Riprova più tardi." },
      { status: 429, headers: { "Retry-After": String(consumed.retryAfterSeconds) } },
    );
  }

  const result = await sendContactEmails(submission);
  if (!result.sent) {
    console.error("Contact email not delivered:", result.reason, result.message);
    return NextResponse.json(
      { error: "Non sono riuscito a inviare la richiesta. Scrivi a info@dariotana.it." },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}

export const runtime = "nodejs";

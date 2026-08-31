import { Resend } from "resend";
import { SITE_URL } from "@/lib/seo";

export type ContactSubmission = {
  intent: "ecommerce" | "formazione" | "speech";
  dimension: string;
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
};

export type EmailResult =
  | { sent: true }
  | { sent: false; reason: "not-configured" | "provider-error"; message: string };

type EmailMessage = {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character] ?? character;
  });
}

function emailClient(): { resend: Resend; from: string } | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  if (!apiKey || !from) return null;
  return { resend: new Resend(apiKey), from };
}

async function deliver(
  message: EmailMessage,
): Promise<EmailResult> {
  const client = emailClient();
  if (!client) {
    return {
      sent: false,
      reason: "not-configured",
      message: "Resend non è ancora configurato nelle variabili d'ambiente.",
    };
  }

  const result = await client.resend.emails.send({ ...message, from: client.from });
  if (result.error) {
    console.error("Resend delivery error:", result.error.name, result.error.message);
    return {
      sent: false,
      reason: "provider-error",
      message: "Resend non ha accettato il messaggio.",
    };
  }

  return { sent: true };
}

async function deliverBatch(messages: EmailMessage[]): Promise<EmailResult> {
  const client = emailClient();
  if (!client) {
    return {
      sent: false,
      reason: "not-configured",
      message: "Resend non è ancora configurato nelle variabili d'ambiente.",
    };
  }

  const result = await client.resend.batch.send(
    messages.map((message) => ({ ...message, from: client.from })),
    { batchValidation: "strict" },
  );
  if (result.error) {
    console.error("Resend batch delivery error:", result.error.name, result.error.message);
    return {
      sent: false,
      reason: "provider-error",
      message: "Resend non ha accettato i messaggi.",
    };
  }

  return { sent: true };
}

export async function sendAdminAccountEmail(input: {
  email: string;
  username: string;
}): Promise<EmailResult> {
  const username = escapeHtml(input.username);
  const loginUrl = `${SITE_URL}/admin/login`;
  return deliver({
    to: input.email,
    subject: "Il tuo accesso al sito di Dario Tana",
    text: [
      `È stato creato un account amministratore per ${input.username}.`,
      `Username: ${input.username}`,
      `Accesso: ${loginUrl}`,
      "Per sicurezza, la password iniziale viene comunicata separatamente.",
    ].join("\n\n"),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#17222f;max-width:620px;margin:auto">
        <h1 style="font-size:24px">Il tuo accesso amministratore</h1>
        <p>È stato creato un account per gestire il sito di Dario Tana.</p>
        <p><strong>Username:</strong> ${username}</p>
        <p><a href="${loginUrl}" style="display:inline-block;background:#00d7ee;color:#0d1218;text-decoration:none;padding:12px 20px;border-radius:999px">Accedi al pannello</a></p>
        <p style="color:#536273;font-size:14px">Per sicurezza, la password iniziale viene comunicata separatamente e non è inclusa in questa email.</p>
      </div>
    `,
  });
}

export async function sendContactEmails(submission: ContactSubmission): Promise<EmailResult> {
  const destination = process.env.CONTACT_NOTIFICATION_EMAIL?.trim() || "info@dariotana.it";
  const labels = {
    ecommerce: "Consulenza e-commerce",
    formazione: "Formazione o docenza",
    speech: "Speech per evento",
  } as const;
  const safe = Object.fromEntries(
    Object.entries(submission).map(([key, value]) => [key, escapeHtml(value)]),
  ) as Record<keyof ContactSubmission, string>;

  return deliverBatch([
    {
      to: destination,
      replyTo: submission.email,
      subject: `Nuovo briefing: ${submission.name} — ${submission.company}`,
      text: [
        `Area: ${labels[submission.intent]}`,
        `Formato o dimensione: ${submission.dimension}`,
        `Nome: ${submission.name}`,
        `Email: ${submission.email}`,
        `Azienda: ${submission.company}`,
        `Ruolo: ${submission.role}`,
        "",
        submission.message,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#17222f;max-width:680px;margin:auto">
          <h1 style="font-size:24px">Nuovo briefing dal sito</h1>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;border-bottom:1px solid #dce4e8"><strong>Area</strong></td><td style="padding:8px;border-bottom:1px solid #dce4e8">${labels[submission.intent]}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #dce4e8"><strong>Dimensione/formato</strong></td><td style="padding:8px;border-bottom:1px solid #dce4e8">${safe.dimension}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #dce4e8"><strong>Nome</strong></td><td style="padding:8px;border-bottom:1px solid #dce4e8">${safe.name}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #dce4e8"><strong>Email</strong></td><td style="padding:8px;border-bottom:1px solid #dce4e8">${safe.email}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #dce4e8"><strong>Azienda</strong></td><td style="padding:8px;border-bottom:1px solid #dce4e8">${safe.company}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #dce4e8"><strong>Ruolo</strong></td><td style="padding:8px;border-bottom:1px solid #dce4e8">${safe.role}</td></tr>
          </table>
          <h2 style="font-size:18px;margin-top:28px">Contesto e obiettivo</h2>
          <p style="white-space:pre-wrap">${safe.message}</p>
        </div>
      `,
    },
    {
      to: submission.email,
      subject: "Ho ricevuto la tua richiesta — Dario Tana",
      text: `Ciao ${submission.name},\n\nho ricevuto il tuo briefing relativo a ${labels[submission.intent].toLowerCase()}. Ti risponderò personalmente entro uno o due giorni lavorativi.\n\nDario Tana`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#17222f;max-width:620px;margin:auto">
          <h1 style="font-size:24px">Richiesta ricevuta.</h1>
          <p>Ciao ${safe.name},</p>
          <p>ho ricevuto il tuo briefing relativo a <strong>${labels[submission.intent].toLowerCase()}</strong>.</p>
          <p>Ti risponderò personalmente entro uno o due giorni lavorativi.</p>
          <p style="margin-top:32px"><strong>Dario Tana</strong></p>
        </div>
      `,
    },
  ]);
}

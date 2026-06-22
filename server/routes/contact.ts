import type { RequestHandler } from "express";
import { Resend } from "resend";
import { contactFormSchema, type ContactResponse } from "../../shared/contact";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const handleContactPost: RequestHandler = async (req, res) => {
  const parsed = contactFormSchema.safeParse(req.body);
  if (!parsed.success) {
    const body: ContactResponse = {
      ok: false,
      error: "Validation failed",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
    return res.status(400).json(body);
  }

  const { name, email, phone, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM;

  if (!apiKey || !to || !from) {
    console.error("[contact] Missing RESEND_API_KEY, CONTACT_EMAIL_TO, or CONTACT_EMAIL_FROM");
    const body: ContactResponse = {
      ok: false,
      error: "Email service is not configured. Please email me directly.",
    };
    return res.status(503).json(body);
  }

  const resend = new Resend(apiKey);
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone ?? "—");
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    text: [`Name: ${name}`, `Email: ${email}`, `Phone: ${phone || "—"}`, "", message].join("\n"),
    html: `
      <h2>New portfolio contact</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Phone:</strong> ${safePhone}</p>
      <p><strong>Message:</strong></p>
      <p>${safeMessage}</p>
    `,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    const body: ContactResponse = {
      ok: false,
      error: "Could not send message. Try again or email me directly.",
    };
    return res.status(500).json(body);
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[contact] Sent to", to, "from", email);
  }

  const body: ContactResponse = {
    ok: true,
    message: "Thanks for reaching out — I'll get back to you soon.",
  };
  res.json(body);
};

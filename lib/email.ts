// lib/email.ts
import nodemailer from "nodemailer";

const host = process.env.EMAIL_HOST;
const port = Number(process.env.EMAIL_PORT || 587);
const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;
const from = process.env.EMAIL_FROM || user;

if (!host || !user || !pass) {
  console.warn("[email] Variáveis faltando: EMAIL_HOST/EMAIL_USER/EMAIL_PASS");
}

export async function sendMail(opts: {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}) {
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // 465 = SSL; 587 = STARTTLS
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to: opts.to,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
  });
}

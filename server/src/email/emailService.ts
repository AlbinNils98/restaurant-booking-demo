import nodemailer from 'nodemailer';

export default async function sendEmail(recipient: string, subject: string, message: string, html?: string): Promise<void> {

  const { MAILERSEND_SMTP_USER, MAILERSEND_SMTP_PASS } = process.env;

  const transporter = nodemailer.createTransport({
    host: 'smtp.mailersend.net',
    port: 587,
    secure: false,
    auth: {
      user: MAILERSEND_SMTP_USER,
      pass: MAILERSEND_SMTP_PASS,
    }
  });

  await transporter.sendMail({
    from: `"RestaurantDemo" <no-reply@test-r83ql3pmr3mgzw1j.mlsender.net>`,
    to: recipient,
    subject: subject,
    text: message,
    html: html || `<p>${message}</p>`,
  });
}
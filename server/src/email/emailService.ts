import nodemailer from 'nodemailer';

export async function sendEmail(
  recipient: string,
  subject: string,
  message: string,
  html?: string
) {
  const apiToken = process.env.MAILERSEND_API_TOKEN!;

  const body = {
    from: {
      email: "no-reply@test-r83ql3pmr3mgzw1j.mlsender.net",
      name: "RestaurantDemo",
    },
    to: [
      {
        email: recipient,
      },
    ],
    subject,
    text: message,
    html: html || `<p>${message}</p>`,
  };

  const res = await fetch("https://api.mailersend.com/v1/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("MailerSend API error:", errorText);
    throw new Error("Failed to send email");
  }

  console.log(`Email sent to ${recipient}`);
}
import nodemailer from 'nodemailer';

export default async function sendEmail(recipient: string, subject: string, message: string, html?: string): Promise<void> {

  const { GMAILUSER, GMAILPASS } = process.env;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAILUSER,
      pass: GMAILPASS,
    }
  });

  await transporter.sendMail({
    from: `"RestaurantDemo" <${GMAILUSER}>`,
    to: recipient,
    subject: subject,
    text: message,
    html: html || `<p>${message}</p>`,
  });
}
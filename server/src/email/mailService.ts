import nodemailer from 'nodemailer';

export default async function sendEmail(email: string, subject: string, message: string) {

  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"Dev App" <dev@example.com>',
    to: email,
    subject: subject,
    text: message,
    html: `<b>${message}</b>`,
  });

  console.log("Visual example of email: ", nodemailer.getTestMessageUrl(info));
}
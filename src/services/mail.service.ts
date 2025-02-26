import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

interface MailOptions {
  to: string;
  subject: string;
  text: string;
}

const MAILTRAP_USER = process.env.MAILTRAP_USER as string;
const MAILTRAP_PASS = process.env.MAILTRAP_PASS as string;

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: MAILTRAP_USER,
    pass: MAILTRAP_PASS,
  },
});

export const sendMail = async ({ to, subject, text }: MailOptions) => {
  try {
    const info = await transporter.sendMail({
      from: "deliveroo.support@deliveroo.com",
      to,
      subject,
      text,
    });

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

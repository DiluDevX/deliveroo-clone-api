import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

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

export const sendMail = async ({
  to,
  from,
  subject,
  html,
}: {
  from: string;
  to: string;
  subject: string;
  html: string;
}) => {
  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

import { sendMail } from "./mail.service";
import dotenv from "dotenv";

dotenv.config();

const config = {
  companyName: process.env.COMPANY_NAME,
  companyEmail: process.env.COMPANY_EMAIL,
  logoUrl: process.env.LOGO_URL,
  supportEmail: process.env.SUPPORT_EMAIL,
  appUrl: process.env.APP_URL,
};

const companyName = config.companyName;
const companyEmail = config.companyEmail;
const logoUrl = config.logoUrl;
const supportEmail = config.supportEmail;
const appUrl = config.appUrl;

export const sendForgotPasswordEmail = async (email: string) => {
  const resetUrl = `${appUrl}/reset-password`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .logo {
          text-align: center;
          margin-bottom: 20px;
        }
        .logo img {
          max-height: 60px;
        }
        .button {
          display: inline-block;
          background-color: #4A90E2;
          color: white;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 4px;
          margin: 20px 0;
          font-weight: bold;
        }
        .footer {
          margin-top: 30px;
          font-size: 12px;
          color: #666;
          border-top: 1px solid #eee;
          padding-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="logo">
        <img src="${logoUrl}" alt="${companyName} Logo">
      </div>
      
      <h1>Reset Your Password</h1>
      
      <p>Hello,</p>
      
      <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
      
      <p>To reset your password, please click the button below:</p>
      
      <a href="${resetUrl}" class="button">Reset Password</a>
      
      <p>This link will expire in 24 hours for security reasons.</p>
      
      <p>If the button above doesn't work, copy and paste the following link into your browser:</p>
      
      <p>${resetUrl}</p>
      
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} ${companyName}. All rights reserved.</p>
        <p>If you need any assistance, please contact us at <a href="mailto:${supportEmail}">${supportEmail}</a>.</p>
      </div>
    </body>
    </html>
  `;

  await sendMail({
    from: `"${companyName}" <${companyEmail}>`,
    to: email,
    subject: "Reset Your Password",
    html,
  });
};

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendForgotPasswordEmail = void 0;
const mail_service_1 = require("./mail.service");
const dotenv_1 = __importDefault(require("dotenv"));
const reset_password_model_1 = __importDefault(require("../models/reset-password.model"));
const users_service_1 = require("./users.service");
const node_crypto_1 = __importDefault(require("node:crypto"));
dotenv_1.default.config();
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
const sendForgotPasswordEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_service_1.usersService.findOne({ email });
    if (!user) {
        return new Error("User not found");
    }
    const token = node_crypto_1.default.randomBytes(6).toString("hex");
    yield reset_password_model_1.default.create({
        userId: user._id,
        email,
        token,
        expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000),
    });
    const resetUrl = `${appUrl}/reset-password?token=${token}`;
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password</title>
      <style>
            @import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap");

        body {
          font-family: IBM Plex Sans, serif;
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
          background-color: #00ccbc;
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
      
      <p>This link will expire in 1 hour for security reasons.</p>
      
      <p>If the button above doesn't work, copy and paste the following link into your browser:</p>
      
      <p>${resetUrl}</p>
      
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} ${companyName}. All rights reserved.</p>
        <p>If you need any assistance, please contact us at <a href="mailto:${supportEmail}">${supportEmail}</a>.</p>
      </div>
    </body>
    </html>
  `;
    yield (0, mail_service_1.sendMail)({
        from: `"${companyName}" <${companyEmail}>`,
        to: email,
        subject: "Reset Your Password",
        html,
    });
});
exports.sendForgotPasswordEmail = sendForgotPasswordEmail;

import { sendMail } from "../services/mail.service";

export const sendPasswordResetMail = async (req: any, res: any) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    await sendMail({
      to: email,
      subject: "Password Reset",
      text: "Here is your reset link...",
    });
    res.json({ message: "Email sent successfully!" });
    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to send email" });
    return;
  }
};

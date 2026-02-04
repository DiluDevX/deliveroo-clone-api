import { Response, Request } from "express";
import authService from "../services/auth-client.service";

const verifyApiKey = async (req: Request, res: Response) => {
  try {
    const { apiKey } = req.body;
    const validApiKey = process.env.AUTH_API_KEY;
    if (apiKey === validApiKey) {
      const result = await authService.adminLogin({
        email: req.body.email,
        password: req.body.password,
        apiKey: req.body.apiKey,
      });
      const setCookieHeader = result.headers["set-cookie"];
      if (setCookieHeader) {
        const modifiedCookies = setCookieHeader.map((cookie: string) =>
          cookie.replace(/SameSite=None/gi, "SameSite=Lax"),
        );
        res.setHeader("Set-Cookie", modifiedCookies);
      }
      res.status(200).json(result.data);
    } else {
      res.status(401).json({ message: "Invalid API Key" });
    }
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { verifyApiKey };

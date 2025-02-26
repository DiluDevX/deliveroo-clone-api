import { z } from "zod";

export const sendMailRequestBodySchema = z.object({
  email: z.string().email(),
});

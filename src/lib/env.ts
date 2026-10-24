import "server-only";
import { z } from "zod";

const schema = z.object({
  GRAVATAR_EMAIL: z.email().optional(),
});

export const env = schema.parse(process.env);

import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().transform((val) => parseInt(val, 10)),
  IMPORTS_FOLDER: z.string(),
  ENV: z.string().default("development"),
  BASIC_AUTH_USERNAME: z.string(),
  BASIC_AUTH_PASSWORD: z.string(),
});

export const env = envSchema.parse(process.env);

import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().transform((val) => parseInt(val, 10)),
  IMPORTS_FOLDER: z.string(),
  ENV: z.string().default("development"),
});

export const env = envSchema.parse(process.env);

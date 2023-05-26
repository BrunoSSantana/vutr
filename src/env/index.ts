import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  PORT: z.string().default('3000'),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  FIREBASE_PROJECT_ID: z.string(),
  FIREBASE_CLIENT_EMAIL: z.string(),
  FIREBASE_PRIVATE_KEY: z.string().transform((key) => key.replace(/\\n/gi, "\n")),
  FIREBASE_DATABASE_URL: z.string(),
})

export const env = envSchema.parse(process.env)
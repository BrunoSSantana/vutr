import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  PORT: z.string().default('3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  FIREBASE_PROJECT_ID: z.string(),
  FIREBASE_CLIENT_EMAIL: z.string(),
  FIREBASE_PRIVATE_KEY: z.string().transform((key) => key.replace(/\\n/gi, "\n")),
  FIREBASE_DATABASE_URL: z.string(),
  FIREBASE_API_KEY: z.string(),
  FIREBASE_USER: z.string(),
  FIREBASE_PASSWORD: z.string(),
  FIREBASE_ID: z.string(),
})

export const env = envSchema.parse(process.env)
import { z } from 'zod';

export const userRegisterSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  bio: z.string().min(1).max(255).optional(),
});

export const userUpdateSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(255).optional(),
  email: z.string().email().optional(),
  bio: z.string().min(1).max(255).optional(),
});

export const userListSchema = z.object({
  search: z.string().optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().optional(),
});

export const userDeleteSchema = z.object({
  userId: z.string().transform(Number),
});
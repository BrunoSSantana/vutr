import { z } from 'zod';

export const userSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(255),
  email: z.string().email(),
  externalId: z.string().nullable().optional().transform((value) => value === null ? undefined : value),
  avatar: z.string().nullable().optional().transform((value) => value === null ? undefined : value),
  bio: z.string().nullable().optional().transform((value) => value === null ? undefined : value),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const userRegisterSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  externalId: z.string().optional(),
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
  page: z.string().transform(Number).optional().or(z.number().optional()),
  limit: z.string().transform(Number).optional().or(z.number().optional()),
});

export const userDeleteSchema = z.object({
  userId: z.string().transform(Number),
});
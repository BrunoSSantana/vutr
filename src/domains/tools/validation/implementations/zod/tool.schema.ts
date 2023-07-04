import { z } from 'zod';

const regexLink = new RegExp('^(http|https)://[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$');
const regexTags = new RegExp('^(?=.*[a-z])[a-z0-9]+(-[a-z0-9]+)*$');

export const toolTagSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1).max(255),
  link: z.string().regex(regexLink).optional(),
  description: z.string().min(1).max(255).optional(),
  userId: z.number().nullable().optional().transform((value) => value === null ? undefined : value),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const toolRegisterSchema = z.object({
  title: z.string().min(1).max(255),
  link: z.string().regex(regexLink),
  description: z.string().min(1).max(255),
});

export const toolUpdateSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  link: z.string().regex(regexLink).optional(),
  description: z.string().min(1).max(255).optional(),
});

export const toolListSchema = z.object({
  search: z.string().optional(),
  page: z.string().transform(Number).optional().or(z.number().optional()),
  limit: z.string().transform(Number).optional().or(z.number().optional()),
});

export const toolDeleteSchema = z.object({
  toolId: z.string().transform(Number),
});

import { z } from 'zod';

const regexLink = new RegExp('^(http|https)://[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$');
const regexTags = new RegExp('^(?=.*[a-z])[a-z0-9]+(-[a-z0-9]+)*$');

export const toolRegisterSchema = z.object({
  title: z.string().min(1).max(255),
  link: z.string().regex(regexLink),
  description: z.string().min(1).max(255),
  tags: z.array(z.string().regex(regexTags)).min(1).max(255),
});

export const toolUpdateSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  link: z.string().regex(regexLink).optional(),
  description: z.string().min(1).max(255).optional(),
  tags: z.array(z.string().regex(regexTags)).max(255).optional(),
});

export const toolListSchema = z.object({
  search: z.string().optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().optional(),
});

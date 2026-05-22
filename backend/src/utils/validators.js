import { z } from "zod";

export const uuidSchema = z.string().uuid();

export const createProjectSchema = z.object({
  title: z.string().trim().min(1).max(120),
  prompt: z.string().trim().min(1).max(5000).optional().default("Build a portfolio website")
});

export const updateProjectSchema = z
  .object({
    title: z.string().trim().min(1).max(120).optional(),
    description: z.string().max(2000).optional().nullable(),
    prompt: z.string().max(5000).optional().nullable(),
    html_code: z.string().optional().nullable(),
    css_code: z.string().optional().nullable(),
    js_code: z.string().optional().nullable(),
    full_code: z.string().optional().nullable(),
    preview_image: z.string().url().optional().nullable()
  })
  .refine((v) => Object.keys(v).length > 0, { message: "At least one field is required" });

export const generateSchema = z.object({
  prompt: z.string().trim().min(1).max(5000),
  projectId: uuidSchema.optional()
});

export const refineSchema = z.object({
  projectId: uuidSchema,
  message: z.string().trim().min(1).max(5000)
});

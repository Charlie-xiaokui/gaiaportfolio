import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const work = defineCollection({
  loader: glob({ pattern: '*/index.{md,mdx}', base: './src/content/work' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      client: z.string(),
      summary: z.string(),
      year: z.number().int(),
      role: z.string(),
      services: z.array(z.string()).default([]),
      duration: z.string().optional(),
      team: z.string().optional(),
      cover: image(),
      coverAlt: z.string(),
      tint: z
        .string()
        .regex(/^#[0-9a-fA-F]{6}$/)
        .default('#e9e9e3'),
      order: z.number().default(100),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      url: z.url().optional(),
    }),
});

const explorations = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: './src/content/explorations' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    cardDescription: z.string().optional(),
    tags: z.array(z.string()).default([]),
    order: z.number().default(100),
    draft: z.boolean().default(false),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    date: z.string().optional(),
  }),
});

export const collections = { work, explorations };

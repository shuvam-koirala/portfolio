import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
    title: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    status: z.enum(['shipped', 'coming-soon', 'demo']),
    featured: z.boolean().default(false),
    order: z.number(),
    links: z.object({
      github: z.string().url().optional(),
      page: z.string().optional(),
      store: z.string().url().optional(),
    }),
    image: image().optional(),
  }),
});

export const collections = { projects };

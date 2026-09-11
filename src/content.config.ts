import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z
    .object({
      title: z.string().min(1),
      description: z.string().min(1),
      slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a lowercase, hyphenated URL slug.'),
      publishDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      contentType: z.enum(['editorial', 'planning', 'commercial']),
      excerpt: z.string().min(1),
      heroImage: z.string().min(1).optional(),
      heroAlt: z.string().min(1).optional(),
      draft: z.boolean(),
      tags: z.array(z.string().min(1)).optional(),
    })
    .refine((data) => !data.heroImage || data.heroAlt, {
      message: 'heroAlt is required when heroImage is set.',
      path: ['heroAlt'],
    }),
});

export const collections = { articles };

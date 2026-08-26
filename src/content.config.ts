import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        area: z.string(),
        order: z.number(),
        tags: z.array(z.string()),
        lastReviewed: z.string()
      })
    })
  }),
  i18n: defineCollection({
    loader: i18nLoader(),
    schema: i18nSchema()
  })
};

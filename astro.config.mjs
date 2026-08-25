import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://ai-engineering-knowledge-base.example',
  integrations: [
    starlight({
      title: 'AI Engineering Knowledge Base',
      description: 'A static learning and reference website for building useful, reliable and responsible AI systems.',
      logo: {
        src: './src/assets/logo.svg',
        alt: 'AI Engineering Knowledge Base'
      },
      favicon: '/favicon.svg',
      customCss: ['./src/styles/tokens.css', './src/styles/site.css'],
      components: {
        PageTitle: './src/components/PageTitle.astro'
      },
      tableOfContents: false,
      lastUpdated: false,
      pagination: true,
      sidebar: [
        {
          label: 'Start here',
          items: [{ autogenerate: { directory: 'start-here' } }]
        },
        {
          label: 'Building and deploying AI applications',
          items: [{ autogenerate: { directory: 'building-deploying-ai-applications' } }]
        },
        {
          label: 'Software engineering fundamentals',
          items: [{ autogenerate: { directory: 'software-engineering-fundamentals' } }]
        },
        {
          label: 'Using coding agents',
          items: [{ autogenerate: { directory: 'using-coding-agents' } }]
        },
        {
          label: 'Shaping the build',
          items: [{ autogenerate: { directory: 'shaping-the-build' } }]
        },
        {
          label: 'Cross-cutting knowledge',
          items: [{ autogenerate: { directory: 'cross-cutting-knowledge' } }]
        }
      ],
      head: [
        { tag: 'meta', attrs: { property: 'og:title', content: 'AI Engineering Knowledge Base' } },
        { tag: 'meta', attrs: { property: 'og:description', content: 'Build AI systems that are useful, reliable and responsible.' } },
        { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
        { tag: 'meta', attrs: { property: 'og:image', content: '/og.svg' } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          content: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOccupationalProgram',
            name: 'AI Engineering Knowledge Base',
            description: 'A learning and reference knowledge base for AI Engineering skills, concepts and practices.',
            educationalProgramMode: 'online',
            teaches: ['AI engineering', 'software engineering', 'coding agents', 'responsible AI product shaping']
          })
        }
      ]
    })
  ]
});

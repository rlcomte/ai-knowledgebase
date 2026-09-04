import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://ai-engineering-knowledge-base.example',
  integrations: [
    starlight({
      title: {
        en: 'AI Engineering Knowledge Base',
        nl: 'AI Engineering Kennisbank'
      },
      description: 'A static learning and reference website for building useful, reliable and responsible AI systems.',
      defaultLocale: 'root',
      locales: {
        root: {
          label: 'English',
          lang: 'en'
        },
        nl: {
          label: 'Nederlands',
          lang: 'nl'
        }
      },
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
          translations: {
            nl: 'Begin hier'
          },
          items: [{ autogenerate: { directory: 'start-here' } }]
        },
        {
          label: 'Building and deploying AI applications',
          translations: {
            nl: 'AI-applicaties bouwen en uitrollen'
          },
          items: [{ autogenerate: { directory: 'building-deploying-ai-applications' } }]
        },
        {
          label: 'Software engineering fundamentals',
          translations: {
            nl: 'Basisprincipes van software engineering'
          },
          items: [{ autogenerate: { directory: 'software-engineering-fundamentals' } }]
        },
        {
          label: 'Using coding agents',
          translations: {
            nl: 'Coding agents gebruiken'
          },
          items: [{ autogenerate: { directory: 'using-coding-agents' } }]
        },
        {
          label: 'Shaping the build',
          translations: {
            nl: 'De bouwopgave vormgeven'
          },
          items: [{ autogenerate: { directory: 'shaping-the-build' } }]
        },
        {
          label: 'Real world examples',
          translations: {
            nl: 'Praktijkvoorbeelden'
          },
          items: [{ autogenerate: { directory: 'real-world-examples' } }]
        },
        {
          label: 'Cross-cutting knowledge',
          translations: {
            nl: 'Overkoepelende kennis'
          },
          items: [{ autogenerate: { directory: 'cross-cutting-knowledge' } }]
        },
        {
          label: 'Social AI',
          translations: {
            nl: 'Sociale AI'
          },
          items: [{ autogenerate: { directory: 'social-ai' } }]
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

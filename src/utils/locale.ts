export const dutchLocale = 'nl';

const areaLabels = {
  'Area 1': 'Gebied 1',
  'Area 2': 'Gebied 2',
  'Area 3': 'Gebied 3',
  'Area 4': 'Gebied 4'
} as const;

export function isDutchLocale(locale: string | undefined) {
  return locale === dutchLocale;
}

export function localizedPath(href: string, locale: string | undefined) {
  if (!isDutchLocale(locale)) return href;
  if (!href.startsWith('/') || href.startsWith('/nl/') || href.startsWith('//')) return href;
  return href === '/' ? '/nl/' : `/nl${href}`;
}

export function ui(locale: string | undefined) {
  const isDutch = isDutchLocale(locale);
  return {
    areaLabel(value: string) {
      return isDutch && value in areaLabels ? areaLabels[value as keyof typeof areaLabels] : value;
    },
    component: {
      definition: isDutch ? 'Definitie' : 'Definition',
      engineeringMode: isDutch ? 'Engineeringmodus' : 'Engineering Mode',
      evaluationCheck: isDutch ? 'Evaluatiecheck' : 'Evaluation check',
      realExample: isDutch ? 'Praktijkvoorbeeld' : 'Real Example',
      tradeoff: isDutch ? 'Afweging' : 'Trade-off',
      learningPath: isDutch ? 'Leerpad' : 'Learning path',
      priorKnowledge: isDutch ? 'Voorkennis:' : 'Prior knowledge:',
      outcome: isDutch ? 'Resultaat:' : 'Outcome:',
      keyIdea: isDutch ? 'Kernidee' : 'Key idea',
      relatedConcepts: isDutch ? 'Gerelateerde concepten' : 'Related Concepts',
      relatedConceptsLabel: isDutch ? 'Gerelateerde concepten' : 'Related concepts',
      tags: 'Tags',
      explore: isDutch ? 'Verkennen' : 'Explore',
      cycle: isDutch ? 'Cyclus' : 'Cycle',
      cycleOrder: isDutch ? 'Volgorde van de cyclus' : 'Cycle order'
    }
  };
}

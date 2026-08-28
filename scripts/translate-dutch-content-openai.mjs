import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';

const docsRoot = 'src/content/docs';
const nlRoot = join(docsRoot, 'nl');
const model = process.env.OPENAI_TRANSLATION_MODEL || 'gpt-5';
const apiKey = process.env.OPENAI_API_KEY;
const progressFile = '.openai-dutch-translation-progress.json';

if (!apiKey) {
  console.error('OPENAI_API_KEY is not set.');
  process.exit(1);
}

const requested = new Set(process.argv.slice(2));
const progress = existsSync(progressFile)
  ? JSON.parse(readFileSync(progressFile, 'utf8'))
  : { completed: [] };
const completed = new Set(progress.completed);

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const file = join(dir, entry);
    if (file.startsWith(nlRoot)) continue;
    if (statSync(file).isDirectory()) walk(file, files);
    else if (file.endsWith('.mdx')) files.push(file);
  }
  return files;
}

function relWithoutExt(file) {
  return relative(docsRoot, file).replace(/\.mdx$/, '');
}

function toDutchPath(englishPath) {
  return join(nlRoot, relative(docsRoot, englishPath));
}

function normalizeDutchMdx(content) {
  return content
    .replace(/from '..\/..\/..\/assets\//g, "from '../../../../assets/")
    .replace(/href="\/(?!nl\/|\/|https?:|#)/g, 'href="/nl/')
    .replace(/\]\(\/(?!nl\/|\/|https?:|#)/g, '](/nl/')
    .replace(/href: '\/(?!nl\/|\/|https?:|#)/g, "href: '/nl/")
    .replace(/href":"\/(?!nl\/|\/|https?:|#)/g, 'href":"/nl/');
}

function extractMdx(text) {
  const trimmed = text.trim();
  const fenced = trimmed.match(/^```(?:mdx|markdown)?\n([\s\S]*?)\n```$/);
  return fenced ? fenced[1].trim() + '\n' : trimmed + '\n';
}

function getResponseText(data) {
  if (typeof data.output_text === 'string' && data.output_text.trim()) {
    return data.output_text;
  }
  const chunks = [];
  for (const item of data.output ?? []) {
    for (const content of item.content ?? []) {
      if (typeof content.text === 'string') chunks.push(content.text);
    }
  }
  return chunks.join('\n');
}

async function translatePage(englishPath) {
  const rel = relWithoutExt(englishPath);
  const dutchPath = toDutchPath(englishPath);
  const english = readFileSync(englishPath, 'utf8');
  const currentDutch = existsSync(dutchPath) ? readFileSync(dutchPath, 'utf8') : '';

  const input = [
    {
      role: 'system',
      content: [
        {
          type: 'input_text',
          text: [
            'You are a senior Dutch technical translator for an Astro/Starlight MDX documentation site.',
            'Translate from English to natural, professional Dutch for software engineering students.',
            'Preserve all MDX, JSX, Astro component tags, imports, frontmatter keys, arrays, URLs, code fences, and Markdown table structure.',
            'Translate user-facing prose, frontmatter title/description/area values, headings, alt text, figcaptions, table cells, list items, component body text, labels, priors, outcomes, and source notes.',
            'Keep established technical terms when natural in Dutch: AI Engineering, software engineering, machine learning, deep learning, foundation model, LLM, prompt, grounding, RAG, tool calling, MCP, evals, guardrails, coding agent, harness, workflow, deployment, observability, rollback, CI.',
            'Use Dutch spelling and grammar, not literal English word order. Prefer "gedrag" for behaviour and "bewijs" for evidence.',
            'Do not add explanations, comments, or extra sections. Return only the complete translated MDX file.'
          ].join('\n')
        }
      ]
    },
    {
      role: 'user',
      content: [
        {
          type: 'input_text',
          text: [
            `Translate this English source page to Dutch for src/content/docs/nl/${rel}.mdx.`,
            'Use the current Dutch page only for existing localized titles/areas and route style; replace poor or English text where needed.',
            'All internal root-relative links must point to /nl/...',
            '',
            '--- ENGLISH SOURCE ---',
            english,
            '',
            '--- CURRENT DUTCH PAGE ---',
            currentDutch
          ].join('\n')
        }
      ]
    }
  ];

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model,
      input,
      text: {
        format: { type: 'text' }
      }
    })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${response.status} ${response.statusText}: ${body}`);
  }

  const data = await response.json();
  const responseText = getResponseText(data);
  const output = normalizeDutchMdx(extractMdx(responseText));
  if (!output.startsWith('---\n')) {
    mkdirSync('/tmp/openai-dutch-translation-debug', { recursive: true });
    writeFileSync(
      `/tmp/openai-dutch-translation-debug/${rel.replaceAll('/', '__')}.json`,
      JSON.stringify(data, null, 2) + '\n'
    );
    throw new Error(`Translation for ${rel} did not return an MDX file.`);
  }

  mkdirSync(dirname(dutchPath), { recursive: true });
  writeFileSync(dutchPath, output);
  completed.add(rel);
  writeFileSync(progressFile, JSON.stringify({ completed: [...completed].sort() }, null, 2) + '\n');
  console.log(`translated ${relative('.', dutchPath)}`);
}

const pages = walk(docsRoot).sort();
const targets = pages.filter((page) => {
  const rel = relWithoutExt(page);
  if (requested.size && !requested.has(rel) && !requested.has(page)) return false;
  return !completed.has(rel);
});

console.log(`Translating ${targets.length} page(s) with ${model}`);

for (const page of targets) {
  await translatePage(page);
}

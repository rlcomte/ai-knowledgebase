import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = 'src/content/docs';
const required = ['title', 'description', 'area', 'order', 'tags', 'lastReviewed', 'status', 'lastModified'];
const statuses = new Set(['new', 'updated', 'beta', 'stable']);
const failures = [];
const englishPages = new Set();
const dutchPages = new Set();

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      walk(path);
      continue;
    }
    if (path.endsWith('.md') || path.endsWith('.mdx')) validate(path);
  }
}

function validate(path) {
  const rel = relative('.', path);
  const docsRel = relative(root, path).replace(/\.(md|mdx)$/, '');
  if (docsRel.startsWith('nl/')) dutchPages.add(docsRel.slice(3));
  else englishPages.add(docsRel);

  const content = readFileSync(path, 'utf8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    failures.push(`${rel}: missing frontmatter`);
    return;
  }
  for (const key of required) {
    if (!new RegExp(`^${key}:`, 'm').test(match[1])) failures.push(`${rel}: missing ${key}`);
  }
  const lastReviewed = match[1].match(/^lastReviewed:\s*["']?([^"'\s]+)["']?\s*$/m)?.[1];
  if (lastReviewed && !/^\d{4}-\d{2}-\d{2}$/.test(lastReviewed)) failures.push(`${rel}: lastReviewed must use YYYY-MM-DD`);
  const status = match[1].match(/^status:\s*["']?([^"'\s]+)["']?\s*$/m)?.[1];
  if (status && !statuses.has(status)) failures.push(`${rel}: invalid status ${status}`);
  const lastModified = match[1].match(/^lastModified:\s*["']?([^"'\s]+)["']?\s*$/m)?.[1];
  if (lastModified && !/^\d{4}-\d{2}-\d{2}$/.test(lastModified)) {
    failures.push(`${rel}: lastModified must use YYYY-MM-DD`);
  }
}

walk(root);

for (const page of englishPages) {
  if (!dutchPages.has(page)) failures.push(`src/content/docs/nl/${page}.mdx: missing Dutch translation`);
}

for (const page of dutchPages) {
  if (!englishPages.has(page)) failures.push(`src/content/docs/nl/${page}.mdx: no matching English source page`);
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Validated frontmatter and locale coverage for ${root}`);

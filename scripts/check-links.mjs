import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const docsRoot = 'src/content/docs';
const publicRoot = 'public';
const files = [];
const failures = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) walk(path);
    else if (path.endsWith('.md') || path.endsWith('.mdx')) files.push(path);
  }
}

function slugForFile(file) {
  const rel = relative(docsRoot, file).replace(/\.(md|mdx)$/, '');
  if (rel === 'index') return '/';
  if (rel === 'nl/index') return '/nl/';
  return `/${rel.replace(/\/index$/, '')}/`;
}

walk(docsRoot);
const routes = new Set(files.map(slugForFile));

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  const rel = relative('.', file);
  const links = [
    ...content.matchAll(/href=["']([^"']+)["']/g),
    ...content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)
  ].map((match) => match[1]);

  for (const raw of links) {
    if (/^(https?:|mailto:|#)/.test(raw)) continue;
    const url = raw.split('#')[0];
    if (!url || url.startsWith('app://')) continue;
    if (url.startsWith('/')) {
      const isAsset = existsSync(join(publicRoot, url.slice(1)));
      if (!routes.has(url) && !isAsset) failures.push(`${rel}: broken internal link ${raw}`);
    }
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Checked internal links across ${files.length} docs pages`);

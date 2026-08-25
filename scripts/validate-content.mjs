import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = 'src/content/docs';
const required = ['title', 'description', 'area', 'order', 'tags', 'lastReviewed'];
const failures = [];

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
  const content = readFileSync(path, 'utf8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    failures.push(`${rel}: missing frontmatter`);
    return;
  }
  for (const key of required) {
    if (!new RegExp(`^${key}:`, 'm').test(match[1])) failures.push(`${rel}: missing ${key}`);
  }
  if (!/^lastReviewed:\s*["']?2026-08-25["']?\s*$/m.test(match[1])) {
    failures.push(`${rel}: lastReviewed must be 2026-08-25 for imported foundation content`);
  }
}

walk(root);

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Validated frontmatter for ${root}`);

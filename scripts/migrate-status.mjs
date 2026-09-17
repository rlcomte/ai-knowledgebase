import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = 'src/content/docs';
function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) walk(path, files);
    else if (/\.(md|mdx)$/.test(path)) files.push(path);
  }
  return files;
}
for (const file of walk(root)) {
  let content = readFileSync(file, 'utf8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match || /^status:/m.test(match[1])) continue;
  const reviewed = match[1].match(/^lastReviewed:\s*["']?([^"'\s]+)["']?/m)?.[1] || '2026-08-25';
  const frontmatter = `${match[1]}\nstatus: "stable"\nlastModified: "${reviewed}"`;
  content = content.replace(match[0], `---\n${frontmatter}\n---`);
  writeFileSync(file, content);
}

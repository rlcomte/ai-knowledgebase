#!/usr/bin/env bash
set -euo pipefail

task_root="${1:-.}"
brief_file="${2:-CODEX_BUILD_AI_ENGINEERING_SITE.md}"
source_file="AI-Engineering-Knowledge-Base-Foundation.md"

if ! command -v codex >/dev/null 2>&1; then
  echo "Codex CLI is not available on PATH." >&2
  exit 1
fi

if [[ ! -d "$task_root" ]]; then
  echo "Target directory does not exist: $task_root" >&2
  exit 1
fi

cd "$task_root"

if [[ ! -f "$brief_file" ]]; then
  echo "Build brief not found: $brief_file" >&2
  exit 1
fi

if [[ ! -f "$source_file" ]]; then
  echo "Knowledge-base source not found: $source_file" >&2
  exit 1
fi

if [[ ! -d .git ]]; then
  git init
fi

codex exec "$(<"$brief_file")"


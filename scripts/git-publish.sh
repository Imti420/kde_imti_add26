#!/usr/bin/env bash
# Shared publish helper for scheduled crawlers.
# Pulls with rebase, retries on race, never leaves a half-pushed cycle.
set -euo pipefail

MSG="${1:-chore(ops): automated publish}"
SHIFT_PATHS=("${@:2}")

if [ ${#SHIFT_PATHS[@]} -eq 0 ]; then
  echo "git-publish.sh: no paths given" >&2
  exit 1
fi

git config user.name "Imti420"
git config user.email "imtihanislam57@gmail.com"

git add -- "${SHIFT_PATHS[@]}"

if git diff --staged --quiet; then
  echo "No staged changes to publish."
  exit 0
fi

git commit -m "$MSG"

# GitHub Actions schedules can overlap; rebase and retry instead of failing the cycle.
for attempt in 1 2 3 4 5 6; do
  if git push origin HEAD:main; then
    echo "Published on attempt ${attempt}."
    exit 0
  fi
  echo "Push rejected (attempt ${attempt}). Rebasing onto origin/main…"
  git fetch origin main
  if ! git rebase origin/main; then
    echo "Rebase conflict — aborting publish so the next cycle can retry cleanly."
    git rebase --abort || true
    exit 1
  fi
  sleep $((attempt * 2))
done

echo "Exhausted publish retries." >&2
exit 1

#!/bin/bash
# scan-for-secrets.sh — pre-commit hook to prevent accidental secret commits
# Run by: .claude/settings.json PreToolUse hook before git commit

set -e

STAGED_FILES=$(git diff --cached --name-only)
EXIT_CODE=0

echo "🔍 Scanning for secrets in staged files..."

# Patterns to block
PATTERNS=(
  "STRIPE_SECRET_KEY="
  "SUPABASE_SERVICE_ROLE_KEY="
  "SUPABASE_JWT_SECRET="
  "API_KEY="
  "SECRET="
  "PASSWORD="
  "private_key"
  "-----BEGIN.*KEY-----"
  "aws_secret_access_key"
)

for file in $STAGED_FILES; do
  # Skip .env files (they're git-ignored anyway, but be safe)
  if [[ "$file" == .env* ]]; then
    echo "⚠️  $file appears to be an env file — it should be git-ignored. Blocking commit."
    EXIT_CODE=1
    continue
  fi

  # Skip non-text files
  if ! file "$file" | grep -q "text"; then
    continue
  fi

  # Check for secret patterns
  for pattern in "${PATTERNS[@]}"; do
    if git diff --cached "$file" | grep -i "$pattern" > /dev/null; then
      echo "❌ BLOCKED: $file contains potential secret: $pattern"
      EXIT_CODE=1
    fi
  done
done

if [ $EXIT_CODE -eq 0 ]; then
  echo "✅ No secrets detected. Safe to commit."
fi

exit $EXIT_CODE

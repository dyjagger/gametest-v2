# Security Guidelines - Forge of the Fallen

## Overview

Security considerations for a single-player card game with save data persistence.

---

## Key Security Areas

### 1. Save Data Integrity

**Risk**: Players modifying save files to cheat (infinite currency, unlocked content, etc.)

**Mitigations**:
- Validate all loaded save data against expected schemas
- Use checksums for save file integrity (optional - single player game)
- Sanitize all data before use

```typescript
function loadSaveData(): GameState | null {
  const raw = localStorage.getItem('save');
  if (!raw) return null;
  
  try {
    const data = JSON.parse(raw);
    if (!validateSaveSchema(data)) {
      console.warn('Invalid save data, starting fresh');
      return null;
    }
    return sanitizeSaveData(data);
  } catch {
    return null;
  }
}
```

### 2. No Hardcoded Secrets

Even for a client-side game:
- No API keys in source code
- No sensitive URLs hardcoded
- Use environment variables for any external services

```typescript
// ❌ Bad
const API_KEY = 'sk-12345';

// ✅ Good
const API_KEY = import.meta.env.VITE_API_KEY;
```

### 3. Input Validation

Validate all user inputs:
- Seed strings for seeded runs
- Player names (if implemented)
- Any text input

```typescript
function validateSeed(seed: string): string {
  // Limit length, remove dangerous characters
  return seed.slice(0, 32).replace(/[^a-zA-Z0-9-_]/g, '');
}
```

### 4. RNG Security

For seeded runs:
- Use cryptographically-inspired seeding (not crypto-secure, but unpredictable)
- Document that seeds are reproducible (not a security feature)

```typescript
import seedrandom from 'seedrandom';

function createRng(seed: string) {
  return seedrandom(seed);
}
```

### 5. Third-Party Dependencies

- Regularly audit dependencies (`npm audit`)
- Keep dependencies updated
- Minimize dependency count
- Review new dependencies before adding

### 6. Build Security

- Don't expose source maps in production
- Minify and obfuscate production builds
- Use Content Security Policy headers when hosted

---

## Steam-Specific Security (Future)

When porting to Steam:
- Use Steam's authentication for cloud saves
- Implement VAC-compatible practices (if multiplayer added)
- Follow Steamworks security guidelines

---

## Reporting Security Issues

If you discover a security vulnerability:
1. Do not open a public issue
2. Contact the maintainer directly
3. Allow time for a fix before disclosure

---

## Checklist

- [ ] No secrets in source code
- [ ] Save data validation implemented
- [ ] Input sanitization for all user input
- [ ] Dependencies audited
- [ ] Production build doesn't expose source maps

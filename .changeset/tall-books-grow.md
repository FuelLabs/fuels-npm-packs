---
'@fuels/prettier-config': patch
'@fuels/eslint-config': patch
'@fuels/react-xstore': patch
'@fuels/changeset': patch
'@fuels/jest': patch
---

Feat: add `config.nextjs` as an option to have default config also for nextjs projects without conflict with base config.
Fix: add `config.monorepo` to add extra configuration when using monorepos with typescript
Fix: prettier configuration to be our default

To use custom eslint configs you can extends like this:

```json
{
  "extends": ["plugin:@fuels/eslint-config/nextjs"]
}
```

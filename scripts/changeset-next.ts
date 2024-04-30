import { writeFileSync } from 'node:fs';

const output = `---
"@fuels/playwright-utils": patch
"@fuels/react": patch
"@fuels/ts-config": patch
"@fuels/jest": patch
"@fuels/assets": patch
"@fuels/changeset": patch
"@fuels/tsup-config": patch
"@fuels/react-xstore": patch
"@fuels/react-xstore": patch
"@fuels/eslint-plugin": patch
"@fuels/local-storage": patch
"@fuels/prettier-config": patch

---
\nincremental\n`;
writeFileSync('.changeset/fuel-labs-ci.md', output);

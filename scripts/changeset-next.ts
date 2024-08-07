import { writeFileSync } from 'node:fs';

const output = `---
"@fuels/playwright-utils": patch
"@fuels/ts-config": patch
"@fuels/jest": patch
"@fuels/changeset": patch
"@fuels/tsup-config": patch
"@fuels/react-xstore": patch
"@fuels/eslint-plugin": patch
"@fuels/local-storage": patch
"@fuels/prettier-config": patch
---

incremental
`;
writeFileSync('.changeset/fuel-labs-ci.md', output);

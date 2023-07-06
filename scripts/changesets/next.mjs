import { writeFile } from 'node:fs/promises';

const output = `---\npatch\n---\n\nincremental\n`;
writeFile('.changeset/fuel-labs-ci.md', output);

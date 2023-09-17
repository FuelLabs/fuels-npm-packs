/**
 * This script was copied from https://github.com/formidablelabs/urql
 */
const { getInfo } = require('@changesets/get-github-info');
const { config } = require('dotenv');

config();

const SEE_LINE = /^See:\s*(.*)/i;
const TRAILING_CHAR = /[.;:]$/g;
const listFormatter = new Intl.ListFormat('en-US');

const getSummaryLines = (cs) => {
  const lines = cs.summary
    .trim()
    .split(/[\r\n]+/)
    .map((l) => l.trim())
    .filter(Boolean);
  const size = lines.length;
  if (size > 0) {
    lines[size - 1] = lines[size - 1].replace(TRAILING_CHAR, '');
  }

  return lines;
};

/** Creates a "(See X)" string from a template */
const templateSeeRef = (links) => {
  const humanReadableLinks = links.filter(Boolean).map((link) => {
    if (typeof link === 'string') return link;
    return link.pull || link.commit;
  });

  const size = humanReadableLinks.length;
  if (size === 0) return '';

  const str = listFormatter.format(humanReadableLinks);
  return `(See ${str})`;
};

const changelogFunctions = {
  getDependencyReleaseLine: async () => {
    return '';
  },
  getReleaseLine: async (changeset, _type, options) => {
    if (!options || !options.repo) {
      throw new Error(
        'Please provide a repo to this changelog generator like this:\n"changelog": ["@changesets/changelog-github", { "repo": "org/repo" }]'
      );
    }

    let pull, commit, user;

    const lines = getSummaryLines(changeset);
    const prLineIndex = lines.findIndex((line) => SEE_LINE.test(line));
    if (prLineIndex > -1) {
      const match = lines[prLineIndex].match(SEE_LINE);
      pull = (match && match[1].trim()) || undefined;
      lines.splice(prLineIndex, 1);
    }

    const [firstLine, ...futureLines] = lines;

    if (changeset.commit && !pull) {
      const { links } = await getInfo({
        repo:  options.repo,
        commit: changeset.commit,
      });

      pull = links.pull || undefined;
      commit = links.commit || undefined;
      user = links.user || undefined;
    }

    let annotation = '';
    if (/^\s*fix/i.test(firstLine)) {
      annotation = '🐞 ';
    }
    if (/^\s*feat/i.test(firstLine)) {
      annotation = '✨ ';
    }
    if (/^\s*style/i.test(firstLine)) {
      annotation = '💅🏻 ';
    }
    if (/^\s*doc/i.test(firstLine)) {
      annotation = '📃 ';
    }

    let str = `- ${annotation}${firstLine}`;
    if (futureLines.length > 0) {
      str += `\n${futureLines.map((l) => `  ${l}`).join('\n')}`;
    }

    if (user) {
      str += `, by ${user}`;
    }

    if (pull || commit) {
      const seeRef = templateSeeRef([pull || commit]);
      if (seeRef) str += ` ${seeRef}`;
    }

    return str;
  },
};

module.exports = {
  ...changelogFunctions,
  default: changelogFunctions,
};

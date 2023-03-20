const dayjs = require('dayjs');
const markdownLib = require('../plugins/markdown');
const md = require('markdown-it')();

/** Returns the first `limit` elements of the the given array. */
const limit = (array, limit) => {
  if (limit < 0) {
    throw new Error(`Negative limits are not allowed: ${limit}.`);
  }
  return array.slice(0, limit);
};

/** Converts the given markdown string to HTML, returning it as a string. */
const toHtml = markdownString => {
  return markdownLib.renderInline(markdownString);
};

/**
 * Render content as inline markdown if single line, or full
 * markdown if multiline. for md in yaml
 * @param {string} [content]
 * @param {import('markdown-it').Options} [opts]
 * @return {string|undefined}
 */

/** Converts the given date string to ISO8610 format. */
const toIsoString = dateString => dayjs(dateString).toISOString();

const mdInline = (content, opts) => {
  if (!content) {
    return;
  }

  if (opts) {
    md.set(opts);
  }

  let inline = !content.includes('\n');

  // If there's quite a bit of content, we want to make sure
  // it's marked up for readability purposes
  if (inline && content.length > 200) {
    inline = false;
  }

  return inline ? md.renderInline(content) : md.render(content);
};

module.exports = {
  limit,
  toHtml,
  toIsoString,
  mdInline
};
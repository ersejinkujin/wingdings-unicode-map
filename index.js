/**
 * Map classic Wingdings glyphs to Unicode, and convert text both ways.
 *
 * Code points follow the public Wikipedia Wingdings chart, which records the
 * characters added for Wingdings in Unicode 7.0. U+FE0E (text variation
 * selector) is appended only when that code point has default emoji
 * presentation, so the symbol stays monochrome where a text style exists.
 * Characters with no entry are returned unchanged.
 */

import rawMap from "./wingdings.json" with { type: "json" };

/** ASCII character to Wingdings Unicode symbol. Values are frozen. */
export const map = Object.freeze({ ...rawMap });

const reverse = new Map();
for (const [ascii, symbol] of Object.entries(map)) {
  const base = [...symbol].find((ch) => ch !== "\uFE0E");
  if (reverse.has(base)) {
    throw new Error(`Duplicate Wingdings symbol for U+${ascii.codePointAt(0).toString(16)}`);
  }
  reverse.set(base, ascii);
}

const VARIATION_SELECTORS = new Set(["\uFE0E", "\uFE0F"]);

function assertString(text) {
  if (typeof text !== "string") {
    throw new TypeError("Expected a string");
  }
}

/**
 * Replace each mapped character with its Wingdings Unicode symbol.
 * Unmapped characters, including space, are copied through.
 * @param {string} text
 * @returns {string}
 */
export function toWingdings(text) {
  assertString(text);
  let out = "";
  for (const ch of text) {
    out += map[ch] ?? ch;
  }
  return out;
}

/**
 * Map Wingdings Unicode symbols back to ASCII.
 * A text or emoji variation selector (U+FE0E or U+FE0F) immediately after a
 * mapped symbol is consumed and does not appear in the result.
 * Unmapped characters are copied through.
 * @param {string} text
 * @returns {string}
 */
export function fromWingdings(text) {
  assertString(text);
  const chars = [...text];
  let out = "";
  for (let i = 0; i < chars.length; i++) {
    const ascii = reverse.get(chars[i]);
    if (ascii === undefined) {
      out += chars[i];
      continue;
    }
    out += ascii;
    const next = chars[i + 1];
    if (next !== undefined && VARIATION_SELECTORS.has(next)) {
      i += 1;
    }
  }
  return out;
}

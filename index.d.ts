/**
 * Printable ASCII characters (U+0021 through U+007E) mapped to the Unicode
 * symbol that corresponds to that key in the classic Wingdings font.
 *
 * A value may end with U+FE0E when the symbol's default presentation is emoji.
 * U+0020 SPACE is intentionally absent.
 */
export const map: Readonly<Record<string, string>>;

/**
 * Replace each mapped character with its Wingdings Unicode symbol.
 * Unmapped characters are copied through unchanged.
 */
export function toWingdings(text: string): string;

/**
 * Map Wingdings Unicode symbols back to ASCII.
 * U+FE0E or U+FE0F immediately after a mapped symbol is consumed.
 * Unmapped characters are copied through unchanged.
 */
export function fromWingdings(text: string): string;

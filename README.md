# wingdings-unicode-map

Map printable ASCII characters to the Unicode symbols that correspond to the classic Wingdings glyphs, and convert text in both directions.

Wingdings is a dingbat font: the letter you type selects a symbol, not that letter. This package records that correspondence with Unicode characters (including the Wingdings symbols added in Unicode 7.0) so the symbols can be stored and displayed without the font. It is a visual approximation, not a copy of the font.

94 characters are mapped, U+0021 through U+007E. U+0020 SPACE is left unmapped and passes through unchanged.

## Install

```sh
npm install wingdings-unicode-map
```

The package is ESM, has no dependencies, and requires Node.js 18 or later.

## Usage

```js
import { toWingdings, fromWingdings, map } from "wingdings-unicode-map";

toWingdings("ABC");
// ✌🖏👍︎

fromWingdings(toWingdings("ABC 123"));
// "ABC 123"

map.A === "\u270C";          // VICTORY HAND
map.B === "\u{1F58F}";      // TURNED OK HAND SIGN
map.C === "\u{1F44D}\uFE0E"; // THUMBS UP SIGN, text style
```

`toWingdings` replaces each mapped character and copies everything else through. `fromWingdings` reverses that. A variation selector U+FE0E or U+FE0F placed immediately after a mapped symbol is ignored, so text-style and emoji-style input decode to the same ASCII character.

```js
fromWingdings("👍");          // "C"
fromWingdings("👍︎");    // "C"  (U+FE0E consumed)
fromWingdings("👍\uFE0F"); // "C"  (U+FE0F consumed)
```

Characters with no entry are unchanged. Space, newlines, and letters outside the map are copied as they are:

```js
toWingdings("A A\n");
// map.A + " " + map.A + "\n"
```

## Mapping

Uppercase and lowercase are different pictures. `A` is a victory hand; `a` is the Cancer zodiac sign. Aries, Taurus, and Gemini sit on `^`, `_`, and `` ` ``.

Where the Unicode character's default presentation is emoji, the mapped string ends with U+FE0E (VARIATION SELECTOR-15) so renderers that honor it use the monochrome text style. The selector is omitted when the character already defaults to text. See [Text variation selector](#text-variation-selector).

### A–Z

| Character | Symbol | Code point | Unicode name | Text selector |
| --- | --- | --- | --- | --- |
| `A` | ✌ | U+270C | VICTORY HAND |  |
| `B` | 🖏 | U+1F58F | TURNED OK HAND SIGN |  |
| `C` | 👍 | U+1F44D | THUMBS UP SIGN | U+FE0E |
| `D` | 👎 | U+1F44E | THUMBS DOWN SIGN | U+FE0E |
| `E` | ☜ | U+261C | WHITE LEFT POINTING INDEX |  |
| `F` | ☞ | U+261E | WHITE RIGHT POINTING INDEX |  |
| `G` | ☝ | U+261D | WHITE UP POINTING INDEX |  |
| `H` | 🖗 | U+1F597 | WHITE DOWN POINTING LEFT HAND INDEX |  |
| `I` | 🖐 | U+1F590 | RAISED HAND WITH FINGERS SPLAYED |  |
| `J` | ☺ | U+263A | WHITE SMILING FACE |  |
| `K` | 😐 | U+1F610 | NEUTRAL FACE | U+FE0E |
| `L` | ☹ | U+2639 | WHITE FROWNING FACE |  |
| `M` | 💣 | U+1F4A3 | BOMB | U+FE0E |
| `N` | 🕱 | U+1F571 | BLACK SKULL AND CROSSBONES |  |
| `O` | 🏳 | U+1F3F3 | WAVING WHITE FLAG |  |
| `P` | 🏱 | U+1F3F1 | WHITE PENNANT |  |
| `Q` | ✈ | U+2708 | AIRPLANE |  |
| `R` | ☼ | U+263C | WHITE SUN WITH RAYS |  |
| `S` | 🌢 | U+1F322 | BLACK DROPLET |  |
| `T` | ❄ | U+2744 | SNOWFLAKE |  |
| `U` | 🕆 | U+1F546 | WHITE LATIN CROSS |  |
| `V` | ✞ | U+271E | SHADOWED WHITE LATIN CROSS |  |
| `W` | 🕈 | U+1F548 | CELTIC CROSS |  |
| `X` | ✠ | U+2720 | MALTESE CROSS |  |
| `Y` | ✡ | U+2721 | STAR OF DAVID |  |
| `Z` | ☪ | U+262A | STAR AND CRESCENT |  |

### a–z

| Character | Symbol | Code point | Unicode name | Text selector |
| --- | --- | --- | --- | --- |
| `a` | ♋ | U+264B | CANCER | U+FE0E |
| `b` | ♌ | U+264C | LEO | U+FE0E |
| `c` | ♍ | U+264D | VIRGO | U+FE0E |
| `d` | ♎ | U+264E | LIBRA | U+FE0E |
| `e` | ♏ | U+264F | SCORPIUS | U+FE0E |
| `f` | ♐ | U+2650 | SAGITTARIUS | U+FE0E |
| `g` | ♑ | U+2651 | CAPRICORN | U+FE0E |
| `h` | ♒ | U+2652 | AQUARIUS | U+FE0E |
| `i` | ♓ | U+2653 | PISCES | U+FE0E |
| `j` | 🙰 | U+1F670 | SCRIPT LIGATURE ET ORNAMENT |  |
| `k` | 🙵 | U+1F675 | SWASH AMPERSAND ORNAMENT |  |
| `l` | ⚫ | U+26AB | MEDIUM BLACK CIRCLE | U+FE0E |
| `m` | 🔾 | U+1F53E | LOWER RIGHT SHADOWED WHITE CIRCLE |  |
| `n` | ◼ | U+25FC | BLACK MEDIUM SQUARE |  |
| `o` | 🞏 | U+1F78F | MEDIUM WHITE SQUARE |  |
| `p` | 🞐 | U+1F790 | BOLD WHITE SQUARE |  |
| `q` | ❑ | U+2751 | LOWER RIGHT SHADOWED WHITE SQUARE |  |
| `r` | ❒ | U+2752 | UPPER RIGHT SHADOWED WHITE SQUARE |  |
| `s` | 🞟 | U+1F79F | BLACK MEDIUM SMALL LOZENGE |  |
| `t` | ⧫ | U+29EB | BLACK LOZENGE |  |
| `u` | ◆ | U+25C6 | BLACK DIAMOND |  |
| `v` | ❖ | U+2756 | BLACK DIAMOND MINUS WHITE X |  |
| `w` | 🞙 | U+1F799 | BLACK MEDIUM SMALL DIAMOND |  |
| `x` | ⌧ | U+2327 | X IN A RECTANGLE BOX |  |
| `y` | ⮹ | U+2BB9 | UP ARROWHEAD IN A RECTANGLE BOX |  |
| `z` | ⌘ | U+2318 | PLACE OF INTEREST SIGN |  |

### Digits

| Character | Symbol | Code point | Unicode name | Text selector |
| --- | --- | --- | --- | --- |
| `0` | 🗀 | U+1F5C0 | FOLDER |  |
| `1` | 🗁 | U+1F5C1 | OPEN FOLDER |  |
| `2` | 🗎 | U+1F5CE | DOCUMENT |  |
| `3` | 🗏 | U+1F5CF | PAGE |  |
| `4` | 🗐 | U+1F5D0 | PAGES |  |
| `5` | 🗄 | U+1F5C4 | FILE CABINET |  |
| `6` | ⏳ | U+23F3 | HOURGLASS WITH FLOWING SAND | U+FE0E |
| `7` | 🖮 | U+1F5AE | WIRED KEYBOARD |  |
| `8` | 🖰 | U+1F5B0 | TWO BUTTON MOUSE |  |
| `9` | 🖲 | U+1F5B2 | TRACKBALL |  |

### Punctuation

| Character | Symbol | Code point | Unicode name | Text selector |
| --- | --- | --- | --- | --- |
| `!` | 🖉 | U+1F589 | LOWER LEFT PENCIL |  |
| `"` | ✂ | U+2702 | BLACK SCISSORS |  |
| `#` | ✁ | U+2701 | UPPER BLADE SCISSORS |  |
| `$` | 👓 | U+1F453 | EYEGLASSES | U+FE0E |
| `%` | 🕭 | U+1F56D | RINGING BELL |  |
| `&` | 🕮 | U+1F56E | BOOK |  |
| `'` | 🕯 | U+1F56F | CANDLE |  |
| `(` | 🕿 | U+1F57F | BLACK TOUCHTONE TELEPHONE |  |
| `)` | ✆ | U+2706 | TELEPHONE LOCATION SIGN |  |
| `*` | 🖂 | U+1F582 | BACK OF ENVELOPE |  |
| `+` | 🖃 | U+1F583 | STAMPED ENVELOPE |  |
| `,` | 📪 | U+1F4EA | CLOSED MAILBOX WITH LOWERED FLAG | U+FE0E |
| `-` | 📫 | U+1F4EB | CLOSED MAILBOX WITH RAISED FLAG | U+FE0E |
| `.` | 📬 | U+1F4EC | OPEN MAILBOX WITH RAISED FLAG | U+FE0E |
| `/` | 📭 | U+1F4ED | OPEN MAILBOX WITH LOWERED FLAG | U+FE0E |
| `:` | 🖳 | U+1F5B3 | OLD PERSONAL COMPUTER |  |
| `;` | 🖴 | U+1F5B4 | HARD DISK |  |
| `<` | 🖫 | U+1F5AB | WHITE HARD SHELL FLOPPY DISK |  |
| `=` | 🖬 | U+1F5AC | SOFT SHELL FLOPPY DISK |  |
| `>` | ✇ | U+2707 | TAPE DRIVE |  |
| `?` | ✍ | U+270D | WRITING HAND |  |
| `@` | 🖎 | U+1F58E | LEFT WRITING HAND |  |
| `[` | ☯ | U+262F | YIN YANG |  |
| `\` | 🕉 | U+1F549 | OM SYMBOL |  |
| `]` | ☸ | U+2638 | WHEEL OF DHARMA |  |
| `^` | ♈ | U+2648 | ARIES | U+FE0E |
| `_` | ♉ | U+2649 | TAURUS | U+FE0E |
| `` ` `` | ♊ | U+264A | GEMINI | U+FE0E |
| `{` | 🏵 | U+1F3F5 | ROSETTE |  |
| \| | 🏶 | U+1F3F6 | BLACK ROSETTE |  |
| `}` | 🙶 | U+1F676 | SANS-SERIF HEAVY DOUBLE TURNED COMMA QUOTATION MARK ORNAMENT |  |
| `~` | 🙷 | U+1F677 | SANS-SERIF HEAVY DOUBLE COMMA QUOTATION MARK ORNAMENT |  |

## Text variation selector

U+FE0E is appended only when the code point has `Emoji_Presentation=Yes` in the Unicode emoji data (UTS #51). Those characters would otherwise display as color emoji. Characters that have the `Emoji` property but already default to text are stored as a single code point.

23 mapped symbols include U+FE0E. `fromWingdings` accepts the symbol with U+FE0E, with U+FE0F, or with no selector.

## Unmapped characters

- **U+0020 SPACE.** The Wingdings glyph is blank, so space is omitted from `wingdings.json` and passes through.
- **Controls and other non-ASCII characters.** They are not Wingdings key positions in this map, so they pass through.
- **Wingdings byte 0xFF (the Windows logo).** It has no Unicode equivalent and it sits outside printable ASCII, so it is not mapped.

## Limitations

This library substitutes Unicode characters for Wingdings glyphs. It does not include the font, and the shapes you see depend on the fonts installed. Several of these characters were added in Unicode 7.0 and need a font that covers them. A renderer that ignores U+FE0E may still draw a color emoji for the 23 symbols that default to emoji presentation.

`fromWingdings(toWingdings(text))` returns `text` for ordinary strings. `fromWingdings` also translates a symbol that was already in the input back to its ASCII key, so it is not a no-op on arbitrary Unicode.

Older charts sometimes used an earlier approximation instead of the Unicode 7.0 character. Examples: U+1F44C for `B` (this map uses U+1F58F TURNED OK HAND SIGN), U+261F for `H` (this map uses U+1F597), and U+2620 for `N` (this map uses U+1F571). The code points here follow the Wikipedia Wingdings chart.

Wingdings 2, Wingdings 3, and Webdings are separate fonts and are not covered.

## Online tool

[Wingdings Translator](https://wingdings.app/) is a free online translator with copy and paste, a decoder, and an A–Z chart.

## Development

```sh
npm test
```

Tests use the built-in Node.js test runner (`node:test`).

## Source

The character assignments are the Wingdings chart published on the English Wikipedia page [Wingdings](https://en.wikipedia.org/wiki/Wingdings). That chart gives the Unicode code point for each glyph of the original Wingdings font. Those code points are the Wingdings symbols added in [Unicode 7.0](https://www.unicode.org/versions/Unicode7.0.0/).

U+FE0E is decided from the `Emoji_Presentation` property in the Unicode emoji data file, not from the Wikipedia chart. Wikipedia shows the selector on a wider set of emoji-capable characters. This package adds it only where the default presentation is emoji, because that is when the selector changes the rendering.

## License

MIT. Copyright 2026 yi yi.

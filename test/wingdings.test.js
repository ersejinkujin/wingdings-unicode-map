import assert from "node:assert/strict";
import test from "node:test";
import { fromWingdings, map, toWingdings } from "../index.js";

const ASCII_AZ = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ASCII_AZ_LOWER = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";
const PUNCTUATION = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

test("maps every printable ASCII character except space", () => {
  const keys = Object.keys(map).sort();
  const expected = Array.from({ length: 94 }, (_, i) => String.fromCharCode(0x21 + i)).join("");
  assert.equal(keys.length, 94);
  assert.equal(keys.join(""), expected);
  assert.equal(map[" "], undefined);
});

test("round-trips A-Z", () => {
  assert.equal(fromWingdings(toWingdings(ASCII_AZ)), ASCII_AZ);
  assert.notEqual(toWingdings(ASCII_AZ), ASCII_AZ);
});

test("round-trips lowercase, digits, and punctuation", () => {
  const sample = `${ASCII_AZ_LOWER} ${DIGITS} ${PUNCTUATION}`;
  assert.equal(fromWingdings(toWingdings(sample)), sample);
});

test("passes unmapped characters through unchanged", () => {
  const sample = " \n\t\u0000é中\u007F";
  assert.equal(toWingdings(sample), sample);
  assert.equal(fromWingdings(sample), sample);
  assert.equal(toWingdings(`A${sample}Z`), `${map.A}${sample}${map.Z}`);
});

test("uses the Unicode 7.0 Wingdings characters for letters that older charts approximated", () => {
  assert.equal(map.A, "\u270C");
  assert.equal(map.B, "\u{1F58F}");
  assert.equal(map.H, "\u{1F597}");
  assert.equal(map.N, "\u{1F571}");
  assert.equal(map.S, "\u{1F322}");
  assert.equal(map["0"], "\u{1F5C0}");
  assert.equal(map["\\"], "\u{1F549}");
  assert.equal(map.j, "\u{1F670}");
});

test("appends U+FE0E only for default-emoji presentation", () => {
  const withSelector = Object.entries(map)
    .filter(([, symbol]) => symbol.includes("\uFE0E"))
    .map(([ascii]) => ascii)
    .sort()
    .join("");
  assert.equal(withSelector, "$,-./6CDKM^_`abcdefghil");
  for (const symbol of Object.values(map)) {
    assert.equal(symbol.split("\uFE0E").length - 1 <= 1, true);
    assert.equal(symbol.endsWith("\uFE0E") || !symbol.includes("\uFE0E"), true);
  }
});

test("decodes symbols with or without a variation selector", () => {
  assert.equal(fromWingdings("\u270C"), "A");
  assert.equal(fromWingdings("\u{1F44D}"), "C");
  assert.equal(fromWingdings("\u{1F44D}\uFE0E"), "C");
  assert.equal(fromWingdings("\u{1F44D}\uFE0F"), "C");
  assert.equal(fromWingdings(map.C + map.a), "Ca");
});

test("round-trips a sentence", () => {
  const sentence = "Hello, Wingdings 123!";
  const symbols = toWingdings(sentence);
  assert.equal(fromWingdings(symbols), sentence);
  assert.equal(symbols.includes("H"), false);
  assert.equal(symbols.includes(" "), true);
});

test("rejects non-strings", () => {
  assert.throws(() => toWingdings(undefined), TypeError);
  assert.throws(() => fromWingdings(42), TypeError);
});

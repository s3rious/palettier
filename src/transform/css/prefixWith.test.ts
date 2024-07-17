import type { Entries } from "./isEntry";
import { prefixWith } from "./prefixWith";

describe("prefixWith", () => {
  test("prefixes entries correctly", () => {
    const entries: Entries = [["key", "value"]];
    const result = prefixWith(entries, "prefix-");
    expect(result).toEqual([["prefix-key", "value"]]);
  });
});

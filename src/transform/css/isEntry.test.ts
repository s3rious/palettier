import { isEntries, isEntry } from "./isEntry";

describe("isEntry", () => {
  test("returns true for valid entry", () => {
    expect(isEntry(["key", "value"])).toBe(true);
    expect(isEntry(["key", 123])).toBe(true);
  });

  test("returns false for invalid entry", () => {
    expect(isEntry(null)).toBe(false);
    expect(isEntry(undefined)).toBe(false);
    expect(isEntry("")).toBe(false);
    expect(isEntry(1)).toBe(false);
    expect(isEntry({})).toBe(false);
    expect(isEntry(() => {})).toBe(false);
    expect(isEntry(["key", null])).toBe(false);
    expect(isEntry(["key", undefined])).toBe(false);
    expect(isEntry(["key", {}])).toBe(false);
    expect(isEntry(["key", []])).toBe(false);
    expect(isEntry(["key", () => {}])).toBe(false);
    expect(isEntry(["key", Number.NaN])).toBe(false);
    expect(isEntry(["key", Number.POSITIVE_INFINITY])).toBe(false);
    expect(isEntry(["key", Number.NEGATIVE_INFINITY])).toBe(false);
  });
});

describe("isEntries", () => {
  test("returns true for valid entries", () => {
    expect(
      isEntries([
        ["key1", "value1"],
        ["key2", "value2"],
      ]),
    ).toBe(true);
  });

  test("returns false for valid entries", () => {
    expect(isEntries(null)).toBe(false);
    expect(isEntries(undefined)).toBe(false);
    expect(isEntries({})).toBe(false);
    expect(isEntries([])).toBe(false);
  });
});

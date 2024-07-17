import { generateCssFile } from "./generateCssFile";
import type { Entries } from "./isEntry";

describe("generateCssFile", () => {
  test("generates empty CSS file if no entries passed", () => {
    const entries: Entries = [["--color", "red"]];
    const result = generateCssFile();
    expect(result).toEqual("");
  });

  test("generates CSS file content correctly with `:root` as a default className", () => {
    const entries: Entries = [["--color", "red"]];
    const result = generateCssFile(undefined, entries);
    expect(result).toEqual(":root {\n  --color: red;\n}");
  });

  test("generates CSS file content correctly with `:root` as className", () => {
    const entries: Entries = [["--color", "red"]];
    const result = generateCssFile(":root", entries);
    expect(result).toEqual(":root {\n  --color: red;\n}");
  });

  test("generates CSS file content correctly with `Class` as className", () => {
    const entries: Entries = [["--color", "red"]];
    const result = generateCssFile("Class", entries);
    expect(result).toEqual(".Class {\n  --color: red;\n}");
  });

  test("generates CSS file content correctly with `.Class` as className", () => {
    const entries: Entries = [["--color", "red"]];
    const result = generateCssFile(".Class", entries);
    expect(result).toEqual(".Class {\n  --color: red;\n}");
  });

  test("generates CSS file content without className correctly", () => {
    const entries: Entries = [["$color", "red"]];
    const result = generateCssFile(null, entries);
    expect(result).toEqual("$color: red;");
  });
});

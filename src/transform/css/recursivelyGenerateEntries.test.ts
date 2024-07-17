import type { Tokens } from "../../tokens/isTokens";
import { recursivelyGenerateEntries } from "./recursivelyGenerateEntries";

describe("recursivelyGenerateEntries", () => {
  test("recursively generates entries", () => {
    const tokens: Tokens = { color: { primary: "#fff" } };
    const result = recursivelyGenerateEntries(tokens);
    expect(result).toEqual([["color-primary", "#fff"]]);
  });
});

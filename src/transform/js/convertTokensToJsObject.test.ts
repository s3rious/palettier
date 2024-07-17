import { convertTokensToJsObject } from "./convertTokensToJsObject";

describe("convertTokensToJsObject", () => {
  test("converts tokens to JS object with named export", () => {
    const tokens = { colorPrimary: "#fff" };
    const result = convertTokensToJsObject(tokens, "named");
    expect(result).toEqual(
      "const palette = { colorPrimary: '#fff' }\n\nexport { palette };",
    );
  });

  test("by defaults uses named export", () => {
    const tokens = { colorPrimary: "#fff" };
    const result = convertTokensToJsObject(tokens);
    expect(result).toEqual(
      "const palette = { colorPrimary: '#fff' }\n\nexport { palette };",
    );
  });

  test("converts tokens to JS object with default export", () => {
    const tokens = { colorPrimary: "#fff" };
    const result = convertTokensToJsObject(tokens, "default");
    expect(result).toEqual(
      `const palette = { colorPrimary: '#fff' }\n\nexport default palette;`,
    );
  });
});

import { convertTokensToScss } from "./convertTokensToScss.js";

describe("convertTokensToScss", () => {
  test("converts tokens to SCSS", () => {
    const tokens = { colorPrimary: "#fff" };
    const result = convertTokensToScss(tokens);
    expect(result).toContain("$color-primary: #fff;");
  });
});

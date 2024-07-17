import { convertTokensToCssVariables } from "./convertTokensToCssVariables";

describe("convertTokensToCssVariables", () => {
  test("converts tokens to CSS variables", () => {
    const tokens = { colorPrimary: "#fff" };
    const result = convertTokensToCssVariables(tokens);
    expect(result).toContain("--color-primary: #fff;");
  });
});

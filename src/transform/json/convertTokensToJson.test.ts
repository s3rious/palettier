import { convertTokensToJson } from "./convertTokensToJson.js";

describe("convertTokensToJson", () => {
  test("converts tokens to JSON string", () => {
    const tokens = { colorPrimary: "#fff" };
    const result = convertTokensToJson(tokens);
    expect(result).toBe(JSON.stringify(tokens, null, 2));
  });
});

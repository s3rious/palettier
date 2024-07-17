import { camelToKebab } from "./camelToKebab";

describe("camelToKebab", () => {
  test("converts camelCase to kebab-case", () => {
    expect(camelToKebab("camelCase")).toBe("camel-case");
  });
});

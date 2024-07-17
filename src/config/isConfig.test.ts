import { type Config, isConfig, isPartialConfig } from "./isConfig";

describe("isPartialConfig", () => {
  test("returns true for valid partial Config object", () => {
    const partialConfig = {
      src: "src",
      dist: "dist",
    };
    expect(isPartialConfig(partialConfig)).toBe(true);
  });

  test("returns false for invalid partial Config object", () => {
    expect(isPartialConfig({})).toBe(false);
  });
});

describe("isConfig", () => {
  test("returns true for valid Config object", () => {
    const validConfig: Config = {
      src: "src",
      dist: "dist",
      transform: [["json", "output.json"]],
      verbose: true,
    };
    expect(isConfig(validConfig)).toBe(true);
  });

  test("returns false for invalid Config object", () => {
    expect(isConfig({})).toBe(false);
  });
});

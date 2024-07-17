import type { TransformFunction } from "./getTransformFunction.js";
import { type Transform, isTransform } from "./isTransform.js";

describe("isTransform", () => {
  test("returns true for valid transform with string key", () => {
    const validTransform: Transform = ["css", "fileName", "option1", "option2"];
    expect(isTransform(validTransform)).toBe(true);
  });

  test("returns true for valid transform with function key", () => {
    const mockFunction: TransformFunction = () => {
      return "foo";
    };
    const validTransform: Transform = [mockFunction, "fileName", "option1"];
    expect(isTransform(validTransform)).toBe(true);
  });

  test("returns false for transform that is not an array", () => {
    const invalidTransform = "not an array";
    expect(isTransform(invalidTransform)).toBe(false);
  });

  test("returns false for transform with invalid key type", () => {
    const invalidTransform = [123, "fileName", "option1"];
    expect(isTransform(invalidTransform)).toBe(false);
  });

  test("returns false for transform with missing fileName", () => {
    // @ts-ignore
    const invalidTransform: Transform = ["css"];
    expect(isTransform(invalidTransform)).toBe(false);
  });

  test("returns false for transform with invalid function key and missing fileName", () => {
    const invalidTransform = [() => {}];
    expect(isTransform(invalidTransform)).toBe(false);
  });

  test("returns false for transform with invalid key and fileName type", () => {
    const invalidTransform = [{}, "fileName"];
    expect(isTransform(invalidTransform)).toBe(false);
  });
});

import { getTransformFunction } from "./getTransformFunction";
import { convertTokensToJson } from "./json/convertTokensToJson";

describe("getTransformFunction", () => {
  test("returns a function if function passed", () => {
    const argumentFunction = () => {
      return "foo";
    };
    const transformFunction = getTransformFunction(argumentFunction);
    expect(transformFunction).toBe(argumentFunction);
  });

  test("returns a transform function for built-in transform", () => {
    const transformFunction = getTransformFunction("json");
    expect(transformFunction).toBeInstanceOf(Function);
    expect(transformFunction).toBe(convertTokensToJson);
  });

  test("returns null for invalid transform", () => {
    const transformFunction = getTransformFunction("invalid");
    expect(transformFunction).toBeNull();
  });
});

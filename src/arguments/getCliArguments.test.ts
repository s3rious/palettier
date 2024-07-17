import { jest } from "@jest/globals";

jest.mock("ts-command-line-args", () => ({ parse: jest.fn() }));
const { parse } = await import("ts-command-line-args");
const { getCliArguments, isConfigArguments, isInlineArguments } = await import(
  "./getCliArguments.js"
);

describe("isConfigArguments", () => {
  test("returns true for object with 'config' property", () => {
    expect(isConfigArguments({ config: "config/path" })).toBe(true);
  });

  test("returns false for object without 'config' property", () => {
    expect(isConfigArguments({ src: "src", dist: "dist" })).toBe(false);
  });
});

describe("isInlineArguments", () => {
  test("returns true for object with 'src' property", () => {
    expect(isInlineArguments({ src: "src", dist: "dist" })).toBe(true);
  });

  test("returns false for object without 'src' property", () => {
    expect(isInlineArguments({ config: "config/path" })).toBe(false);
  });
});

describe("getCliArguments", () => {
  const mockedParse = parse as jest.MockedFunction<typeof parse>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("returns parsed arguments when provided", () => {
    const mockArgs = {
      src: "src",
      dist: "dist",
      transform: [["css", "foo", "bar"]],
      verbose: true,
    };
    mockedParse.mockReturnValue(mockArgs);

    expect(getCliArguments()).toEqual(mockArgs);
    expect(mockedParse).toHaveBeenCalledTimes(1);
  });

  test("returns empty object when no arguments are provided", () => {
    mockedParse.mockReturnValue({});

    expect(getCliArguments()).toEqual({});
    expect(mockedParse).toHaveBeenCalledTimes(1);
  });
});

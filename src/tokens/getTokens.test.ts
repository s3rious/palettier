import { jest } from "@jest/globals";
import { getTokens } from "./getTokens.js";
import type { Tokens } from "./isTokens.js";

jest.unstable_mockModule("./isTokens.js", () => ({
  isTokens: jest.fn(),
}));
const { isTokens } = await import("./isTokens.js");

/**
  TODO: implement this part of tests later
  Had a problem when trying to implement a virtual module mock for config,
  somehow mocking the module and then trying to import inside `importConfigFromFile` fails
*/
describe.skip("getTokens", () => {
  const mockedIsTokens = isTokens as jest.MockedFunction<typeof isTokens>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("returns tokens when the module exports tokens", async () => {
    const mockTokens: Tokens = { token1: "value1", token2: "value2" };
    jest.unstable_mockModule(
      "path/to/tokens.js",
      () => ({ tokens: mockTokens }),
      {
        virtual: true,
      },
    );
    mockedIsTokens.mockReturnValue(true);

    const result = await getTokens("path/to/tokens.js");
    expect(result).toEqual(mockTokens);
    expect(mockedIsTokens).toHaveBeenCalledWith(mockTokens);
  });

  test("throws an error when the tokens are invalid", async () => {
    const invalidTokens = { token1: "value1" };
    jest.unstable_mockModule(
      "path/to/tokens.js",
      () => ({ tokens: invalidTokens }),
      {
        virtual: true,
      },
    );
    mockedIsTokens.mockReturnValue(false);

    await expect(getTokens("path/to/tokens.js")).rejects.toThrow(
      "Invalid tokens passed",
    );
    expect(mockedIsTokens).toHaveBeenCalledWith(invalidTokens);
  });

  test("throws an error when neither tokens nor default are valid", async () => {
    const invalidTokens = { token1: "value1" };
    jest.unstable_mockModule(
      "path/to/tokens.js",
      () => ({ tokens: invalidTokens, default: invalidTokens }),
      { virtual: true },
    );
    mockedIsTokens.mockReturnValue(false);

    await expect(getTokens("path/to/tokens.js")).rejects.toThrow(
      "Invalid tokens passed",
    );
    expect(mockedIsTokens).toHaveBeenCalledWith(invalidTokens);
    expect(mockedIsTokens).toHaveBeenCalledWith(invalidTokens);
  });

  test("throws an error if the module does not export tokens or default", async () => {
    jest.unstable_mockModule("path/to/empty.js", () => ({}), { virtual: true });

    await expect(getTokens("path/to/empty.js")).rejects.toThrow(
      "Invalid tokens passed",
    );
  });
});

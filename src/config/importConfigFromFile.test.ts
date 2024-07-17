import path from "node:path";
import { jest } from "@jest/globals";

jest.unstable_mockModule("node:fs/promises", () => ({
  readFile: jest.fn(),
}));

const { readFile } = await import("node:fs/promises");
const { importConfigFromFile } = await import("./importConfigFromFile.js");

describe("importConfigFromFile", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("fails to import not .js/.json config", async () => {
    const mockPath = path.resolve(path.dirname(""), "test.foo");

    await expect(importConfigFromFile(mockPath)).rejects.toThrow(
      new Error("Unsupported config", {
        cause: new Error(
          "Unsupported path passed as config, it should end with .js or .json",
        ),
      }),
    );
  });

  describe(".json config", () => {
    const mockedReadFile = readFile as jest.MockedFunction<typeof readFile>;

    test("imports valid .json config", async () => {
      const mockPath = path.resolve(path.dirname(""), "test.json");
      const mockJsonConfig = JSON.stringify({ src: "src", dist: "dist" });
      mockedReadFile.mockResolvedValue(mockJsonConfig);

      expect(await importConfigFromFile(mockPath)).toEqual({
        src: path.resolve(path.dirname(""), "src"),
        dist: path.resolve(path.dirname(""), "dist"),
      });
    });

    test("fails to import invalid .json config", async () => {
      const mockPath = path.resolve(path.dirname(""), "test.json");
      const mockJsonConfig = JSON.stringify({ foo: "bar", baz: "quz" });
      mockedReadFile.mockResolvedValue(mockJsonConfig);

      await expect(importConfigFromFile(mockPath)).rejects.toThrow(
        new Error("Unsupported config", {
          cause: new Error("Invalid config passed as json"),
        }),
      );
    });
  });

  /**
    TODO: implement this part of tests later
    Had a problem when trying to implement a virtual module mock for config,
    somehow mocking the module and then trying to import inside `importConfigFromFile` fails
  */
  describe.skip(".js config", () => {
    test("imports valid .js config", async () => {
      const mockPath = path.resolve(path.dirname(""), "test.js");
      const mockConfig = { src: "src", dist: "dist" };
      jest.unstable_mockModule(mockPath, () => ({ config: mockConfig }), {
        virtual: true,
      });
      const { importConfigFromFile } = await import(
        "./importConfigFromFile.js"
      );

      expect(importConfigFromFile(mockPath)).toEqual({
        src: path.resolve(path.dirname(""), "src"),
        dist: path.resolve(path.dirname(""), "dist"),
      });
    });
  });
});

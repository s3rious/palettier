import { jest } from "@jest/globals";
import { defaultArguments } from "../arguments/defaultArguments.js";
import { getAbsolutePath } from "../arguments/getAbsolutePath.js";
import type {
  ConfigArguments,
  InlineArguments,
} from "../arguments/getCliArguments.js";

const originalGetCliArgumentsModule = await import(
  "../arguments/getCliArguments.js"
);
jest.unstable_mockModule("../arguments/getCliArguments.js", async () => ({
  ...originalGetCliArgumentsModule,
  getCliArguments: jest.fn(),
}));
jest.unstable_mockModule("./importConfigFromFile.js", () => ({
  importConfigFromFile: jest.fn(),
}));

const { getCliArguments } = await import("../arguments/getCliArguments.js");
const { importConfigFromFile } = await import("./importConfigFromFile.js");
const { getConfig } = await import("./getConfig.js");

describe("getConfig", () => {
  const mockedGetCliArguments = getCliArguments as jest.MockedFunction<
    typeof getCliArguments
  >;
  const mockedImportConfigFromFile =
    importConfigFromFile as jest.MockedFunction<typeof importConfigFromFile>;

  test("returns default config when no arguments are provided", async () => {
    mockedGetCliArguments.mockReturnValue({});
    const config = await getConfig();
    expect(config).toEqual(defaultArguments);
  });

  test("loads config from file and returns it as a config", async () => {
    const mockArgs: ConfigArguments = { config: "config.json" };
    mockedGetCliArguments.mockReturnValue(mockArgs);

    const mockConfig = {
      src: getAbsolutePath("./src"),
      dist: getAbsolutePath("./dist"),
    };
    mockedImportConfigFromFile.mockResolvedValue(mockConfig);

    const config = await getConfig();
    expect(config).toEqual({ ...defaultArguments, ...mockConfig });
  });

  test("fails on bad config file passed as an argument", async () => {
    const mockArgs: ConfigArguments = { config: "failed.json" };
    mockedGetCliArguments.mockReturnValue(mockArgs);

    const mockConfig = { foo: "bar" };
    mockedImportConfigFromFile.mockResolvedValue(mockConfig);

    await expect(getConfig()).rejects.toThrow(
      new Error("Failed to get config from file", {
        cause: new Error("failed.json is not valid config"),
      }),
    );
  });

  test("gets config from args and returns it as a config", async () => {
    const mockArgs: InlineArguments = {
      src: getAbsolutePath("./src"),
      dist: getAbsolutePath("./dist"),
      transform: [["css", "foo", "bar"]],
      verbose: true,
    };
    mockedGetCliArguments.mockReturnValue(mockArgs);

    const config = await getConfig();
    expect(config).toEqual(mockArgs);
  });

  test("fails on bad config passed as an arguments", async () => {
    // @ts-ignore
    const mockArgs: InlineArguments = { src: "foo", bar: "baz" };
    mockedGetCliArguments.mockReturnValue(mockArgs);

    await expect(getConfig()).rejects.toThrow(
      new Error("Failed to get config from arguments", {
        cause: new Error(`${JSON.stringify(mockArgs)} is not valid config`),
      }),
    );
  });

  test("fails completely if bad arguments passed", async () => {
    // @ts-ignore
    const mockArgs: InlineArguments = { foo: "bar" };
    mockedGetCliArguments.mockReturnValue(mockArgs);

    await expect(getConfig()).rejects.toThrow(new Error("No config passed"));
  });
});

import { readFile } from "node:fs/promises";

import { getAbsolutePath } from "../arguments/getAbsolutePath.js";
import { type Config, isPartialConfig } from "./isConfig.js";

function convertConfigPathsToAbsolute(
  config: Partial<Config>,
): Partial<Config> {
  return {
    ...config,
    src: getAbsolutePath(config.src),
    dist: getAbsolutePath(config.dist),
  };
}

async function importConfigFromFile(
  path: string,
): Promise<Partial<Config> | Error> {
  try {
    if (!/.js(on)?$/.test(path)) {
      throw new Error(
        "Unsupported path passed as config, it should end with .js or .json",
      );
    }

    if (/.json$/.test(path)) {
      const jsonString = await readFile(path, "utf8");
      const jsonConfig = JSON.parse(jsonString);

      if (isPartialConfig(jsonConfig)) {
        return convertConfigPathsToAbsolute(jsonConfig);
      }

      throw new Error("Invalid config passed as json");
    }

    const jsConfig:
      | { [key: string]: unknown; config: Config }
      | { [key: string]: unknown; default: Config } = await import(path);

    if (isPartialConfig(jsConfig.config)) {
      return convertConfigPathsToAbsolute(jsConfig.config);
    }

    if (isPartialConfig(jsConfig.default)) {
      return convertConfigPathsToAbsolute(jsConfig.default);
    }

    throw new Error("Invalid config passed as js");
  } catch (error) {
    throw new Error("Unsupported config", { cause: error });
  }
}

export { importConfigFromFile };

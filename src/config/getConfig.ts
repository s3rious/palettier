import { defaultArguments } from "../arguments/defaultArguments.js";
import {
  getCliArguments,
  isConfigArguments,
  isInlineArguments,
} from "../arguments/getCliArguments.js";
import { importConfigFromFile } from "./importConfigFromFile.js";
import { type Config, isConfig, isPartialConfig } from "./isConfig.js";

async function getConfig(): Promise<Config | Error> {
  let args = getCliArguments();

  if (Object.keys(args).length < 1) {
    args = defaultArguments;
  }

  if (isConfigArguments(args)) {
    try {
      const importedConfig = await importConfigFromFile(args.config);

      if (!isPartialConfig(importedConfig)) {
        throw new Error(`${args.config} is not valid config`);
      }

      const config = Object.assign(defaultArguments, importedConfig);

      if (!isConfig(config)) {
        throw new Error("Not all config fields passed");
      }

      return config;
    } catch (error) {
      throw new Error("Failed to get config from file", { cause: error });
    }
  }

  if (isInlineArguments(args)) {
    try {
      if (!isPartialConfig(args)) {
        throw new Error(`${JSON.stringify(args)} is not valid config`);
      }

      const config = Object.assign(defaultArguments, args);

      if (!isConfig(config)) {
        throw new Error("Not all config fields passed");
      }

      return config;
    } catch (error) {
      throw new Error("Failed to get config from arguments", { cause: error });
    }
  }

  throw new Error("No config passed");
}

export { getConfig };

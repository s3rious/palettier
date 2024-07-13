import {
  getArguments,
  isConfigArguments,
  isInlineArguments,
} from "./getArguments.js";

import { Path } from "./type/Path.js";

const defaultConfig = {
  verbose: false,
  dist: Path("."),
  transform: [["json", "palette.json"]],
};

async function getConfig(): Promise<Config | Error> {
  const args = getArguments();

  if (isInlineArguments(args)) {
    return Object.assign({}, defaultConfig, args);
  }

  if (isConfigArguments(args)) {
    const importedConfigRaw: { default: Config } = await import(args.config, {
      assert: {
        type: "json",
      },
    });
    const importedConfig = importedConfigRaw.default;

    const config = {
      ...defaultConfig,
      ...importedConfig,
      src: Path(importedConfig.src) ?? importedConfig.src,
      dist: importedConfig.dist
        ? Path(importedConfig.dist) ?? importedConfig.dist
        : defaultConfig.dist,
    };

    return config;
  }

  return new Error("No config passed");
}

export { getConfig };

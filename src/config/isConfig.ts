import { type Transform, isTransform } from "../transform/isTransform.js";

interface Config extends Record<string, unknown> {
  src: string;
  dist: string;
  transform: Transform[];
  verbose: boolean;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isPartialConfig(config: unknown): config is Partial<Config> {
  if (!isRecord(config)) {
    return false;
  }

  if (typeof config.src !== "string") {
    return false;
  }

  return typeof config.dist === "string";
}

function isConfig(config: unknown): config is Config {
  if (!isPartialConfig(config)) {
    return false;
  }

  if (
    !(Array.isArray(config.transform) && config.transform.every(isTransform))
  ) {
    return false;
  }

  return typeof config.verbose === "boolean";
}

export type { Config };
export { isPartialConfig, isConfig };

import type { Transform } from "transform/isTransform.js";
import { parse } from "ts-command-line-args";
import { getAbsolutePath } from "./getAbsolutePath.js";
import { getTransformDetailsFromStringArgument } from "./getTransformDetailsFromStringArgument.js";

type ConfigArguments = {
  config: string;
};

type InlineArguments = {
  src: string;
  dist: string;
  transform?: Transform[];
  verbose?: boolean;
};

type Arguments = ConfigArguments | InlineArguments;

function isConfigArguments(object: object): object is ConfigArguments {
  return Object.prototype.hasOwnProperty.call(object, "config");
}

function isInlineArguments(object: object): object is InlineArguments {
  return Object.prototype.hasOwnProperty.call(object, "src");
}

function getCliArguments(): Partial<Arguments> {
  return parse<Partial<Arguments>>({
    config: { type: getAbsolutePath, optional: true },
    src: { type: getAbsolutePath, optional: true },
    dist: { type: getAbsolutePath, optional: true },
    transform: {
      type: getTransformDetailsFromStringArgument,
      multiple: true,
      optional: true,
    },
    verbose: { type: Boolean, optional: true },
  });
}

export type { ConfigArguments, InlineArguments, Arguments };
export { getCliArguments, isConfigArguments, isInlineArguments };

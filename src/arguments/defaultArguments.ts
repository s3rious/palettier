import { getAbsolutePath } from "./getAbsolutePath.js";
import type { Arguments } from "./getCliArguments.js";

const defaultArguments: Omit<Arguments, "src"> = {
  src: getAbsolutePath("./index.js"),
  dist: getAbsolutePath("./"),
  transform: [
    ["json", "palette.json"],
    ["cssVariables", "palette.module.css"],
  ],
  verbose: false,
};

export { defaultArguments };

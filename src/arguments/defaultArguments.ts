import { getAbsolutePath } from "./getAbsolutePath.js";
import type { Arguments } from "./getCliArguments.js";

const defaultArguments: Omit<Arguments, "src"> = {
  dist: getAbsolutePath("./index.js"),
  transform: [["json", "palette.json"]],
  verbose: false,
};

export { defaultArguments };

import { builtInTransforms } from "./builtInTransforms.js";

type BuiltInTransform = keyof typeof builtInTransforms;

function isBuiltInTransform(string: string): string is BuiltInTransform {
  return Object.keys(builtInTransforms).includes(string);
}

export { isBuiltInTransform };

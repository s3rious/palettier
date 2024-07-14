import type { Transform } from "transform/isTransform.js";

function getTransformDetailsFromStringArgument(string: string): Transform {
  const [key, fileName, ...options] = string.split(":");

  return [key, fileName, ...options];
}

export { getTransformDetailsFromStringArgument };

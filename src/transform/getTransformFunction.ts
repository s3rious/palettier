import type { Tokens } from "../tokens/isTokens.js";
import { builtInTransforms } from "./builtInTransforms.js";
import { isBuiltInTransform } from "./isBuiltInTransform.js";

type TransformFunction = (tokens: Tokens, ...options: string[]) => string;

function getTransformFunction(
  functionOrBuiltInTransform?: string | TransformFunction,
): null | TransformFunction {
  if (functionOrBuiltInTransform instanceof Function) {
    return functionOrBuiltInTransform;
  }

  if (
    typeof functionOrBuiltInTransform === "string" &&
    isBuiltInTransform(functionOrBuiltInTransform)
  ) {
    return builtInTransforms[functionOrBuiltInTransform];
  }

  return null;
}

export type { TransformFunction };
export { getTransformFunction };

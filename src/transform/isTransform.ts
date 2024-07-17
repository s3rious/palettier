import type { TransformFunction } from "./getTransformFunction.js";

type Transform = [
  key: string | TransformFunction,
  fileName: string,
  ...options: string[],
];

function isTransform(transform: unknown): transform is Transform {
  if (!Array.isArray(transform)) {
    return false;
  }

  if (typeof transform[0] === "string" && typeof transform[1] === "string") {
    return true;
  }

  return typeof transform[0] === "function" && typeof transform[1] === "string";
}

export type { Transform };
export { isTransform };

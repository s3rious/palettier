import { inspect } from "node:util";
import type { Tokens } from "../../tokens/isTokens.js";
import {
  type JsExportType,
  type JsExportTypeValue,
  isJsExportType,
  jsExportTypeMap,
} from "./jsExportType.js";

function convertTokensToJsObject(
  tokens: Tokens,
  jsExportType = "named",
): string {
  const object = inspect(tokens);
  let jsExportTypeValue: JsExportTypeValue = jsExportTypeMap.named;

  if (isJsExportType(jsExportType)) {
    jsExportTypeValue = jsExportTypeMap[jsExportType];
  }

  return `const palette = ${object}\n\n${jsExportTypeValue};`;
}

export { convertTokensToJsObject };

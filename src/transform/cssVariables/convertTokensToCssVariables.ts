import type { Tokens } from "../../tokens/isTokens.js";
import { generateCssFile } from "./generateCssFile.js";
import { prefixWithDashes } from "./prefixWithDashes.js";
import { recursivelyGenerateEntries } from "./recursivelyGenerateEntries.js";

function convertTokensToCssVariables(
  tokens: Tokens,
  className?: string,
): string {
  const entries = recursivelyGenerateEntries(tokens);
  const entriesWithDashes = prefixWithDashes(entries);

  return generateCssFile(className, entriesWithDashes);
}

export { convertTokensToCssVariables };

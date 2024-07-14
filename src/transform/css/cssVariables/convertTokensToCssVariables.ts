import type { Tokens } from "../../../tokens/isTokens.js";
import { generateCssFile } from "../generateCssFile.js";
import { prefixWith } from "../prefixWith.js";
import { recursivelyGenerateEntries } from "../recursivelyGenerateEntries.js";

function convertTokensToCssVariables(
  tokens: Tokens,
  className?: string,
): string {
  const entries = recursivelyGenerateEntries(tokens);
  const entriesWithDashes = prefixWith(entries, "--");

  return generateCssFile(className, entriesWithDashes);
}

export { convertTokensToCssVariables };

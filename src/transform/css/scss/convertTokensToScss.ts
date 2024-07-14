import type { Tokens } from "../../../tokens/isTokens.js";
import { generateCssFile } from "../generateCssFile.js";
import { prefixWith } from "../prefixWith.js";
import { recursivelyGenerateEntries } from "../recursivelyGenerateEntries.js";

function convertTokensToScss(tokens: Tokens): string {
  const entries = recursivelyGenerateEntries(tokens);
  const entriesWithDashes = prefixWith(entries, "$");

  return generateCssFile(null, entriesWithDashes);
}

export { convertTokensToScss };

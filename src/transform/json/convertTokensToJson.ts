import type { Tokens } from "../../tokens/isTokens.js";

function convertTokensToJson(tokens: Tokens): string {
  return JSON.stringify(tokens, null, 2);
}

export { convertTokensToJson };

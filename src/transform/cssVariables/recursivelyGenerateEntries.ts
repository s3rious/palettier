import { type Tokens, isTokens } from "../../tokens/isTokens.js";
import { camelToKebab } from "./camelToKebab.js";
import type { Entries } from "./isEntry.js";

const recursivelyGenerateEntries = (
  tokens: Tokens,
  parentKey?: string,
): Entries => {
  const tokensEntries = Object.entries(tokens);

  return tokensEntries.reduce(
    (accumulator: Entries, [key, value]: [string, unknown]): Entries => {
      const flatKey = camelToKebab(
        parentKey != null ? `${parentKey}-${key}` : key,
      );

      if (isTokens(value)) {
        accumulator.push(...recursivelyGenerateEntries(value, flatKey));
        return accumulator;
      }

      const stringValue = `${value}`;

      accumulator.push([flatKey, stringValue]);
      return accumulator;
    },
    [],
  );
};

export { recursivelyGenerateEntries };

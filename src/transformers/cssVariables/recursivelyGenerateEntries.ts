import { isTokens } from "../../helpers/isTokens.js";

import { camelToKebab } from "./camelToKebab.js";

const recursivelyGenerateEntries = (
	tokens: Tokens,
	parentKey?: string,
): Entries => {
	const entries = Object.entries(tokens);

	return entries.reduce(
		(
			accumulator: Entries,
			[key, value]: [string, string | Tokens],
		): Entries => {
			const flatKey = camelToKebab(
				parentKey != null ? `${parentKey}-${key}` : key,
			);

			if (isTokens(value)) {
				accumulator.push(...recursivelyGenerateEntries(value, flatKey));
				return accumulator;
			}

			accumulator.push([flatKey, value]);
			return accumulator;
		},
		[],
	);
};

export { recursivelyGenerateEntries };

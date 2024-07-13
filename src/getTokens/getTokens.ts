import { isTokens } from "../helpers/isTokens.js";

async function getTokens(path: string): Promise<Tokens> {
	const jsTokens:
		| { [key: string]: unknown; tokens: Tokens }
		| { [key: string]: unknown; default: Tokens } = await import(path);

	if (isTokens(jsTokens.tokens)) {
		return jsTokens.tokens;
	}

	if (isTokens(jsTokens.default)) {
		return jsTokens.default;
	}

	throw new Error("Invalid tokens passed");
}

export { getTokens };

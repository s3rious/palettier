function convertTokensToJson(tokens: Tokens): JsonTokens {
	return JSON.stringify(tokens, null, 2);
}

export { convertTokensToJson };

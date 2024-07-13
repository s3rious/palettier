function isTokens(argument: unknown): argument is Tokens {
	return Object.prototype.toString.call(argument) === "[object Object]";
}

export { isTokens };

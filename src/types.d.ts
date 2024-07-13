interface Tokens {
	[key: string]: string | Tokens;
}

type TransformerFunction = <Options extends string[], Result extends string>(
	tokens: Tokens,
	...options: Options
) => Result;

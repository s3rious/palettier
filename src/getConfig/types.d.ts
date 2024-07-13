type Transform = [
	key: string | TransformerFunction,
	fileName: string,
	...options: string[],
];

interface Config extends Record<string, unknown> {
	src: string;
	dist: string;
	transform: Transform[];
	verbose: boolean;
}

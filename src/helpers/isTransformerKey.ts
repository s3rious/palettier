import { transformers } from "../transformers/transformers.js";

type TransformersKey = keyof typeof transformers;

function isTransformersKey(argument: string): argument is TransformersKey {
	return Object.keys(transformers).includes(argument);
}

export { isTransformersKey };

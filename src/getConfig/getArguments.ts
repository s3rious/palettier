import { parse } from "ts-command-line-args";

import { Path } from "./type/Path.js";
import { StringTransform } from "./type/StringTransform.js";

interface ConfigArguments {
	config: string;
}

interface InlineArguments {
	verbose?: boolean;
	src: string;
	dist?: string;
	transform?: Transform[];
}

type Arguments = ConfigArguments | InlineArguments;

function isConfigArguments(object: object): object is ConfigArguments {
	return Object.prototype.hasOwnProperty.call(object, "config");
}

function isInlineArguments(object: object): object is InlineArguments {
	return Object.prototype.hasOwnProperty.call(object, "src");
}

function getArguments(): Partial<Arguments> {
	return parse<Partial<Arguments>>({
		config: { type: Path, optional: true },
		verbose: { type: Boolean, optional: true },
		src: { type: Path, optional: true },
		dist: { type: Path, optional: true },
		transform: { type: StringTransform, multiple: true, optional: true },
	});
}

export { getArguments, isConfigArguments, isInlineArguments };

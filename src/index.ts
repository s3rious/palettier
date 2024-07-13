import * as fs from "node:fs/promises";
import * as path from "node:path";
import { mkdirp } from "mkdirp";

import { getConfig } from "./getConfig/getConfig.js";
import { getTokens } from "./getTokens/getTokens.js";
import { isTransformersKey } from "./helpers/isTransformerKey.js";
import { transformers } from "./transformers/transformers.js";

const configOrError = await getConfig();

if (configOrError instanceof Error) {
	console.error(configOrError);
	process.exit(1);
}

const config = configOrError;

if (config.verbose) {
	console.log(`Config is:\n${JSON.stringify(config, null, 2)}\n`);
}
if (config.verbose) {
	console.log("Getting tokens...");
}
const tokens = await getTokens(config.src);
if (config.verbose) {
	console.log(`Tokens is:\n${JSON.stringify(tokens, null, 2)}\n`);
}

if (config.transform.length > 0) {
	if (config.verbose) {
		console.log(`Creating dist directory: ${config.dist}...`);
	}
	await mkdirp(config.dist);
	if (config.verbose) {
		console.log("... created!", "\n");
	}
}

for (const transform of config.transform) {
	const [type, fileName, ...options] = transform;

	const transformerFunction = (() => {
		if (typeof type === "function") {
			return type;
		}

		if (isTransformersKey(type)) {
			return transformers[type];
		}

		console.error(
			`Type "${type}" did not match any of transformers: "${Object.keys(transformers).join(", ")}"`,
		);
	})();

	if (transformerFunction == null) {
		process.exit(0);
	}

	if (config.verbose) {
		console.log(`Transforming ${type.toString()}...`);
	}

	const content = transformerFunction(tokens, ...options);

	if (config.verbose) {
		console.log(`... content is:\n${content}`);
	}

	const filePath = path.resolve(config.dist, fileName);

	if (config.verbose) {
		console.log(`... writing file: ${filePath}...`);
	}

	await fs.writeFile(filePath, content, "utf-8");

	if (config.verbose) {
		console.log("... written!", "\n");
	}
}

if (config.verbose) {
	console.log("Done!");
}

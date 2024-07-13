import {
	getArguments,
	isConfigArguments,
	isInlineArguments,
} from "./getArguments.js";

import { Path } from "./type/Path.js";

const defaultConfig: Omit<Config, "src"> = {
	dist: Path("."),
	transform: [["json", "palette.json"]],
	verbose: false,
};

function isTransform(transform: unknown): transform is Transform {
	if (!Array.isArray(transform)) {
		return false;
	}

	if (
		typeof transform[0][0] === "string" &&
		typeof transform[0][1] === "string"
	) {
		return true;
	}

	if (
		typeof transform[0][0] === "function" &&
		typeof transform[0][1] === "string"
	) {
		return true;
	}

	return false;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

function isPartialConfig(config: unknown): config is Partial<Config> {
	if (!isRecord(config)) {
		return false;
	}

	if (typeof config.src !== "string") {
		return false;
	}

	if (typeof config.dist !== "string") {
		return false;
	}

	return true;
}

function isConfig(config: unknown): config is Config {
	if (!isPartialConfig(config)) {
		return false;
	}

	if (!isTransform(config.transform)) {
		return false;
	}

	if (typeof config.verbose !== "boolean") {
		return false;
	}

	return true;
}

function convertPathsToAbsolute(config: Config): Config {
	return {
		...config,
		src: Path(config.src),
		dist: Path(config.dist),
	};
}

async function importConfig(path: string): Promise<Partial<Config> | Error> {
	try {
		if (!/.js(on)?$/.test(path)) {
			throw new Error(
				"Unsupported path passed as config, it should end with .js or .json",
			);
		}

		if (/.json$/.test(path)) {
			const jsonConfig: { default: unknown } = await import(path, {
				assert: {
					type: "json",
				},
			});

			if (isPartialConfig(jsonConfig.default)) {
				return jsonConfig.default;
			}

			throw new Error("Invalid config passed as json");
		}

		const jsConfig:
			| { [key: string]: unknown; config: Config }
			| { [key: string]: unknown; default: Config } = await import(path);

		if (isPartialConfig(jsConfig.config)) {
			return jsConfig.config;
		}

		if (isPartialConfig(jsConfig.default)) {
			return jsConfig.default;
		}

		throw new Error("Invalid config passed as js");
	} catch (error) {
		throw new Error("Unsupported config", { cause: error });
	}
}

async function getConfig(): Promise<Config | Error> {
	const args = getArguments();

	if (isInlineArguments(args)) {
		try {
			if (!isPartialConfig(args)) {
				throw new Error(`${args} is not valid config`);
			}

			const config = Object.assign(defaultConfig, args);

			if (!isConfig(config)) {
				throw new Error("Not all config fields passed");
			}

			return convertPathsToAbsolute(config);
		} catch (error) {
			throw new Error("Failed to get config from arguments", { cause: error });
		}
	}

	if (isConfigArguments(args)) {
		try {
			const importedConfig = await importConfig(args.config);

			if (!isPartialConfig(importedConfig)) {
				throw new Error(`${args.config} is not valid config`);
			}

			const config = Object.assign(defaultConfig, importedConfig);

			if (!isConfig(config)) {
				throw new Error("Not all config fields passed");
			}

			return convertPathsToAbsolute(config);
		} catch (error) {
			throw new Error("Failed to get config from file", { cause: error });
		}
	}

	return new Error("No config passed");
}

export { getConfig };

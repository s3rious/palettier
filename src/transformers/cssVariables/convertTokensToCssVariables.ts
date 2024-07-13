import { generateCssFile } from "./generateCssFile.js";
import { prefixWithDashes } from "./prefixWithDashes.js";
import { recursivelyGenerateEntries } from "./recursivelyGenerateEntries.js";

function convertTokensToCssVariables(
	tokens: Tokens,
	className?: ClassName,
): CssFile {
	const entries = recursivelyGenerateEntries(tokens);
	const entriesWithDashes = prefixWithDashes(entries);

	return generateCssFile(className, entriesWithDashes);
}

export { convertTokensToCssVariables };

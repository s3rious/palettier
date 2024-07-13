function generateCssFile(
	className: ClassName = ":root",
	entries: Entries = [],
): CssFile {
	let resultClassName = className;

	if (!/^:/.test(resultClassName)) {
		resultClassName = `.${resultClassName}`;
	}

	const content = entries.reduce((accumulator, [key, value]) => {
		return `${accumulator}\n  ${key}: ${value};`;
	}, "");

	return `${resultClassName} {${content}\n}`;
}

export { generateCssFile };

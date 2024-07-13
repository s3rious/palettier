function generateCssFile(
	className: ClassName = ":root",
	entries: Entries = [],
): CssFile {
	let resultClassName = className;

	if (/^\w/.test(resultClassName)) {
		resultClassName = `.${resultClassName}`;
	}

	const content = entries.reduce((accumulator, [key, value]) => {
		return `${accumulator}\n  ${key}: ${value};`;
	}, "");

	return `${className} {${content}\n}`;
}

export { generateCssFile };

function camelToKebab(string: string): string {
	return string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
}

export { camelToKebab };

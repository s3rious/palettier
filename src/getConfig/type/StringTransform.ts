function StringTransform(string: string): Transform {
	const [key, fileName, ...options] = string.split(":");

	return [key, fileName, ...options];
}

export { StringTransform };

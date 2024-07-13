function prefixWithDashes(entries: Entries): Entries {
	return entries.map(([key, value]) => [`--${key}`, value]);
}

export { prefixWithDashes };

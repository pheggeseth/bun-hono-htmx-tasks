export function nullthrows<T>(value: T, message = 'unexpected undefined') {
	if (value === undefined || value === null) {
		throw new Error(message);
	}

	return value;
}

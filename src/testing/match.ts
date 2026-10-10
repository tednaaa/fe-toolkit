export function hasText(actual: string | null | undefined, expected: string): boolean {
	return actual?.trim() === expected.trim();
}

export function orThrow<T>(value: T | undefined, message: string): T {
	if (value === undefined)
		throw new Error(message);

	return value;
}

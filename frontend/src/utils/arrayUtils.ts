export function objectInArray<T>(
	object: T,
	array: T[],
	parameter: keyof T
): boolean {
	return array.some((obj) => obj[parameter] === object[parameter]);
}

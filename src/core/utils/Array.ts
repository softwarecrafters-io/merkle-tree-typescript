export function range(from: number, length: number, steps = 1): number[] {
	return Array.from({ length: length }, (_, i) => (i + from) * steps);
}

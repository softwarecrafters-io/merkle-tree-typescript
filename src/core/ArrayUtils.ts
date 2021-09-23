export function range(from, length, steps = 1) {
	return Array.from({ length: length }, (_, i) => (i + from) * steps);
}

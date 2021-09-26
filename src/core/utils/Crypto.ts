import { SHA256 } from 'crypto-js';

export function hash(value: string): string {
	return SHA256(value).toString();
}

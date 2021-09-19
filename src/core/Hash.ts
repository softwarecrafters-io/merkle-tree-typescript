import { SHA256 } from 'crypto-js';

export class Hash {
	static generate(value: string) {
		return SHA256(value).toString();
	}
}

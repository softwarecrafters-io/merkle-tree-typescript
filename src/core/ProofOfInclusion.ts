import { Hash } from './Hash';

export class ProofOfInclusion {
	private constructor(private readonly merkleRoot: string) {}

	static create(merkleRoot: string) {
		return new ProofOfInclusion(merkleRoot);
	}

	verify(element: string, merklePath: string[]) {
		const hash = Hash.generate(element);
		const newMerkleRoot = [hash].concat(merklePath).reduce((h1, h2) => Hash.generate(h1 + h2));
		return newMerkleRoot === this.merkleRoot;
	}
}

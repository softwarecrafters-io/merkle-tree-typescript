import { hash } from './Hash';

export class ProofOfInclusion {
	private constructor(private readonly merkleRoot: string) {}

	static create(merkleRoot: string) {
		return new ProofOfInclusion(merkleRoot);
	}

	verify(element: string, merklePath: string[]) {
		const hashedElement = hash(element);
		const newMerkleRoot = [hashedElement].concat(merklePath).reduce((h1, h2) => hash(h1 + h2));
		return newMerkleRoot === this.merkleRoot;
	}
}

import { hash } from './utils/Crypto';

export class ProofOfInclusion {
	private constructor(private readonly merkleRoot: string, private readonly merklePath: ReadonlyArray<string>) {}

	static create(merkleRoot: string, merklePath: ReadonlyArray<string>) {
		return new ProofOfInclusion(merkleRoot, merklePath);
	}

	verify(element: string) {
		const hashedElement = hash(element);
		const newMerkleRoot = [hashedElement]
			.concat(this.merklePath)
			.reduce((previousHash, currentHash) => hash(previousHash + currentHash));
		return newMerkleRoot === this.merkleRoot;
	}
}

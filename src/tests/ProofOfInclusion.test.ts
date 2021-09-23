import { MerkleTreeOld } from '../core/MerkleTreeOld';
import { ProofOfInclusion } from '../core/ProofOfInclusion';

describe('The proof of inclusion', () => {
	it('verifies that a element and a given merkle path generates the expected Merkle root for a tree with even nodes', () => {
		const merkelTree = MerkleTreeOld.createTree(['a', 'b', 'c', 'd']);
		const merklePath = [
			'3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d',
			'd3a0f1c792ccf7f1708d5422696263e35755a86917ea76ef9242bd4a8cf4891a',
		];
		const proofOfInclusion = ProofOfInclusion.create(merkelTree.getMerkleRoot());
		expect(proofOfInclusion.verify('a', merklePath)).toBeTruthy();
	});

	it('verifies that a element and a given merkle path generates the expected Merkle root for a tree with even nodes', () => {
		const merkelTree = MerkleTreeOld.createTree(['a', 'b', 'c', 'd', 'e']);
		const merklePath = [
			'3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d',
			'd3a0f1c792ccf7f1708d5422696263e35755a86917ea76ef9242bd4a8cf4891a',
			'463bb9d8f7fe77a1f4ea68498899ecec274cdf238783a42cb448ce1e2d8cbb6a',
		];
		const proofOfInclusion = ProofOfInclusion.create(merkelTree.getMerkleRoot());
		expect(proofOfInclusion.verify('a', merklePath)).toBeTruthy();
	});
});

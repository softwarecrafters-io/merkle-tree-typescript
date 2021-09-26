import { ProofOfInclusion } from '../core/ProofOfInclusion';
import { MerkleTree } from '../core/MerkleTree';

describe('The Merkle proof of inclusion', () => {
	it('verifies that a given element and a merkle path generate the expected Merkle root for a tree with even nodes', () => {
		const element = 'a';
		const merkelTree = MerkleTree.create([element, 'b', 'c', 'd']);
		const proofOfInclusion = ProofOfInclusion.create(
			merkelTree.getMerkleRoot(),
			merkelTree.generateMerklePath(element)
		);

		expect(proofOfInclusion.verify(element)).toBeTruthy();
	});

	it('verifies that a given element and a merkle path generate the expected Merkle root for a tree with odd nodes', () => {
		const element = 'a';
		const merkelTree = MerkleTree.create([element, 'b', 'c', 'd', 'e']);
		const proofOfInclusion = ProofOfInclusion.create(
			merkelTree.getMerkleRoot(),
			merkelTree.generateMerklePath(element)
		);

		expect(proofOfInclusion.verify(element)).toBeTruthy();
	});

	it('does not verify the inclusion of a data that does not exist', () => {
		const element = 'x';
		const merkelTree = MerkleTree.create(['a', 'b', 'c', 'd']);
		const proofOfInclusion = ProofOfInclusion.create(merkelTree.getMerkleRoot(), merkelTree.generateMerklePath('a'));

		expect(proofOfInclusion.verify(element)).toBeFalsy();
	});
});

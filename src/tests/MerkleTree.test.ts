import { MerkleTree, verifyProofOfInclusion } from '../core/MerkleTree';

describe('The Merkle Tree', () => {
	it('creates a merkle tree from given collection with a even number of elements', () => {
		const merkelTree = MerkleTree.createTree(['a', 'b', 'c', 'd']);

		expect(merkelTree.getHeight()).toBe(2);
		expect(merkelTree.getNodesByLevel(1).length).toBe(2);
		expect(merkelTree.getNodesByLevel(2).length).toBe(4);
		expect(
			merkelTree.hasEqualMerkleRoot('58c89d709329eb37285837b042ab6ff72c7c8f74de0446b091b6a0131c102cfd')
		).toBeTruthy();
	});

	it('creates a merkle tree from given collection with a odd number of elements', () => {
		const merkelTree = MerkleTree.createTree(['a', 'b', 'c', 'd', 'e']);
		expect(merkelTree.getHeight()).toBe(3);
		expect(merkelTree.getNodesByLevel(1).length).toBe(2);
		expect(merkelTree.getNodesByLevel(2).length).toBe(3);

		expect(merkelTree.getMerkleRoot()).toEqual('3615e586768e706351e326736e446554c49123d0e24c169d3ecf9b791a82636b');
	});

	it('calculates merkle path for given odd merkle tree', () => {
		const merkelTree = MerkleTree.createTree(['a', 'b', 'c', 'd', 'e']);
		const result = merkelTree.generateMerklePath('a');

		expect(result).toEqual([
			'3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d',
			'd3a0f1c792ccf7f1708d5422696263e35755a86917ea76ef9242bd4a8cf4891a',
			'463bb9d8f7fe77a1f4ea68498899ecec274cdf238783a42cb448ce1e2d8cbb6a',
		]);
	});

	it('calculates merkle path for given even merkle tree', () => {
		const merkelTree = MerkleTree.createTree(['a', 'b', 'c', 'd']);
		const result = merkelTree.generateMerklePath('a');

		expect(result).toEqual([
			'3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d',
			'd3a0f1c792ccf7f1708d5422696263e35755a86917ea76ef9242bd4a8cf4891a',
		]);
	});

	it('verifies proof of inclusion for a given merkle path', () => {
		const merkelTree = MerkleTree.createTree(['a', 'b', 'c', 'd']);
		const merklePath = [
			'3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d',
			'd3a0f1c792ccf7f1708d5422696263e35755a86917ea76ef9242bd4a8cf4891a',
		];

		expect(verifyProofOfInclusion('a', merkelTree.getMerkleRoot(), merklePath)).toBe(true);
	});

	it('verifies proof of inclusion for a given merkle path and odd merkle tree', () => {
		const merkelTree = MerkleTree.createTree(['a', 'b', 'c', 'd', 'e']);
		const merklePath = [
			'3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d',
			'd3a0f1c792ccf7f1708d5422696263e35755a86917ea76ef9242bd4a8cf4891a',
			'463bb9d8f7fe77a1f4ea68498899ecec274cdf238783a42cb448ce1e2d8cbb6a',
		];

		expect(verifyProofOfInclusion('a', merkelTree.getMerkleRoot(), merklePath)).toBe(true);
	});
});

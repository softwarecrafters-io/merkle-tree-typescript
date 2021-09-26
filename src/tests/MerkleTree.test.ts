import { MerkleTree } from '../core/MerkleTree';

describe('The Merkle Tree', () => {
	it('creates a binary hash tree from a given collection with an even number of elements', () => {
		const merkelTree = MerkleTree.create(['a', 'b', 'c', 'd']);

		expect(merkelTree.getLeaves()).toEqual([
			'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',
			'3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d',
			'2e7d2c03a9507ae265ecf5b5356885a53393a2029d241394997265a1a25aefc6',
			'18ac3e7343f016890c510e93f935261169d9e3f565436429830faf0934f4f8e4',
		]);
		expect(merkelTree.getNodesByLevel(1).length).toBe(2);
		expect(merkelTree.getNodesByLevel(1)).toEqual([
			'62af5c3cb8da3e4f25061e829ebeea5c7513c54949115b1acc225930a90154da',
			'd3a0f1c792ccf7f1708d5422696263e35755a86917ea76ef9242bd4a8cf4891a',
		]);
		expect(merkelTree.getNodesByLevel(0).length).toBe(1);
		expect(merkelTree.getMerkleRoot()).toBe('58c89d709329eb37285837b042ab6ff72c7c8f74de0446b091b6a0131c102cfd');
	});

	it('creates a binary hash tree from a given collection with an odd number of elements', () => {
		const merkelTree = MerkleTree.create(['a', 'b', 'c', 'd', 'e']);

		expect(merkelTree.getLeaves()).toEqual([
			'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',
			'3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d',
			'2e7d2c03a9507ae265ecf5b5356885a53393a2029d241394997265a1a25aefc6',
			'18ac3e7343f016890c510e93f935261169d9e3f565436429830faf0934f4f8e4',
			'3f79bb7b435b05321651daefd374cdc681dc06faa65e374e38337b88ca046dea',
		]);
		expect(merkelTree.getNodesByLevel(2).length).toBe(3);
		expect(merkelTree.getNodesByLevel(2)).toEqual([
			'62af5c3cb8da3e4f25061e829ebeea5c7513c54949115b1acc225930a90154da',
			'd3a0f1c792ccf7f1708d5422696263e35755a86917ea76ef9242bd4a8cf4891a',
			'1a98a2105977d77929b907710dfad6b5f9cdae2abbcaa989a9387ed62c706cd1',
		]);
		expect(merkelTree.getNodesByLevel(1).length).toBe(2);
		expect(merkelTree.getNodesByLevel(1)).toEqual([
			'58c89d709329eb37285837b042ab6ff72c7c8f74de0446b091b6a0131c102cfd',
			'463bb9d8f7fe77a1f4ea68498899ecec274cdf238783a42cb448ce1e2d8cbb6a',
		]);
		expect(merkelTree.getNodesByLevel(0).length).toBe(1);
		expect(merkelTree.getMerkleRoot()).toBe('3615e586768e706351e326736e446554c49123d0e24c169d3ecf9b791a82636b');
	});

	it('does not create the merkle path for a given element that does not exist in the leaves of the tree', () => {
		const merkelTree = MerkleTree.create(['a', 'b', 'c', 'd']);

		const result = merkelTree.generateMerklePath('e');

		expect(result).toEqual([]);
	});

	it('generates the merkle path for a given element that exists in a set of even leaves', () => {
		const merkelTree = MerkleTree.create(['a', 'b', 'c', 'd']);

		const result = merkelTree.generateMerklePath('a');

		expect(result).toEqual([
			'3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d',
			'd3a0f1c792ccf7f1708d5422696263e35755a86917ea76ef9242bd4a8cf4891a',
		]);
	});

	it('generates the merkle path for a given element in an intermediate position of a set of even leaves', () => {
		const merkelTree = MerkleTree.create(['a', 'b', 'c', 'd']);

		const result = merkelTree.generateMerklePath('c');

		expect(result).toEqual([
			'18ac3e7343f016890c510e93f935261169d9e3f565436429830faf0934f4f8e4',
			'62af5c3cb8da3e4f25061e829ebeea5c7513c54949115b1acc225930a90154da',
		]);
	});

	it('generates the merkle path for a given element that exists in a set of odd leaves', () => {
		const merkelTree = MerkleTree.create(['a', 'b', 'c', 'd', 'e']);

		const result = merkelTree.generateMerklePath('a');

		expect(result).toEqual([
			'3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d',
			'd3a0f1c792ccf7f1708d5422696263e35755a86917ea76ef9242bd4a8cf4891a',
			'463bb9d8f7fe77a1f4ea68498899ecec274cdf238783a42cb448ce1e2d8cbb6a',
		]);
	});
});

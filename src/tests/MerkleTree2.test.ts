import { MerkleTree } from '../core/MerkleTree';

describe('The Merkle Tree', () => {
	it('generates a binary hash tree from a given collection with an even number of elements', () => {
		const merkelTree = MerkleTree.create(['a', 'b', 'c', 'd']);

		expect(merkelTree.getLeaves()).toEqual([
			'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',
			'3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d',
			'2e7d2c03a9507ae265ecf5b5356885a53393a2029d241394997265a1a25aefc6',
			'18ac3e7343f016890c510e93f935261169d9e3f565436429830faf0934f4f8e4',
		]);
		expect(merkelTree.getNodesByLevel(0).length).toBe(2);
		expect(merkelTree.getNodesByLevel(0)).toEqual([
			'62af5c3cb8da3e4f25061e829ebeea5c7513c54949115b1acc225930a90154da',
			'd3a0f1c792ccf7f1708d5422696263e35755a86917ea76ef9242bd4a8cf4891a',
		]);
	});
});

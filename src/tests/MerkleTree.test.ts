import { MerkleTree } from '../core/MerkleTree';
import { hash } from '../core/utils/Crypto';

describe('The Merkle Tree', () => {
	it('creates a binary hash tree from a given collection with an even number of elements', () => {
		const merkelTree = MerkleTree.create(['a', 'b', 'c', 'd']);

		const expectedHashedLeaves = [hash('a'), hash('b'), hash('c'), hash('d')];
		const expectedABHash = hash(hash('a') + hash('b'));
		const expectedCDHash = hash(hash('c') + hash('d'));
		const expectedLevelOneHashedNodes = [expectedABHash, expectedCDHash];
		const expectedMerkleRoot = hash(expectedABHash + expectedCDHash);
		expect(merkelTree.getLeaves()).toEqual(expectedHashedLeaves);
		expect(merkelTree.getNodesByLevel(1)).toEqual(expectedLevelOneHashedNodes);
		expect(merkelTree.getMerkleRoot()).toBe(expectedMerkleRoot);
	});

	it('creates a binary hash tree from a given collection with an odd number of elements', () => {
		const merkelTree = MerkleTree.create(['a', 'b', 'c', 'd', 'e']);

		const expectedHashedLeaves = [hash('a'), hash('b'), hash('c'), hash('d'), hash('e')];
		const expectedABHash = hash(hash('a') + hash('b'));
		const expectedCDHash = hash(hash('c') + hash('d'));
		const expectedEEHash = hash(hash('e') + hash('e'));
		const expectedLevelTwoHashedNodes = [expectedABHash, expectedCDHash, expectedEEHash];
		const expectedABCDHash = hash(expectedABHash + expectedCDHash);
		const expectedEEEEHash = hash(expectedEEHash + expectedEEHash);
		const expectedLevelOneHashedNodes = [expectedABCDHash, expectedEEEEHash];
		const expectedMerkleRoot = hash(expectedABCDHash + expectedEEEEHash);
		expect(merkelTree.getLeaves()).toEqual(expectedHashedLeaves);
		expect(merkelTree.getNodesByLevel(2)).toEqual(expectedLevelTwoHashedNodes);
		expect(merkelTree.getNodesByLevel(1)).toEqual(expectedLevelOneHashedNodes);
		expect(merkelTree.getMerkleRoot()).toBe(expectedMerkleRoot);
	});

	it('does not create the merkle path for a given element that does not exist in the leaves of the tree', () => {
		const merkelTree = MerkleTree.create(['a', 'b', 'c', 'd']);

		const merklePath = merkelTree.generateMerklePath('e');

		expect(merklePath).toEqual([]);
	});

	it('generates the merkle path for a given element that exists in a set of even leaves', () => {
		const merkelTree = MerkleTree.create(['a', 'b', 'c', 'd']);

		const merklePath = merkelTree.generateMerklePath('a');

		const expectedLeafHash = hash('b');
		const expectedLevelOneHash = hash(hash('c') + hash('d'));
		expect(merklePath).toEqual([expectedLeafHash, expectedLevelOneHash]);
	});

	it('generates the merkle path for a given element in an intermediate position of a set of even leaves', () => {
		const merkelTree = MerkleTree.create(['a', 'b', 'c', 'd']);

		const merklePath = merkelTree.generateMerklePath('c');

		const expectedLeafHash = hash('d');
		const expectedLevelOneHash = hash(hash('a') + hash('b'));
		expect(merklePath).toEqual([expectedLeafHash, expectedLevelOneHash]);
	});

	it('generates the merkle path for a given element that exists in a set of odd leaves', () => {
		const merkelTree = MerkleTree.create(['a', 'b', 'c', 'd', 'e']);

		const merklePath = merkelTree.generateMerklePath('a');

		const expectedLeafHash = hash('b');
		const expectedLevelTwoHash = hash(hash('c') + hash('d'));
		const expectedEEHash = hash(hash('e') + hash('e'));
		const expectedLevelOneHash = hash(expectedEEHash + expectedEEHash);
		expect(merklePath).toEqual([expectedLeafHash, expectedLevelTwoHash, expectedLevelOneHash]);
	});
});

import { SHA256 } from 'crypto-js';

export class MerkleTree {
	constructor(public readonly nodeStack: string[][]) {}

	static createTree(elements: string[]) {
		const leafNode = elements.map((e) => SHA256(e).toString());
		const nodes = this.generateNodesRecursively(leafNode);
		return new MerkleTree(nodes);
	}

	private static generateNodes(baseNode: string[]) {
		let nodes: string[][] = [];
		nodes = [baseNode].concat(nodes);
		while (nodes[0].length > 1) {
			const node = this.generatePairIndex(nodes[0].length).map((v) => this.generateParentHashNode(v, nodes));
			nodes = [node].concat(nodes);
		}
		return nodes;
	}

	private static generateNodesRecursively(baseNode: string[], nodes: string[][] = [baseNode]) {
		const rootNode = nodes[0];
		const isValidMerkleRoot = rootNode.length <= 1;
		if (isValidMerkleRoot) {
			return nodes;
		}
		const node = this.generatePairIndex(rootNode.length).map((evenIndex) =>
			this.generateParentHashNode(evenIndex, nodes)
		);
		return this.generateNodesRecursively(baseNode, [node].concat(nodes));
	}

	private static generateParentHashNode(index: number, nodes: string[][]) {
		const rootNode = nodes[0];
		const hasCoupleOfLeaves = index < rootNode.length - 1;
		return hasCoupleOfLeaves
			? SHA256(rootNode[index] + rootNode[index + 1]).toString()
			: SHA256(rootNode[index] + rootNode[index]).toString();
	}

	private static generatePairIndex(length) {
		return Array(length)
			.fill(0)
			.map((_, index) => index)
			.filter((index) => index % 2 == 0);
	}

	generateMerklePath(element) {
		const leafHash = SHA256(element).toString();
		const leafLevel = this.getHeight();
		const index = this.getNodesByLevel(leafLevel).findIndex((e) => e == leafHash);
		if (index <= -1) {
			return null;
		}
		return this.buildMerklePath(index, leafLevel);
	}

	private buildMerklePath(index: number, level: number, merklePath: string[] = []) {
		if (level <= 0) {
			return merklePath;
		}
		const parent = this.calculateNeighbourParent(index, level);
		return this.buildMerklePath(parent.index, level - 1, merklePath.concat([parent.hash]));
	}

	private calculateNeighbourParent(index: number, level: number) {
		if (index % 2 == 0) {
			const neighbourHash = this.nodeStack[level][index + 1];
			return { index: Math.floor(index / 2), hash: neighbourHash };
		}
		const neighbourHash = this.nodeStack[level][index - 1];
		return { index: Math.floor((index - 1) / 2), hash: neighbourHash };
	}

	isEqual(merkleTree: MerkleTree) {
		return this.getMerkleRoot() === merkleTree.getMerkleRoot();
	}

	hasEqualMerkleRoot(merkleRoot: string) {
		return this.getMerkleRoot() === merkleRoot;
	}

	getNodesByLevel(level: number): string[] {
		if (level >= this.nodeStack.length) {
			throw 'level out of range';
		}
		if (level < 0) {
			throw 'negative numbers are not allowed';
		}
		return this.nodeStack[level];
	}

	getMerkleRoot(): string {
		return this.getNodesByLevel(0)[0];
	}

	getHeight() {
		return this.nodeStack.length - 1;
	}
}

export function verifyProofOfInclusion(element: string, merkleRoot: string, merklePath: string[]) {
	const hash = SHA256(element).toString();
	const newMerkleRoot = [hash].concat(merklePath).reduce((h1, h2) => SHA256(h1 + h2));
	return newMerkleRoot == merkleRoot;
}

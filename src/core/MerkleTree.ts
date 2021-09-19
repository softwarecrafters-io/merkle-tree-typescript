import { Hash } from './Hash';

export class MerkleTree {
	constructor(public readonly nodeStack: ReadonlyArray<ReadonlyArray<string>>) {}

	static createTree(elements: string[]) {
		const leafNode = elements.map((e) => Hash.generate(e));
		const nodes = this.generateNodes(leafNode);
		return new MerkleTree(nodes);
	}

	private static generateNodes(baseNode: string[], nodes: string[][] = [baseNode]) {
		const rootNode = nodes[0];
		const isValidMerkleRoot = rootNode.length <= 1;
		if (isValidMerkleRoot) {
			return nodes;
		}
		const node = this.generatePairIndex(rootNode.length).map((evenIndex) =>
			this.generateParentHashNode(evenIndex, nodes)
		);
		return this.generateNodes(baseNode, [node].concat(nodes));
	}

	private static generateNodesIteratively(baseNode: string[]) {
		let nodes: string[][] = [];
		nodes = [baseNode].concat(nodes);
		while (nodes[0].length > 1) {
			const node = this.generatePairIndex(nodes[0].length).map((v) => this.generateParentHashNode(v, nodes));
			nodes = [node].concat(nodes);
		}
		return nodes;
	}

	private static generateParentHashNode(index: number, nodes: string[][]) {
		const rootNode = nodes[0];
		const hasCoupleOfLeaves = index < rootNode.length - 1;
		return hasCoupleOfLeaves
			? Hash.generate(rootNode[index] + rootNode[index + 1])
			: Hash.generate(rootNode[index] + rootNode[index]);
	}

	private static generatePairIndex(length) {
		return Array(length)
			.fill(0)
			.map((_, index) => index)
			.filter((index) => index % 2 == 0);
	}

	generateMerklePath(element): string[] {
		const leafHash = Hash.generate(element);
		const leafLevel = this.getHeight();
		const index = this.getNodesByLevel(leafLevel).findIndex((e) => e == leafHash);
		if (index <= -1) {
			return [];
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

	getNodesByLevel(level: number) {
		return this.nodeStack[level];
	}

	getMerkleRoot(): string {
		return this.getNodesByLevel(0)[0];
	}

	getHeight() {
		return this.nodeStack.length - 1;
	}
}

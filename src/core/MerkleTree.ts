import { hash } from './utils/Crypto';
import { range } from './utils/Array';

export class MerkleTree {
	private constructor(private readonly nodeMatrix: ReadonlyArray<ReadonlyArray<string>>) {}

	static create(elements: string[]) {
		const leafNode = elements.map((e) => hash(e));
		const nodes = this.generateParentNodes(leafNode);
		return new MerkleTree(nodes);
	}

	private static generateParentNodes(leafNode: string[], nodes = [leafNode].concat([])) {
		const rootNode = nodes[0];
		const isValidMerkleRoot = rootNode.length <= 1;
		if (isValidMerkleRoot) {
			return nodes;
		}
		const length = Math.round(rootNode.length / 2);
		const parentNode = range(0, length, 2).map((i) => this.generateParentHashNode(i, rootNode));
		return this.generateParentNodes(leafNode, [parentNode].concat(nodes));
	}

	private static generateParentHashNode(index: number, node: string[]) {
		const hasCoupleOfHashes = index < node.length - 1;
		return hasCoupleOfHashes ? hash(node[index] + node[index + 1]) : hash(node[index] + node[index]);
	}

	generateMerklePath(element): string[] {
		const leafHash = hash(element);
		const leafLevel = this.nodeMatrix.length - 1;
		const leafIndex = this.getNodesByLevel(leafLevel).findIndex((e) => e == leafHash);
		if (leafIndex <= -1) {
			return [];
		}
		return this.buildMerklePath(leafLevel, leafIndex);
	}

	private buildMerklePath(level: number, index: number, merklePath = []) {
		return level <= 0
			? merklePath
			: this.buildMerklePath(level - 1, Math.round(index / 2), merklePath.concat(this.getNeighbourBy(index, level)));
	}

	private getNeighbourBy(index: number, level: number) {
		const isLeftNode = index % 2 == 0;
		if (isLeftNode) {
			return this.getNodesByLevel(level)[index + 1];
		}
		return this.getNodesByLevel(level)[index - 1];
	}

	getMerkleRoot() {
		return this.getNodesByLevel(0)[0];
	}

	getNodesByLevel(level: number) {
		return this.nodeMatrix[level];
	}

	getLeaves() {
		return this.nodeMatrix[this.nodeMatrix.length - 1];
	}
}

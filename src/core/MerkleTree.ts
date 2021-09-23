import { hash } from './Hash';
import { range } from './ArrayUtils';

export class MerkleTree {
	constructor(private readonly nodeStack: ReadonlyArray<ReadonlyArray<string>>) {}

	static create(elements: string[]) {
		const leafNode = elements.map((e) => hash(e));
		const parentNodes = this.generateParentNodes(leafNode);
		const nodes = [parentNodes].concat([leafNode]);
		return new MerkleTree(nodes);
	}

	private static generateParentNodes(leafNode: string[]) {
		const length = Math.round(leafNode.length / 2);
		return range(0, length, 2).map((i) => this.generateParentHashNode(i, leafNode));
	}

	private static generateParentHashNode(index: number, node: string[]) {
		return hash(node[index] + node[index + 1]);
	}

	getNodesByLevel(level: number) {
		return this.nodeStack[level];
	}

	getLeaves() {
		return this.nodeStack[this.nodeStack.length - 1];
	}
}

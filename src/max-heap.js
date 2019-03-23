const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.nodesCount = 0;
	}

	push(data, priority) {
		var node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if (!this.isEmpty()) {
			var detachedRoot = this.detachRoot();
			this.restoreRootFromLastInsertedNode(detachedRoot);
			this.shiftNodeDown(this.root);
			this.nodesCount--;
			return detachedRoot.data;
		}
	}

	detachRoot() {
		const detachedRoot = this.root;
		if (this.parentNodes.indexOf(this.root) !== -1) this.parentNodes.shift();
		this.root = null;
		return detachedRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.parentNodes.length > 0 && detached !== undefined) {
			let lastInsertedNode = this.parentNodes.pop();
			if (this.parentNodes.length <= 1) {
				this.parentNodes.unshift(lastInsertedNode);
			} else if (lastInsertedNode === lastInsertedNode.parent.right) {
				this.parentNodes.unshift(lastInsertedNode.parent);
			}
			lastInsertedNode.remove();		
			this.root = lastInsertedNode;
			this.root.appendChild(detached.left);
			this.root.appendChild(detached.right);
		}
	}

	size() {
		return this.nodesCount;
	}

	isEmpty() {
		return this.nodesCount === 0;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.nodesCount = 0;
	}

	insertNode(node) {
		this.parentNodes.push(node);
		this.nodesCount++;
		if (this.root === null) {
			this.root = node;
		  } else {
			this.parentNodes[0].appendChild(node);
			if (this.parentNodes[0].right !== null) {
			  this.parentNodes.shift();
			}
		}
	}

	shiftNodeUp(node) {
		if (node.parent === null) {
			this.root = node;
		} else if (node.parent.priority < node.priority) {
			this.updateParentNodesOnShiftNodeUp(node);
			node.swapWithParent();
			this.shiftNodeUp(node);
		}
	}

	updateParentNodesOnShiftNodeUp(node) {
		let parentNodeIndex = this.parentNodes.indexOf(node.parent);
		if (parentNodeIndex != -1) {
			this.parentNodes[parentNodeIndex] = node;
			this.parentNodes[this.parentNodes.length - 1] = node.parent;
		} else if (this.parentNodes[0] === node) {
			this.parentNodes[0] = node.parent;
		} else {
			this.parentNodes[this.parentNodes.length - 1] =  node.parent;
		}
	}

	shiftNodeDown(node) {
		let nodeToShift = this.getNodeToShiftDown(node);
		if (nodeToShift !== null) {
			if (this.root === node) this.root = nodeToShift;
			nodeToShift.swapWithParent();
			this.updateParentNodesOnShiftDown(node);
			this.shiftNodeDown(node);
		} 
	}

	updateParentNodesOnShiftDown(node) {
		let shiftNodeIndex = this.parentNodes.indexOf(node.parent);
		if (shiftNodeIndex !== -1) {
			let nodeIndex = this.parentNodes.indexOf(node);
			if (nodeIndex !== -1) {
				this.parentNodes[nodeIndex] = node.parent;
			}
			this.parentNodes[shiftNodeIndex] = node;
		}
	}

	getNodeToShiftDown(node) {
		if (node == null) return node;
		let leftNodePriority;
		let rightNodePriority;
		if (node.left != null && node.left.priority > node.priority) {
			leftNodePriority = node.left.priority;
		} 
		if (node.right != null && node.right.priority > node.priority) {
			rightNodePriority = node.right.priority;
		}
		if (leftNodePriority === undefined) {
			return rightNodePriority === undefined ? null : node.right;
		} else if (rightNodePriority !== undefined) {
			return rightNodePriority < leftNodePriority ? node.left : node.right;
		}
		return node.left;
	}
}

module.exports = MaxHeap;

class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (node != null) 	node.parent = this;
		if (this.left === null) {
			this.left = node;
		} else if (this.right === null) {
			this.right = node;
		}
	}

	removeChild(node) {
		if (node !== this.left && node !== this.right) {
			throw "Not a child node";
		}
		if (node === this.left) {
			this.left = null;
		} else {
			this.right = null;
		}
		if (node !== null) node.parent = null;
	}

	remove() {
		if (this.parent !== null) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent !== null) {
			var parentNode = this.parent;
			var grandParent = parentNode.parent;
			var leftNode = this.left;
			var rightNode = this.right;
			
			if (grandParent === null) {
				this.parent = null;
			} else {
				grandParent.removeChild(parentNode);
				grandParent.appendChild(this);
			}

			this.left = null;
			this.right = null;
			parentNode.left === this ? this.appendChild(parentNode) : this.appendChild(parentNode.left);
			parentNode.right === this ? this.appendChild(parentNode) : this.appendChild(parentNode.right);

			parentNode.left = null;
			parentNode.right = null;
			parentNode.appendChild(leftNode);
			parentNode.appendChild(rightNode);
		}
	}
}

module.exports = Node;

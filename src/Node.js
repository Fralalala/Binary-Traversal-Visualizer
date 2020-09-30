class Node {
  constructor(value, left = null, right = null, visited = false) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.visited = visited;
  }
}

export default Node;

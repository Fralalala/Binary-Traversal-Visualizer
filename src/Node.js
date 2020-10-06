class Node {
  constructor(value = 0, left = null, right = null, visited = false,x = null , y = null) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.visited = visited;
    this.x = x;
    this.y = y;
  }
}

export default Node;

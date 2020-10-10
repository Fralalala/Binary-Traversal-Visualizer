class Node {
  constructor(
    value = 0,
    left = null,
    right = null,
    isVisited = false,
    x = null,
    y = null,
    isNew = true,
    color = null
  ) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.isVisited = isVisited;
    this.x = x;
    this.y = y;
    this.isNew = isNew;
    this.color = color
  }
}

export default Node;

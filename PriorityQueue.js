"use strict";
// assumes min queue
class PriorityQueue {
  constructor(compare) {
    this.nItems = 0;
    this.queue = [];
    this.stateIndex = {}
    if (typeof compare !== "function") {
      throw new Error("PriorityQueue expects a compare function which " +
          "returns a > b = 1, a === b = 0, a < b = -1");
    }
    this.compare = compare;
  }

  add(node) {
    if (this.nItems === 0) {
      this.queue[this.nItems++] = node;
    } else {
      let j;
      for (j = this.nItems - 1; j >= 0; j -= 1) {
        if (this.compare(node, this.queue[j]) === 1) {
          this.queue[j + 1] = this.queue[j];
        } else {
          break;
        }
      }
      this.queue[j + 1] = node;
      this.nItems += 1;
      this.stateIndex[node.state] = j + 1;
    }
  }

  remove() {
    if (this.nItems > 0) {
      this.nItems -= 1;
      let temp = this.queue[this.nItems];
      delete this.stateIndex[this.queue[this.nItems].state];
      this.queue[this.nItems] = null; // free up memory reference
      return temp;
    }
    return null;
  }

  peek() {
    if (this.nItems > 0) {
      return this.queue[this.nItems - 1];
    }
    return null;
  }

  peekByState(state) {
    if (this.stateIndex[state]) {
      return this.queue[this.stateIndex[state]];
    }
    return null;
  }

  replaceNodeByState(node) {
    this.queue[this.stateIndex[node.state]] = node;
  }

  isEmpty() {
    return this.nItems === 0;
  }
}

module.exports = PriorityQueue;
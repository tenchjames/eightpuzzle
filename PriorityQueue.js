"use strict";
// assumes min queue
class PriorityQueue {
  constructor(compare) {
    this.nItems = 0;
    this.queue = [];
    if (typeof compare !== "function") {
      throw new Error("PriorityQueue expects a compare function which " +
          "returns a > b = 1, a === b = 0, a < b = -1");
    }
    this.compare = compare;
  }

  add(item) {
    if (this.nItems === 0) {
      this.queue[this.nItems++] = item;
    } else {
      let j;
      for (j = this.nItems - 1; j >= 0; j -= 1) {
        if (this.compare(item, this.queue[j]) === 1) {
          this.queue[j + 1] = this.queue[j];
        } else {
          break;
        }
      }
      this.queue[j + 1] = item;
      this.nItems += 1;
    }
  }

  remove() {
    if (this.nItems > 0) {
      this.nItems -= 1;
      return this.queue[this.nItems];
    }
    return null;
  }

  peek() {
    if (this.nItems > 0) {
      return this.queue[this.nItems - 1];
    }
    return null;
  }

  isEmpty() {
    return this.nItems === 0;
  }
}

module.exports = PriorityQueue;
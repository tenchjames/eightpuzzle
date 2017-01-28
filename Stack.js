"use strict";

class Stack {
  constructor() {
    this.topOfStack = -1;
    this.stack = [];
  }

  isEmpty() {
    return this.topOfStack === -1;
  }

  push(item) {
    this.stack[++this.topOfStack] = item;
  }

  pop() {
    if (this.topOfStack > -1) {
      return this.stack[this.topOfStack--];
    }
    return null;
  }

  peek() {
    if (this.topOfStack > -1) {
      return this.stack[this.topOfStack];
    }
    return null;
  }

  getSize() {
    return this.topOfStack + 1;
  }
}

module.exports = Stack;

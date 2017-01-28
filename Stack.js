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
        this.stack.push(item);
        this.topOfStack += 1;
    }
    pop() {
        if (this.topOfStack > -1) {
            this.topOfStack -= 1;
            return this.stack.pop();
        }
        return null;
    }
    peek() {
        if (this.topOfStack > -1) {
            return this.stack[this.topOfStack];
        }
        return null;
    }
}

module.exports = Stack;

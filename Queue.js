"use strict";

class Queue {
    constructor() {
        this.nItems = 0;
        this.queue = [];
    }
    isEmpty() {
        return this.nItems === 0;
    }
    enqueue(item) {
        this.queue.unshift(item);
        this.nItems += 1;
    }
    dequeue() {
        if (this.nItems > 0) {
            this.nItems -= 1;
            return this.queue.pop();
        }
        return null;     
    }
    peek() {
        if (this.nItems > 0) {
            return this.queue[this.nItems - 1];
        }
        return null;
    }
}

module.exports = Queue;

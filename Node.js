"use strict";

class Node {
  constructor(args) {
    this.parent = args.parent || null;
    this.action = args.action || null;
    this.state = args.state;
    this.children = [];
    this.pathCost = args.pathCost || 0;
    this.emptyLocation = args.zeroLocation || this.findZero(args.state);
  }

  findZero(state) {
    const tileArray = state.split('');
    return tileArray.indexOf("0");
  }

  static createChildNode(problem, parent, action) {
    const args = {
      state: problem.getState(parent.state, action),
      action: action,
      parent: parent,
      pathCost: parent.pathCost + problem.stepCost(parent.state, action)
    };

  }
}

module.exports = Node;
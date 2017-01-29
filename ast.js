"use strict";
let Node = require('./Node.js');
let PriorityQueue = require('./PriorityQueue.js');
let summary = require('./summary.js');

class AStarNode extends Node {
  constructor(args) {
    super(args);
    this.estimatedTotalCost = args.estimatedTotalCost || 0;
  }
}

function childNode(eightPuzzle, parent, action) {
  const args = {
    state: eightPuzzle.getNextState(parent.state, action),
    parent: parent,
    action: action,
    pathCost: parent.pathCost + 1
  };
  args.estimatedTotalCost = args.pathCost + eightPuzzle.getManhattanDistance(args.state);
  return new AStarNode(args);
}

function ast(eightPuzzle) {
  // bookkeeping variables;
  let stats = {
    nodesExpanded: 0,
    fringeSize: 0,
    maxFringeSize: 0,
    maxSearchDepth: 0,
    runningTime: 0,
    maxRamUsage: 0
  };

  function compare(nodeA, nodeB) {
    let preferredOrder = ['Up', 'Down', 'Left', 'Right'];
    if (nodeA.estimatedTotalCost > nodeB.estimatedTotalCost) {
      return 1;
    }
    if (nodeB.estimatedTotalCost > nodeA.estimatedTotalCost) {
      return -1;
    }
    return preferredOrder.indexOf(nodeA.action) > preferredOrder.indexOf(nodeB.action) ? 1 : -1;
  }

  const frontier = new PriorityQueue(compare);
  const frontierByState = new Set(); // for constant time look up
  const explored = new Set();

  let startTime = new Date().getTime();
  const node = eightPuzzle.initialState;
  // TODO: SHOULD HAVE COST
  frontier.add(node);

  while (!frontier.isEmpty()) {
    let node = frontier.remove();
    explored.add(node.state);

    if (eightPuzzle.goalTest(node.state)) {
      stats.fringeSize = frontier.nItems;
      stats.runningTime = new Date().getTime() - startTime;
      summary(node, stats);
      return node; // add some code to track levels, memory etc
    }
    stats.nodesExpanded += 1;
    eightPuzzle.actions.forEach(action => {
      if (eightPuzzle.canTakeAction(node.state, action)) {
        const child = childNode(eightPuzzle, node, action);
        if (!frontierByState.has(child.state) && !explored.has(child.state)) {
          frontier.add(child);
          frontierByState.add(child.state);
          if (frontier.nItems > stats.maxFringeSize) {
            stats.maxFringeSize = frontier.nItems;
          }
        } else if (frontier.peekByState(child.state) && frontier.peekByState(child.state).estimatedTotalCost > child.estimatedTotalCost) {
          frontier.replaceNodeByState(child);
        }
      }
    });
  }
  return null;
}

module.exports = ast;

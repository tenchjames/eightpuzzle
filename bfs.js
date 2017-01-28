"use strict";
let Node = require('./Node.js');
let Queue = require('./Queue.js');
let summary = require('./summary.js');

function childNode(eightPuzzle, parent, action) {
  const args = {
    state: eightPuzzle.getNextState(parent.state, action),
    parent: parent,
    action: action,
    pathCost: parent.pathCost + 1
  };
  return new Node(args);
}

function bfs(eightPuzzle) {
  // bookkeeping variables;

  let stats = {
    nodesExpanded: 0,
    fringeSize: 0,
    maxFringeSize: 0,
    maxSearchDepth: 0,
    runningTime: 0,
    maxRamUsage: 0
  };

  let startTime = new Date().getTime();

  const frontier = new Queue();
  const frontierByState = new Set(); // for constant time look up
  const explored = new Set();
  const node = eightPuzzle.initialState;

  frontier.enqueue(node);

  while (!frontier.isEmpty()) {
    let node = frontier.dequeue();
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
          frontier.enqueue(child);
          frontierByState.add(child.state);
          if (frontier.nItems > stats.maxFringeSize) {
            stats.maxFringeSize = frontier.nItems;
          }
        }
      }
    });
  }
  return null;
}

module.exports = bfs;
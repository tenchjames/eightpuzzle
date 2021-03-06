"use strict";
let Node = require('./Node.js');
let Stack = require('./Stack.js');
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

function dfs(eightPuzzle) {
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

  const frontier = new Stack();
  const frontierByState = new Set(); // for constant time look up
  const explored = new Set();
  const node = eightPuzzle.initialState;
  const actions = eightPuzzle.actions.slice().reverse();

  frontier.push(node);

  while (!frontier.isEmpty()) {
    let node = frontier.pop();
    explored.add(node.state);

    if (eightPuzzle.goalTest(node.state)) {
      stats.fringeSize = frontier.getSize();
      stats.runningTime = new Date().getTime() - startTime;
      summary(node, stats);
      return node; // add some code to track levels, memory etc
    }
    stats.nodesExpanded += 1;

    let currentActions = actions.filter(a => {
      return eightPuzzle.canTakeAction(node.state, a);
    });

    actions.forEach(action => {
      if (eightPuzzle.canTakeAction(node.state, action)) {
        const child = childNode(eightPuzzle, node, action);
        if (!frontierByState.has(child.state) && !explored.has(child.state)) {
          frontier.push(child);
          frontierByState.add(child.state);
          if (frontier.getSize() > stats.maxFringeSize) {
            stats.maxFringeSize = frontier.getSize();
          }
        }
      }
    });
  }
  return null;
}

module.exports = dfs;

// const neighbors = getNeighbors(state);
// if (neighbors.length === 0) {
//   state.paren = null;
// } else {
//   neighbors.forEach(n => {
//     // check if not in frontier and not explored
//     let inFrontier = frontierByState[n.state] ? true: false;
//     let inExplored = explored[n.state] ? true : false;
//     if (!inFrontier && !inExplored) {
//       frontier.push(n);
//       frontierByState[n.state] = true; // for faster searches
//     }
//   });
// }

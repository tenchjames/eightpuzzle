"use strict";

function summary(goalNode, stats) {
  if (goalNode === null) {
    console.log('unable to find the solution, check your algorithm. there should always be success');
  }
  let currentNode = goalNode;
  const actions = [];
  let searchDepth = 0;
  let costOfPath = currentNode.pathCost;
  while (currentNode.parent !== null) {
    actions.unshift(currentNode.action);
    searchDepth += 1;
    currentNode = currentNode.parent;
  }
  console.log('path_to_goal: [' + actions.join(',') + ']');
  console.log('cost_of_path: ' + costOfPath);
  console.log('nodes_expanded: ' + stats.nodesExpanded);
  console.log('fringe_size: ' + stats.fringeSize);
  console.log('max_fringe_size: ' + stats.maxFringeSize);
  console.log('search_depth: ' + searchDepth);
  console.log('max_search_depth: ' + stats.maxSearchDepth);
  console.log('running_time: ' + (stats.runningTime / 1000).toFixed(8));
  console.log('max_ram_usage: ' + stats.maxRamUsage);
}

module.exports = summary;
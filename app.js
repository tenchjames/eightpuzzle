"use strict";

let Node = function(args) {
  this.parentNode = null;
  this.move = args.move || null;
  this.tiles = args.tiles; // must pass in tile state
  this.children = [];
  this.emptyLocation = args.zeroLocation || this.findZero(args.tiles);
};

Node.prototype.findZero = function(tiles) {
  const tileArray = tiles.split('');
  return tileArray.indexOf("0");
};

function modulo(n, mod) {
  return (((n % mod) + mod) % mod);
}

function swap(x, y, arr) {
  const temp = arr[x];
  arr[x] = arr[y];
  arr[y] = temp;
}

function setNeighborState(emptyLocation, nextLocation, move, state) {
  const neighborTileArray = state.tiles.split('');
  let neighbor;
  swap(emptyLocation, nextLocation, neighborTileArray);
  neighbor = new Node({move: move, tiles: neighborTileArray.join(''), zeroLocation: nextLocation});
  neighbor.parentNode = state;
  return neighbor;
}

function getNeighbors(state) {
  const neighbors = [];
  const emptyLocation = state.emptyLocation;

  // check right
  let nextLocation = modulo(emptyLocation + 1, 3);
  if (nextLocation !== 0) {
    neighbors.push(setNeighborState(emptyLocation, emptyLocation + 1, 'RIGHT', state));
  }
  // check left
  nextLocation = modulo(emptyLocation - 1, 3);
  if (nextLocation !== 2) {
    neighbors.push(setNeighborState(emptyLocation, emptyLocation - 1, 'LEFT', state));
  }
  // check down
  nextLocation = emptyLocation + 3;
  if (nextLocation < state.tiles.length) {
    neighbors.push(setNeighborState(emptyLocation, emptyLocation + 3, 'DOWN', state));
  }
  // check up
  nextLocation = emptyLocation - 3;
  if (nextLocation > 0) {
    neighbors.push(setNeighborState(emptyLocation, emptyLocation - 3, 'UP', state));
  }

  return neighbors;
}

function manhatthanDistance(state) {
  const tileArray = state.tiles.split('').map(n => Number(n));
  let row, column, goalRow, goalColumn, manhatthanDistance = 0;
  for (let i = 0; i < tileArray.length; i += 1) {
    if (tileArray[i] === 0) {
      continue; // the zero tile does not count in the manhatthan distance
    }
    row = Math.floor(i / 3);
    column = i % 3;
    goalRow = Math.floor(tileArray[i] / 3);
    goalColumn = tileArray[i] % 3;
    manhatthanDistance += Math.abs(row - goalRow) + Math.abs(column - goalColumn);
  }
  return manhatthanDistance;
}

function findGoalState(initialState) {
  let tiles = initialState.tiles.split('')
    .map(t => Number(t)),
    smallerSuccessorCount = 0,
    goalState = "012345678";
  for (let i = 0; i < tiles.length; i += 1) {
      for (let j = i + 1; j < tiles.length; j += 1) {
        if (tiles[j] < tiles[i] && tiles[j] !== 0) {
          smallerSuccessorCount++;
        }
      }
  }
  
  if (smallerSuccessorCount % 2 === 1) {
    goalState = "123804765";
  }
  return goalState;
}

function doBfsSearch(initialState) {
  const goalState = findGoalState(initialState);
  const frontier = [];
  const frontierByState = {};
  const explored = {};

  frontier.unshift(initialState);

  function goalTest(state) {
    return goalState === state.tiles;
  }

  while (frontier.length > 0) {
    let state = frontier.pop();
    explored[state.tiles] = true;
    if (goalTest(state)) {
      return state;
    }

    // get possible neighbors based on moves
    getNeighbors(state).forEach(n => {
      // check if not in frontier and not explored
      let inFrontier = frontierByState[n.tiles] ? true: false;
      let inExplored = explored[n.tiles] ? true : false;
      if (!inFrontier && !inExplored) {
        frontier.unshift(n);
        frontierByState[n.tiles] = true; // for faster searches
      }
    });
  }
  return null;
}

function doDfsSearch(initialState) {
  const goalState = findGoalState(initialState);
  const frontier = [];
  const frontierByState = {};
  const explored = {};

  frontier.push(initialState);

  function goalTest(state) {
    return goalState === state.tiles;
  }

  while (frontier.length > 0) {
    let state = frontier.pop();
    explored[state.tiles] = true;
    if (goalTest(state)) {
      return state;
    }

    // for dfs if we get to a leaf and it is not the goal we can drop the parentNode reference
    // if neighbors returns an empty array we know this state does not have children
    const neighbors = getNeighbors(state);
    if (neighbors.length === 0) {
      state.parentNode = null;
    } else {
      neighbors.forEach(n => {
        // check if not in frontier and not explored
        let inFrontier = frontierByState[n.tiles] ? true: false;
        let inExplored = explored[n.tiles] ? true : false;
        if (!inFrontier && !inExplored) {
          frontier.push(n);
          frontierByState[n.tiles] = true; // for faster searches
        }
      });
    }
  }
  return null;
}

function bfs(initialState) {
  let currentState = doBfsSearch(initialState);
  if (currentState === null) {
    console.log('unable to find solution');
    return;
  }
  let moves = [];
  while (currentState.parentNode !== null) {
    moves.unshift(currentState.move);
    currentState = currentState.parentNode;
  }
  console.log(moves.join(','));
}

function dfs(initialState) {
  let currentState = doDfsSearch(initialState);
  if (currentState === null) {
    console.log('unable to find solution');
    return;
  }
  let moves = [];
  while (currentState.parentNode !== null) {
    moves.unshift(currentState.move);
    currentState = currentState.parentNode;
  }
  console.log(moves.join(','));
}

//const initialState = new Node({tiles: "120345678"});
//const initialState = new Node({tiles: "312045678"});
//const initialState = new Node({tiles: "125340678"});
//dfs(initialState);


const manhatthanState = new Node({tiles:"813402765"});
console.log(manhatthanDistance(manhatthanState));
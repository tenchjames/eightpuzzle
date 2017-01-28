"use strict";

class EightPuzzle {
  constructor(initialState) {
    this.goalState = this.getGoalState(initialState);
    this.initialState = initialState;
    this.actions = ['Up', 'Down', 'Left', 'Right'];
  }

  begin() {
    this.startTime = new Date();
  }

  end() {
    return new Date() - this.startTime;
  }

  swap(x, y, arr) {
    const temp = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
  }

  modulo(n, mod) {
    return (((n % mod) + mod) % mod);
  }

  canTakeAction(parentState, action) {
    const boardArray = parentState.split('');
    const emptyLocation = boardArray.indexOf('0');
    let nextLocation;
    switch (action) {
      case 'Up':
        nextLocation = emptyLocation - 3;
        if (nextLocation > 0) {
          return true;
        }
        break;
      case 'Down': {
        nextLocation = emptyLocation + 3;
        if (nextLocation < boardArray.length) {
          return true;
        }
        break;
      }
      case 'Left': {
        nextLocation = this.modulo(emptyLocation - 1, 3);
        if (nextLocation !== 2) {
          return true;
        }
        break;
      }
      case 'Right': {
        nextLocation = this.modulo(emptyLocation + 1, 3);
        if (nextLocation !== 0) {
          return true;
        }
        break;
      }
      default: {
        return false;
      }
    }
    return false;
  }

  getNextState(parentState, action) {
    const boardArray = parentState.split('');
    const emptyLocation = boardArray.indexOf('0');
    let nextLocation;
    switch (action) {
      case 'Up':
        nextLocation = emptyLocation - 3;
        break;
      case 'Down': {
        nextLocation = emptyLocation + 3;
        break;
      }
      case 'Left': {
        nextLocation = emptyLocation - 1;
        break;
      }
      case 'Right': {
          nextLocation = emptyLocation + 1;
        break;
      }
      default: {
        throw new Error('Invalid action ' + action + '. Valid actions [Up, Down, Left, Right]');
      }
    }
    this.swap(emptyLocation, nextLocation, boardArray);
    return boardArray.join('');
  }

  // TODO: CHANGE THIS TO AN ARRAY AND TEST IN GOAL TEST TO SAVE ALL ARRAY.SPLITS()
  getGoalState(initialState) {
    let tiles = initialState.state.split('')
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

  goalTest(testState) {
    return this.goalState === testState;
  }

  getManhattanDistance(state) {
    const tileArray = state.split('').map(n => Number(n));
    let row, column, goalRow, goalColumn, manhatthanDistance = 0;
    let goalState = EightPuzzle.goalStates[this.goalState];
    for (let i = 0; i < tileArray.length; i += 1) {
      if (tileArray[i] === 0) {
        continue; // the zero tile does not count in the manhatthan distance
      }
      row = Math.floor(i / 3);
      column = i % 3;
      goalRow = goalState[tileArray[i]][0];
      goalColumn = goalState[tileArray[i]][1];
      manhatthanDistance += Math.abs(row - goalRow) + Math.abs(column - goalColumn);
    }
    return manhatthanDistance;
  }
}

EightPuzzle.goalStates = {
  "012345678": {
    0: [0, 0],
    1: [0, 1],
    2: [0, 2],
    3: [1, 0],
    4: [1, 1],
    5: [1, 2],
    6: [2, 0],
    7: [2, 1],
    8: [2, 2]
  },
  "123804765": {
    1: [0, 0],
    2: [0, 1],
    3: [0, 2],
    8: [1, 0],
    0: [1, 1],
    4: [1, 2],
    7: [2, 0],
    6: [2, 1],
    5: [2, 2]
  }
};

module.exports = EightPuzzle;
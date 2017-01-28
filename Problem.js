"use strict";

class Problem {
    constructor() {
        this.goalState = "";
    }

    setGoalState(initialState) {
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
        this.goalState = goalState; 
    }

    goalTest(testState) {
        return this.goalState === this.testState;
    }
}

Problem.goalStates = {
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

module.exports = Problem;
"use strict";
let Node = require('./Node.js');
let EightPuzzle = require('./EightPuzzle.js');
let PriorityQueue = require('./PriorityQueue.js');
let Queue = require('./Queue.js');
let Stack = require('./Stack.js');
let bfs = require('./bfs.js');
let dfs = require('./dfs.js');
let ast = require('./ast.js');

const searches = {
  bfs: bfs,
  dfs: dfs,
  ast: ast
};

//const initialState = new Node({state: "120345678"});
//const initialState = new Node({state: "312045678"});
const initialState = new Node({state: "125340678"});
//const initialState = new Node({state: "867254301"});
const eightPuzzle = new EightPuzzle(initialState);
searches["ast"](eightPuzzle);


//const manhatthanState = new Node({state:"813402765"});
//console.log(manhatthanDistance(manhatthanState.state, findGoalState(manhatthanState)));

// let pq = new PriorityQueue((a,b) => {
//   if (a.cost > b.cost) {
//     return 1;
//   }
//   if (b.cost > a.cost) {
//     return -1;
//   }
//   return 0;
// });



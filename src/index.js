import { checkCoordinatesValidity } from './coordinatesValidity.js';

// From a certain point on the board each knight can move to a maximum of 8 positions.
// This is because the knight moves two steps forward/back one step side or two steps side one step forward/back
// So we know that from one point the knight can move 2 steps forward, one to the left, i.e. +2 Y -1 X. And so for each of the 8 combinations.
// We represent that as [2, -1] where each item represents steps to move in a particular direction.
// [x, y]

const currentPositionAvailableMovesArray = [
  // These are steps NOT coordinates
  [1, -2],
  [2, -1],
  [-1, -2],
  [-2, -1],
  [1, 2],
  [2, 1],
  [-1, 2],
  [-2, 1],
];

function knightMoves(startCoordinates, finalCoordinates) {
  // Check if arguments are in the right format

  let isValid = checkCoordinatesValidity(startCoordinates, finalCoordinates);

  if (!isValid) return;

  const queue = []; // Queue is main data structure that is used by Breadth-first traversal algorithm.

  let resultArray = []; // resultArray is array where our result coordinates are stored.

  let parentTrackingStructure = []; // parentTrackingStructure is an Array used to store parentReferences for each vertex on a board.

  let visitedVertices = {}; // Here we store all visited  vertices through the algorithm to check for duplicates.

  queue.unshift(startCoordinates); // Add first item to the queue

  visitedVertices[`${startCoordinates}`] = true; // Mark that item as visited

  // As long as the queue is not empty, run the Breadth-first traversal algorithm.
  while (queue.length > 0) {
    let currentVertex = queue[queue.length - 1];

    // Dequeue
    queue.pop();

    innerLoop: for (let i = 0; i < 8; i++) {
      // Use all steps combinations to see all possibles play from currentVertex.
      let adjacentVertexX =
        currentVertex[0] + currentPositionAvailableMovesArray[i][0];
      let adjacentVertexY =
        currentVertex[1] + currentPositionAvailableMovesArray[i][1];

      // Eliminate negative coordinates
      // To make sure that we don't get out of the 8x8 board.

      if (
        adjacentVertexX > 7 ||
        adjacentVertexY > 7 ||
        adjacentVertexX < 0 ||
        adjacentVertexY < 0
      )
        continue;

      let adjacentVertex = [adjacentVertexX, adjacentVertexY];

      // Check if calculated adjacentVertex is not visited.
      if (visitedVertices[`${adjacentVertex}`] === undefined) {
        visitedVertices[`${adjacentVertex}`] = true; // Mark it visited
        parentTrackingStructure.push([currentVertex, adjacentVertex]); // Add it to the parentTrackingStructure with reference to its parent.
        queue.unshift(adjacentVertex); // enqueue that vertex to queue.
      }
    }
  }

  let isPathComplete = false; // To know when we fount the whole path.

  let searchVertex = finalCoordinates; // Vertex that we are searching for, finalCoordinations by default.

  // Until the path is found, run this loop.
  // This loop goes through all the vertices with the starting point finalCoordinate and so on until it reaches startCoordinate.
  // Along the way, it saves the corresponding vertices in the resultArray

  while (!isPathComplete) {
    for (let arr of parentTrackingStructure) {
      let parentVertex = arr[0];
      let targetVertex = arr[1];

      if (
        // Check if searchVertex is startCoordinates
        searchVertex[0] === startCoordinates[0] &&
        searchVertex[1] === startCoordinates[1]
      ) {
        resultArray.unshift(searchVertex); // add it to the resultArray.
        isPathComplete = true; // Path is completed.
        break;
      } else if (
        // Check if targetVertex is searchVertex
        targetVertex[0] === searchVertex[0] &&
        targetVertex[1] === searchVertex[1]
      ) {
        resultArray.unshift(targetVertex); // add it to the resultArray.
        searchVertex = parentVertex; // new searchVertex is its parentVertex.
      }
    }
  }

  console.log(
    `You made it in ${resultArray.length - 1} moves! Here's your path:`,
  );

  for (let i = 0; i < resultArray.length; i++) {
    console.log(resultArray[i]);
  }
}

knightMoves([3, 3], [4, 3]);

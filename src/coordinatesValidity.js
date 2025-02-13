// Check the validity of the coordinates

function checkCoordinatesValidity(startCoordinates, finalCoordinates) {
  if (!Array.isArray(startCoordinates) || !Array.isArray(finalCoordinates)) {
    throw Error(
      'Start coordinates and final coordinates arguments must be an array.',
    );
  } else if (
    !(startCoordinates.length === 2) ||
    !(finalCoordinates.length === 2)
  ) {
    throw Error(
      'The array of initial and array of final coordinates must contain two integer values indicating the initial and final coordinates of the board position.',
    );
  }

  const coordinates = [...startCoordinates, ...finalCoordinates];

  for (let coordinate of coordinates) {
    if (!Number.isInteger(coordinate)) {
      throw Error('Coordinates must be an integers');
    } else if (coordinate < 0 || coordinate > 7) {
      throw Error(
        'X and Y Coordinates must be 0 or greater than 0 and less than 8.',
      );
    }
  }

  return true;
}

export { checkCoordinatesValidity };

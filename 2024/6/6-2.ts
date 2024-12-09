// x < 5142
enum CellState {
  Empty = "EMPTY",
  Obstacle = "OBSTACLE",
  Guard = "GUARD",
  GuardVisited = "VISITED",
}

const directions = [
  [0, -1], // up
  [1, 0], // right
  [0, 1], // down
  [-1, 0], // left
];

// check a specific grid
function checkGrid(
  grid: (
    | CellState.Empty
    | CellState.Obstacle
    | CellState.Guard
    | CellState.GuardVisited
    | undefined
  )[][]
): number {
  let direction: number[] = directions[0]; // up
  let [guardX, guardY] = (() => {
    const row = grid.findIndex((line) => line.includes(CellState.Guard));
    const col = grid[row]?.indexOf(CellState.Guard);

    return [col, row];
  })();
  let movements: number = 0;

  while (movements < grid.length ** 2) {
    const [nextX, nextY] = [guardX + direction[0], guardY + direction[1]];
    const nextCell = grid[nextY]?.[nextX];

    // CHANGE DIRECTION IF OBSTACLE
    if (nextCell !== undefined && nextCell === CellState.Obstacle) {
      direction =
        directions[(directions.indexOf(direction) + 1) % directions.length];
    } else if (
      nextCell !== undefined &&
      (nextCell === CellState.Empty || nextCell === CellState.GuardVisited)
    ) {
      // MOVE TO NEXT CELL
      grid[nextY][nextX] = CellState.Guard;
      grid[guardY][guardX] = CellState.GuardVisited;
      [guardX, guardY] = [nextX, nextY];
      movements++;
    } else {
      break;
    }
  }

  return movements;
}

const initialGrid: (
  | CellState.Empty
  | CellState.Obstacle
  | CellState.Guard
  | CellState.GuardVisited
  | undefined
)[][] = Deno.readTextFileSync(import.meta.dirname + "/input.txt")
  .split("\n")
  .map((line) =>
    line.split("").map((character) => {
      switch (character) {
        case ".":
          return CellState.Empty;
        case "#":
          return CellState.Obstacle;
        case "^":
          return CellState.Guard;
      }
    })
  );

const gridMovements = initialGrid
  .map((line, lineIndex) => {
    console.log(`Line ${lineIndex}/${initialGrid.length}`);
    return line.map((_cell, cellIndex) => {
      const grid = structuredClone(initialGrid);
      grid[lineIndex][cellIndex] = CellState.Obstacle;

      return checkGrid(grid);
    });
  })
  .flat();

console.log(
  gridMovements.filter((item) => item > (initialGrid.length - 1) ** 2).length
);

enum CellState {
  Empty = "EMPTY",
  Obstacle = "OBSTACLE",
  Guard = "GUARD",
  GuardVisited = "VISITED",
}

const grid: (
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

function guardOnGrid(): boolean {
  return grid
    .map((line) => line.some((cell) => cell === CellState.Guard))
    .includes(true);
}

const directions = [
  [0, -1], // up
  [1, 0], // right
  [0, 1], // down
  [-1, 0], // left
];

let direction: number[] = directions[0];
while (guardOnGrid()) {
  const [guardX, guardY]: number[] = (() => {
    const row = grid.findIndex((line) => line.includes(CellState.Guard));
    const col = grid[row].indexOf(CellState.Guard);

    return [col, row];
  })();

  const nextCell = grid[guardY + direction[1]]?.[guardX + direction[0]];

  if (nextCell !== undefined && nextCell === CellState.Obstacle) {
    // turn if obstacle
    direction =
      directions[(directions.indexOf(direction) + 1) % directions.length];
  } else if (
    nextCell !== undefined &&
    (nextCell === CellState.Empty || nextCell === CellState.GuardVisited)
  ) {
    // move forward and mark spot as visited
    grid[guardY + direction[1]][guardX + direction[0]] = CellState.Guard;
    grid[guardY][guardX] = CellState.GuardVisited;
  } else {
    // mark spot as visited and end
    grid[guardY][guardX] = CellState.GuardVisited;
    break;
  }
}

const visited = grid.flat().filter((item) => item === CellState.GuardVisited);
console.log(visited.length);

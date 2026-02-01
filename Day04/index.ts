import { Output } from "../types/output";
import { readLines } from "../utils/input";

export default function solve(): Output {
  const contentLines = readLines();
  return [part1(contentLines), part2(contentLines)];
}

const part1 = (lines: string[]): string => {
  let grid = lines.map((x) => x.split(""));

  let stillMoreToRemove = true;
  let totalTotalCount = 0;
  do {
    let totalCount = 0;
    let newGrid = grid.slice();
    for (let [y, row] of grid.entries()) {
      for (let [x, pos] of row.entries()) {
        if (pos === "@") {
          let count = 0;
          // Three above
          if (y != 0 && (grid[y - 1] as string[])[x] == "@") count++;
          if (
            y != 0 &&
            x != row.length - 1 &&
            (grid[y - 1] as string[])[x + 1] == "@"
          )
            count++;
          if (y != 0 && x != 0 && (grid[y - 1] as string[])[x - 1] == "@")
            count++;
          //Two next to
          if (x != 0 && (grid[y] as string[])[x - 1] == "@") count++;
          if (x != row.length - 1 && (grid[y] as string[])[x + 1] == "@")
            count++;
          //Three below
          if (y != grid.length - 1 && (grid[y + 1] as string[])[x] == "@")
            count++;
          if (
            y != grid.length - 1 &&
            x != row.length - 1 &&
            (grid[y + 1] as string[])[x + 1] == "@"
          )
            count++;
          if (
            y != grid.length - 1 &&
            x != 0 &&
            (grid[y + 1] as string[])[x - 1] == "@"
          )
            count++;
          if (count < 4) {
            totalCount++;
            (newGrid[y] as string[])[x] = ".";
          }
        }
      }
    }
    totalTotalCount += totalCount;
    grid = newGrid;
    if (totalCount == 0) stillMoreToRemove = false;
  } while (stillMoreToRemove);
  return totalTotalCount.toString();
};

const part2 = (lines: string[]): string => {
  return "part2";
};

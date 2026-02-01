import { Output } from "../types/output";
import { readInput, readLines } from "../utils/input";

export default function solve(): Output {
  const contentLines = readInput();
  const [list, ingredients] = parseInput(contentLines);
  return [
    part1(list as number[][], ingredients as number[]),
    part2(list as number[][], ingredients as number[]),
  ];
}

const parseInput = (contentLines: string) => {
  const x = contentLines.split("\r\n\r\n");
  const y = x[0]?.split("\r\n").map((x) => {
    return x.split("-").map((y) => Number(y));
  });
  return [
    y,
    x[1]
      ?.split("\r\n")
      .filter((x) => x != "")
      .map((x) => Number(x)),
  ];
};

const part1 = (list: number[][], ingredients: number[]): string => {
  console.log(list, ingredients);
  let count = 0;
  for (const ing of ingredients) {
    for (const range of list) {
      if (ing >= (range[0] as number) && ing <= (range[1] as number)) {
        count++;
        break;
      }
    }
  }
  return count.toString();
};

const part2 = (list: number[][], ingredients: number[]): string => {
  return "part2";
};

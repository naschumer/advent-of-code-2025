import { Output } from "../types/output";
import { readLines } from "../utils/input";

export default function solve(): Output {
  const contentLines = readLines();
  return [part1(contentLines), part2(contentLines)];
}

const part1 = (lines: string[]): string => {
  return "part1";
};

const part2 = (lines: string[]): string => {
  return "part2";
};

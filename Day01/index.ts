import { Output } from "../types/output";
import { readLines } from "../utils/input";

export default function solve(): Output {
  const contentLines = readLines();
  return [part1(contentLines), part2(contentLines)];
}

const part1 = (lines: string[]): number => {
  let x = 50;
  let count = 0;
  lines.forEach((com) => {
    const rotation = Number(com.slice(1).slice(-2));
    if (com.startsWith("R")) x = x + rotation;
    if (com.startsWith("L")) x = x - rotation;
    if (x < 0) x = 100 - Math.abs(x);
    if (x > 99) x = x - 100;
    if (x === 0) count++;
  });
  return count;
};

const part2 = (lines: string[]): number => {
  let dial = 50;
  let count = 0;
  lines.forEach((com) => {
    const origDial = dial;
    const rotation = Number(com.slice(1).slice(-2));
    const leftover =
      com.slice(1).length > 2
        ? Number(com.slice(1).substring(0, com.slice(1).length - 2))
        : 0;
    count += leftover;
    if (com.startsWith("R")) dial += rotation;
    if (com.startsWith("L")) dial -= rotation;
    if (dial < 0) {
      dial = 100 - Math.abs(dial);
      if (origDial != 0 && dial != 0) {
        count += 1;
      }
    }
    if (dial > 99) {
      dial = dial - 100;
      if (origDial != 0 && dial != 0) {
        count += 1;
      }
    }
    if (dial === 0) {
      count++;
    }
  });
  return count;
};

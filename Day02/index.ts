import { Output } from "../types/output";
import { readInput } from "../utils/input";

export default function solve(): Output {
  const contentLines = readInput();
  const input = contentLines
    .split(",")
    .map((r) => r.split("-").map((n) => Number(n)));
  return [part1(input), part2(input)];
}

const part1 = (input: number[][]): number => {
  let sum = 0;
  input.forEach((range) => {
    for (let i = range[0] as number; i <= (range[1] as number); i++) {
      const strVal = String(i);
      if (
        strVal.length % 2 == 0 &&
        strVal.slice(0, strVal.length / 2) == strVal.slice(strVal.length / 2)
      ) {
        sum += i;
      }
    }
  });
  return sum;
};

const part2 = (input: number[][]): number => {
  let sum = 0;
  input.forEach((range) => {
    for (let i = range[0] as number; i <= (range[1] as number); i++) {
      const strVal = String(i);
      let found = false;
      strVal.split("").forEach((c, j) => {
        if (found) return;
        const group = strVal.slice(0, j);
        if (strVal.length % group.length == 0) {
          const times = strVal.length / group.length;
          let str = "";
          for (let k = 0; k < times; k++) {
            str += group;
          }
          if (str === strVal) {
            sum += i;
            found = true;
          }
        }
      });
    }
  });
  return sum;
};

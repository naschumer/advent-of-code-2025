import { Output } from "../types/output";
import { readLines } from "../utils/input";

export default function solve(): Output {
  const contentLines = readLines();
  const input = contentLines.map((x) => x.split("").map((y) => Number(y)));
  console.log();
  return [part1(input), part2(input).toString()];
}

const part1 = (lines: number[][]): number => {
  let vals = [];
  for (const bank of lines) {
    let combo = new Set<number>();
    for (const [i, battery] of bank.entries()) {
      for (const [j, val] of bank.entries()) {
        if (j < i) combo.add(Number(String(val) + String(battery)));
        if (j > i) combo.add(Number(String(battery) + String(val)));
      }
    }
    vals.push(combo.values().reduce((acc, val) => (val > acc ? val : acc), 0));
  }
  return vals.reduce((acc, val) => acc + val, 0);
};

const part2 = (lines: number[][]): bigint => {
  let vals = [];
  for (const bank of lines) {
    console.log(bank.join("") + ":");
    let reducedBank = reduce(bank);
    let max = BigInt(0);
    for (const [i, battery] of reducedBank.entries()) {
      console.log("[" + i + "]");
      if (i > reducedBank.length - 12) break;
      const arr2 = reducedBank.slice(i + 1);
      for (const [j, val2] of arr2.entries()) {
        const arr3 = arr2.slice(j + 1);
        for (const [k, val3] of arr3.entries()) {
          const arr4 = arr3.slice(k + 1);
          for (const [l, val4] of arr4.entries()) {
            const arr5 = arr4.slice(l + 1);
            for (const [m, val5] of arr5.entries()) {
              const arr6 = arr5.slice(m + 1);
              for (const [n, val6] of arr6.entries()) {
                const arr7 = arr6.slice(n + 1);
                for (const [o, val7] of arr7.entries()) {
                  const arr8 = arr7.slice(o + 1);
                  for (const [p, val8] of arr8.entries()) {
                    const arr9 = arr8.slice(p + 1);
                    for (const [q, val9] of arr9.entries()) {
                      const arr10 = arr9.slice(q + 1);
                      for (const [r, val10] of arr10.entries()) {
                        const arr11 = arr10.slice(r + 1);
                        for (const [s, val11] of arr11.entries()) {
                          const arr12 = arr11.slice(s + 1);
                          for (const [t, val12] of arr12.entries()) {
                            let current = Number(
                              String(battery) +
                                String(val2) +
                                String(val3) +
                                String(val4) +
                                String(val5) +
                                String(val6) +
                                String(val7) +
                                String(val8) +
                                String(val9) +
                                String(val10) +
                                String(val11) +
                                String(val12)
                            );
                            if (current > max) {
                              max = BigInt(current);
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    vals.push(max);
  }
  return vals.reduce((acc, val) => acc + val, BigInt(0));
};

const reduce = (bank: number[]) => {
  let newNewBank = bank.slice().join("");
  for (let x = 1; x <= 9; x++) {
    newNewBank = newNewBank.replaceAll(
      new RegExp(String(x) + "+", "g"),
      String(x)
    );
  }

  let newNewNewBank = newNewBank.split("").map((x) => Number(x));

  for (let i = 1; i <= 9; i++) {
    let xBank = newNewNewBank.join("").replaceAll(String(i), "");
    if (xBank.length >= 12) {
      newNewNewBank = xBank.split("").map((x) => Number(x));
    } else {
      break;
    }
  }

  console.log("[" + newNewNewBank.join("") + "]");
  return newNewNewBank;
};

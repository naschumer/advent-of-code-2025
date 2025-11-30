import * as path from "path";
import * as fs from "fs";
import { Command } from "commander";
import { readInput } from "../utils/input";
import { performance } from "perf_hooks";
import { yellow, green, cyan, gray, bold } from "colorette";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

const program = new Command();
program
  .name("run-day")
  .argument("<day>", "Day number to run")
  .option("-m, --module <path>", "Explicit module path to run")
  .option("-i, --input <path>", "Explicit input file path to use")
  .parse(process.argv);

const options = program.opts();
const raw = program.args[0];
if (!raw) {
  console.error("Usage: npx ts-node ./scripts/run-day.ts <day-number>");
  process.exit(1);
}

const dayNum = Number(raw);
if (Number.isNaN(dayNum) || dayNum < 1) {
  console.error("Invalid day number:", raw);
  process.exit(1);
}

const p = pad(dayNum);

let modulePath = options.module;
if (!modulePath) {
  modulePath = path.join(__dirname, "..", `Day${p}`, `index.ts`);
}
if (!fs.existsSync(modulePath)) {
  console.error(
    `Could not find module for Day ${dayNum}. Expected: ${modulePath}`
  );
  process.exit(1);
}

try {
  // Use require so ts-node's register can handle .ts files
  const mod = require(modulePath);
  const solver = mod.default || mod.solve || mod.main;
  if (typeof solver !== "function") {
    console.error(
      `Day module at ${modulePath} does not export a default function.`
    );
    process.exit(1);
  }

  const inputOption = options.input as string | undefined;
  const input = inputOption ? readInput(inputOption) : readInput();

  const start = performance.now();
  Promise.resolve(solver(input))
    .then((result) => {
      const elapsed = performance.now() - start;
      console.log(
        `${bold(yellow(`Day ${p}`))} ${gray(`(${modulePath})`)} ${gray(`took ${elapsed.toFixed(1)}ms`)}`
      );
      // If result is an array like [part1, part2]
      if (Array.isArray(result) && result.length >= 2) {
        console.log(`${yellow("Part 1:")} ${green(String(result[0]))}`);
        console.log(`${yellow("Part 2:")} ${cyan(String(result[1]))}`);
        if (result.length > 2) {
          console.log(`${yellow("Extra:")} ${String(result.slice(2))}`);
        }
      } else if (result && typeof result === "object") {
        // Best-effort extract part1/part2
        const r: any = result;
        if ("part1" in r || "part2" in r) {
          console.log(`${yellow("Part 1:")} ${green(String(r.part1 ?? ""))}`);
          console.log(`${yellow("Part 2:")} ${cyan(String(r.part2 ?? ""))}`);
        } else {
          console.log(`${yellow("Result:")} ${String(result)}`);
        }
      } else {
        console.log(`${yellow("Result:")} ${String(result)}`);
      }
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
} catch (err) {
  console.error("Failed to load day module:", err);
  process.exit(1);
}

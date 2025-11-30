import * as fs from "fs";
import * as path from "path";
import { Command } from "commander";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

const program = new Command();
program.argument("<day>", "Day number to scaffold");
program.parse(process.argv);

const raw = program.args[0];
if (!raw) {
  console.error("Usage: npx ts-node ./scripts/scaffold-day.ts <day-number>");
  process.exit(1);
}

const day = Number(raw);
if (Number.isNaN(day) || day < 1) {
  console.error("Invalid day number:", raw);
  process.exit(1);
}

const p = pad(day);
const dir = path.join(process.cwd(), `Day${p}`);
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

const indexPath = path.join(dir, "index.ts");
const inputPath = path.join(dir, "input.txt");
const samplePath = path.join(dir, "test-input.txt");

if (!fs.existsSync(indexPath)) {
  const template = `import { Output } from "../types/output";
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
`;
  fs.writeFileSync(indexPath, template);
}

if (!fs.existsSync(inputPath)) fs.writeFileSync(inputPath, "");
if (!fs.existsSync(samplePath)) fs.writeFileSync(samplePath, "");

console.log(`Scaffolded Day${p} at ${dir}`);

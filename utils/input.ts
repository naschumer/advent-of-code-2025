import * as fs from "fs";
import * as path from "path";
import callsites = require("callsites");
import stripBom = require("strip-bom");

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function defaultInputPath(day: number) {
  const p = pad(day);
  const dir = path.join(process.cwd(), `Day${p}`);
  const full = path.join(dir, "input.txt");
  if (fs.existsSync(full)) return full;
  throw new Error(
    `No input file found for Day ${day}. Expected: ${path.join(dir, "input.txt")}`
  );
}

function inferDayFromStack(): number | null {
  const sites = callsites();
  for (let i = 0; i < sites.length; i++) {
    const s = sites[i];
    if (!s) continue;
    const fn = s.getFileName();
    if (!fn) continue;
    const pathMatch =
      fn.match(/[\\\/]Day(\d{1,2})[\\\/]/i) || fn.match(/Day(\d{1,2})/i);
    if (pathMatch) return Number(pathMatch[1]);
  }
  // Fallback to argv
  const arg = process.argv[2];
  if (arg) {
    const num = Number(arg);
    if (!Number.isNaN(num)) return num;
  }
  return null;
}

function resolvePath(dayOrPath?: number | string) {
  // If caller provided a number, use default resolution
  if (typeof dayOrPath === "number") return defaultInputPath(dayOrPath);
  // If they provided a string that points to an actual file, accept that
  if (typeof dayOrPath === "string") {
    const candidate = path.isAbsolute(dayOrPath)
      ? dayOrPath
      : path.join(process.cwd(), dayOrPath);
    if (fs.existsSync(candidate)) return candidate;
    // Otherwise, see if they passed a day string like "1", "01" or "Day01"
    const dmatch = dayOrPath.match(/^0*(\d{1,2})$/);
    if (dmatch) return defaultInputPath(Number(dmatch[1]));
    const dmatch2 = dayOrPath.match(/^Day0*(\d{1,2})$/i);
    if (dmatch2) return defaultInputPath(Number(dmatch2[1]));
    throw new Error(`Cannot resolve path or day from ${dayOrPath}`);
  }
  // No arg given: infer from stack and argv
  const inferred = inferDayFromStack();
  if (inferred !== null) return defaultInputPath(inferred);
  throw new Error(
    "No day provided and day could not be inferred; pass a day number or path"
  );
}

export function readInput(dayOrPath?: number | string): string {
  const p = resolvePath(dayOrPath as any);
  const raw = fs.readFileSync(p, "utf-8");
  return stripBom(raw);
}

export function readLines(dayOrPath?: number | string): string[] {
  // Split into lines and filter out empty/whitespace-only lines so they don't
  // get parsed by consumers. Preserve content of non-empty lines as-is
  // (don't trim), but drop lines that are empty after trimming.
  return readInput(dayOrPath)
    .replace(/\r/g, "")
    .split("\n")
    .filter((l) => l.trim() !== "");
}

/**
 * Alias for `readLines` kept as a more descriptive `readInputLines` name
 * which returns the input as an array of strings (one per line).
 */
export function readInputLines(dayOrPath?: number | string): string[] {
  return readLines(dayOrPath);
}

export function readNumbers(dayOrPath?: number | string): number[] {
  return readLines(dayOrPath)
    .filter(Boolean)
    .map((s) => Number(s));
}

export function readGroups(dayOrPath?: number | string): string[][] {
  return readInput(dayOrPath)
    .trim()
    .split(/\r?\n\r?\n/)
    .map((g) => g.split(/\r?\n/));
}

export default {
  readInput,
  readLines,
  readInputLines,
  readNumbers,
  readGroups,
};

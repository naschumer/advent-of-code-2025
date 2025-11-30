# Advent of Code 2025

Run a specific day using the included script. You can either use `npx` directly, or the convenient npm script.

Usage:

- Run day 1 via `npx`:

```bash
npx ts-node ./scripts/run-day.ts 1
```

- Using npm scripts (recommended):

```bash
npm run day -- 1
# or
npm run run-day -- 1
```

The `--` after the npm run command tells npm to pass the following arguments to the script.

If you do not pass a day to `readInput()` inside a Day module, the helper attempts to infer the day from the module path or the `process.argv[2]` fallback.

Helpers for reading input:

- `readInput(dayOrPath?)` — returns the raw input as a single string.
- `readLines(dayOrPath?)` — returns the input as an array of strings (one per line).
- `readInputLines(dayOrPath?)` — alias for `readLines`, sometimes clearer when you want an array.
- `readNumbers(dayOrPath?)` — returns the input as an array of numbers (filters blank lines).
- `readGroups(dayOrPath?)` — returns the input split into groups (paragraphs), as arrays of string arrays.

Notes:

- Running tests is not set up in this repo — `npm test` is a placeholder.
- The `ts-node` dependency is required to run `.ts` files directly without compiling.

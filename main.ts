// One Perfect Strawberry — make.fun entry
// the-picture-that-tastes-of-one-20261122-2047
//
// Copies the pre-rendered strawberry picture into the output directory
// as entry.png. No network, no dependencies, only Node built-ins.

import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1_048_576;

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "strawberry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

if (!existsSync(source)) {
  throw new Error(`missing image next to main.ts: ${source}`);
}

// The gate is 1 MiB and 1024x1024; refuse to emit an oversize entry.
if (statSync(source).size > MAX_BYTES) {
  throw new Error(
    `strawberry.png is ${statSync(source).size} bytes, over the ${MAX_BYTES} byte limit`,
  );
}

mkdirSync(outDir, { recursive: true });
const dest = join(outDir, "entry.png");
copyFileSync(source, dest);
console.log(`wrote ${dest} (${statSync(dest).size} bytes)`);

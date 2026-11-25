import { mkdirSync, writeFileSync } from "node:fs";
import { isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Two-sentence horror: six years alone, two plates served out of habit,
// and one night the second plate comes back empty.
const ENTRY =
  "I have lived alone for six years, and I still serve two plates at dinner out of habit. " +
  "Last night, for the first time, the second plate came back empty.\n";

const repoRoot = resolve(fileURLToPath(new URL(".", import.meta.url)));

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

// MAKEFUN_OUTPUT_DIR is used as-is when absolute; only a relative value
// is resolved against the repository root. Never joined with any other dir.
const destDir = isAbsolute(outDir) ? outDir : join(repoRoot, outDir);
mkdirSync(destDir, { recursive: true });
writeFileSync(join(destDir, "entry.txt"), ENTRY, "utf8");

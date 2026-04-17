import fs from "node:fs/promises";
import path from "node:path";

const CONTENT_DIR = path.resolve("content");
const OUTPUT_FILE = path.resolve("static/knowledge.json");

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const full = path.join(dir, entry.name);
      return entry.isDirectory() ? walk(full) : full;
    })
  );
  return files.flat();
}

function stripFrontMatter(content) {
  return content.replace(/^---[\s\S]*?---\s*/m, "");
}

function stripShortcodes(content) {
  return content
    .replace(/\{\{<[\s\S]*?>\}\}/g, "")
    .replace(/\{\{%[\s\S]*?%\}\}/g, "");
}

function clean(content) {
  return content
    .replace(/:contentReference\[[^\]]*?\]\{[^}]*\}/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function relToUrl(relPath) {
  let p = relPath.replace(/^content[\\/]/, "").replace(/\\/g, "/");
  p = p.replace(/\.md$/, "");
  p = p.replace(/\/_index$/, "/");
  p = p.replace(/^_index$/, "");
  return "/" + p.replace(/^\/+/, "");
}

async function main() {
  const files = (await walk(CONTENT_DIR)).filter((f) => f.endsWith(".md"));
  const docs = [];

  for (const file of files) {
    const rel = path.relative(process.cwd(), file).replace(/\\/g, "/");
    const raw = await fs.readFile(file, "utf8");
    const text = clean(stripShortcodes(stripFrontMatter(raw)));

    if (!text) continue;

    docs.push({
      path: rel,
      url: relToUrl(rel),
      title: path.basename(rel, ".md").replace(/^_index$/, "home"),
      content: text,
    });
  }

  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
  await fs.writeFile(
    OUTPUT_FILE,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        docs,
      },
      null,
      2
    )
  );

  console.log(`Wrote ${OUTPUT_FILE} with ${docs.length} docs`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
import fs from "fs/promises";
import path from "path";

const DIFY_BASE_URL = process.env.DIFY_BASE_URL;
const DIFY_API_KEY = process.env.DIFY_API_KEY;
const DIFY_DATASET_ID = process.env.DIFY_DATASET_ID;
const SITE_BASE_URL = process.env.SITE_BASE_URL;

if (!DIFY_BASE_URL || !DIFY_API_KEY || !DIFY_DATASET_ID || !SITE_BASE_URL) {
  throw new Error("Missing one or more required env vars.");
}

const CONTENT_DIR = path.resolve("content");

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

function stripHugoShortcodes(content) {
  return content
    .replace(/\{\{<[\s\S]*?>\}\}/g, "")
    .replace(/\{\{%[\s\S]*?%\}\}/g, "");
}

function stripArtifacts(content) {
  return content
    .replace(/:contentReference\[[^\]]*?\]\{[^}]*\}/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function toDocName(relPath) {
  return relPath
    .replace(/^content\//, "")
    .replace(/\/_index\.md$/, "")
    .replace(/\.md$/, "")
    .replace(/[\/\\]/g, "-")
    .replace(/^-+|-+$/g, "") || "home";
}

function toPublicUrl(relPath) {
  let p = relPath.replace(/^content\//, "").replace(/\.md$/, "");
  p = p.replace(/\/_index$/, "/");
  p = p.replace(/^_index$/, "");
  return `${SITE_BASE_URL}/${p}`.replace(/(?<!:)\/{2,}/g, "/").replace(/\/$/, "") + "/";
}

function shouldSkip(relPath) {
  return relPath.includes("/news/") || relPath.includes("/posts/");
}

async function transformFile(filePath) {
  const relPath = path.relative(process.cwd(), filePath).replace(/\\/g, "/");
  let content = await fs.readFile(filePath, "utf8");

  content = stripFrontMatter(content);
  content = stripHugoShortcodes(content);
  content = stripArtifacts(content);

  if (!content) return null;
  if (shouldSkip(relPath)) return null;

  const name = toDocName(relPath);
  const publicUrl = toPublicUrl(relPath);

  const text = `# ${name}

Source Path: ${relPath}
Public URL: ${publicUrl}

${content}
`;

  return { name, relPath, text };
}

async function difyFetch(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${DIFY_API_KEY}`,
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${body}`);
  }

  const contentType = res.headers.get("content-type") || "";
  return contentType.includes("application/json") ? res.json() : res.text();
}

async function listDocuments() {
  const out = [];
  let page = 1;

  while (true) {
    const data = await difyFetch(
      `${DIFY_BASE_URL}/datasets/${DIFY_DATASET_ID}/documents?page=${page}&limit=100`
    );

    out.push(...(data.data || []));
    if (!data.has_more) break;
    page += 1;
  }

  return out;
}

async function createDocument(name, text) {
  return difyFetch(
    `${DIFY_BASE_URL}/datasets/${DIFY_DATASET_ID}/document/create-by-text`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        text,
        indexing_technique: "high_quality",
        process_rule: {
          mode: "custom",
          rules: {
            pre_processing_rules: [
              { id: "remove_extra_spaces", enabled: true },
              { id: "remove_urls_emails", enabled: false },
            ],
            segmentation: {
              separator: "\n\n",
              max_tokens: 500,
            },
          },
        },
      }),
    }
  );
}

async function updateDocument(documentId, name, text) {
  return difyFetch(
    `${DIFY_BASE_URL}/datasets/${DIFY_DATASET_ID}/documents/${documentId}/update-by-text`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        text,
        process_rule: {
          mode: "custom",
          rules: {
            pre_processing_rules: [
              { id: "remove_extra_spaces", enabled: true },
              { id: "remove_urls_emails", enabled: false },
            ],
            segmentation: {
              separator: "\n\n",
              max_tokens: 500,
            },
          },
        },
      }),
    }
  );
}

async function deleteDocument(documentId) {
  return difyFetch(
    `${DIFY_BASE_URL}/datasets/${DIFY_DATASET_ID}/documents/${documentId}`,
    { method: "DELETE" }
  );
}

async function main() {
  const files = (await walk(CONTENT_DIR)).filter((f) => f.endsWith(".md"));
  const localDocs = (await Promise.all(files.map(transformFile))).filter(Boolean);

  const remoteDocs = await listDocuments();
  const remoteByName = new Map(remoteDocs.map((d) => [d.name, d]));
  const localNames = new Set(localDocs.map((d) => d.name));

  for (const doc of localDocs) {
    const existing = remoteByName.get(doc.name);

    if (!existing) {
      console.log(`Creating ${doc.name}`);
      await createDocument(doc.name, doc.text);
    } else {
      console.log(`Updating ${doc.name}`);
      await updateDocument(existing.id, doc.name, doc.text);
    }
  }

  for (const remote of remoteDocs) {
    if (!localNames.has(remote.name)) {
      console.log(`Deleting ${remote.name}`);
      await deleteDocument(remote.id);
    }
  }

  console.log("Dify sync complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
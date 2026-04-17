const DIFY_API_KEY = process.env.DIFY_API_KEY;
const SITE_URL = process.env.SITE_BASE_URL;

if (!DIFY_API_KEY || !SITE_URL) {
  throw new Error("Missing DIFY_API_KEY or SITE_BASE_URL.");
}

async function main() {
  console.log("Fetching site with Jina...");

  const normalizedSiteUrl = SITE_URL.replace(/\/+$/, "");
  const jinaUrl = `https://r.jina.ai/http://${normalizedSiteUrl.replace(/^https?:\/\//, "")}`;

  const res = await fetch(jinaUrl);

  if (!res.ok) {
    throw new Error(`Failed to fetch site via Jina: ${res.status} ${res.statusText}`);
  }

  const content = await res.text();

  console.log("Sending content to Dify...");

  const response = await fetch("https://api.dify.ai/v1/chat-messages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${DIFY_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: {
        website_content: content,
      },
      query: "Summarize the portfolio website content.",
      response_mode: "blocking",
      user: "sync-bot",
    }),
  });

  const data = await response.json();
  console.log("Dify response:", JSON.stringify(data, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders(),
      });
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405);
    }

    try {
      const { message } = await request.json();

      if (!message || typeof message !== "string") {
        return json({ error: "Missing message" }, 400);
      }

      const knowledgeUrl = "https://jonasoutzen.github.io/Portofolio/knowledge.json";
      const knowledgeRes = await fetch(knowledgeUrl);
      if (!knowledgeRes.ok) {
        return json({ error: "Could not load knowledge.json" }, 500);
      }

      const knowledge = await knowledgeRes.json();

      const context = knowledge.docs
        .map((doc) => {
          return `TITLE: ${doc.title}\nURL: ${doc.url}\nCONTENT:\n${doc.content}`;
        })
        .join("\n\n---\n\n")
        .slice(0, 120000);

      const openaiRes = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          input: [
            {
              role: "system",
              content: [
                {
                  type: "input_text",
                  text:
                    "You are a portfolio assistant for Jonas Outzen. " +
                    "Answer only from the provided website knowledge. " +
                    "Do not invent details. If the site does not say it, say you don't have that information. " +
                    "Keep answers concise and helpful.",
                },
              ],
            },
            {
              role: "user",
              content: [
                {
                  type: "input_text",
                  text:
                    `Website knowledge:\n\n${context}\n\n` +
                    `User question: ${message}`,
                },
              ],
            },
          ],
        }),
      });

      const data = await openaiRes.json();

      if (!openaiRes.ok) {
        return json({ error: data }, 500);
      }

      const answer =
        data.output_text ||
        "I couldn't generate a response.";

      return json({ answer });
    } catch (err) {
      return json({ error: String(err) }, 500);
    }
  },
};

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "https://jonasoutzen.github.io",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(),
    },
  });
}
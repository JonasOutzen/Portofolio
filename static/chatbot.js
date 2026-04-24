(() => {
  const OPENAI_API_KEY = "__OPENAI_API_KEY__";
  const KNOWLEDGE_URL = "/Portofolio/knowledge.json";

  function createChatbot() {
    const root = document.createElement("div");
    root.id = "jonas-chatbot-root";
    root.innerHTML = `
      <button id="jonas-chatbot-toggle" aria-label="Open chat">Chat</button>
      <div id="jonas-chatbot-panel" hidden>
        <div id="jonas-chatbot-header">
          <strong>Jonas Bot</strong>
          <div style="display:flex;gap:6px;align-items:center;">
            <button id="jonas-chatbot-clear" aria-label="Clear chat" title="Ryd chat">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
            <button id="jonas-chatbot-close" aria-label="Close chat">×</button>
          </div>
        </div>
        <div id="jonas-chatbot-messages">
          <div class="jonas-chatbot-msg bot">
            Hi — ask me about Jonas, his projects, or this site.
          </div>
        </div>
        <form id="jonas-chatbot-form">
          <input
            id="jonas-chatbot-input"
            type="text"
            placeholder="Ask something..."
            autocomplete="off"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    `;

    const style = document.createElement("style");
    style.textContent = `
      #jonas-chatbot-root {
        position: fixed;
        right: 20px;
        bottom: 20px;
        z-index: 99999;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      #jonas-chatbot-toggle {
        border: none;
        border-radius: 999px;
        padding: 12px 18px;
        font-size: 14px;
        cursor: pointer;
        box-shadow: 0 8px 24px rgba(0,0,0,0.16);
        background: #111;
        color: #fff;
      }
      #jonas-chatbot-panel {
        width: 340px;
        height: 460px;
        margin-top: 10px;
        background: #fff;
        color: #111;
        border-radius: 16px;
        box-shadow: 0 16px 40px rgba(0,0,0,0.2);
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }
      #jonas-chatbot-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 14px;
        border-bottom: 1px solid #e5e7eb;
      }
      #jonas-chatbot-close {
        border: none;
        background: transparent;
        font-size: 22px;
        line-height: 1;
        cursor: pointer;
        color: #444;
      }
      #jonas-chatbot-clear {
        border: none;
        background: transparent;
        cursor: pointer;
        color: #888;
        padding: 2px 4px;
        border-radius: 6px;
        display: flex;
        align-items: center;
      }
      #jonas-chatbot-clear:hover { color: #e11d48; background: #fff1f2; }
      .jonas-chatbot-sources {
        margin-top: 8px;
        padding-top: 8px;
        border-top: 1px solid #e5e7eb;
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .jonas-chatbot-source-link {
        font-size: 12px;
        padding: 3px 8px;
        border-radius: 999px;
        background: #f3f4f6;
        color: #374151;
        text-decoration: none;
        border: 1px solid #e5e7eb;
      }
      .jonas-chatbot-source-link:hover {
        background: #e5e7eb;
      }
      #jonas-chatbot-messages {
        flex: 1;
        overflow-y: auto;
        padding: 12px;
        background: #fafafa;
      }
      .jonas-chatbot-msg {
        max-width: 85%;
        margin-bottom: 10px;
        padding: 10px 12px;
        border-radius: 12px;
        white-space: pre-wrap;
        word-break: break-word;
        font-size: 14px;
        line-height: 1.4;
      }
      .jonas-chatbot-msg.user {
        margin-left: auto;
        background: #111;
        color: #fff;
      }
      .jonas-chatbot-msg.bot {
        margin-right: auto;
        background: #fff;
        color: #111;
        border: 1px solid #e5e7eb;
      }
      #jonas-chatbot-form {
        display: flex;
        gap: 8px;
        padding: 12px;
        border-top: 1px solid #e5e7eb;
        background: #fff;
      }
      #jonas-chatbot-input {
        flex: 1;
        min-width: 0;
        border: 1px solid #d1d5db;
        border-radius: 10px;
        padding: 10px 12px;
        font-size: 14px;
        outline: none;
      }
      #jonas-chatbot-form button[type="submit"] {
        border: none;
        border-radius: 10px;
        padding: 10px 14px;
        cursor: pointer;
        background: #111;
        color: #fff;
      }
      @media (max-width: 480px) {
        #jonas-chatbot-root { right: 12px; bottom: 12px; left: 12px; }
        #jonas-chatbot-panel { width: 100%; height: 70vh; }
        #jonas-chatbot-toggle { width: 100%; }
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(root);

    const toggle = document.getElementById("jonas-chatbot-toggle");
    const panel = document.getElementById("jonas-chatbot-panel");
    const close = document.getElementById("jonas-chatbot-close");
    const clearBtn = document.getElementById("jonas-chatbot-clear");
    const form = document.getElementById("jonas-chatbot-form");
    const input = document.getElementById("jonas-chatbot-input");
    const messages = document.getElementById("jonas-chatbot-messages");

    let knowledge = null;
    const STORAGE_KEY = "jonas-chatbot-history";

    async function loadKnowledge() {
      if (knowledge) return knowledge;
      const res = await fetch(KNOWLEDGE_URL);
      knowledge = await res.json();
      return knowledge;
    }

    function saveHistory() {
      const msgs = [...messages.querySelectorAll(".jonas-chatbot-msg")].map(el => ({
        role: el.classList.contains("user") ? "user" : "bot",
        html: el.innerHTML,
      }));
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
    }

    function restoreHistory() {
      try {
        const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
        if (saved.length > 0) messages.innerHTML = "";
        saved.forEach(({ role, html }) => {
          const el = document.createElement("div");
          el.className = `jonas-chatbot-msg ${role}`;
          el.innerHTML = html;
          messages.appendChild(el);
        });
        messages.scrollTop = messages.scrollHeight;
      } catch {}
    }

    function renderMarkdown(text) {
      return text
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/^- (.+)$/gm, "<li>$1</li>")
        .replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>")
        .replace(/\n/g, "<br>");
    }

    function addMessage(text, role, persist = true) {
      const el = document.createElement("div");
      el.className = `jonas-chatbot-msg ${role}`;
      el.innerHTML = renderMarkdown(text);
      messages.appendChild(el);
      messages.scrollTop = messages.scrollHeight;
      if (persist) saveHistory();
      return el;
    }

    function addBotMessage(answer, sources, persist = true) {
      const el = document.createElement("div");
      el.className = "jonas-chatbot-msg bot";
      let html = renderMarkdown(answer);
      if (sources && sources.length > 0) {
        html += `<div class="jonas-chatbot-sources">`;
        sources.forEach(s => {
          const base = "https://jonasoutzen.github.io";
          const href = s.url.startsWith("http") ? s.url : base + s.url;
          html += `<a href="${href}" target="_blank" class="jonas-chatbot-source-link">${s.title}</a>`;
        });
        html += `</div>`;
      }
      el.innerHTML = html;
      messages.appendChild(el);
      messages.scrollTop = messages.scrollHeight;
      if (persist) saveHistory();
      return el;
    }

    function setOpen(isOpen) {
      panel.hidden = !isOpen;
      if (isOpen) input.focus();
    }

    restoreHistory();

    function clearChat() {
      sessionStorage.removeItem(STORAGE_KEY);
      messages.innerHTML = `<div class="jonas-chatbot-msg bot">Hi — ask me about Jonas, his projects, or this site.</div>`;
    }

    toggle.addEventListener("click", () => setOpen(panel.hidden));
    close.addEventListener("click", () => setOpen(false));
    clearBtn.addEventListener("click", clearChat);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const message = input.value.trim();
      if (!message) return;

      addMessage(message, "user");
      input.value = "";

      const thinkingEl = addMessage("Thinking...", "bot", false);

      try {
        const kb = await loadKnowledge();
        const context = kb.docs
          .map(doc => `TITLE: ${doc.title}\nURL: ${doc.url}\nCONTENT:\n${doc.content}`)
          .join("\n\n---\n\n")
          .slice(0, 80000);

        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            response_format: { type: "json_object" },
            messages: [
              {
                role: "system",
                content:
                  "You are a helpful assistant for Jonas Outzen's portfolio. " +
                  "Answer only based on the provided knowledge. " +
                  "If something isn't mentioned, say you don't have that info. " +
                  "Be concise and friendly. Answer in the same language the user writes in. " +
                  "You may use simple markdown: **bold**, *italic*, and bullet lists with -. " +
                  "Always respond with valid JSON in this exact format: " +
                  '{"answer": "your answer here", "sources": [{"title": "Page title", "url": "/page-url"}]} ' +
                  "Only include sources that are directly relevant. Max 3 sources.",
              },
              {
                role: "user",
                content: `Website knowledge:\n\n${context}\n\nQuestion: ${message}`,
              },
            ],
          }),
        });

        const data = await res.json();
        thinkingEl.remove();

        const raw = data.choices?.[0]?.message?.content || "{}";
        let answer, sources;
        try {
          const parsed = JSON.parse(raw);
          answer = parsed.answer;
          sources = parsed.sources || [];
        } catch {
          answer = raw;
          sources = [];
        }
        addBotMessage(answer || "I couldn't generate a response.", sources);
      } catch (err) {
        thinkingEl.remove();
        addMessage("Sorry, something went wrong.", "bot");
        console.error(err);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createChatbot);
  } else {
    createChatbot();
  }
})();
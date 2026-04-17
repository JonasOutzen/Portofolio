(() => {
const apiUrl = "https://jonas-portfolio-chat.jonasoutzen.workers.dev";

  function createChatbot() {
    const root = document.createElement("div");
    root.id = "jonas-chatbot-root";
    root.innerHTML = `
      <button id="jonas-chatbot-toggle" aria-label="Open chat">Chat</button>
      <div id="jonas-chatbot-panel" hidden>
        <div id="jonas-chatbot-header">
          <strong>Jonas Bot</strong>
          <button id="jonas-chatbot-close" aria-label="Close chat">×</button>
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
        #jonas-chatbot-root {
          right: 12px;
          bottom: 12px;
          left: 12px;
        }

        #jonas-chatbot-panel {
          width: 100%;
          height: 70vh;
        }

        #jonas-chatbot-toggle {
          width: 100%;
        }
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(root);

    const toggle = document.getElementById("jonas-chatbot-toggle");
    const panel = document.getElementById("jonas-chatbot-panel");
    const close = document.getElementById("jonas-chatbot-close");
    const form = document.getElementById("jonas-chatbot-form");
    const input = document.getElementById("jonas-chatbot-input");
    const messages = document.getElementById("jonas-chatbot-messages");

    function addMessage(text, role) {
      const el = document.createElement("div");
      el.className = `jonas-chatbot-msg ${role}`;
      el.textContent = text;
      messages.appendChild(el);
      messages.scrollTop = messages.scrollHeight;
    }

    function setOpen(isOpen) {
      panel.hidden = !isOpen;
      if (isOpen) input.focus();
    }

    toggle.addEventListener("click", () => setOpen(panel.hidden));
    close.addEventListener("click", () => setOpen(false));

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const message = input.value.trim();
      if (!message) return;

      addMessage(message, "user");
      input.value = "";

      const thinkingEl = document.createElement("div");
      thinkingEl.className = "jonas-chatbot-msg bot";
      thinkingEl.textContent = "Thinking...";
      messages.appendChild(thinkingEl);
      messages.scrollTop = messages.scrollHeight;

      try {
        const res = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        });

        const data = await res.json();
        thinkingEl.remove();

        if (!res.ok) {
          addMessage("Sorry, the chat service hit an error.", "bot");
          console.error(data);
          return;
        }

        addMessage(data.answer || "Sorry, I couldn't generate a response.", "bot");
      } catch (err) {
        thinkingEl.remove();
        addMessage("Sorry, the chat service is unavailable right now.", "bot");
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
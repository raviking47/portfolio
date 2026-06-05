(() => {
  const COMPONENT_URL = 'frontend/components/chat.html';
  const STORAGE_KEY = 'ask-ravi-chat-history-v1';
  const FALLBACK_ENDPOINTS = ['/api/chat', 'http://localhost:8000/api/chat'];
  const GREETING = 'Hi. Ask me about Ravi\'s experience, projects, skills, technologies, or engineering philosophy.';

  const state = {
    messages: [],
    ready: false,
    loading: false
  };

  const config = window.ASK_RAVI_CHAT_CONFIG || {};
  const endpointCandidates = normalizeEndpoints(
    config.endpoints || config.endpoint || config.apiUrl || config.apiBaseUrl || config.baseUrl
  );

  function normalizeEndpoints(value) {
    if (!value) {
      return [...FALLBACK_ENDPOINTS];
    }

    if (Array.isArray(value)) {
      return [...new Set([...value, ...FALLBACK_ENDPOINTS])];
    }

    return [...new Set([String(value), ...FALLBACK_ENDPOINTS])];
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function buildFallbackComponent() {
    return `
      <div class="ask-ravi-widget" data-ask-ravi-widget>
        <button class="ask-ravi-launcher" type="button" data-ask-ravi-open aria-haspopup="dialog" aria-controls="ask-ravi-modal" aria-expanded="false">
          <span class="ask-ravi-launcher-label">Ask Ravi</span>
        </button>
        <section class="ask-ravi-modal" id="ask-ravi-modal" aria-hidden="true">
          <div class="ask-ravi-backdrop" data-ask-ravi-close></div>
          <div class="ask-ravi-panel" role="dialog" aria-modal="true" aria-labelledby="ask-ravi-title">
            <header class="ask-ravi-header">
              <div>
                <p class="ask-ravi-kicker">RAG Assistant</p>
                <h2 id="ask-ravi-title">Ask Ravi</h2>
              </div>
              <div class="ask-ravi-actions">
                <button class="ask-ravi-icon-button" type="button" data-ask-ravi-clear title="Clear chat" aria-label="Clear chat">Clear</button>
                <button class="ask-ravi-icon-button" type="button" data-ask-ravi-close aria-label="Close chat">x</button>
              </div>
            </header>
            <div class="ask-ravi-body">
              <div class="ask-ravi-history" data-ask-ravi-history aria-live="polite" aria-label="Chat history"></div>
              <div class="ask-ravi-typing" data-ask-ravi-typing hidden aria-hidden="true"><span></span><span></span><span></span></div>
            </div>
            <form class="ask-ravi-form" data-ask-ravi-form>
              <label class="ask-ravi-sr-only" for="ask-ravi-input">Ask Ravi a question</label>
              <input id="ask-ravi-input" class="ask-ravi-input" type="text" name="message" placeholder="Ask about experience, projects, skills..." autocomplete="off" spellcheck="false">
              <button class="ask-ravi-send" type="submit">Send</button>
            </form>
          </div>
        </section>
      </div>
    `;
  }

  async function mount() {
    const html = await fetchComponent();
    document.body.insertAdjacentHTML('beforeend', html);
    initWidget();
  }

  async function fetchComponent() {
    try {
      const response = await fetch(COMPONENT_URL, { cache: 'no-cache' });
      if (!response.ok) {
        throw new Error(`Failed to load ${COMPONENT_URL}`);
      }
      return await response.text();
    } catch (error) {
      console.warn('Ask Ravi widget fallback component loaded:', error);
      return buildFallbackComponent();
    }
  }

  function initWidget() {
    const widget = document.querySelector('[data-ask-ravi-widget]');
    const launcher = widget?.querySelector('[data-ask-ravi-open]');
    const modal = widget?.querySelector('.ask-ravi-modal');
    const closeButtons = widget ? widget.querySelectorAll('[data-ask-ravi-close]') : [];
    const clearButton = widget?.querySelector('[data-ask-ravi-clear]');
    const form = widget?.querySelector('[data-ask-ravi-form]');
    const input = widget?.querySelector('.ask-ravi-input');
    const history = widget?.querySelector('[data-ask-ravi-history]');
    const typing = widget?.querySelector('[data-ask-ravi-typing]');
    const body = widget?.querySelector('.ask-ravi-body');

    if (!widget || !launcher || !modal || !form || !input || !history || !typing || !body) {
      return;
    }

    state.messages = loadHistory();
    if (state.messages.length === 0) {
      state.messages.push({ role: 'assistant', content: GREETING });
    }

    renderHistory(history);

    launcher.addEventListener('click', () => openChat(modal, launcher, input));
    closeButtons.forEach((button) => button.addEventListener('click', () => closeChat(modal, launcher)));

    clearButton?.addEventListener('click', () => {
      state.messages = [{ role: 'assistant', content: GREETING }];
      persistHistory();
      renderHistory(history);
      input.focus();
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (state.loading) {
        return;
      }

      const message = input.value.trim();
      if (!message) {
        return;
      }

      input.value = '';
      addMessage('user', message);
      renderHistory(history);
      setTyping(typing, true);
      state.loading = true;
      scrollToBottom(body);

      try {
        const answer = await askRavi(message);
        addMessage('assistant', answer);
      } catch (error) {
        addMessage('assistant', 'I could not reach RaviGPT right now. Try again in a moment.\n\nWorks on localhost is not a deployment strategy.');
      } finally {
        state.loading = false;
        setTyping(typing, false);
        renderHistory(history);
        scrollToBottom(body);
        input.focus();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modal.classList.contains('is-open')) {
        closeChat(modal, launcher);
      }
    });

    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeChat(modal, launcher);
      }
    });

    state.ready = true;
  }

  function openChat(modal, launcher, input) {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    launcher.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => input.focus(), 0);
  }

  function closeChat(modal, launcher) {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    launcher.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    launcher.focus();
  }

  function loadHistory() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      return [];
    }
  }

  function persistHistory() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.messages));
    } catch (error) {
      // Ignore storage failures.
    }
  }

  function addMessage(role, content) {
    state.messages.push({ role, content });
    persistHistory();
  }

  function renderHistory(historyNode) {
    historyNode.innerHTML = state.messages
      .map((message) => `
        <article class="ask-ravi-message ${message.role}">
          <div class="ask-ravi-message-role">${message.role === 'user' ? 'You' : 'RaviGPT'}</div>
          <div class="ask-ravi-bubble">${escapeHtml(message.content)}</div>
        </article>
      `)
      .join('');
    requestAnimationFrame(() => {
      historyNode.scrollTop = historyNode.scrollHeight;
    });
  }

  function setTyping(typingNode, visible) {
    typingNode.hidden = !visible;
  }

  function scrollToBottom(container) {
    requestAnimationFrame(() => {
      container.scrollTop = container.scrollHeight;
    });
  }

  async function askRavi(message) {
    let lastError = null;
    for (const endpoint of endpointCandidates) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message })
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        if (!payload || typeof payload.answer !== 'string') {
          throw new Error('Malformed response');
        }

        return payload.answer;
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError || new Error('Ask Ravi API unavailable');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
})();

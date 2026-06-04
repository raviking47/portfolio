(() => {
  const modal = document.getElementById('terminal-modal');
  const openButton = document.getElementById('terminal-open');
  const closeButtons = document.querySelectorAll('[data-close-terminal]');
  const form = document.getElementById('terminal-form');
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');

  if (!modal || !openButton || !form || !input || !output) {
    return;
  }

  const commands = {
    help: () => [
      'Available commands:',
      'help, about, skills, projects, experience, resume, contact, coffee, production, ai'
    ],
    about: () => [
      'Software Development Engineer',
      'Building AI Platforms,',
      'Computer Vision Systems,',
      'and Distributed Backends.'
    ],
    skills: () => [
      'AI: OpenAI, LangGraph, Ollama, Anthropic',
      'Backend: Python, FastAPI, Node.js',
      'Data: PostgreSQL, MongoDB, FAISS',
      'Infrastructure: Docker, AWS, Linux'
    ],
    projects: () => [
      '1. Modular AI Agent Platform',
      '2. Face Anti-Spoofing System',
      '3. AI Video Generation Engine'
    ],
    experience: () => [
      '2024 - Software Developer @ Indevz',
      '2025 - Software Development Engineer @ Saralweb',
      'Today - AI Platforms + Backend + Computer Vision'
    ],
    resume: () => [
      'Resume: assets/resume.pdf',
      'Use the download button or open the PDF directly.'
    ],
    contact: () => [
      'GitHub: github.com/raviking47',
      'LinkedIn: linkedin.com/in/ravitomerreactnodewebdeveloper',
      'Email: ravitomerak4747@gmail.com',
      'Resume: assets/resume.pdf'
    ],
    coffee: () => [
      'Dependency Status:',
      'Required',
      '',
      'Version:',
      'Daily'
    ],
    production: () => [
      'Status:',
      'Works on localhost.',
      '',
      'Investigating...'
    ],
    ai: () => [
      'AI Fact #27:',
      '',
      'The model is not thinking.',
      '',
      'Neither is the user.'
    ]
  };

  function line(type, text) {
    const p = document.createElement('p');
    p.className = `terminal-line ${type}`;
    p.textContent = text;
    return p;
  }

  function printCommand(command, responseLines) {
    output.appendChild(line('command', `ravi@portfolio:~$ ${command}`));
    responseLines.forEach((row) => {
      output.appendChild(line('response', row));
    });
    output.scrollTop = output.scrollHeight;
  }

  function runCommand(rawValue) {
    const command = rawValue.trim().toLowerCase();
    if (!command) {
      return;
    }

    if (command === 'clear') {
      output.innerHTML = '';
      return;
    }

    const handler = commands[command];
    if (handler) {
      printCommand(command, handler());
      return;
    }

    printCommand(command, [
      `Command not found: ${command}`,
      'Type help for the command list.'
    ]);
  }

  function seedTerminal() {
    output.innerHTML = '';
    printCommand('help', commands.help());
  }

  function openTerminal() {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (!output.childElementCount) {
      seedTerminal();
    }
    window.setTimeout(() => input.focus(), 0);
  }

  function closeTerminal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    openButton.focus();
  }

  openButton.addEventListener('click', openTerminal);

  closeButtons.forEach((button) => {
    button.addEventListener('click', closeTerminal);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input.value;
    input.value = '';
    runCommand(value);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeTerminal();
    }
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeTerminal();
    }
  });

  seedTerminal();
})();

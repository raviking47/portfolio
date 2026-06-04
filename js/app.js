(() => {
  const subtitles = [
    'Currently turning coffee into APIs.',
    'Teaching LLMs to follow instructions.',
    'Reducing latency one bottleneck at a time.'
  ];

  const subtitleNode = document.getElementById('rotating-subtitle');
  if (subtitleNode) {
    let index = 0;
    setInterval(() => {
      index = (index + 1) % subtitles.length;
      subtitleNode.textContent = subtitles[index];
    }, 3200);
  }

  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.18 });

    reveals.forEach((node) => observer.observe(node));
  } else {
    reveals.forEach((node) => node.classList.add('is-visible'));
  }

  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      const target = targetId ? document.querySelector(targetId) : null;

      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle (remembered in this browser)
const root = document.documentElement;
try { const t = localStorage.getItem('theme'); if (t) root.dataset.theme = t; } catch (e) {}
document.getElementById('themeToggle').addEventListener('click', () => {
  const dark = root.dataset.theme === 'dark' ||
    (!root.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
  root.dataset.theme = dark ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
});

// Typing line in the hero
const phrases = ['Spring Boot REST APIs', 'A Learning Management System', 'AI-assisted MVPs'];
const el = document.getElementById('typed');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduce) { el.textContent = phrases[0]; }
else {
  let p = 0, i = 0, del = false;
  (function tick() {
    const word = phrases[p];
    el.textContent = word.slice(0, i);
    if (!del && i === word.length) { del = true; return setTimeout(tick, 1400); }
    if (del && i === 0) { del = false; p = (p + 1) % phrases.length; }
    i += del ? -1 : 1;
    setTimeout(tick, del ? 35 : 70);
  })();
}

// Project filters
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const f = chip.dataset.filter;
    document.querySelectorAll('.project').forEach(card => {
      card.hidden = !(f === 'all' || card.dataset.tags.includes(f));
    });
  });
});

// Contact form -> Netlify Forms (no page reload)
document.getElementById('contactForm').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target, status = document.getElementById('formStatus');
  try {
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    });
    if (!res.ok) throw new Error();
    form.reset();
    status.textContent = 'Message sent.';
  } catch {
    status.textContent = 'Message not sent. Email v.shrisakthi@gmail.com instead.';
  }
});

(() => {
  const bar = document.querySelector('.wk-filters');
  if (!bar) return;
  const buttons = [...bar.querySelectorAll('button')];
  const cards = [...document.querySelectorAll('.wk-section .wk-card')];
  const headings = [...document.querySelectorAll('.wk-heading')];
  const status = document.querySelector('.wk-status');

  const apply = (key, push) => {
    if (!buttons.some((b) => b.dataset.filter === key)) key = 'all';
    buttons.forEach((b) => { const on = b.dataset.filter === key; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', String(on)); });
    let shown = 0;
    cards.forEach((c) => {
      const hit = key === 'all' || c.dataset.services.split(' ').includes(key);
      c.hidden = !hit; if (hit) shown += 1;
    });
    headings.forEach((h) => { const grid = h.nextElementSibling; h.hidden = grid && ![...grid.children].some((c) => !c.hidden); });
    if (status) status.textContent = key === 'all' ? '' : `${shown} project${shown === 1 ? '' : 's'} · ${bar.querySelector(`[data-filter="${key}"]`).firstChild.textContent.trim()}`;
    if (push) history.replaceState(null, '', key === 'all' ? location.pathname : `#${key}`);
  };

  bar.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (b) apply(b.dataset.filter, true);
  });
  apply(decodeURIComponent(location.hash.slice(1)) || 'all', false);
  addEventListener('hashchange', () => apply(decodeURIComponent(location.hash.slice(1)) || 'all', false));
})();

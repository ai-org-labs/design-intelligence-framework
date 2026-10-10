// Shared DOM component. Owns markup/semantics only; the feature owns draft and persistence.
(() => {
  const node = (tag, attrs = {}, text) => {
    const e = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) e.setAttribute(key, String(value));
    if (text !== undefined) e.textContent = text;
    return e;
  };
  for (const host of document.querySelectorAll('[data-numeric-control]')) {
    const {numericControl: id, label, min, max, increment: step, value, help} = host.dataset;
    const bounds = [min, max, step, value].map(Number);
    if (!/^[a-z][a-z0-9-]*$/.test(id) || document.getElementById(id) || !label || bounds.some(n => !Number.isFinite(n)) || bounds[0] >= bounds[1] || bounds[2] <= 0 || bounds[3] < bounds[0] || bounds[3] > bounds[1]) throw Error('Invalid numeric control definition');
    host.classList.add('field');
    host.append(node('label', {for: id}, label));
    const row = node('div', {class: 'controls'});
    const range = node('input', {id, type: 'range', min, max, step, value, 'aria-describedby': `${id}-help`});
    const exact = node('div', {class: 'number'});
    exact.append(node('label', {for: `${id}-value`}, '正確な値（%）'), node('input', {id: `${id}-value`, type: 'number', min, max, step, value, inputmode: 'numeric', 'aria-describedby': `${id}-help ${id}-error`}));
    row.append(node('button', {type: 'button', 'data-step': `${id}:-${step}`, 'aria-label': `${label}を${step}パーセント下げる`}, '−'), range, node('button', {type: 'button', 'data-step': `${id}:${step}`, 'aria-label': `${label}を${step}パーセント上げる`}, '＋'), exact);
    const ends = node('div', {class: 'ends'});
    ends.append(node('span', {}, `${min}%`), node('span', {}, `${max}%`));
    host.append(row, ends, node('p', {class: 'help', id: `${id}-help`}, help), node('p', {class: 'error', id: `${id}-error`}));
  }
})();

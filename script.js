const STORAGE_KEY = 'entries';

function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function loadEntries() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function renderEntries() {
  const b = document.querySelector('.b');
  if (!b) return;
  b.innerHTML = '';
  const entries = loadEntries();
  // update count
  const countEl = document.getElementById('count');
  if (countEl) countEl.textContent = entries.length ? `Entries: ${entries.length}` : 'No entries yet';
  entries.forEach((text, idx) => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'space-between';
    container.style.borderBottom = '1px solid #ddd';
    container.style.padding = '8px 0';

    const h = document.createElement('h2');
    h.style.color = 'blue';
    h.style.margin = '0';
    h.style.fontSize = '20px';
    h.textContent = text;

    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.className = 'btn btn-danger small-btn';
    del.addEventListener('click', () => deleteEntry(idx));

    container.appendChild(h);
    container.appendChild(del);
    b.appendChild(container);
  });
}

function deleteEntry(index) {
  if (!confirm('Delete this entry?')) return;
  const entries = loadEntries();
  if (index < 0 || index >= entries.length) return;
  entries.splice(index, 1);
  saveEntries(entries);
  renderEntries();
}

function clearAll() {
  if (!confirm('Clear all entries?')) return;
  saveEntries([]);
  renderEntries();
}

// submit on Enter key
document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('.inp');
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        f();
      }
    });
  }
});

function f() {
  const x = document.querySelector('.inp');
  if (!x) return;
  const val = x.value.trim();
  if (!val) return;
  const entries = loadEntries();
  entries.push(val);
  saveEntries(entries);
  renderEntries();
  x.value = '';
}

document.addEventListener('DOMContentLoaded', renderEntries);
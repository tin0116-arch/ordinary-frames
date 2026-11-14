'use strict';
const categoryNames = {
  'light-and-moments': 'Light & Moments',
  'places-and-memories': 'Places & Memories'
};
const params = new URLSearchParams(location.search);
const slug = params.get('slug');
const intro = document.getElementById('collection-description');
const error = document.getElementById('collection-error');
const gallery = document.getElementById('collection-photos');
function prettyDate(value) { return value ? value.replaceAll('-', '.') : ''; }
function showError() {
  document.getElementById('collection-title').textContent = 'Story not found.';
  error.hidden = false;
}
if (!slug) {
  showError();
} else {
  fetch('data/collections.json')
    .then(response => { if (!response.ok) throw new Error('無法讀取資料'); return response.json(); })
    .then(data => {
      const item = (data.collections || []).find(record => record.slug === slug);
      if (!item) { showError(); return; }
      document.title = `${item.title} — Ordinary Frames`;
      document.getElementById('collection-category').textContent = categoryNames[item.category] || item.category;
      document.getElementById('collection-title').textContent = item.title;
      document.getElementById('collection-subtitle').textContent = item.subtitle;
      document.getElementById('collection-date').textContent = `${item.location || ''} · ${prettyDate(item.date)}`;
      intro.textContent = item.description;
      (item.photos || []).forEach((photo, i) => {
        const figure = document.createElement('figure'); figure.className = 'collection-figure';
        const img = document.createElement('img'); img.src = photo.src; img.alt = photo.alt;
        img.loading = i === 0 ? 'eager' : 'lazy'; img.decoding = 'async';
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = `${String(i + 1).padStart(2,'0')} / ${photo.caption || item.subtitle}`;
        figure.append(img, figcaption); gallery.appendChild(figure);
      });
    })
    .catch(err => { console.error(err); showError(); });
}

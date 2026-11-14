'use strict';
const categoryNames = {
  'light-and-moments': 'Light & Moments',
  'places-and-memories': 'Places & Memories'
};
const grid = document.getElementById('gallery-grid');
const storyList = document.getElementById('story-list');
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const empty = document.getElementById('gallery-empty');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
let allCollections = [];
let visibleCollections = [];
let activeImageIndex = 0;

function prettyDate(date) { return date ? date.replaceAll('-', '.') : ''; }
function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
function showGallery(category) {
  visibleCollections = allCollections.filter(item => category === 'all' || item.category === category);
  grid.replaceChildren();
  empty.hidden = visibleCollections.length > 0;
  visibleCollections.forEach((item, index) => {
    const card = element('article', 'photo-card');
    const imageButton = element('button', 'photo-image-button');
    imageButton.type = 'button';
    imageButton.setAttribute('aria-label', `放大作品：${item.title}`);
    const image = element('img');
    image.src = item.cover; image.alt = item.photos[0]?.alt || item.title;
    image.loading = index < 2 ? 'eager' : 'lazy'; image.decoding = 'async';
    imageButton.appendChild(image);
    imageButton.addEventListener('click', () => openLightbox(index));
    const meta = element('div', 'card-meta');
    meta.append(element('span', '', categoryNames[item.category] || item.category), element('span', '', prettyDate(item.date)));
    const title = element('a', 'card-title', item.title);
    title.href = `collection.html?slug=${encodeURIComponent(item.slug)}`;
    const subtitle = element('p', 'card-subtitle', `${item.subtitle} · ${item.location || ''}`);
    card.append(imageButton, meta, title, subtitle);
    grid.appendChild(card);
  });
}
function showStories() {
  storyList.replaceChildren();
  allCollections.forEach((item, index) => {
    const link = element('a', 'story-row');
    link.href = `collection.html?slug=${encodeURIComponent(item.slug)}`;
    const no = element('span', 'story-no', String(index + 1).padStart(2, '0'));
    const nameWrap = element('span', 'story-name');
    nameWrap.append(element('strong', '', item.title), element('small', '', item.subtitle));
    const date = element('span', 'story-date', prettyDate(item.date));
    const arrow = element('span', 'story-arrow', '↗'); arrow.setAttribute('aria-hidden', 'true');
    link.append(no, nameWrap, date, arrow);
    storyList.appendChild(link);
  });
}
function showLightboxPhoto() {
  const current = visibleCollections[activeImageIndex];
  if (!current) return;
  lightboxImage.src = current.cover;
  lightboxImage.alt = current.photos[0]?.alt || current.title;
  lightboxCaption.textContent = `${current.title} · ${current.subtitle} — ${prettyDate(current.date)}`;
}
function openLightbox(index) {
  activeImageIndex = index;
  showLightboxPhoto();
  if (!lightbox.open) lightbox.showModal();
}
function stepLightbox(change) {
  if (!visibleCollections.length) return;
  activeImageIndex = (activeImageIndex + change + visibleCollections.length) % visibleCollections.length;
  showLightboxPhoto();
}
document.getElementById('lightbox-close').addEventListener('click', () => lightbox.close());
document.getElementById('lightbox-prev').addEventListener('click', () => stepLightbox(-1));
document.getElementById('lightbox-next').addEventListener('click', () => stepLightbox(1));
lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
lightbox.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') stepLightbox(-1);
  if (event.key === 'ArrowRight') stepLightbox(1);
});
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(other => {
    other.classList.toggle('active', other === button);
    other.setAttribute('aria-pressed', String(other === button));
  });
  showGallery(button.dataset.filter);
}));
fetch('data/collections.json')
  .then(response => { if (!response.ok) throw new Error('讀取作品資料失敗'); return response.json(); })
  .then(data => {
    allCollections = data.collections || [];
    showGallery('all');
    showStories();
  })
  .catch(err => {
    console.error(err);
    grid.textContent = '暫時無法讀取作品。請確認網站透過 GitHub Pages 或本機伺服器開啟。';
    storyList.textContent = '作品故事尚未載入。';
  });

/* ─────────────────────────────────────────
   CINEMA APP - UI interactions
   Navigation + Modal + Search Filter + Watchlist + Theme
───────────────────────────────────────── */

const STORAGE_KEYS = {
  theme: 'cinevault-theme',
  watchlist: 'cinevault-watchlist'
};

const movies = {
  oppenheimer: {
    title: 'Oppenheimer',
    genre: 'Biografi • Drama • Sejarah',
    year: '2023',
    duration: '3j 0m',
    rating: '★ 8.9 / 10',
    poster: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=500&q=80',
    desc: 'Kisah J. Robert Oppenheimer, fisikawan teoritis yang memimpin Proyek Manhattan — program penelitian senjata Amerika Serikat selama Perang Dunia II yang menghasilkan bom atom pertama di dunia. Film karya Christopher Nolan ini memenangkan 7 Academy Awards termasuk Film Terbaik.',
    cast: ['Cillian Murphy', 'Matt Damon', 'Robert Downey Jr.', 'Emily Blunt']
  },
  dune2: {
    title: 'Dune: Part Two',
    genre: 'Sci-Fi • Epik • Petualangan',
    year: '2024',
    duration: '2j 46m',
    rating: '★ 8.7 / 10',
    poster: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=500&q=80',
    desc: 'Melanjutkan perjalanan epik Paul Atreides yang bergabung dengan suku Fremen untuk memimpin perlawanan terhadap Kekaisaran Galaktik. Paul harus memilih antara cintanya pada Chani dan takdir sebagai Mesiah yang diramalkan.',
    cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Josh Brolin']
  },
  godzilla: {
    title: 'Godzilla × Kong: The New Empire',
    genre: 'Aksi • Monster • Petualangan',
    year: '2024',
    duration: '1j 55m',
    rating: '★ 7.2 / 10',
    poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&q=80',
    desc: 'Dua titan legendaris, Godzilla dan Kong, berhadapan dengan ancaman baru yang belum pernah ada sebelumnya. Mereka harus bersatu melawan kekuatan jahat yang mengancam keberadaan dunia manusia dan Hollow Earth.',
    cast: ['Rebecca Hall', 'Kaylee Hottle', 'Brian Tyree Henry', 'Dan Stevens']
  },
  inside: {
    title: 'Inside Out 2',
    genre: 'Animasi • Keluarga • Komedi',
    year: '2024',
    duration: '1j 40m',
    rating: '★ 7.8 / 10',
    poster: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=500&q=80',
    desc: 'Riley kini menginjak masa remaja dan emosi-emosi baru mulai bermunculan di dalam benaknya. Selain lima emosi lama, hadir Anxiety (Kecemasan) dan emosi-emosi baru yang membuat semuanya menjadi kacau.',
    cast: ['Amy Poehler', 'Maya Hawke', 'Kensington Tallman', 'Liza Lapira']
  }
};

let watchlistCache = loadWatchlist();

function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function slugify(value) {
  return normalizeText(value).replace(/\s+/g, '-');
}

function loadWatchlist() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.watchlist) || '[]');
  } catch {
    return [];
  }
}

function saveWatchlist(items) {
  watchlistCache = items;
  localStorage.setItem(STORAGE_KEYS.watchlist, JSON.stringify(items));
}

function applyTheme(theme) {
  const nextTheme = theme === 'light' ? 'light' : 'dark';
  document.body.dataset.theme = nextTheme;
  localStorage.setItem(STORAGE_KEYS.theme, nextTheme);

  const toggle = document.querySelector('[data-theme-toggle]');
  if (toggle) {
    toggle.textContent = nextTheme === 'light' ? '☀' : '◐';
    toggle.setAttribute('aria-label', nextTheme === 'light' ? 'Aktifkan dark mode' : 'Aktifkan light mode');
  }
}

function toggleTheme() {
  const currentTheme = document.body.dataset.theme === 'light' ? 'light' : 'dark';
  applyTheme(currentTheme === 'light' ? 'dark' : 'light');
}

function getYearValue(yearText) {
  const match = String(yearText || '').match(/(\d{4})/);
  return match ? Number(match[1]) : null;
}

function yearMatchesFilter(cardYearText, selectedYear) {
  const yearValue = normalizeText(selectedYear);
  if (!yearValue || yearValue === 'tahun rilis') {
    return true;
  }

  const numericYear = getYearValue(cardYearText);
  if (yearValue === '2010-2020') {
    return numericYear !== null && numericYear >= 2010 && numericYear <= 2020;
  }
  if (yearValue === 'klasik') {
    return numericYear !== null && numericYear < 2010;
  }

  return normalizeText(cardYearText).includes(yearValue);
}

function getMovieDataFromCard(card) {
  const title = card.querySelector('.movie-title')?.textContent.trim() || 'Untitled';
  const genre = card.querySelector('.overlay-genre')?.textContent.trim() || '';
  const desc = card.querySelector('.overlay-desc')?.textContent.trim() || '';
  const year = card.querySelector('.movie-year')?.textContent.trim() || '';
  const rating = card.querySelector('.movie-rating')?.textContent.trim() || '';
  const poster = card.querySelector('.movie-poster')?.getAttribute('src') || '';
  const duration = card.dataset.duration || '';
  const id = card.dataset.movieId || slugify(title);

  return {
    id,
    title,
    genre,
    desc,
    year,
    rating,
    poster,
    duration
  };
}

function getStoredMovie(movieRef) {
  if (typeof movieRef === 'string') {
    return movies[movieRef] || watchlistCache.find(item => item.id === movieRef) || null;
  }
  return movieRef;
}

function renderModalMovie(movie) {
  document.getElementById('modal-title').textContent = movie.title || '';
  document.getElementById('modal-genre').textContent = movie.genre || '';
  document.getElementById('modal-year').textContent = movie.year ? `📅 ${movie.year}` : '';
  document.getElementById('modal-duration').textContent = movie.duration ? `⏱ ${movie.duration}` : '';
  document.getElementById('modal-rating').textContent = movie.rating || '';
  document.getElementById('modal-poster').src = movie.poster || '';
  document.getElementById('modal-desc').textContent = movie.desc || '';

  const castEl = document.getElementById('modal-cast');
  const cast = Array.isArray(movie.cast) ? movie.cast : [];
  castEl.innerHTML = cast.map(name => {
    const initial = name.trim().charAt(0).toUpperCase() || '•';
    return `<div class="cast-avatar"><div class="cast-circle">${initial}</div><div class="cast-name">${name}</div></div>`;
  }).join('');
}

// ── NAVIGATION ──────────────────────────
function navigateTo(pageId) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));

  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    target.style.animation = 'none';
    target.offsetHeight;
    target.style.animation = '';
  }

  document.querySelectorAll('nav ul a').forEach(link => {
    link.classList.remove('nav-active');
    if (link.dataset.page === pageId) {
      link.classList.add('nav-active');
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (pageId === 'watchlist') {
    renderWatchlistPage();
  }
  applyFilters();
}

function openModal(movieRef) {
  const movie = getStoredMovie(movieRef);
  if (!movie) return;

  renderModalMovie(movie);
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}

function extractWatchlistEntry(card) {
  const data = getMovieDataFromCard(card);
  return {
    ...data,
    id: data.id
  };
}

function isInWatchlist(movieId) {
  return watchlistCache.some(item => item.id === movieId);
}

function updateWatchlistButtons() {
  document.querySelectorAll('.watchlist-btn').forEach(button => {
    const card = button.closest('.movie-card');
    if (!card) return;

    const movieId = card.dataset.movieId || slugify(card.querySelector('.movie-title')?.textContent || '');
    const active = isInWatchlist(movieId);
    button.classList.toggle('is-active', active);
    button.textContent = active ? '♥' : '♡';
    button.setAttribute('aria-label', active ? 'Hapus dari watchlist' : 'Simpan ke watchlist');
  });
}

function toggleWatchlist(movieRef) {
  const movie = getStoredMovie(movieRef) || movieRef;
  if (!movie) return;

  const movieId = movie.id || slugify(movie.title);
  const existingIndex = watchlistCache.findIndex(item => item.id === movieId);

  if (existingIndex >= 0) {
    watchlistCache.splice(existingIndex, 1);
  } else {
    watchlistCache.unshift({
      id: movieId,
      title: movie.title || '',
      genre: movie.genre || '',
      desc: movie.desc || '',
      year: movie.year || '',
      rating: movie.rating || '',
      poster: movie.poster || '',
      duration: movie.duration || ''
    });
  }

  saveWatchlist(watchlistCache);
  updateWatchlistButtons();
  renderWatchlistPage();
}

function createWatchlistCard(movie) {
  return `
    <div class="movie-card saved-card" data-movie-id="${movie.id}">
      <img class="movie-poster" src="${movie.poster}" alt="${movie.title}">
      <button class="watchlist-btn is-active" type="button" aria-label="Hapus dari watchlist">♥</button>
      <div class="movie-overlay">
        <div class="overlay-genre">${movie.genre || 'Favorit'}</div>
        <div class="overlay-desc">${movie.desc || 'Film tersimpan di watchlist.'}</div>
        <button class="overlay-btn" type="button">Buka Detail</button>
      </div>
      <div class="movie-info">
        <div class="movie-title">${movie.title}</div>
        <div class="movie-meta">
          <span class="movie-year">${movie.year || '-'}</span>
          <span class="movie-rating">${movie.rating || ''}</span>
        </div>
      </div>
    </div>
  `;
}

function renderWatchlistPage() {
  const grid = document.getElementById('watchlist-grid');
  const empty = document.getElementById('watchlist-empty');
  if (!grid || !empty) return;

  if (!watchlistCache.length) {
    grid.innerHTML = '';
    empty.style.display = 'block';
    return;
  }

  empty.style.display = 'none';
  grid.innerHTML = watchlistCache.map(movie => createWatchlistCard(movie)).join('');

  grid.querySelectorAll('.movie-card').forEach((card, index) => {
    const movie = watchlistCache[index];
    if (!movie) return;

    card.dataset.movieId = movie.id;
    card.dataset.title = normalizeText(movie.title);
    card.dataset.genre = normalizeText(movie.genre);
    card.dataset.year = normalizeText(movie.year);
    card.dataset.search = normalizeText([movie.title, movie.genre, movie.desc, movie.year, movie.rating].join(' '));

    card.addEventListener('click', () => openModal(movie));
    const button = card.querySelector('.watchlist-btn');
    button?.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      toggleWatchlist(movie);
    });
  });

  applyFilters();
}

function setupMovieCards() {
  document.querySelectorAll('.movie-card').forEach(card => {
    const data = getMovieDataFromCard(card);
    card.dataset.movieId = data.id;
    card.dataset.title = normalizeText(data.title);
    card.dataset.genre = normalizeText(data.genre);
    card.dataset.year = normalizeText(data.year);
    card.dataset.search = normalizeText([data.title, data.genre, data.desc, data.year, data.rating].join(' '));

    if (!card.querySelector('.watchlist-btn')) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'watchlist-btn';
      button.textContent = '♡';
      button.setAttribute('aria-label', 'Simpan ke watchlist');
      button.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        toggleWatchlist(data);
      });
      card.appendChild(button);
    }

    updateWatchlistButtons();
  });
}

function syncGenrePillsWithSelect() {
  const genreSelect = document.querySelector('.search-bar .genre-select');
  if (!genreSelect) return;

  const selectedValue = normalizeText(genreSelect.value);
  document.querySelectorAll('.genre-pill').forEach(pill => {
    pill.classList.toggle('active', normalizeText(pill.textContent) === selectedValue || selectedValue === 'semua genre');
  });
}

function applyFilters() {
  const activePage = document.querySelector('.page.active');
  if (!activePage) return;

  const searchInput = document.querySelector('.search-input');
  const genreSelect = document.querySelectorAll('.genre-select')[0];
  const yearSelect = document.querySelectorAll('.genre-select')[1];

  const searchValue = normalizeText(searchInput?.value || '');
  const genreValue = normalizeText(genreSelect?.value || '');
  const yearValue = yearSelect?.value || '';

  const cards = activePage.querySelectorAll('.movie-card');
  let visibleCount = 0;

  cards.forEach(card => {
    const searchText = card.dataset.search || normalizeText(card.textContent);
    const cardGenre = card.dataset.genre || '';
    const cardYear = card.dataset.year || '';

    const matchesSearch = !searchValue || searchText.includes(searchValue);
    const matchesGenre = !genreValue || genreValue === 'semua genre' || cardGenre.includes(genreValue) || searchText.includes(genreValue);
    const matchesYear = yearMatchesFilter(cardYear, yearValue);

    const isVisible = matchesSearch && matchesGenre && matchesYear;
    card.classList.toggle('is-hidden', !isVisible);
    if (isVisible) visibleCount += 1;
  });

  const emptyState = activePage.querySelector('.empty-state');
  if (emptyState) {
    emptyState.style.display = visibleCount ? 'none' : 'block';
  }

  syncGenrePillsWithSelect();
}

function bindFilterControls() {
  const searchInput = document.querySelector('.search-input');
  const genreSelect = document.querySelectorAll('.genre-select')[0];
  const yearSelect = document.querySelectorAll('.genre-select')[1];
  const searchButton = document.querySelector('.search-btn');

  searchInput?.addEventListener('input', applyFilters);
  genreSelect?.addEventListener('change', applyFilters);
  yearSelect?.addEventListener('change', applyFilters);
  searchButton?.addEventListener('click', event => {
    event.preventDefault();
    applyFilters();
  });

  document.querySelectorAll('.genre-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const genreSelectEl = document.querySelectorAll('.genre-select')[0];
      if (genreSelectEl) {
        genreSelectEl.value = pill.textContent.trim();
      }
      document.querySelectorAll('.genre-pill').forEach(item => item.classList.remove('active'));
      pill.classList.add('active');
      applyFilters();
    });
  });
}

function bindThemeToggle() {
  const toggle = document.querySelector('[data-theme-toggle]');
  toggle?.addEventListener('click', toggleTheme);
}

function bindModalEscape() {
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.theme) || 'dark';
  applyTheme(savedTheme);

  const firstLink = document.querySelector('nav ul a[data-page="beranda"]');
  if (firstLink) firstLink.classList.add('nav-active');

  setupMovieCards();
  bindFilterControls();
  bindThemeToggle();
  bindModalEscape();
  renderWatchlistPage();
  applyFilters();
});

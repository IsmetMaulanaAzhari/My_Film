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
  },
  inception: {
    title: 'Inception',
    genre: 'Sci-Fi • Thriller • Aksi',
    year: '2010',
    duration: '2j 28m',
    rating: '★ 8.8 / 10',
    poster: 'https://images.unsplash.com/photo-1505685296765-3a2736de412f?w=500&q=80',
    desc: 'Seorang pencuri yang mencuri rahasia melalui infiltrasi ke alam mimpi ditawari kesempatan untuk menghapus catatan kejahatannya dengan menanamkan sebuah ide ke dalam pikiran target.',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page']
  },
  interstellar: {
    title: 'Interstellar',
    genre: 'Sci-Fi • Drama • Petualangan',
    year: '2014',
    duration: '2j 49m',
    rating: '★ 8.6 / 10',
    poster: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=500&q=80',
    desc: 'Sekelompok penjelajah ruang angkasa melakukan perjalanan melalui lubang cacing untuk mencari dunia baru yang dapat dihuni manusia ketika Bumi menghadapi kehancuran ekologis.',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain']
  },
  the_dark_knight: {
    title: 'The Dark Knight',
    genre: 'Aksi • Kriminal • Drama',
    year: '2008',
    duration: '2j 32m',
    rating: '★ 9.0 / 10',
    poster: 'https://images.unsplash.com/photo-1499084732479-de2c02d45fc4?w=500&q=80',
    desc: 'Batman menghadapi Joker, seorang penjahat anarkis yang menguji batas moral dan kemanusiaan Gotham.',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart']
  },
  parasit: {
    title: 'Parasite',
    genre: 'Thriller • Drama • Satir',
    year: '2019',
    duration: '2j 12m',
    rating: '★ 8.6 / 10',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&q=80',
    desc: 'Keluarga miskin secara perlahan menyusup ke kehidupan keluarga kaya, memicu serangkaian peristiwa yang berujung pada tragedi sosial dan moral.',
    cast: ['Song Kang-ho', 'Lee Sun-kyun', 'Cho Yeo-jeong']
  },
  shawshank: {
    title: 'The Shawshank Redemption',
    genre: 'Drama • Persahabatan',
    year: '1994',
    duration: '2j 22m',
    rating: '★ 9.3 / 10',
    poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&q=80',
    desc: 'Kisah seorang pria yang dipenjara karena kejahatan yang tidak dilakukannya dan harapannya untuk kebebasan serta persahabatan di dalam penjara.',
    cast: ['Tim Robbins', 'Morgan Freeman']
  },
  the_godfather: {
    title: 'The Godfather',
    genre: 'Kriminal • Drama',
    year: '1972',
    duration: '2j 55m',
    rating: '★ 9.2 / 10',
    poster: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=500&q=80',
    desc: 'Kisah keluarga mafia Corleone dan naik turunnya kekuasaan di dalam organisasi kriminal mereka.',
    cast: ['Marlon Brando', 'Al Pacino', 'James Caan']
  },
  spirited_away: {
    title: "Spirited Away",
    genre: 'Animasi • Fantasi • Petualangan',
    year: '2001',
    duration: '2j 5m',
    rating: '★ 8.6 / 10',
    poster: 'https://images.unsplash.com/photo-1526318472351-c75fcf070dd8?w=500&q=80',
    desc: 'Seorang gadis kecil tersesat di dunia roh dan harus bekerja di pemandian untuk menyelamatkan orang tuanya dan kembali ke dunia manusia.',
    cast: ['Rumi Hiiragi', 'Miyu Irino']
  },
  the_matrix: {
    title: 'The Matrix',
    genre: 'Sci-Fi • Aksi',
    year: '1999',
    duration: '2j 16m',
    rating: '★ 8.7 / 10',
    poster: 'https://images.unsplash.com/photo-1508830524289-0adcbe822b40?w=500&q=80',
    desc: 'Seorang hacker menemukan bahwa dunia yang ia tinggali adalah simulasi canggih dan bergabung dengan kelompok pemberontak untuk melawan mesin.',
    cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss']
  },
  train_to_busan: {
    title: 'Train to Busan',
    genre: 'Horror • Thriller • Aksi',
    year: '2016',
    duration: '1j 58m',
    rating: '★ 7.6 / 10',
    poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&q=80',
    desc: 'Penumpang kereta harus berjuang bertahan hidup ketika wabah zombie menyebar di Korea Selatan, menimbulkan keputusan moral dan pengorbanan.',
    cast: ['Gong Yoo', 'Ma Dong-seok', 'Jung Yu-mi']
  },
  the_raid: {
    title: 'The Raid',
    genre: 'Aksi • Kriminal',
    year: '2011',
    duration: '1j 41m',
    rating: '★ 7.6 / 10',
    poster: 'https://images.unsplash.com/photo-1505682634904-d7c7c0f6b8c1?w=500&q=80',
    desc: 'Pasukan polisi terjebak dalam sebuah gedung penuh penjahat dan harus bertarung dari lantai ke lantai untuk bertahan hidup.',
    cast: ['Iko Uwais', 'Joe Taslim']
  },
  pengabdi_setan: {
    title: 'Pengabdi Setan',
    genre: 'Horror • Thriller',
    year: '2017',
    duration: '1j 45m',
    rating: '★ 7.0 / 10',
    poster: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=500&q=80',
    desc: 'Keluarga yang kembali tinggal di rumah besar harus menghadapi kejadian gaib setelah sang ibu mengalami penyakit misterius.',
    cast: ['Tara Basro', 'Bront Palarae']
  },
  ada_apa_dengan_cinta: {
    title: 'Ada Apa Dengan Cinta?',
    genre: 'Romansa • Drama',
    year: '2002',
    duration: '1j 50m',
    rating: '★ 7.9 / 10',
    poster: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80',
    desc: 'Romansa remaja yang menjadi ikon sinema Indonesia, mengikuti kisah Cinta dan Rangga di masa sekolah menengah.',
    cast: ['Dian Sastrowardoyo', 'Nicholas Saputra']
  },
  laskar_pelangi: {
    title: 'Laskar Pelangi',
    genre: 'Drama • Inspirasi',
    year: '2008',
    duration: '2j 0m',
    rating: '★ 7.7 / 10',
    poster: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=500&q=80',
    desc: 'Kisah sekelompok anak di Belitung yang berjuang tetap bersekolah di tengah keterbatasan, penuh harapan dan persahabatan.',
    cast: ['Zulfanny', 'Ikal']
  },
  la_la_land: {
    title: 'La La Land',
    genre: 'Musikal • Romansa',
    year: '2016',
    duration: '2j 8m',
    rating: '★ 8.0 / 10',
    poster: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80',
    desc: 'Seorang pianis jazz dan seorang calon aktris berjuang mengejar impian mereka di Los Angeles, membaurkan realitas dan harapan.',
    cast: ['Ryan Gosling', 'Emma Stone']
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

function updateWatchlistBadge() {
  const el = document.getElementById('watchlist-badge');
  if (!el) return;
  const count = Array.isArray(watchlistCache) ? watchlistCache.length : 0;
  el.textContent = String(count);
  el.style.display = count ? 'inline-flex' : 'none';
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
  updateWatchlistBadge();
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
    // store numeric rating for sorting; try to extract number like 8.9
    const ratingMatch = String(data.rating || '').match(/(\d+(?:\.\d+)?)/);
    card.dataset.rating = ratingMatch ? ratingMatch[0] : '';
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

function parseCardRating(card) {
  const r = card.dataset.rating || '';
  const n = parseFloat(String(r).replace(',', '.'));
  return Number.isFinite(n) ? n : -Infinity;
}

function sortGrid(grid, sortBy) {
  if (!grid) return;
  const items = Array.from(grid.querySelectorAll('.movie-card'));
  let sorted = items.slice();

  if (sortBy === 'default' || !sortBy) {
    // leave as-is (document order)
    return;
  }

  sorted = sorted.sort((a, b) => {
    if (sortBy === 'rating-desc') return parseCardRating(b) - parseCardRating(a);
    if (sortBy === 'rating-asc') return parseCardRating(a) - parseCardRating(b);
    if (sortBy === 'year-desc') return (parseInt(b.dataset.year) || 0) - (parseInt(a.dataset.year) || 0);
    if (sortBy === 'year-asc') return (parseInt(a.dataset.year) || 0) - (parseInt(b.dataset.year) || 0);
    if (sortBy === 'title-asc') return (a.dataset.title || '').localeCompare(b.dataset.title || '');
    if (sortBy === 'title-desc') return (b.dataset.title || '').localeCompare(a.dataset.title || '');
    return 0;
  });

  // Append in order to reorder DOM (stable sort)
  sorted.forEach(node => grid.appendChild(node));
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

  // Apply sorting on main grids inside active page
  const sortSelect = document.querySelector('.sort-select');
  const sortBy = sortSelect?.value || 'default';
  const mainGrid = activePage.querySelector('.movie-grid');
  if (mainGrid) sortGrid(mainGrid, sortBy);
  const watchGrid = activePage.querySelector('#watchlist-grid');
  if (watchGrid) sortGrid(watchGrid, sortBy);
}

function bindFilterControls() {
  const searchInput = document.querySelector('.search-input');
  const genreSelect = document.querySelectorAll('.genre-select')[0];
  const yearSelect = document.querySelectorAll('.genre-select')[1];
  const searchButton = document.querySelector('.search-btn');
  const sortSelect = document.querySelector('.sort-select');

  searchInput?.addEventListener('input', applyFilters);
  genreSelect?.addEventListener('change', applyFilters);
  yearSelect?.addEventListener('change', applyFilters);
  sortSelect?.addEventListener('change', applyFilters);
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
  updateWatchlistBadge();
  applyFilters();
});

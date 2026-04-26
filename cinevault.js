/* ─────────────────────────────────────────
   CINERAMA — cinevault.js
   SPA Navigation + Modal + UI interactions
───────────────────────────────────────── */

// ── NAVIGATION ──────────────────────────
function navigateTo(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
  });

  // Show target page
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    // Re-trigger animation
    target.style.animation = 'none';
    target.offsetHeight; // reflow
    target.style.animation = '';
  }

  // Update active nav link
  document.querySelectorAll('nav ul a').forEach(a => {
    a.classList.remove('nav-active');
    if (a.dataset.page === pageId) a.classList.add('nav-active');
  });

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Set initial active nav link
document.addEventListener('DOMContentLoaded', () => {
  const firstLink = document.querySelector('nav ul a[data-page="beranda"]');
  if (firstLink) firstLink.classList.add('nav-active');

  // Genre pill interactivity
  document.querySelectorAll('.genre-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.genre-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });
});

// ── MOVIE DATA ──────────────────────────
const movies = {
  oppenheimer: {
    title: 'Oppenheimer',
    genre: 'Biografi • Drama • Sejarah',
    year: '📅 2023',
    duration: '⏱ 3j 0m',
    rating: '★ 8.9 / 10',
    poster: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=500&q=80',
    desc: 'Kisah J. Robert Oppenheimer, fisikawan teoritis yang memimpin Proyek Manhattan — program penelitian senjata Amerika Serikat selama Perang Dunia II yang menghasilkan bom atom pertama di dunia. Film karya Christopher Nolan ini memenangkan 7 Academy Awards termasuk Film Terbaik.',
    cast: ['🧑‍🔬 Cillian Murphy', '👨‍💼 Matt Damon', '👨 Robert Downey Jr.', '👩 Emily Blunt']
  },
  dune2: {
    title: 'Dune: Part Two',
    genre: 'Sci-Fi • Epik • Petualangan',
    year: '📅 2024',
    duration: '⏱ 2j 46m',
    rating: '★ 8.7 / 10',
    poster: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=500&q=80',
    desc: 'Melanjutkan perjalanan epik Paul Atreides yang bergabung dengan suku Fremen untuk memimpin perlawanan terhadap Kekaisaran Galaktik. Paul harus memilih antara cintanya pada Chani dan takdir sebagai Mesiah yang diramalkan.',
    cast: ['👨 Timothée Chalamet', '👩 Zendaya', '👩 Rebecca Ferguson', '👨 Josh Brolin']
  },
  godzilla: {
    title: 'Godzilla × Kong: The New Empire',
    genre: 'Aksi • Monster • Petualangan',
    year: '📅 2024',
    duration: '⏱ 1j 55m',
    rating: '★ 7.2 / 10',
    poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&q=80',
    desc: 'Dua titan legendaris, Godzilla dan Kong, berhadapan dengan ancaman baru yang belum pernah ada sebelumnya. Mereka harus bersatu melawan kekuatan jahat yang mengancam keberadaan dunia manusia dan Hollow Earth.',
    cast: ['👩 Rebecca Hall', '👦 Kaylee Hottle', '👨 Brian Tyree Henry', '👨 Dan Stevens']
  },
  inside: {
    title: 'Inside Out 2',
    genre: 'Animasi • Keluarga • Komedi',
    year: '📅 2024',
    duration: '⏱ 1j 40m',
    rating: '★ 7.8 / 10',
    poster: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=500&q=80',
    desc: 'Riley kini menginjak masa remaja dan emosi-emosi baru mulai bermunculan di dalam benaknya. Selain lima emosi lama, hadir Anxiety (Kecemasan) dan emosi-emosi baru yang membuat semuanya menjadi kacau.',
    cast: ['🎙 Amy Poehler', '🎙 Maya Hawke', '🎙 Kensington Tallman', '🎙 Liza Lapira']
  }
};

// ── MODAL ───────────────────────────────
function openModal(id) {
  const m = movies[id];
  if (!m) return;

  document.getElementById('modal-title').textContent = m.title;
  document.getElementById('modal-genre').textContent = m.genre;
  document.getElementById('modal-year').textContent = m.year;
  document.getElementById('modal-duration').textContent = m.duration;
  document.getElementById('modal-rating').textContent = m.rating;
  document.getElementById('modal-poster').src = m.poster;
  document.getElementById('modal-desc').textContent = m.desc;

  const castEl = document.getElementById('modal-cast');
  castEl.innerHTML = m.cast.map(c => {
    const [icon, ...name] = c.split(' ');
    return `<div class="cast-avatar">
      <div class="cast-circle">${icon}</div>
      <div class="cast-name">${name.join(' ')}</div>
    </div>`;
  }).join('');

  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}

// Close modal on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
async function loadPrograms() {
  const res = await fetch('/data/programas.json?_=' + Date.now());
  if (!res.ok) throw new Error('Erro a carregar programas.json');
  const json = await res.json();
  return json.items || [];
}

function formatDate(v) {
  if (!v) return '';
  const d = new Date(v);
  if (isNaN(d)) return String(v);
  return d.toLocaleDateString('pt-PT');
}

function makeCard(p) {
  const img = p.image_url || 'https://picsum.photos/600/400?blur=2';
  const dn = (p.days && p.nights) ? `${p.days} dias • ${p.nights} noites` : '';
  const range = (p.start_date || p.end_date)
    ? `${formatDate(p.start_date)} – ${formatDate(p.end_date)}`
    : '';
  const price = p.price_from ? `${p.price_from} ${p.currency || '€'}` : '';

  return `
  <div class="col-md-6 col-lg-4">
    <article class="card-trip">
      <img src="${img}" alt="${p.title || ''}" loading="lazy">
      <div class="p-3">
        <h5 class="mb-1">${p.title || ''}</h5>
        <div class="text-muted small mb-1">
          ${p.destination || ''}${p.country ? ', ' + p.country : ''}
        </div>
        <div class="text-muted small mb-2">
          ${[dn, range].filter(Boolean).join(' — ')}
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <a class="btn btn-outline-light btn-sm" href="${p.buy_url || '#'}" target="_blank" rel="noopener">
            Onde comprar
          </a>
          <strong>${price}</strong>
        </div>
      </div>
    </article>
  </div>`;
}

// para a página Programas
export async function initProgramasPage(selectorGrid) {
  const grid = document.querySelector(selectorGrid);
  grid.innerHTML = "<p class='text-muted'>A carregar programas…</p>";

  try {
    const programs = await loadPrograms();
    const published = programs.filter(p => p.publish);

    grid.innerHTML = published.length
      ? published.map(makeCard).join('')
      : "<p class='text-muted'>Sem programas disponíveis.</p>";
  } catch (e) {
    console.error(e);
    grid.innerHTML = "<p class='text-danger'>Erro ao carregar programas.</p>";
  }
}

// para a home (destaques)
export async function renderFeatured(selectorGrid, limit = 3) {
  const grid = document.querySelector(selectorGrid);
  grid.innerHTML = "<p class='text-muted'>A carregar…</p>";

  try {
    const programs = await loadPrograms();
    const published = programs.filter(p => p.publish).slice(0, limit);
    grid.innerHTML = published.length
      ? published.map(makeCard).join('')
      : "<p class='text-muted'>Sem programas em destaque.</p>";
  } catch (e) {
    console.error(e);
    grid.innerHTML = "<p class='text-danger'>Erro ao carregar destaques.</p>";
  }
}

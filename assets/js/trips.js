// Lê programas do JSON estático
async function loadPrograms() {
  const res = await fetch('/data/programas.json?_=' + Date.now());
  if (!res.ok) throw new Error('Erro a carregar programas.json');
  const json = await res.json();
  return (json.items || []).filter((p) => p.publish);
}

function formatDate(v) {
  if (!v) return '';
  const d = new Date(v);
  if (isNaN(d)) return String(v);
  return d.toLocaleDateString('pt-PT');
}

function makeCard(p) {
  const img = p.image_url || 'https://picsum.photos/600/400?blur=2';
  const dn = p.days && p.nights ? `${p.days} dias • ${p.nights} noites` : '';
  const range =
    p.start_date || p.end_date
      ? `${formatDate(p.start_date)} – ${formatDate(p.end_date)}`
      : '';
  const price = p.price_from ? `${p.price_from} ${p.currency || '€'}` : '';

  return `
    <div class="col-md-6 col-lg-4 trip-col">
      <article class="card-trip">
        <img src="${img}" alt="${p.title || ''}" loading="lazy" />
        <div class="card-trip-body">
          <div class="d-flex justify-content-between align-items-start">
            <h5 class="card-trip-title mb-1">${p.title || ''}</h5>
            ${
              p.theme
                ? `<span class="card-trip-tag ms-2">${p.theme}</span>`
                : ''
            }
          </div>
          <div class="card-trip-meta">
            ${p.destination || ''}${p.country ? ', ' + p.country : ''}
          </div>
          <div class="card-trip-meta">
            ${[dn, range].filter(Boolean).join(' — ')}
          </div>
          ${
            p.tags
              ? `<div class="card-trip-meta mt-1">Tags: ${p.tags}</div>`
              : ''
          }
          <div class="card-trip-footer">
            <a
              class="btn btn-outline-light btn-trip"
              href="${p.buy_url || '#'}"
              target="_blank"
              rel="noopener"
            >
              Onde comprar
            </a>
            <div class="card-trip-price">${price}</div>
          </div>
        </div>
      </article>
    </div>
  `;
}

// Filtros na página Programas
export async function initProgramasPage(selectors) {
  const grid = document.querySelector(selectors.grid);
  const statusEl = document.querySelector(selectors.status);
  const searchEl = document.querySelector(selectors.search);
  const destEl = document.querySelector(selectors.destination);
  const themeEl = document.querySelector(selectors.theme);
  const opEl = document.querySelector(selectors.operator);
  const clearBtn = document.querySelector(selectors.clear);

  let data = [];

  const setStatus = (msg, isError = false) => {
    if (!statusEl) return;
    statusEl.textContent = msg || '';
    statusEl.classList.toggle('text-danger', isError);
  };

  grid.innerHTML = "<p class='text-muted'>A carregar programas…</p>";

  try {
    data = await loadPrograms();
  } catch (e) {
    console.error(e);
    grid.innerHTML = "<p class='text-danger'>Não foi possível carregar os programas.</p>";
    setStatus('Erro ao carregar dados.', true);
    return;
  }

  // Preenche opções dos selects
  const uniq = (arr) =>
    [...new Set(arr.filter(Boolean).map((v) => String(v).trim()))].sort((a, b) =>
      a.localeCompare(b, 'pt-PT')
    );

  uniq(data.map((p) => p.destination)).forEach((d) =>
    destEl.insertAdjacentHTML('beforeend', `<option value="${d}">${d}</option>`)
  );
  uniq(data.map((p) => p.theme)).forEach((d) =>
    themeEl.insertAdjacentHTML('beforeend', `<option value="${d}">${d}</option>`)
  );
  uniq(data.map((p) => p.operator)).forEach((d) =>
    opEl.insertAdjacentHTML('beforeend', `<option value="${d}">${d}</option>`)
  );

  function applyFilters() {
    const q = (searchEl.value || '').toLowerCase();
    const dest = destEl.value;
    const theme = themeEl.value;
    const op = opEl.value;

    const results = data.filter((p) => {
      const haystack = (
        (p.title || '') +
        ' ' +
        (p.destination || '') +
        ' ' +
        (p.country || '') +
        ' ' +
        (p.theme || '') +
        ' ' +
        (p.operator || '') +
        ' ' +
        (p.tags || '')
      ).toLowerCase();

      const matchText = !q || haystack.includes(q);
      const matchDest = !dest || p.destination === dest;
      const matchTheme = !theme || p.theme === theme;
      const matchOp = !op || p.operator === op;

      return matchText && matchDest && matchTheme && matchOp;
    });

    if (!results.length) {
      grid.innerHTML = "<p class='text-muted'>Sem programas para os filtros escolhidos.</p>";
      setStatus('');
      return;
    }

    grid.innerHTML = results.map(makeCard).join('');
    setStatus(`${results.length} programa(s) encontrado(s).`);
  }

  // Listeners
  searchEl.addEventListener('input', () => {
    applyFilters();
  });
  destEl.addEventListener('change', applyFilters);
  themeEl.addEventListener('change', applyFilters);
  opEl.addEventListener('change', applyFilters);
  clearBtn.addEventListener('click', () => {
    searchEl.value = '';
    destEl.value = '';
    themeEl.value = '';
    opEl.value = '';
    applyFilters();
  });

  // Primeira renderização
  applyFilters();
}

// Destaques na home
export async function renderFeatured(selectorGrid, limit = 3) {
  const grid = document.querySelector(selectorGrid);
  if (!grid) return;

  grid.innerHTML = "<p class='text-muted'>A carregar destaques…</p>";

  try {
    const all = await loadPrograms();
    const featured = all.slice(0, limit);
    grid.innerHTML = featured.length
      ? featured.map(makeCard).join('')
      : "<p class='text-muted'>Sem programas em destaque.</p>";
  } catch (e) {
    console.error(e);
    grid.innerHTML = "<p class='text-danger'>Erro ao carregar destaques.</p>";
  }
}

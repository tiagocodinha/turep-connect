export const API_URL = 'https://script.google.com/macros/s/AKfycbwYMBhheH5mxOtO-cOneQflg6tdsxQ0vgBFbj-szJwFzTSkcLkIv5ohobd9NcGurwPV/exec';

let CACHE = [];

async function fetchTrips() {
  const res = await fetch(API_URL + '?_=' + Date.now());
  if (!res.ok) throw new Error('Erro no endpoint ' + res.status);
  const json = await res.json();
  CACHE = json.trips || [];
  return CACHE;
}

function formatDate(v) {
  if (!v) return '';
  const d = new Date(v);
  if (isNaN(d)) return String(v);
  return d.toLocaleDateString('pt-PT');
}

function makeCard(t) {
  const dn = (t.days && t.nights) ? `${t.days} dias • ${t.nights} noites` : '';
  const range = (t.start_date || t.end_date) ? `${formatDate(t.start_date)} – ${formatDate(t.end_date)}` : '';
  const price = t.price_from ? `<span class="price">${t.price_from} ${t.currency || ''}</span>` : '';
  const theme = t.theme ? `<span class="badge badge-theme rounded-pill ms-2">${t.theme}</span>` : '';
  const img = t.image_url || 'https://picsum.photos/600/400?blur=2';

  return `
  <div class="col-md-6 col-lg-4">
    <article class="card-trip">
      <img src="${img}" alt="${t.title || ''}" loading="lazy" onerror="this.src='https://picsum.photos/600/400?blur=2'">
      <div class="p-3">
        <h5 class="mb-1">${t.title || ''} ${theme}</h5>
        <div class="text-muted small mb-1">${t.destination || ''}${t.country ? ', ' + t.country : ''}</div>
        <div class="text-muted small mb-2">${[dn, range].filter(Boolean).join(' — ')}</div>
        <div class="d-flex justify-content-between align-items-center">
          <a class="btn btn-outline-light btn-sm" href="${t.buy_url || '#'}" target="_blank" rel="noopener">Onde comprar</a>
          ${price}
        </div>
      </div>
    </article>
  </div>`;
}

// Skeleton
function showSkeleton(grid, n = 6) {
  grid.innerHTML = Array.from({ length: n }).map(() => `
    <div class="col-md-6 col-lg-4">
      <article class="card-trip skeleton">
        <div class="sk-img skel"></div>
        <div class="p-3">
          <div class="skel mb-2" style="height:22px;width:80%"></div>
          <div class="skel mb-3" style="height:14px;width:60%"></div>
          <div class="d-flex justify-content-between align-items-center">
            <div class="skel" style="height:32px;width:120px"></div>
            <div class="skel" style="height:20px;width:80px"></div>
          </div>
        </div>
      </article>
    </div>
  `).join('');
}

function showStatus(sel, msg, isError = false) {
  const st = document.querySelector(sel);
  if (!st) return;
  st.textContent = msg || '';
  st.classList.toggle('text-danger', !!isError);
}

export async function initProgramasPage(sel) {
  const grid = document.querySelector(sel.grid);
  const q = document.querySelector(sel.q);
  const filterDest = document.querySelector(sel.destination);
  const filterTheme = document.querySelector(sel.theme);
  const filterOper = document.querySelector(sel.operator);
  const clearBtn = document.querySelector(sel.clearBtn);
  const statusSel = '#trip-status';

  showSkeleton(grid, 6);
  showStatus(statusSel, 'A carregar programas…');

  try {
    await fetchTrips();
  } catch (e) {
    console.error(e);
    grid.innerHTML = '';
    showStatus(statusSel, 'Não foi possível carregar os programas.', true);
    return;
  }

  const uniq = arr => [...new Set(arr.filter(Boolean).map(v => String(v).trim()))].sort((a,b)=>a.localeCompare(b));
  const destinations = uniq(CACHE.map(t => t.destination));
  const themes = uniq(CACHE.map(t => t.theme));
  const operators = uniq(CACHE.map(t => t.operator));

  destinations.forEach(d => filterDest.insertAdjacentHTML('beforeend', `<option>${d}</option>`));
  themes.forEach(d => filterTheme.insertAdjacentHTML('beforeend', `<option>${d}</option>`));
  operators.forEach(d => filterOper.insertAdjacentHTML('beforeend', `<option>${d}</option>`));

  function apply() {
    const text = (q.value || '').toLowerCase();
    const d = filterDest.value;
    const th = filterTheme.value;
    const op = filterOper.value;

    const results = CACHE.filter(t => {
      const hay = [t.title, t.destination, t.country, t.theme, t.operator, t.tags].join(' ').toLowerCase();
      const textOk = !text || hay.includes(text);
      const dOk = !d || t.destination === d;
      const thOk = !th || t.theme === th;
      const opOk = !op || t.operator === op;
      return textOk && dOk && thOk && opOk;
    });

    grid.innerHTML = results.map(makeCard).join('') || `<p class="text-muted">Sem resultados.</p>`;
  }

  showStatus(statusSel, '');
  q.addEventListener('input', apply);
  filterDest.addEventListener('change', apply);
  filterTheme.addEventListener('change', apply);
  filterOper.addEventListener('change', apply);
  clearBtn.addEventListener('click', ()=>{
    q.value='';
    filterDest.value='';
    filterTheme.value='';
    filterOper.value='';
    apply();
  });

  apply();
}

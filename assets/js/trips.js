// Google Apps Script endpoint
export const API_URL = 'https://script.google.com/macros/s/AKfycbwYMBhheH5mxOtO-cOneQflg6tdsxQ0vgBFbj-szJwFzTSkcLkIv5ohobd9NcGurwPV/exec';

let CACHE = [];

async function fetchTrips() {
  const res = await fetch(API_URL + '?_=' + Date.now());
  const json = await res.json();
  CACHE = json.trips || [];
  return CACHE;
}

function makeCard(t){
  const dn = (t.days && t.nights) ? `${t.days} dias • ${t.nights} noites` : '';
  const price = t.price_from ? `<span class="price">${t.price_from} ${t.currency||''}</span>` : '';
  const theme = t.theme ? `<span class="badge badge-theme rounded-pill ms-2">${t.theme}</span>` : '';
  return `
  <div class="col-md-6 col-lg-4">
    <article class="card-trip">
      <img src="${t.image_url||''}" alt="${t.title||''}" loading="lazy">
      <div class="p-3">
        <h5 class="mb-1">${t.title||''} ${theme}</h5>
        <div class="text-muted small mb-2">${t.destination||''}${t.country? ', ' + t.country : ''} — ${dn}</div>
        <div class="d-flex justify-content-between align-items-center">
          <a class="btn btn-outline-light btn-sm" href="${t.buy_url||'#'}" target="_blank" rel="noopener">Onde comprar</a>
          ${price}
        </div>
      </div>
    </article>
  </div>`;
}

// HOME
export async function renderFeatured(target, limit=6){
  const el = document.querySelector(target);
  await fetchTrips();
  el.innerHTML = CACHE.slice(0, limit).map(makeCard).join('') || `<p class="text-muted">Sem programas publicados.</p>`;
}

// PROGRAMAS
export async function initProgramasPage(sel){
  const grid = document.querySelector(sel.grid);
  const q = document.querySelector(sel.q);
  const filterDest = document.querySelector(sel.destination);
  const filterTheme = document.querySelector(sel.theme);
  const filterOper = document.querySelector(sel.operator);
  const clearBtn = document.querySelector(sel.clearBtn);

  await fetchTrips();

  const uniq = (arr) => [...new Set(arr.filter(Boolean).map(v=>String(v).trim()))].sort((a,b)=>a.localeCompare(b));
  const destinations = uniq(CACHE.map(t => t.destination));
  const themes = uniq(CACHE.map(t => t.theme));
  const operators = uniq(CACHE.map(t => t.operator));
  destinations.forEach(d => filterDest.insertAdjacentHTML('beforeend', `<option>${d}</option>`));
  themes.forEach(d => filterTheme.insertAdjacentHTML('beforeend', `<option>${d}</option>`));
  operators.forEach(d => filterOper.insertAdjacentHTML('beforeend', `<option>${d}</option>`));

  function apply(){
    const text = (q.value||'').toLowerCase();
    const d = filterDest.value; const th = filterTheme.value; const op = filterOper.value;

    const results = CACHE.filter(t => {
      const hay = [t.title, t.destination, t.country, t.theme, t.operator, t.tags].join(' ').toLowerCase();
      const textOk = !text || hay.includes(text);
      const dOk = !d || t.destination === d;
      const thOk = !th || t.theme === th;
      const opOk = !op || t.operator === op;
      return textOk && dOk && thOk && opOk;
    });

    grid.innerHTML = results.map(makeCard).join('') || `<p class="text-muted">Sem resultados para os filtros aplicados.</p>`;
  }

  q.addEventListener('input', apply);
  filterDest.addEventListener('change', apply);
  filterTheme.addEventListener('change', apply);
  filterOper.addEventListener('change', apply);
  clearBtn.addEventListener('click', ()=>{
    q.value=''; filterDest.value=''; filterTheme.value=''; filterOper.value=''; apply();
  });

  apply();
}

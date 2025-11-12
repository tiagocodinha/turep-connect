export async function fetchPrograms() {
  const files = await fetch("/data/programas/index.json?_=" + Date.now()).then(r => r.json());
  return files;
}

export function makeCard(t) {
  const img = t.image_url || "https://picsum.photos/600/400?blur=2";
  const dn = t.days && t.nights ? `${t.days} dias · ${t.nights} noites` : "";
  return `
  <div class="col-md-6 col-lg-4">
    <article class="card-trip">
      <img src="${img}" alt="${t.title}">
      <div class="p-3">
        <h5>${t.title}</h5>
        <div class="text-muted small mb-2">
          ${t.destination}${t.country ? ", " + t.country : ""}
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <a href="${t.buy_url}" target="_blank" class="btn btn-light btn-sm">Onde comprar</a>
          <strong>${t.price_from || ""} ${t.currency || "€"}</strong>
        </div>
      </div>
    </article>
  </div>`;
}

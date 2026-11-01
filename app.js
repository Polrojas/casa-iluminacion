/*
 * CASA — configuración de Atajos
 *
 * Las escenas globales usan sus nombres exactos. Para los ambientes se usa la
 * convención "Ambiente - Acción". Si tus atajos tienen otra grafía, modifica
 * solamente `shortcutName` más abajo; los espacios, acentos y signos se
 * codifican con encodeURIComponent antes de abrir Atajos.
 */
const ROOM_ACTIONS = ["Apagar", "Súper tenue", "Tenue", "Brillante", "Súper brillante"];

const SCENES = [
  { name: "Apagar todo", tone: "off", icon: "power" },
  { name: "Súper tenue", tone: "dim", icon: "moon" },
  { name: "Tenue", tone: "soft", icon: "sparkle" },
  { name: "Brillante", tone: "bright", icon: "sun" },
  { name: "Súper brillante", tone: "vivid", icon: "sun-max" },
  { name: "Llegue a casa", tone: "welcome", icon: "home" },
  { name: "Cena", tone: "dinner", icon: "utensils" },
];

const ROOMS = [
  { name: "Living", icon: "sofa", actions: ROOM_ACTIONS },
  { name: "Comedor", icon: "table", actions: ROOM_ACTIONS },
  { name: "Dormitorio", icon: "bed", actions: ROOM_ACTIONS },
  { name: "Cocina", icon: "kitchen", actions: ROOM_ACTIONS },
  { name: "Vestidor", icon: "wardrobe", actions: [...ROOM_ACTIONS, "Trabajar"] },
  { name: "Pasillo", icon: "hall", actions: ROOM_ACTIONS },
  { name: "Balcón", icon: "balcony", actions: ROOM_ACTIONS },
];

const app = document.querySelector("#app");

function shortcutName(room, action) {
  return `${room} - ${action}`;
}

function shortcutsUrl(name) {
  return `shortcuts://run-shortcut?name=${encodeURIComponent(name)}`;
}

function icon(name) {
  const paths = {
    arrow: '<path d="m9 18 6-6-6-6"/>',
    back: '<path d="m15 18-6-6 6-6"/>',
    power: '<path d="M12 2v10"/><path d="M6.2 5.3a8 8 0 1 0 11.6 0"/>',
    moon: '<path d="M20.6 15.8A8.7 8.7 0 0 1 8.2 3.4 8.7 8.7 0 1 0 20.6 15.8Z"/>',
    sparkle: '<path d="m12 3-1.5 5.5L5 10l5.5 1.5L12 17l1.5-5.5L19 10l-5.5-1.5L12 3Z"/><path d="m19 16-.7 2.3L16 19l2.3.7L19 22l.7-2.3L22 19l-2.3-.7L19 16Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    "sun-max": '<circle cx="12" cy="12" r="4"/><path d="M12 1v3M12 20v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1 12h3M20 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
    home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z"/>',
    utensils: '<path d="M4 3v7a3 3 0 0 0 6 0V3M7 3v18M15 3v18M15 3c3 1 5 4 5 8h-5"/>',
    sofa: '<path d="M4 13V9a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v4"/><path d="M3 13h18v6H3zM5 19v2M19 19v2M7 13V9M17 13V9"/>',
    table: '<path d="M4 7h16M6 7l2 14M18 7l-2 14M12 7v14"/>',
    bed: '<path d="M3 19V5M3 13h18v6M6 13V9a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v4M3 16h18M20 19v2M5 19v2"/>',
    kitchen: '<path d="M4 3h16v18H4zM4 8h16M8 3v5M16 3v5M8 13h3M8 17h3M16 13v5"/>',
    wardrobe: '<path d="M4 3h16v18H4zM12 3v18M9 12h.01M15 12h.01"/>',
    hall: '<path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17M3 21h18M14 12h.01"/>',
    balcony: '<path d="M4 3h16v18M4 8h16M7 8v13M12 8v13M17 8v13M3 21h18"/>',
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths[name] || paths.sparkle}</svg>`;
}

function actionButton(label, room) {
  const name = room ? shortcutName(room, label) : label;
  return `<button class="action-button" type="button" data-shortcut="${escapeAttribute(name)}">
    <span>${escapeHtml(label)}</span><span class="button-arrow">${icon("arrow")}</span>
  </button>`;
}

function sceneButton(scene) {
  return `<button class="scene scene--${scene.tone}" type="button" data-shortcut="${escapeAttribute(scene.name)}">
    <span class="scene-icon">${icon(scene.icon)}</span>
    <span>${escapeHtml(scene.name)}</span>
  </button>`;
}

function roomCard(room) {
  return `<a class="room-card" href="#/ambiente/${encodeURIComponent(room.name)}" aria-label="Abrir ${escapeAttribute(room.name)}">
    <span class="room-icon">${icon(room.icon)}</span>
    <span class="room-name">${escapeHtml(room.name)}</span>
    <span class="room-arrow">${icon("arrow")}</span>
  </a>`;
}

function homeView() {
  return `
    <header class="hero">
      <p class="eyebrow">CASA</p>
      <h1>Iluminación</h1>
      <p class="date" id="today"></p>
    </header>
    <section aria-labelledby="scenes-title">
      <div class="section-heading"><p class="eyebrow">ESCENAS</p><h2 id="scenes-title">Toda la casa</h2></div>
      <div class="scene-grid">${SCENES.map(sceneButton).join("")}</div>
    </section>
    <section class="rooms-section" aria-labelledby="rooms-title">
      <div class="section-heading"><p class="eyebrow">AMBIENTES</p><h2 id="rooms-title">Elegí un ambiente</h2></div>
      <nav class="room-list" aria-label="Ambientes">${ROOMS.map(roomCard).join("")}</nav>
    </section>
  `;
}

function roomView(room) {
  return `
    <header class="room-header">
      <a class="back-link" href="#/" aria-label="Volver a iluminación">${icon("back")}<span>Casa</span></a>
      <span class="room-hero-icon">${icon(room.icon)}</span>
      <p class="eyebrow">AMBIENTE</p>
      <h1>${escapeHtml(room.name)}</h1>
      <p class="room-subtitle">Seleccioná una intensidad</p>
    </header>
    <section class="action-panel" aria-label="Acciones para ${escapeAttribute(room.name)}">
      ${room.actions.map(action => actionButton(action, room.name)).join("")}
    </section>
  `;
}

function missingRoomView() {
  return `<header class="room-header"><a class="back-link" href="#/">${icon("back")}<span>Casa</span></a><h1>Ambiente no encontrado</h1><p class="room-subtitle">Volvé a Casa para elegir un ambiente.</p></header>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
}
function escapeAttribute(value) { return escapeHtml(value); }

function render() {
  const match = location.hash.match(/^#\/ambiente\/(.+)$/);
  const roomName = match ? decodeURIComponent(match[1]) : null;
  const room = roomName && ROOMS.find(item => item.name === roomName);
  app.innerHTML = room ? roomView(room) : roomName ? missingRoomView() : homeView();
  const today = document.querySelector("#today");
  if (today) today.textContent = new Intl.DateTimeFormat("es-AR", { weekday: "long", day: "numeric", month: "long" }).format(new Date());
}

app.addEventListener("click", event => {
  const button = event.target.closest("[data-shortcut]");
  if (!button) return;
  const name = button.dataset.shortcut;
  // Navegación iniciada por el toque: iPadOS puede mostrar su confirmación para abrir Atajos.
  window.location.href = shortcutsUrl(name);
});

window.addEventListener("hashchange", render);
render();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}

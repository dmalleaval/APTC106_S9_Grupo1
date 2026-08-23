(function () {
  "use strict";

  var SCREEN_LABELS = {
    "bienvenida": "Bienvenida",
    "login": "Login",
    "recuperar-correo": "Recuperar contraseña — correo",
    "recuperar-codigo": "Recuperar contraseña — código",
    "recuperar-nueva-contrasena": "Recuperar contraseña — nueva",
    "contrasena-actualizada": "Contraseña actualizada",
    "pedidos-disponibles": "Home — pedidos disponibles",
    "pedidos-fuera-de-linea": "Home — fuera de línea",
    "home-snackbar-activo": "Home — snackbar activo",
    "home-skeleton-loading": "Home — cargando (skeleton)",
    "detalle-del-pedido": "Detalle del pedido",
    "navegacion-gps": "Navegación GPS",
    "actualizar-estado": "Actualizar estado",
    "confirmar-entrega": "Confirmar entrega",
    "entrega-completada": "Entrega completada",
    "perfil-e-historial": "Perfil",
    "historial-de-pedidos": "Historial de pedidos",
    "pedidos-en-curso": "Pedidos en curso",
    "mapa-de-pedidos": "Mapa de pedidos"
  };

  var START_SCREEN = "bienvenida";

  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function goToScreen(name, opts) {
    var target = qs('.screen[data-screen="' + name + '"]');
    if (!target) return;
    qsa(".screen.is-active").forEach(function (el) { el.classList.remove("is-active"); });
    target.classList.add("is-active");
    target.scrollTop = 0;
    var scroller = qs(".screen__scroll", target);
    if (scroller) scroller.scrollTop = 0;

    var picker = qs("#screen-picker");
    if (picker && !(opts && opts.skipPicker)) picker.value = name;

    if (history.replaceState) {
      history.replaceState(null, "", "#" + name);
    }
  }

  function buildScreenPicker() {
    var picker = qs("#screen-picker");
    if (!picker) return;
    var order = qsa(".screen").map(function (el) { return el.getAttribute("data-screen"); });
    order.forEach(function (name) {
      var opt = document.createElement("option");
      opt.value = name;
      opt.textContent = SCREEN_LABELS[name] || name;
      picker.appendChild(opt);
    });
    picker.addEventListener("change", function () {
      goToScreen(picker.value, { skipPicker: true });
    });
  }

  function wireNavigation() {
    document.addEventListener("click", function (e) {
      var el = e.target.closest("[data-goto]");
      if (!el) return;
      e.preventDefault();
      goToScreen(el.getAttribute("data-goto"));
    });
  }

  function wirePasswordToggles() {
    qsa(".field").forEach(function (field) {
      var btn = qs(".icon-btn", field);
      var input = qs("input[type=password], input[type=text].pw-revealed", field);
      if (!btn || !input) return;
      btn.addEventListener("click", function () {
        input.type = input.type === "password" ? "text" : "password";
      });
    });
  }

  function wireHistorialTabs() {
    qsa(".js-tab-chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        qsa(".js-tab-chip").forEach(function (c) {
          c.classList.remove("is-active");
          c.style.background = "transparent";
          c.style.color = "var(--dark)";
          c.style.border = "1px solid var(--input-border)";
        });
        chip.classList.add("is-active");
        chip.style.background = "var(--dark)";
        chip.style.color = "#fff";
        chip.style.border = "none";
      });
    });
  }

  function init() {
    buildScreenPicker();
    wireNavigation();
    wirePasswordToggles();
    wireHistorialTabs();

    var fromHash = window.location.hash ? window.location.hash.slice(1) : "";
    var initial = (fromHash && qs('.screen[data-screen="' + fromHash + '"]')) ? fromHash : START_SCREEN;
    goToScreen(initial);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

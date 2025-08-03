import { DOM, loadDomElements } from './js/modules/dom.js';
import { openModal, closeModal } from './js/modules/modal.js';
import { initTheme } from './js/modules/theme.js';
import { initGreeting } from './js/modules/greeting.js';
import { initClock } from './js/modules/clock.js';
import { initSearch } from './js/modules/search.js';
import { initQuicklinks } from './js/modules/quicklinks.js';
import { initBackground } from './js/modules/background.js';

document.addEventListener("DOMContentLoaded", () => {
  loadDomElements(); // Cargar los elementos del DOM una vez que el HTML esté listo

  // --- Event Listeners for Modals ---
  DOM.settingsIcon.addEventListener("click", () =>
    openModal(DOM.settingsOverlay, DOM.settingsMenu)
  );
  DOM.closeSettingsIcon.addEventListener("click", () =>
    closeModal(DOM.settingsOverlay, DOM.settingsMenu)
  );
  DOM.settingsOverlay.addEventListener("click", () => {
    closeModal(DOM.settingsOverlay, DOM.settingsMenu);
    DOM.timezoneOptions.classList.add("hidden");
    DOM.timezoneDropdown.classList.remove("open");
    DOM.searchEngineOptions.classList.add("hidden");
    DOM.searchEngineSelector.classList.remove("open");
  });

  DOM.closeAddLinkIcon.addEventListener("click", () =>
    closeModal(DOM.addLinkOverlay, DOM.addLinkModal)
  );
  DOM.addLinkOverlay.addEventListener("click", () =>
    closeModal(DOM.addLinkOverlay, DOM.addLinkModal)
  );

  // --- Initialization on Page Load ---
  const init = () => {
    initTheme();
    initSearch();
    initBackground();
    initGreeting();
    initClock();
    initQuicklinks();
  };

  init();
});
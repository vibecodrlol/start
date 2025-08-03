
import { DOM } from './dom.js';

const performSearch = () => {
  const query = DOM.searchInput.value;
  if (!query.trim()) return;

  const engine = localStorage.getItem("searchEngine") || "google";
  let searchUrl;

  switch (engine) {
    case "bing":
      searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(
        query
      )}`;
      break;
    case "duckduckgo":
      searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(
        query
      )}`;
      break;
    default:
      searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
        query
      )}`;
      break;
  }

  window.location.href = searchUrl;
};

const updateSearchEngineIcon = (engine) => {
  DOM.currentEngineIcon.src = `https://icons.duckduckgo.com/ip3/${engine}.com.ico`;
};

export const initSearch = () => {
  const savedEngine = localStorage.getItem("searchEngine") || "google";
  updateSearchEngineIcon(savedEngine);

  if (localStorage.getItem("searchbarEnabled") === null)
    localStorage.setItem("searchbarEnabled", "true");
  const searchbarEnabled =
    localStorage.getItem("searchbarEnabled") === "true";
  DOM.searchbarToggle.checked = searchbarEnabled;
  DOM.searchBar.classList.toggle("hidden", !searchbarEnabled);

  DOM.searchEngineButton.addEventListener("click", (e) => {
    e.stopPropagation();
    DOM.searchEngineOptions.classList.toggle("hidden");
    DOM.searchEngineSelector.classList.toggle("open");
  });

  // Event delegation for engine options
  DOM.searchEngineOptions.addEventListener("click", (e) => {
    const option = e.target.closest(".engine-option");
    if (option) {
      const engine = option.dataset.engine;
      localStorage.setItem("searchEngine", engine);
      updateSearchEngineIcon(engine);
      DOM.searchEngineOptions.classList.add("hidden");
      DOM.searchEngineSelector.classList.remove("open");
    }
  });

  DOM.searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") performSearch();
  });
  DOM.searchIcon.addEventListener("click", performSearch);

  DOM.searchbarToggle.addEventListener("change", () => {
    localStorage.setItem("searchbarEnabled", DOM.searchbarToggle.checked);
    DOM.searchBar.classList.toggle("hidden", !DOM.searchbarToggle.checked);
  });
};

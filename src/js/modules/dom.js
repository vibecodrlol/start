export const DOM = {};

export const loadDomElements = () => {
  console.log("Loading DOM elements...");

  DOM.body = document.body;
  DOM.backgroundOverlay = document.getElementById("background-overlay");
  DOM.greetingContainer = document.getElementById("greeting-container");
  DOM.greetingText = document.getElementById("greeting-text");
  DOM.greetingName = document.getElementById("greeting-name");
  DOM.clockContainer = document.getElementById("clock-container");
  DOM.clockTime = document.getElementById("clock-time");
  DOM.clockDate = document.getElementById("clock-date");

  DOM.quicklinksWrapper = document.getElementById("quicklinks-wrapper");
  DOM.quicklinksContainer = document.getElementById(
    "quicklinks-container"
  );

  DOM.searchBar = document.getElementById("search-bar");
  DOM.searchInput = document.getElementById("search-input");
  DOM.searchIcon = document.getElementById("search-icon");
  DOM.searchEngineSelector = document.querySelector(
    ".search-engine-selector"
  );
  DOM.searchEngineButton = document.getElementById(
    "search-engine-button"
  );
  DOM.currentEngineIcon = document.getElementById(
    "current-engine-icon"
  );
  DOM.searchEngineOptions = document.getElementById(
    "search-engine-options"
  );

  DOM.settingsIcon = document.getElementById("settings-icon");
  DOM.exitEditModeIcon = document.getElementById("exit-edit-mode-icon");
  DOM.settingsOverlay = document.getElementById("settings-overlay");
  DOM.settingsMenu = document.getElementById("settings-menu");
  DOM.closeSettingsIcon = document.getElementById(
    "close-settings-icon"
  );

  DOM.addLinkOverlay = document.getElementById("add-link-overlay");
  DOM.addLinkModal = document.getElementById("add-link-modal");
  DOM.closeAddLinkIcon = document.getElementById("close-add-link-icon");
  DOM.addLinkForm = document.getElementById("add-link-form");
  DOM.linkModalTitle = document.getElementById("link-modal-title");
  DOM.linkEditIndex = document.getElementById("link-edit-index");
  DOM.linkUrlInput = document.getElementById("link-url");
  DOM.linkSubmitBtn = document.getElementById("link-submit-btn");
  DOM.faviconToggle = document.getElementById("favicon-toggle");
  DOM.faviconDetails = document.getElementById("favicon-details");
  DOM.linkFaviconBtn = document.getElementById("link-favicon-btn");

  DOM.bgFileInput = document.getElementById("bg-file-input");
  DOM.faviconFileInput = document.getElementById("favicon-file-input");

  // Toggles and inputs
  DOM.themeButtons = document.querySelectorAll(
    ".segmented-btn[data-theme]"
  );
  DOM.greetingToggle = document.getElementById("greeting-toggle");
  DOM.greetingDetails = document.getElementById("greeting-details");
  DOM.greetingNameInput = document.getElementById(
    "greeting-name-input"
  );

  DOM.clockToggle = document.getElementById("clock-toggle");
  DOM.clockDetails = document.getElementById("clock-details");
  DOM.clockFormatToggle = document.getElementById(
    "clock-format-toggle"
  );

  DOM.timezoneDropdown = document.getElementById("timezone-dropdown");
  DOM.timezoneSelected = document
    .getElementById("timezone-selected")
    .querySelector("span");
  DOM.timezoneOptions = document.getElementById("timezone-options");
  DOM.timezoneSearch = document.getElementById("timezone-search");
  DOM.timezoneList = document.getElementById("timezone-list");

  DOM.searchbarToggle = document.getElementById("searchbar-toggle");
  DOM.quicklinksToggle = document.getElementById("quicklinks-toggle");
  DOM.quicklinksDetails = document.getElementById("quicklinks-details");
  DOM.quicklinksPositionButtons = document.querySelectorAll(
    "#quicklinks-details .segmented-btn"
  );
  DOM.editLinksBtn = document.getElementById("edit-links-btn");

  DOM.backgroundModeButtons = document.querySelectorAll(
    ".segmented-btn[data-bg-mode]"
  );
  DOM.solidColorWrapper = document.getElementById(
    "solid-color-wrapper"
  );
  DOM.solidColorPicker = document.getElementById("solid-color-picker");
  DOM.colorPreview = document.getElementById("color-preview");
  DOM.customBgButton = document.getElementById("custom-bg-button");
  DOM.opacityControlContainer = document.getElementById(
    "opacity-control-container"
  );
  DOM.backgroundOpacitySlider = document.getElementById(
    "background-opacity-slider"
  );

  for (const key in DOM) {
    if (DOM[key] === null || DOM[key] === undefined) {
      console.error(`DOM element ${key} is null or undefined.`);
    } else if (DOM[key] instanceof NodeList) {
      if (DOM[key].length === 0) {
        console.warn(`DOM element ${key} is an empty NodeList.`);
      }
    } else {
      console.log(`DOM element ${key} loaded successfully.`);
    }
  }
};

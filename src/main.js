document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Elements ---
  const body = document.body;
  const backgroundOverlay = document.getElementById("background-overlay");
  const greetingContainer = document.getElementById("greeting-container");
  const greetingText = document.getElementById("greeting-text");
  const greetingName = document.getElementById("greeting-name");
  const clockContainer = document.getElementById("clock-container");
  const clockTime = document.getElementById("clock-time");
  const clockDate = document.getElementById("clock-date");

  const quicklinksWrapper = document.getElementById("quicklinks-wrapper");
  const quicklinksContainer = document.getElementById("quicklinks-container");

  const searchBar = document.getElementById("search-bar");
  const searchInput = document.getElementById("search-input");
  const searchIcon = document.getElementById("search-icon");
  const searchEngineSelector = document.querySelector(
    ".search-engine-selector"
  );
  const searchEngineButton = document.getElementById("search-engine-button");
  const currentEngineIcon = document.getElementById("current-engine-icon");
  const searchEngineOptions = document.getElementById("search-engine-options");

  const settingsIcon = document.getElementById("settings-icon");
  const exitEditModeIcon = document.getElementById("exit-edit-mode-icon");
  const settingsOverlay = document.getElementById("settings-overlay");
  const settingsMenu = document.getElementById("settings-menu");
  const closeSettingsIcon = document.getElementById("close-settings-icon");

  const addLinkOverlay = document.getElementById("add-link-overlay");
  const addLinkModal = document.getElementById("add-link-modal");
  const closeAddLinkIcon = document.getElementById("close-add-link-icon");
  const addLinkForm = document.getElementById("add-link-form");
  const linkModalTitle = document.getElementById("link-modal-title");
  const linkEditIndex = document.getElementById("link-edit-index");
  const linkUrlInput = document.getElementById("link-url");
  const linkSubmitBtn = document.getElementById("link-submit-btn");
  const faviconToggle = document.getElementById("favicon-toggle");
  const faviconDetails = document.getElementById("favicon-details");
  const linkFaviconBtn = document.getElementById("link-favicon-btn");

  const bgFileInput = document.getElementById("bg-file-input");
  const faviconFileInput = document.getElementById("favicon-file-input");

  // Toggles and inputs
  const themeButtons = document.querySelectorAll(".segmented-btn[data-theme]");
  const greetingToggle = document.getElementById("greeting-toggle");
  const greetingDetails = document.getElementById("greeting-details");
  const greetingNameInput = document.getElementById("greeting-name-input");

  const clockToggle = document.getElementById("clock-toggle");
  const clockDetails = document.getElementById("clock-details");
  const clockFormatToggle = document.getElementById("clock-format-toggle");

  const timezoneDropdown = document.getElementById("timezone-dropdown");
  const timezoneSelected = document
    .getElementById("timezone-selected")
    .querySelector("span");
  const timezoneOptions = document.getElementById("timezone-options");
  const timezoneSearch = document.getElementById("timezone-search");
  const timezoneList = document.getElementById("timezone-list");

  const searchbarToggle = document.getElementById("searchbar-toggle");
  const quicklinksToggle = document.getElementById("quicklinks-toggle");
  const quicklinksDetails = document.getElementById("quicklinks-details");
  const quicklinksPositionButtons = document.querySelectorAll(
    "#quicklinks-details .segmented-btn"
  );
  const editLinksBtn = document.getElementById("edit-links-btn");

  const backgroundModeButtons = document.querySelectorAll(
    ".segmented-btn[data-bg-mode]"
  );
  const solidColorWrapper = document.getElementById("solid-color-wrapper");
  const solidColorPicker = document.getElementById("solid-color-picker");
  const colorPreview = document.getElementById("color-preview");
  const customBgButton = document.getElementById("custom-bg-button");
  const opacityControlContainer = document.getElementById(
    "opacity-control-container"
  );
  const backgroundOpacitySlider = document.getElementById(
    "background-opacity-slider"
  );

  let clockInterval;
  let customFaviconData = null;
  let ALL_TIMEZONES = [];
  let sortable;

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  // --- Functions ---
  const openModal = (overlay, menu) => {
    if (menu.id === "settings-menu") {
      const iconRect = settingsIcon.getBoundingClientRect();
      menu.style.right = `${window.innerWidth - iconRect.right}px`;
      menu.style.bottom = `${window.innerHeight - iconRect.top + 32}px`;
    }
    overlay.classList.add("visible");
    menu.classList.add("visible");
  };

  const closeModal = (overlay, menu) => {
    overlay.classList.remove("visible");
    menu.classList.remove("visible");
  };

  const renderQuickLinks = (editMode = false) => {
    const links = JSON.parse(localStorage.getItem("quicklinks")) || [];
    quicklinksContainer.innerHTML = "";

    links.forEach((link, index) => {
      const linkEl = document.createElement("a");
      linkEl.href = editMode ? "#" : link.url;
      linkEl.className = "quicklink-item";
      if (!editMode) {
        linkEl.rel = "noopener noreferrer";
      }
      linkEl.dataset.id = index;

      const faviconEl = document.createElement("img");
      faviconEl.src = link.favicon;
      faviconEl.onerror = () => {
        faviconEl.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' fill='%23${
          body.classList.contains("light-theme") ? "171717" : "fafafa"
        }'%3E%3Cpath d='M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-96H131.2c-25.6 4.5-49.1 16.7-68.6 36.2-14.2 14.2-24.4 31.3-30.8 49.8C25.2 264.4 24 286.8 24 310c0 22.8 1.2 45.2 3.5 66.8 6.3 18.5 16.5 35.6 30.8 49.8 19.5 19.5 43 31.7 68.6 36.2H380.8c25.6-4.5 49.1-16.7 68.6-36.2 14.2-14.2 24.4-31.3 30.8-49.8 2.3-21.6 3.5-44 3.5-66.8s-1.2-45.2-3.5-66.8c-6.3-18.5-16.5-35.6-30.8-49.8-19.5-19.5-43-31.7-68.6-36.2zM256 512c141.4 0 256-114.6 256-256S397.4 0 256 0 0 114.6 0 256s114.6 256 256 256z'/%3E%3C/svg%3E`;
      };

      linkEl.appendChild(faviconEl);

      if (editMode) {
        const actions = document.createElement("div");
        actions.className = "link-actions";

        const editBtn = document.createElement("button");
        editBtn.className = "link-action-btn";
        editBtn.innerHTML = '<i class="fa-solid fa-pencil"></i>';
        editBtn.onclick = (e) => {
          e.preventDefault();
          openEditModal(index);
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "link-action-btn";
        deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        deleteBtn.onclick = (e) => {
          e.preventDefault();
          links.splice(index, 1);
          localStorage.setItem("quicklinks", JSON.stringify(links));
          renderQuickLinks(true);
        };

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        linkEl.appendChild(actions);
      }

      quicklinksContainer.appendChild(linkEl);
    });

    if (quicklinksToggle.checked && editMode && links.length < 10) {
      const addBtn = document.createElement("button");
      addBtn.id = "add-link-btn";
      addBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
      addBtn.onclick = () => openEditModal();
      quicklinksContainer.appendChild(addBtn);
    }
  };

  const updateGreeting = () => {
    if (!greetingToggle.checked) return;
    const now = new Date();
    const hour = now.getHours();
    const name = localStorage.getItem("greetingName") || "Anon";
    let timeOfDay;

    if (hour < 12) timeOfDay = "Good morning";
    else if (hour < 18) timeOfDay = "Good afternoon";
    else timeOfDay = "Good evening";

    greetingText.textContent = `${timeOfDay},`;
    greetingName.textContent = `${name}.`;
  };

  const updateClock = () => {
    if (!clockToggle.checked) return;
    const now = new Date();
    const timeZone = localStorage.getItem("clockTimezone");
    const hour12 = !(localStorage.getItem("clockFormat24h") === "true");

    const timeOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: hour12,
      timeZone: timeZone,
    };
    const dateOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: timeZone,
    };

    clockTime.textContent = new Intl.DateTimeFormat(
      "en-US",
      timeOptions
    ).format(now);
    clockDate.textContent = new Intl.DateTimeFormat(
      "en-US",
      dateOptions
    ).format(now);
  };

  const populateTimezoneList = (filter = "") => {
    timezoneList.innerHTML = "";
    const filteredTimezones = ALL_TIMEZONES.filter((tz) =>
      tz.toLowerCase().includes(filter.toLowerCase())
    );

    filteredTimezones.forEach((tz) => {
      const option = document.createElement("div");
      option.className = "dropdown-option";
      option.textContent = tz;
      option.dataset.value = tz;
      option.onclick = () => {
        timezoneSelected.textContent = tz;
        localStorage.setItem("clockTimezone", tz);
        updateClock();
        timezoneOptions.classList.add("hidden");
        timezoneDropdown.classList.remove("open");
      };
      timezoneList.appendChild(option);
    });
  };

  const performSearch = () => {
    const query = searchInput.value;
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
        searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
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
    currentEngineIcon.src = `https://icons.duckduckgo.com/ip3/${engine}.com.ico`;
  };

  const applyTheme = (theme) => {
    if (theme === "system") {
      body.classList.toggle("light-theme", !mediaQuery.matches);
    } else {
      body.classList.toggle("light-theme", theme === "light");
    }

    themeButtons.forEach((btn) =>
      btn.classList.toggle("active", btn.dataset.theme === theme)
    );

    if (localStorage.getItem("bgMode") === "solid") {
      const newDefaultColor = body.classList.contains("light-theme")
        ? "#fafafa"
        : "#0a0a0a";
      body.style.backgroundColor = newDefaultColor;
      solidColorPicker.value = newDefaultColor;
      colorPreview.style.backgroundColor = newDefaultColor;
      localStorage.setItem("solidBgColor", newDefaultColor);
    }
  };

  const applyQuicklinksPosition = (position) => {
    quicklinksWrapper.classList.remove("position-bottom");
    if (position === "bottom") {
      quicklinksWrapper.classList.add("position-bottom");
    }
    quicklinksPositionButtons.forEach((btn) =>
      btn.classList.toggle("active", btn.dataset.position === position)
    );
  };

  const applyBackground = (mode) => {
    solidColorWrapper.classList.add("hidden");
    customBgButton.classList.add("hidden");
    opacityControlContainer.classList.add("hidden");

    backgroundModeButtons.forEach((btn) =>
      btn.classList.toggle("active", btn.dataset.bgMode === mode)
    );

    if (mode === "solid") {
      solidColorWrapper.classList.remove("hidden");
      const color =
        localStorage.getItem("solidBgColor") ||
        (body.classList.contains("light-theme") ? "#fafafa" : "#0a0a0a");
      body.style.backgroundColor = color;
      colorPreview.style.backgroundColor = color;
      solidColorPicker.value = color;
      backgroundOverlay.style.backgroundImage = "none";
    } else {
      body.style.backgroundColor = "transparent";
      opacityControlContainer.classList.remove("hidden");
      if (mode === "random") {
        if (localStorage.getItem("randomBgUrl")) {
          backgroundOverlay.style.backgroundImage = `url('${localStorage.getItem(
            "randomBgUrl"
          )}')`;
        } else {
          const randomUrl = `https://picsum.photos/1920/1080?random=${new Date().getTime()}`;
          localStorage.setItem("randomBgUrl", randomUrl);
          backgroundOverlay.style.backgroundImage = `url('${randomUrl}')`;
        }
      } else if (mode === "custom") {
        customBgButton.classList.remove("hidden");
        const savedBg = localStorage.getItem("customBgUrl");
        if (savedBg) {
          backgroundOverlay.style.backgroundImage = `url('${savedBg}')`;
        } else {
          backgroundOverlay.style.backgroundImage = "none";
        }
      }
    }

    localStorage.setItem("bgMode", mode);
  };

  const openEditModal = (index = null) => {
    addLinkForm.reset();
    linkEditIndex.value = index;
    customFaviconData = null;
    faviconToggle.checked = false;
    faviconDetails.classList.add("hidden");
    linkFaviconBtn.innerHTML =
      '<i class="fa-solid fa-upload"></i> Upload Image';

    if (index !== null) {
      const links = JSON.parse(localStorage.getItem("quicklinks")) || [];
      const link = links[index];
      linkModalTitle.textContent = "Edit Quick Link";
      linkUrlInput.value = link.url;
      linkSubmitBtn.textContent = "Save Changes";
    } else {
      linkModalTitle.textContent = "Add Quick Link";
      linkSubmitBtn.textContent = "Add Link";
    }

    openModal(addLinkOverlay, addLinkModal);
  };

  // --- Event Listeners ---
  settingsIcon.addEventListener("click", () =>
    openModal(settingsOverlay, settingsMenu)
  );
  closeSettingsIcon.addEventListener("click", () =>
    closeModal(settingsOverlay, settingsMenu)
  );
  settingsOverlay.addEventListener("click", () => {
    closeModal(settingsOverlay, settingsMenu);
    timezoneOptions.classList.add("hidden");
    timezoneDropdown.classList.remove("open");
    searchEngineOptions.classList.add("hidden");
    searchEngineSelector.classList.remove("open");
  });

  closeAddLinkIcon.addEventListener("click", () =>
    closeModal(addLinkOverlay, addLinkModal)
  );
  addLinkOverlay.addEventListener("click", () =>
    closeModal(addLinkOverlay, addLinkModal)
  );

  searchEngineButton.addEventListener("click", (e) => {
    e.stopPropagation();
    searchEngineOptions.classList.toggle("hidden");
    searchEngineSelector.classList.toggle("open");
  });

  document.querySelectorAll(".engine-option").forEach((option) => {
    option.addEventListener("click", () => {
      const engine = option.dataset.engine;
      localStorage.setItem("searchEngine", engine);
      updateSearchEngineIcon(engine);
      searchEngineOptions.classList.add("hidden");
      searchEngineSelector.classList.remove("open");
    });
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") performSearch();
  });
  searchIcon.addEventListener("click", performSearch);

  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const theme = button.dataset.theme;
      localStorage.setItem("theme", theme);
      applyTheme(theme);
    });
  });

  mediaQuery.addEventListener("change", () => {
    if (localStorage.getItem("theme") === "system") applyTheme("system");
  });

  greetingToggle.addEventListener("change", () => {
    localStorage.setItem("greetingEnabled", greetingToggle.checked);
    greetingContainer.classList.toggle("hidden", !greetingToggle.checked);
    greetingDetails.classList.toggle("hidden", !greetingToggle.checked);
    if (greetingToggle.checked) updateGreeting();
  });

  greetingNameInput.addEventListener("input", () => {
    localStorage.setItem("greetingName", greetingNameInput.value);
    updateGreeting();
  });

  clockToggle.addEventListener("change", () => {
    localStorage.setItem("clockEnabled", clockToggle.checked);
    clockContainer.classList.toggle("hidden", !clockToggle.checked);
    clockDetails.classList.toggle("hidden", !clockToggle.checked);
    if (clockToggle.checked) {
      updateClock();
      clockInterval = setInterval(updateClock, 1000);
    } else {
      clearInterval(clockInterval);
    }
  });

  clockFormatToggle.addEventListener("change", () => {
    localStorage.setItem("clockFormat24h", clockFormatToggle.checked);
    updateClock();
  });

  document
    .getElementById("timezone-selected")
    .addEventListener("click", (e) => {
      e.stopPropagation();
      timezoneOptions.classList.toggle("hidden");
      timezoneDropdown.classList.toggle("open");
      timezoneSearch.value = "";
      populateTimezoneList();
      timezoneSearch.focus();
    });

  timezoneSearch.addEventListener("input", () => {
    populateTimezoneList(timezoneSearch.value);
  });

  searchbarToggle.addEventListener("change", () => {
    localStorage.setItem("searchbarEnabled", searchbarToggle.checked);
    searchBar.classList.toggle("hidden", !searchbarToggle.checked);
  });

  quicklinksToggle.addEventListener("change", () => {
    localStorage.setItem("quicklinksEnabled", quicklinksToggle.checked);
    quicklinksWrapper.classList.toggle("hidden", !quicklinksToggle.checked);
    quicklinksDetails.classList.toggle("hidden", !quicklinksToggle.checked);
    if (quicklinksToggle.checked) {
      renderQuickLinks();
    }
  });

  quicklinksPositionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const position = button.dataset.position;
      localStorage.setItem("quicklinksPosition", position);
      applyQuicklinksPosition(position);
    });
  });

  editLinksBtn.addEventListener("click", () => {
    body.classList.add("edit-mode");
    settingsIcon.classList.add("hidden");
    exitEditModeIcon.classList.remove("hidden");
    sortable.option("disabled", false);
    renderQuickLinks(true);
    closeModal(settingsOverlay, settingsMenu);
  });

  exitEditModeIcon.addEventListener("click", () => {
    body.classList.remove("edit-mode");
    settingsIcon.classList.remove("hidden");
    exitEditModeIcon.classList.add("hidden");
    sortable.option("disabled", true);
    renderQuickLinks(false);
  });

  backgroundModeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyBackground(button.dataset.bgMode);
    });
  });

  solidColorWrapper.addEventListener("click", () => {
    solidColorPicker.click();
  });

  solidColorPicker.addEventListener("input", (e) => {
    const color = e.target.value;
    localStorage.setItem("solidBgColor", color);
    colorPreview.style.backgroundColor = color;
    if (localStorage.getItem("bgMode") === "solid") {
      body.style.backgroundColor = color;
    }
  });

  customBgButton.addEventListener("click", () => bgFileInput.click());

  bgFileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        localStorage.setItem("customBgUrl", imageUrl);
        if (localStorage.getItem("bgMode") === "custom") {
          backgroundOverlay.style.backgroundImage = `url('${imageUrl}')`;
        }
      };
      reader.readAsDataURL(file);
    }
  });

  backgroundOpacitySlider.addEventListener("input", (e) => {
    const opacity = e.target.value;
    backgroundOverlay.style.opacity = opacity;
    localStorage.setItem("backgroundOpacity", opacity);
  });

  faviconToggle.addEventListener("change", () => {
    faviconDetails.classList.toggle("hidden", !faviconToggle.checked);
  });

  linkFaviconBtn.addEventListener("click", () => faviconFileInput.click());

  faviconFileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        customFaviconData = e.target.result;
        linkFaviconBtn.innerHTML =
          '<i class="fa-solid fa-check"></i> Image Selected!';
      };
      reader.readAsDataURL(file);
    }
  });

  addLinkForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const links = JSON.parse(localStorage.getItem("quicklinks")) || [];
    const editIdx = linkEditIndex.value;

    if (editIdx === "" && links.length >= 10) return;

    let url = linkUrlInput.value;
    if (!url) return;

    if (!/^https?:\/\//i.test(url)) url = "https://" + url;

    let hostname;
    try {
      hostname = new URL(url).hostname.replace("www.", "");
    } catch {
      hostname = url;
    }

    const favicon =
      faviconToggle.checked && customFaviconData
        ? customFaviconData
        : `https://icons.duckduckgo.com/ip3/${hostname}.ico`;

    const newLink = { url, favicon };

    if (editIdx !== "") {
      links[editIdx] = newLink;
    } else {
      links.push(newLink);
    }

    localStorage.setItem("quicklinks", JSON.stringify(links));

    renderQuickLinks(true);
    closeModal(addLinkOverlay, addLinkModal);
  });

  // --- Initialization on Page Load ---
  const init = () => {
    // Theme Init
    const savedTheme = localStorage.getItem("theme") || "system";
    applyTheme(savedTheme);

    // Search Engine Init
    const savedEngine = localStorage.getItem("searchEngine") || "google";
    updateSearchEngineIcon(savedEngine);

    // Background Init
    const savedOpacity = localStorage.getItem("backgroundOpacity") || 1;
    backgroundOverlay.style.opacity = savedOpacity;
    backgroundOpacitySlider.value = savedOpacity;

    const savedBgColor =
      localStorage.getItem("solidBgColor") ||
      (body.classList.contains("light-theme") ? "#fafafa" : "#0a0a0a");
    solidColorPicker.value = savedBgColor;
    colorPreview.style.backgroundColor = savedBgColor;

    const savedMode = localStorage.getItem("bgMode") || "solid";
    applyBackground(savedMode);

    // Greeting Init
    if (localStorage.getItem("greetingEnabled") === "true") {
      greetingToggle.checked = true;
      greetingContainer.classList.remove("hidden");
      greetingDetails.classList.remove("hidden");
      greetingNameInput.value = localStorage.getItem("greetingName") || "";
      updateGreeting();
    }
    setInterval(updateGreeting, 60000);

    // Clock Init
    ALL_TIMEZONES = Intl.supportedValuesOf("timeZone");
    const savedTimezone =
      localStorage.getItem("clockTimezone") ||
      Intl.DateTimeFormat().resolvedOptions().timeZone;
    timezoneSelected.textContent = savedTimezone;
    localStorage.setItem("clockTimezone", savedTimezone);

    if (localStorage.getItem("clockFormat24h") === null)
      localStorage.setItem("clockFormat24h", "true");
    clockFormatToggle.checked =
      localStorage.getItem("clockFormat24h") === "true";

    if (localStorage.getItem("clockEnabled") === "true") {
      clockToggle.checked = true;
      clockContainer.classList.remove("hidden");
      clockDetails.classList.remove("hidden");
      updateClock();
      clockInterval = setInterval(updateClock, 1000);
    }

    // Search Bar Init
    if (localStorage.getItem("searchbarEnabled") === null)
      localStorage.setItem("searchbarEnabled", "true");
    const searchbarEnabled =
      localStorage.getItem("searchbarEnabled") === "true";
    searchbarToggle.checked = searchbarEnabled;
    searchBar.classList.toggle("hidden", !searchbarEnabled);

    // Quicklinks Init
    const quicklinksEnabled =
      localStorage.getItem("quicklinksEnabled") === "true";
    quicklinksToggle.checked = quicklinksEnabled;
    quicklinksWrapper.classList.toggle("hidden", !quicklinksEnabled);
    quicklinksDetails.classList.toggle("hidden", !quicklinksEnabled);

    const savedPosition =
      localStorage.getItem("quicklinksPosition") || "center";
    applyQuicklinksPosition(savedPosition);

    if (quicklinksEnabled) renderQuickLinks();

    // Init Sortable
    sortable = new Sortable(quicklinksContainer, {
      animation: 150,
      ghostClass: "sortable-ghost",
      filter: "#add-link-btn",
      preventOnFilter: true,
      disabled: true, // Disabled by default
      onEnd: (evt) => {
        const links = JSON.parse(localStorage.getItem("quicklinks")) || [];
        const [reorderedItem] = links.splice(evt.oldIndex, 1);
        links.splice(evt.newIndex, 0, reorderedItem);
        localStorage.setItem("quicklinks", JSON.stringify(links));
      },
    });
  };

  init();
});

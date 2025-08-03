
import { DOM } from './dom.js';
import { openModal, closeModal } from './modal.js';

let customFaviconData = null;
let sortable;

export const renderQuickLinks = (editMode = false) => {
  const links = JSON.parse(localStorage.getItem("quicklinks")) || [];
  DOM.quicklinksContainer.innerHTML = "";

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
        DOM.body.classList.contains("light-theme") ? "171717" : "fafafa"
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

    DOM.quicklinksContainer.appendChild(linkEl);
  });

  if (DOM.quicklinksToggle.checked && editMode && links.length < 10) {
    const addBtn = document.createElement("button");
    addBtn.id = "add-link-btn";
    addBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
    addBtn.onclick = () => openEditModal();
    DOM.quicklinksContainer.appendChild(addBtn);
  }
};

const applyQuicklinksPosition = (position) => {
  DOM.quicklinksWrapper.classList.remove("position-bottom");
  if (position === "bottom") {
    DOM.quicklinksWrapper.classList.add("position-bottom");
  }
  DOM.quicklinksPositionButtons.forEach((btn) =>
    btn.classList.toggle("active", btn.dataset.position === position)
  );
};

const openEditModal = (index = null) => {
  DOM.addLinkForm.reset();
  DOM.linkEditIndex.value = index;
  customFaviconData = null;
  DOM.faviconToggle.checked = false;
  DOM.faviconDetails.classList.add("hidden");
  DOM.linkFaviconBtn.innerHTML =
    '<i class="fa-solid fa-upload"></i> Upload Image';

  if (index !== null) {
    const links = JSON.parse(localStorage.getItem("quicklinks")) || [];
    const link = links[index];
    DOM.linkModalTitle.textContent = "Edit Quick Link";
    DOM.linkUrlInput.value = link.url;
    DOM.linkSubmitBtn.textContent = "Save Changes";
  } else {
    DOM.linkModalTitle.textContent = "Add Quick Link";
    DOM.linkSubmitBtn.textContent = "Add Link";
  }

  openModal(DOM.addLinkOverlay, DOM.addLinkModal);
};

export const initQuicklinks = () => {
  const quicklinksEnabled =
    localStorage.getItem("quicklinksEnabled") === "true";
  DOM.quicklinksToggle.checked = quicklinksEnabled;
  DOM.quicklinksWrapper.classList.toggle("hidden", !quicklinksEnabled);
  DOM.quicklinksDetails.classList.toggle("hidden", !quicklinksEnabled);

  const savedPosition =
    localStorage.getItem("quicklinksPosition") || "center";
  applyQuicklinksPosition(savedPosition);

  if (quicklinksEnabled) renderQuickLinks();

  DOM.quicklinksToggle.addEventListener("change", () => {
    localStorage.setItem("quicklinksEnabled", DOM.quicklinksToggle.checked);
    DOM.quicklinksWrapper.classList.toggle(
      "hidden",
      !DOM.quicklinksToggle.checked
    );
    DOM.quicklinksDetails.classList.toggle(
      "hidden",
      !DOM.quicklinksToggle.checked
    );
    if (DOM.quicklinksToggle.checked) {
      renderQuickLinks();
    }
  });

  DOM.quicklinksPositionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const position = button.dataset.position;
      localStorage.setItem("quicklinksPosition", position);
      applyQuicklinksPosition(position);
    });
  });

  DOM.editLinksBtn.addEventListener("click", () => {
    DOM.body.classList.add("edit-mode");
    DOM.settingsIcon.classList.add("hidden");
    DOM.exitEditModeIcon.classList.remove("hidden");
    sortable.option("disabled", false);
    renderQuickLinks(true);
    closeModal(DOM.settingsOverlay, DOM.settingsMenu);
  });

  DOM.exitEditModeIcon.addEventListener("click", () => {
    DOM.body.classList.remove("edit-mode");
    DOM.settingsIcon.classList.remove("hidden");
    DOM.exitEditModeIcon.classList.add("hidden");
    sortable.option("disabled", true);
    renderQuickLinks(false);
  });

  DOM.faviconToggle.addEventListener("change", () => {
    DOM.faviconDetails.classList.toggle("hidden", !DOM.faviconToggle.checked);
  });

  DOM.linkFaviconBtn.addEventListener("click", () =>
    DOM.faviconFileInput.click()
  );

  DOM.faviconFileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        customFaviconData = e.target.result;
        DOM.linkFaviconBtn.innerHTML =
          '<i class="fa-solid fa-check"></i> Image Selected!';
      };
      reader.readAsDataURL(file);
    }
  });

  DOM.addLinkForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const links = JSON.parse(localStorage.getItem("quicklinks")) || [];
    const editIdx = DOM.linkEditIndex.value;

    if (editIdx === "" && links.length >= 10) return;

    let url = DOM.linkUrlInput.value;
    if (!url) return;

    if (!/^https?:\/\//i.test(url)) url = "https://" + url;

    let hostname;
    try {
      hostname = new URL(url).hostname.replace("www.", "");
    } catch {
      hostname = url;
    }

    const favicon =
      DOM.faviconToggle.checked && customFaviconData
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
    closeModal(DOM.addLinkOverlay, DOM.addLinkModal);
  });

  // Init Sortable
  sortable = new window.Sortable(DOM.quicklinksContainer, {
    animation: 150,
    ghostClass: "sortable-ghost",
    filter: "#add-link-btn",
    preventOnFilter: true,
    disabled: true, // Disabled by default
    onEnd: (evt) => {
      const links =
        JSON.parse(localStorage.getItem("quicklinks")) || [];
      const [reorderedItem] = links.splice(evt.oldIndex, 1);
      links.splice(evt.newIndex, 0, reorderedItem);
      localStorage.setItem("quicklinks", JSON.stringify(links));
    },
  });
};

import { DOM } from './dom.js';

export const openModal = (overlay, menu) => {
  if (menu.id === "settings-menu") {
    const iconRect = DOM.settingsIcon.getBoundingClientRect();
    menu.style.right = `${window.innerWidth - iconRect.right}px`;
    menu.style.bottom = `${window.innerHeight - iconRect.top + 32}px`;
  }
  overlay.classList.add("visible");
  menu.classList.remove("hidden"); // Ensure hidden class is removed
  menu.classList.add("visible");
};

export const closeModal = (overlay, menu) => {
  overlay.classList.remove("visible");
  menu.classList.remove("visible");
  menu.classList.add("hidden"); // Add hidden class when closing
};
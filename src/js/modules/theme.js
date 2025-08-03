import { DOM } from './dom.js';

const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

export const applyTheme = (theme) => {
  if (theme === "system") {
    DOM.body.classList.toggle("light-theme", !mediaQuery.matches);
  } else {
    DOM.body.classList.toggle("light-theme", theme === "light");
  }

  DOM.themeButtons.forEach((btn) =>
    btn.classList.toggle("active", btn.dataset.theme === theme)
  );

  if (localStorage.getItem("bgMode") === "solid") {
    const newDefaultColor = DOM.body.classList.contains("light-theme")
      ? "#fafafa"
      : "#0a0a0a";
    DOM.body.style.backgroundColor = newDefaultColor;
    // solidColorPicker.value = newDefaultColor; // This will be handled in background.js
    // colorPreview.style.backgroundColor = newDefaultColor; // This will be handled in background.js
    localStorage.setItem("solidBgColor", newDefaultColor);
  }
};

export const initTheme = () => {
  const savedTheme = localStorage.getItem("theme") || "system";
  applyTheme(savedTheme);

  DOM.themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const theme = button.dataset.theme;
      localStorage.setItem("theme", theme);
      applyTheme(theme);
    });
  });

  mediaQuery.addEventListener("change", () => {
    if (localStorage.getItem("theme") === "system") applyTheme("system");
  });
};
import { DOM } from './dom.js';

export const applyBackground = (mode) => {
  DOM.solidColorWrapper.classList.add("hidden");
  DOM.customBgButton.classList.add("hidden");
  DOM.opacityControlContainer.classList.add("hidden");

  DOM.backgroundModeButtons.forEach((btn) =>
    btn.classList.toggle("active", btn.dataset.bgMode === mode)
  );

  if (mode === "solid") {
    DOM.solidColorWrapper.classList.remove("hidden");
    const color =
      localStorage.getItem("solidBgColor") ||
      (DOM.body.classList.contains("light-theme") ? "#fafafa" : "#0a0a0a");
    DOM.body.style.backgroundColor = color;
    DOM.colorPreview.style.backgroundColor = color;
    DOM.solidColorPicker.value = color;
    DOM.backgroundOverlay.style.backgroundImage = "none";
  } else {
    DOM.body.style.backgroundColor = "transparent";
    DOM.opacityControlContainer.classList.remove("hidden");
    if (mode === "random") {
      if (localStorage.getItem("randomBgUrl")) {
        DOM.backgroundOverlay.style.backgroundImage = `url('${localStorage.getItem(
          "randomBgUrl"
        )}')`;
      } else {
        const randomUrl = `https://picsum.photos/1920/1080?random=${new Date().getTime()}`;
        localStorage.setItem("randomBgUrl", randomUrl);
        DOM.backgroundOverlay.style.backgroundImage = `url('${randomUrl}')`;
      }
    } else if (mode === "custom") {
      DOM.customBgButton.classList.remove("hidden");
      const savedBg = localStorage.getItem("customBgUrl");
      if (savedBg) {
        DOM.backgroundOverlay.style.backgroundImage = `url('${savedBg}')`;
      } else {
        DOM.backgroundOverlay.style.backgroundImage = "none";
      }
    }
  }

  localStorage.setItem("bgMode", mode);
};

export const initBackground = () => {
  const savedOpacity = localStorage.getItem("backgroundOpacity") || 1;
  DOM.backgroundOverlay.style.opacity = savedOpacity;
  DOM.backgroundOpacitySlider.value = savedOpacity;

  const savedBgColor =
    localStorage.getItem("solidBgColor") ||
    (DOM.body.classList.contains("light-theme") ? "#fafafa" : "#0a0a0a");
  DOM.solidColorPicker.value = savedBgColor;
  DOM.colorPreview.style.backgroundColor = savedBgColor;

  const savedMode = localStorage.getItem("bgMode") || "solid";
  applyBackground(savedMode);

  DOM.backgroundModeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyBackground(button.dataset.bgMode);
    });
  });

  DOM.solidColorWrapper.addEventListener("click", () => {
    DOM.solidColorPicker.click();
  });

  DOM.solidColorPicker.addEventListener("input", (e) => {
    const color = e.target.value;
    localStorage.setItem("solidBgColor", color);
    DOM.colorPreview.style.backgroundColor = color;
    if (localStorage.getItem("bgMode") === "solid") {
      DOM.body.style.backgroundColor = color;
    }
  });

  DOM.customBgButton.addEventListener("click", () => DOM.bgFileInput.click());

  DOM.bgFileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        localStorage.setItem("customBgUrl", imageUrl);
        if (localStorage.getItem("bgMode") === "custom") {
          DOM.backgroundOverlay.style.backgroundImage = `url('${imageUrl}')`;
        }
      };
      reader.readAsDataURL(file);
    }
  });

  DOM.backgroundOpacitySlider.addEventListener("input", (e) => {
    const opacity = e.target.value;
    DOM.backgroundOverlay.style.opacity = opacity;
    localStorage.setItem("backgroundOpacity", opacity);
  });
};
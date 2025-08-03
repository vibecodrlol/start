import { DOM } from './dom.js';

export const updateGreeting = () => {
  if (!DOM.greetingToggle.checked) return;
  const now = new Date();
  const hour = now.getHours();
  const name = localStorage.getItem("greetingName") || "Anon";
  let timeOfDay;

  if (hour < 12) timeOfDay = "Good morning";
  else if (hour < 18) timeOfDay = "Good afternoon";
  else timeOfDay = "Good evening";

  DOM.greetingText.textContent = `${timeOfDay},`;
  DOM.greetingName.textContent = `${name}.`;
};

export const initGreeting = () => {
  if (localStorage.getItem("greetingEnabled") === "true") {
    DOM.greetingToggle.checked = true;
    DOM.greetingContainer.classList.remove("hidden");
    DOM.greetingDetails.classList.remove("hidden");
    DOM.greetingNameInput.value =
      localStorage.getItem("greetingName") || "";
    updateGreeting();
  }
  setInterval(updateGreeting, 60000);

  DOM.greetingToggle.addEventListener("change", () => {
    localStorage.setItem("greetingEnabled", DOM.greetingToggle.checked);
    DOM.greetingContainer.classList.toggle("hidden", !DOM.greetingToggle.checked);
    DOM.greetingDetails.classList.toggle("hidden", !DOM.greetingToggle.checked);
    if (DOM.greetingToggle.checked) updateGreeting();
  });

  DOM.greetingNameInput.addEventListener("input", () => {
    localStorage.setItem("greetingName", DOM.greetingNameInput.value);
    updateGreeting();
  });
};
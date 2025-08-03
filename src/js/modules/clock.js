import { DOM } from './dom.js';

let clockInterval;
let ALL_TIMEZONES = [];

export const updateClock = () => {
  if (!DOM.clockToggle.checked) return;
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

  DOM.clockTime.textContent = new Intl.DateTimeFormat(
    "en-US",
    timeOptions
  ).format(now);
  DOM.clockDate.textContent = new Intl.DateTimeFormat(
    "en-US",
    dateOptions
  ).format(now);
};

const populateTimezoneList = (filter = "") => {
  DOM.timezoneList.innerHTML = "";
  const filteredTimezones = ALL_TIMEZONES.filter((tz) =>
    tz.toLowerCase().includes(filter.toLowerCase())
  );

  filteredTimezones.forEach((tz) => {
    const option = document.createElement("div");
    option.className = "dropdown-option";
    option.textContent = tz;
    option.dataset.value = tz;
    option.onclick = () => {
      DOM.timezoneSelected.textContent = tz;
      localStorage.setItem("clockTimezone", tz);
      updateClock();
      DOM.timezoneOptions.classList.add("hidden");
      DOM.timezoneDropdown.classList.remove("open");
    };
    DOM.timezoneList.appendChild(option);
  });
};

export const initClock = () => {
  ALL_TIMEZONES = Intl.supportedValuesOf("timeZone");
  const savedTimezone =
    localStorage.getItem("clockTimezone") ||
    Intl.DateTimeFormat().resolvedOptions().timeZone;
  DOM.timezoneSelected.textContent = savedTimezone;
  localStorage.setItem("clockTimezone", savedTimezone);

  if (localStorage.getItem("clockFormat24h") === null)
    localStorage.setItem("clockFormat24h", "true");
  DOM.clockFormatToggle.checked =
    localStorage.getItem("clockFormat24h") === "true";

  if (localStorage.getItem("clockEnabled") === "true") {
    DOM.clockToggle.checked = true;
    DOM.clockContainer.classList.remove("hidden");
    DOM.clockDetails.classList.remove("hidden");
    updateClock();
    clockInterval = setInterval(updateClock, 1000);
  }

  DOM.clockToggle.addEventListener("change", () => {
    localStorage.setItem("clockEnabled", DOM.clockToggle.checked);
    DOM.clockContainer.classList.toggle("hidden", !DOM.clockToggle.checked);
    DOM.clockDetails.classList.toggle("hidden", !DOM.clockToggle.checked);
    if (DOM.clockToggle.checked) {
      updateClock();
      clockInterval = setInterval(updateClock, 1000);
    } else {
      clearInterval(clockInterval);
    }
  });

  DOM.clockFormatToggle.addEventListener("change", () => {
    localStorage.setItem("clockFormat24h", DOM.clockFormatToggle.checked);
    updateClock();
  });

  DOM.timezoneDropdown.addEventListener("click", (e) => {
    e.stopPropagation();
    DOM.timezoneOptions.classList.toggle("hidden");
    DOM.timezoneDropdown.classList.toggle("open");
    DOM.timezoneSearch.value = "";
    populateTimezoneList();
    DOM.timezoneSearch.focus();
  });

  DOM.timezoneSearch.addEventListener("input", () => {
    populateTimezoneList(DOM.timezoneSearch.value);
  });
};
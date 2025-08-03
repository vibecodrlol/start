# Start 🚀

A minimal and customizable new tab page for your browser.

## Features
- Clean and simple design
- Minimalist or customizable

## Customization
You can personalize:
- Greeting message
- Clock format
- Custom search engine
- Quick links (add, remove, or edit your favorite sites)
- Theme (light/dark mode and colors)

## Installation

1. Download or clone this repository to your local machine.
2. Open your browser and go to the extensions page:
    - **Chrome/Edge:** `chrome://extensions/`
3. Enable "Developer mode".
4. Click "Load unpacked" and select the project folder.
5. The extension should now be installed and ready to use as your new tab page.

> **Note:** Firefox is not currently supported, but support is planned for the near future.


## Structure
- `src/` — Main source files
	- `main.js` — Main JavaScript logic
	- `styles.css` — Styles
	- `js/modules/` — Modular JavaScript components
	- `js/lib/Sortable.min.js` — Local copy of SortableJS for drag-and-drop (required for Content Security Policy compliance)
	- `icons/` — Icons for the project

## Libraries

This project uses a local copy of [SortableJS](https://github.com/SortableJS/Sortable) (`src/js/lib/Sortable.min.js`) for drag-and-drop functionality in the quick links section. This is necessary because browser extension Content Security Policy (CSP) restrictions prevent loading scripts from external CDNs. If you update or replace this library, ensure you use a local, minified version.

## Icons

The icons used in this extension were sourced from [Font Awesome](https://fontawesome.com), like the [main one](https://fontawesome.com/icons/house-chimney-window?f=classic&s=solid).

> **Note:** Font Awesome icons are licensed under the [Font Awesome Free License](https://fontawesome.com/license/free). Please ensure your usage complies with their terms.

## License
MIT
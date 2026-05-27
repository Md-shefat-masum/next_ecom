# UI System

Global reusable BME classes live in `src/styles/bme-ui.css` and are imported by `src/app/globals.css`.

Theme variable model:

- `bme-ui.css` defines `:root` fallback variables only.
- `src/app/layout.js` overrides those CSS variables from `defaultGeneralInfo`.
- Future general-info API data should update the same variables through a theme/provider wrapper.
- Do not remove the fallback `:root` values; they keep components safe if config is missing.

Important CSS variables:

- `--bme-primary`
- `--bme-primary-dark`
- `--bme-primary-bright`
- `--bme-accent`
- `--bme-bg`
- `--bme-card`
- `--bme-border`
- `--bme-border-soft`
- `--bme-text`
- `--bme-muted`
- `--bme-hover`

Reusable classes:

- `bme-container`: common centered max-width container.
- `bme-tech-frame`: mechanical/cut-corner wrapper for search, compact panels, controls.
- `bme-tech-frame-soft`: softer card/panel wrapper.
- `bme-tech-input`: transparent input inside mechanical frames.
- `bme-tech-select`: compact select with divider.
- `bme-tech-btn`, `bme-tech-btn-primary`, `bme-tech-btn-outline`: button primitives.
- `bme-tech-icon-btn`: small square icon button.
- `bme-tech-badge`: cart/wishlist count badge.
- `bme-tech-nav-item`: category nav item with `is-active`.
- `bme-tech-dropdown`: dropdown/mega-menu shell with tech corner effect.
- `bme-header-search`: header search composition.

Design rules:

- Prefer these classes before writing one-off CSS.
- Use `defaultGeneralInfo` or CSS vars for color; avoid hardcoded colors in components.
- No decorative images, SVG backgrounds, circuit/gear art, or heavy graphics.
- Keep the style clean, mechanical, blue/orange accented, and ecommerce-friendly.


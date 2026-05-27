# Header And Navigation

Implemented components:

- `src/components/layout/header/HeaderTop.jsx`
- `src/components/layout/header/HeaderLogo.jsx`
- `src/components/layout/header/HeaderSearch.jsx`
- `src/components/layout/header/HeaderActions.jsx`
- `src/components/layout/category-menu/CategoryMenuBar.jsx`
- `src/components/layout/category-menu/mobile/MobileCategoryDrawer.jsx`
- `src/components/layout/category-menu/mobile/MobileCategoryTree.jsx`
- `src/components/layout/category-menu/mobile/MobileCategoryItem.jsx`

Header top:

- Uses `defaultGeneralInfo` for logo, colors, and company name.
- Logo URL must use `getFileUrl(defaultGeneralInfo.logo)`.
- Search logic is controlled React state and routes to `/search?keyword=...&category=...`.
- Empty search should not submit.
- Header search uses `bme-tech-frame bme-header-search`, `bme-tech-input`, `bme-tech-select`, and `bme-tech-btn-primary`.

Desktop category navbar:

- Visible only at `>=992px`.
- Uses RTK Query hook `useGetCategoriesQuery`.
- Falls back to `previewCategories` only when API data is empty.
- Main category, subcategory, and child category links use `/:slug`.
- Extra categories move into `More`; no horizontal scrollbar.
- Hover on visible nav item opens the mega menu aligned to hovered item left edge.
- Hover on a `More` item with subcategories opens the same mega menu to the left of the More dropdown.
- Hover on a `More` item without subcategories behaves as a normal direct link.
- Mega menu uses `bme-tech-dropdown`, is compact, and is shifted to stay inside the navbar container.
- Dropdown top is intentionally offset slightly downward with `top-[calc(100%+6px)]`.

Mobile/tablet category drawer:

- Visible/triggered below `992px`.
- Hamburger trigger is inside `HeaderTop`.
- Drawer opens from the left with overlay and body scroll lock.
- Close via overlay, close button, or Escape.
- Category tree expands in the same sidebar: one active category and one active subcategory at a time.
- Child category links use `/:slug`.
- Bottom dock was intentionally removed per user request.
- Duplicate IDs can exist in child categories, so React keys must include parent scopes such as category id and subcategory id.

Do not change unless asked:

- Do not redesign approved top header/search.
- Do not change category API response handling.
- Do not add desktop/mobile nav features beyond requested scope.
- Keep JS files as `.jsx` because the app is currently JavaScript-first.


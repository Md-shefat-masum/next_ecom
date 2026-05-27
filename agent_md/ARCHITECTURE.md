# Architecture

Directory intent:

- `src/app`: App Router routes, layouts, loading/error/not-found boundaries, and route-level providers.
- `src/app/providers`: Client-only provider composition.
- `src/components/common`: Shared app components that are not tied to one business feature.
- `src/components/features`: Feature-specific UI modules such as auth, cart, product, checkout, account.
- `src/components/layout`: Header, footer, account layout, public layout, navigation shells.
- `src/components/layout/header`: Top header pieces: logo, search, actions.
- `src/components/layout/category-menu`: Desktop category navbar/mega menu and mobile drawer.
- `src/components/ui`: Small reusable primitives such as Button, Input, Badge, Modal.
- `src/config`: App constants, route names, API endpoints, environment-backed config.
- `src/hooks`: Shared React hooks.
- `src/lib/api`: API client, query client, and service modules.
- `src/lib/utils`: Generic library-level helpers.
- `src/styles`: Global reusable CSS systems.
- `src/store`: Redux store, hooks, and slices.
- `src/store/api`: RTK Query base API and injected endpoints.
- `src/types`: Shared shape documentation or future TypeScript types.
- `src/utils`: Product/business utility functions.

Feature module guideline:

When adding a feature, keep route files thin. Put fetch logic in `src/lib/api/services`, global state in `src/store/slices`, UI in `src/components/features/<feature>`, and business helpers in `src/utils` only when reused.

Current layout guideline:

- Header/top navigation lives on `src/app/page.js` for now while the public shell is being designed.
- Do not add banners, footer, product cards, or category sections unless the user explicitly asks.
- Keep desktop and mobile navigation behavior separate: desktop category navbar at `>=992px`; mobile drawer below `992px`.

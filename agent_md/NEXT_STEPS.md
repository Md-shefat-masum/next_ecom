# Next Steps

Suggested next implementation order:

1. Add public layout shell: header, footer, category navigation, mobile menu.
2. Add config bootstrap query and hydrate Redux config slice.
3. Add product, category, brand, cart, auth, and account service modules.
4. Build UI primitives in `src/components/ui`.
5. Create route groups for public and account pages as features become ready.
6. Add validation schemas for forms when auth and checkout work begins.
7. Add smoke tests or focused checks once main user flows are implemented.

Open decisions:

- Confirm final API base URL and refresh-token response shape.
- Decide whether the app should remain JavaScript-first or migrate to TypeScript before feature work grows.
- Confirm brand tokens, typography, and ecommerce layout conventions.


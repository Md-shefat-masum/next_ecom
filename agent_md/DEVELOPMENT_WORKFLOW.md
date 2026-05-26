# Development Workflow

Professional step-by-step handling plan:

1. Understand the requested feature and identify route, API, state, and UI boundaries.
2. Check existing patterns in `src/app`, `src/components`, `src/lib/api`, `src/store`, and this `agent_md` folder.
3. Define the smallest useful implementation slice.
4. Add or update config endpoints before writing service functions.
5. Put API calls in a service module and consume them through TanStack Query where possible.
6. Add Redux slice state only for shared client state.
7. Build UI from small components, keeping route pages thin.
8. Handle loading, empty, error, and success states.
9. Verify with lint/build or targeted checks.
10. Update `agent_md/NEXT_STEPS.md` when decisions or unfinished work should carry forward.

Quality expectations:

- Keep code scoped to the requested feature.
- Avoid duplicate endpoint strings outside `src/config/api.js`.
- Prefer small named modules over large route files.
- Do not start a second dev server if port `3000` is already running.


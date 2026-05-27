# API And State

API base:

- `NEXT_PUBLIC_API_URL` controls the API base URL.
- Default fallback is `http://127.0.0.1:8000/api/v1`.

API files:

- `src/config/api.js`: endpoint map and timeout constants.
- `src/lib/api/client.js`: Fetch client, auth token header, timeout, and common HTTP methods.
- `src/lib/api/services`: domain service functions.
- `src/store/api/baseApi.js`: RTK Query base API using `NEXT_PUBLIC_API_URL`.
- `src/store/api/categoriesApi.js`: `useGetCategoriesQuery`, currently calls `/categories` and transforms response to `response.data || []`.

State rule of thumb:

- Use RTK Query for client-side API reads that feed interactive UI, starting with categories.
- Use service modules for simpler non-cached API helpers when RTK Query is unnecessary.
- Use Redux for app-global client state, auth/session metadata, config, UI overlays, cart summary, and cross-page selections.
- Keep local component state local when it does not need to survive navigation or be shared.

Category response shape:

- Root response: `{ success, message, data }`.
- Category: `{ id, name, slug, icon, image, subcategories }`.
- Subcategory: `{ id, category_id, name, slug, icon, image, child_categories }`.
- Child category: `{ id, category_id, subcategory_id, name, slug, icon }`.
- Link rule for category, subcategory, and child category is `/:slug`.

File/media URLs:

- Use `getFileUrl(contentPath)` from `src/lib/utils`.
- It builds `NEXT_PUBLIC_FILE_URL + "/" + contentPath + "?v=" + NEXT_PUBLIC_APP_VERSION`.
- If `NEXT_PUBLIC_APP_VERSION` is missing, it falls back to `appConfig.version`.

Auth token keys:

- `access_token`
- `refresh_token`

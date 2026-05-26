# API And State

API base:

- `NEXT_PUBLIC_API_URL` controls the API base URL.
- Default fallback is `http://127.0.0.1:8000/api/v1`.

API files:

- `src/config/api.js`: endpoint map and timeout constants.
- `src/lib/api/client.js`: Fetch client, auth token header, timeout, and common HTTP methods.
- `src/lib/api/services`: domain service functions.

State rule of thumb:

- Use service modules for server data. Add TanStack Query later if server-state caching becomes necessary.
- Use Redux for app-global client state, auth/session metadata, config, UI overlays, cart summary, and cross-page selections.
- Keep local component state local when it does not need to survive navigation or be shared.

Auth token keys:

- `access_token`
- `refresh_token`

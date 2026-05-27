# Project Overview

`next_app` is the fresh Next.js frontend for the BME ecommerce experience.

Current baseline:

- Next.js App Router under `src/app`
- JavaScript-first codebase with `@/*` path alias
- Redux Toolkit for global UI/config state
- RTK Query for category API reads
- Fetch-based API client remains available for non-RTK service calls
- Central config under `src/config`
- BME reusable UI class system under `src/styles/bme-ui.css`
- Header top, desktop category navbar/mega menu, and mobile category drawer are implemented

Reference source:

- `../next_app_demo/src` is the architecture reference.
- Do not blindly copy demo code. Use its module boundaries and naming ideas, then keep the new app clean and incremental.

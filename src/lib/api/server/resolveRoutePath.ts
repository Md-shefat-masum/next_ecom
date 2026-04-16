import { ApiResponse } from '@/types';
import type { RouteData } from '@/types/route';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

/**
 * Resolve a frontend path (e.g. "electronics", "electronics/laptops") to RouteData.
 * Uses GET /route/resolve-path?path=…&nav_type=… (nav_type optional; from main nav).
 */
export async function fetchResolvedRoute(
  path: string,
  navType?: string
): Promise<RouteData | null> {
  const trimmed = path.replace(/^\/+|\/+$/g, '');
  if (!trimmed) return null;

  try {
    const qs = new URLSearchParams({ path: trimmed });
    if (navType) {
      qs.set('nav_type', navType);
    }
    const url = `${API_BASE_URL}/route/resolve-path?${qs.toString()}`;
    const response = await fetch(url, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      console.log(
        '[SSR fetchResolvedRoute]',
        { path: trimmed, url, status: response.status }
      );
      return null;
    }

    const json = (await response.json()) as ApiResponse<RouteData>;
    if (!json.success || !json.data) {
      // console.log('[SSR fetchResolvedRoute] invalid body', { path: trimmed, json });
      return null;
    }

    // console.log('[SSR fetchResolvedRoute] OK', {
    //   url: url,
    //   json: JSON.stringify(json, null, 3),
    // });

    return json.data;
  } catch (e) {
    // console.log('[SSR fetchResolvedRoute] error', { path: trimmed, error: String(e) });
    return null;
  }
}

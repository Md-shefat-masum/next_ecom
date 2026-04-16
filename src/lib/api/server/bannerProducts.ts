import { ApiResponse } from '@/types';
import type { Product } from '@/types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

/** Banner products for the home hero; cached ~10m to mirror prior client staleTime. */
export async function fetchBannerProducts(): Promise<Product[][][] | null> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/banner-products`,
      {
        next: { revalidate: 600 },
        headers: { Accept: 'application/json' },
      }
    );

    if (!response.ok) {
      return null;
    }

    const json = (await response.json()) as ApiResponse<Product[][][]>;
    if (!json.success || !json.data) {
      return null;
    }

    return json.data;
  } catch {
    return null;
  }
}

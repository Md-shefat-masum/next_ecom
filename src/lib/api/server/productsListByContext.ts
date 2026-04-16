import { ApiResponse } from '@/types';
import type { Product } from '@/types';
import type { ProductsListContext } from '@/types/route';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

function buildQuery(searchParams: Record<string, string | string[] | undefined>): string {
  const sp = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      value.forEach((v) => sp.append(key, v));
    } else {
      sp.set(key, value);
    }
  }
  const q = sp.toString();
  return q ? `?${q}` : '';
}

function parseProductsPayload(data: unknown): Product[] {
  if (!data || typeof data !== 'object') return [];
  const d = data as Record<string, unknown>;
  if (Array.isArray(d.products)) return d.products as Product[];
  if (Array.isArray(d.data)) return d.data as Product[];
  if (d.data && typeof d.data === 'object' && d.data !== null) {
    const inner = d.data as Record<string, unknown>;
    if (Array.isArray(inner.data)) return inner.data as Product[];
    if (Array.isArray(inner.products)) return inner.products as Product[];
  }
  return [];
}

/**
 * Calls the id-based list endpoint that matches products_list_context from route resolve.
 */
export async function fetchProductsListByContext(
  context: ProductsListContext,
  entityId: number,
  searchParams: Record<string, string | string[] | undefined>
): Promise<Product[]> {
  const query = buildQuery(searchParams);
  let url: string;

  switch (context) {
    case 'category':
      url = `${API_BASE_URL}/products/get-category-products/${entityId}${query}`;
      break;
    case 'subcategory':
      url = `${API_BASE_URL}/products/get-subcategory-products/${entityId}${query}`;
      break;
    case 'brand':
      url = `${API_BASE_URL}/products/get-brand-products/${entityId}${query}`;
      break;
    default:
      return [];
  }

  try {
    const response = await fetch(url, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      // console.log('[SSR fetchProductsListByContext] HTTP error', {
      //   url,
      //   status: response.status,
      // });
      return [];
    }

    const json = (await response.json()) as ApiResponse<unknown>;
    if (!json.success || json.data == null) {
      // console.log('[SSR fetchProductsListByContext] invalid body', { url, json });
      return [];
    }

    // const products = parseProductsPayload(json.data);
    // console.log('[SSR fetchProductsListByContext] OK', {
    //   url,
    //   context,
    //   entityId,
    //   productCount: products.length,
    //   rawDataKeys:
    //     json.data && typeof json.data === 'object'
    //       ? Object.keys(json.data as object)
    //       : [],
    // });

    // return products;

    console.log({
      // json: json.data, 
      url: url,

    });
    const products = json.data.products.data;
    return products;
  } catch (e) {
    console.log('[SSR fetchProductsListByContext] error', {
      url,
      error: String(e),
    });
    return [];
  }
}

import { ApiResponse } from '@/types';
import type { Category, Product } from '@/types';
import type {
  FeaturedCategoryMeta,
  FeaturedCategorySection,
} from '@/types/featuredCategoryHome';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

/** Matches prior react-query staleTime for featured categories (15m). */
const REVALIDATE = 900;

function parseProductsPayload(data: unknown): Product[] {
  if (!data) return [];
  if (Array.isArray(data)) return data as Product[];
  if (
    typeof data === 'object' &&
    data !== null &&
    'data' in data &&
    Array.isArray((data as { data: unknown }).data)
  ) {
    return (data as { data: Product[] }).data;
  }
  return [];
}

export async function fetchFeaturedCategoriesList(): Promise<Category[] | null> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/categories/featured-categories`,
      {
        next: { revalidate: REVALIDATE },
        headers: { Accept: 'application/json' },
      }
    );

    if (!response.ok) return null;

    const json = (await response.json()) as ApiResponse<Category[]>;
    if (!json.success || !json.data || !Array.isArray(json.data)) {
      return null;
    }

    return json.data;
  } catch {
    return null;
  }
}

export async function fetchCategoryProducts(
  slug: string,
  perPage = 20
): Promise<Product[]> {
  try {
    const params = new URLSearchParams({ per_page: String(perPage) });
    const response = await fetch(
      `${API_BASE_URL}/categories/${encodeURIComponent(slug)}/products?${params}`,
      {
        next: { revalidate: REVALIDATE },
        headers: { Accept: 'application/json' },
      }
    );

    if (!response.ok) return [];

    const json = (await response.json()) as ApiResponse<unknown>;
    if (!json.success || json.data == null) return [];

    return parseProductsPayload(json.data);
  } catch {
    return [];
  }
}

function toFeaturedMeta(cat: Category): FeaturedCategoryMeta {
  const c = cat as Category & {
    icon?: string | null;
    featured?: number;
    serial?: number;
  };
  return {
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    icon: c.icon ?? null,
    featured: c.featured ?? 0,
    serial: c.serial ?? 0,
  };
}

export async function fetchFeaturedCategorySections(): Promise<
  FeaturedCategorySection[] | null
> {
  const categories = await fetchFeaturedCategoriesList();
  if (!categories?.length) return null;

  const sections = await Promise.all(
    categories.map(async (cat) => {
      const products = await fetchCategoryProducts(cat.slug, 20);
      return {
        category: toFeaturedMeta(cat),
        products,
      };
    })
  );

  return sections;
}

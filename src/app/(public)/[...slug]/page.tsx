import { notFound } from 'next/navigation';
import DynamicRouter from '@/components/features/dynamic-router/DynamicRouter';
import { fetchResolvedRoute } from '@/lib/api/server/resolveRoutePath';
import { fetchProductsListByContext } from '@/lib/api/server/productsListByContext';
import type {
  CategoryProductsRoutePayload,
  RouteData,
  RouteDataType,
} from '@/types/route';

/** Re-run this page on every request so SSR + terminal logs run on each navigation (dev). */
export const dynamic = 'force-dynamic';

const ID_LISTING_TYPES: RouteDataType[] = [
  'category_products',
  'subcategory_products',
  'brand_products',
];

function firstSearchParam(
  v: string | string[] | undefined
): string | undefined {
  if (v === undefined) return undefined;
  return Array.isArray(v) ? v[0] : v;
}

export default async function DynamicPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const path = slug.join('/');
  const navType = firstSearchParam(sp.nav_type);

  console.log('\n\n[SSR [...slug]/page] request', { path, searchParams: sp }, '\n');

  const routeData = await fetchResolvedRoute(path, navType);
  if (!routeData) {
    notFound();
  }

  let merged: RouteData = routeData;

  if (ID_LISTING_TYPES.includes(routeData.data_type)) {
    const payload = routeData.data as CategoryProductsRoutePayload;
    const id = payload.entity_id;
    const ctx = payload.products_list_context;

    const shouldFetch =
      (ctx === 'category' ||
        ctx === 'subcategory' ||
        ctx === 'brand') &&
      typeof id === 'number' &&
      id > 0;


    // console.log({slug, path, params: await params});

    if (!shouldFetch) {
      console.log('[SSR [...slug]/page] skip product list fetch', {
        path,
        data_type: routeData.data_type,
        products_list_context: ctx,
        entity_id: id,
      }, __filename);
    }

    if (shouldFetch) {
      const products = await fetchProductsListByContext(ctx, id, sp);
      merged = {
        ...routeData,
        data: {
          ...payload,
          products,
        },
      };
      console.log('[SSR [...slug]/page] merged listing', {
        path,
        context: ctx,
        entity_id: id,
        productCount: products.length,
        // products: products,
      }, __filename);
    }
  }

  console.log(['DynamicPage', merged]);
  

  return <DynamicRouter data={merged} />;
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const path = slug.join('/');
  const sp = searchParams ? await searchParams : {};
  const navType = firstSearchParam(sp.nav_type);

  try {
    const routeData = await fetchResolvedRoute(path, navType);
    if (!routeData) {
      return { title: 'Not Found' };
    }

    const title =
      routeData.metadata?.title ||
      (routeData.data as CategoryProductsRoutePayload | undefined)?.name ||
      path;

    return {
      title,
      description: routeData.metadata?.description,
    };
  } catch {
    return { title: 'Not Found' };
  }
}

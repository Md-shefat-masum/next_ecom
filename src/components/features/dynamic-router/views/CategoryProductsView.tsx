import { RouteData } from '@/types';
import type { CategoryProductsRoutePayload } from '@/types/route';
import type { Product } from '@/types';
import ProductCard from '@/components/features/ecommerce/ProductCard';
import ProductFilters from '@/components/features/ecommerce/ProductFilters';

interface CategoryProductsViewProps {
  data: RouteData;
  title?: string;
}

function normalizeProductForCard(product: Product) {
  interface ProductWithPricing extends Product {
    pricing?: { final_price?: number; discount_price?: number };
    full_image_url?: string;
  }
  const p = product as ProductWithPricing;
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: p.pricing?.final_price ?? product.price ?? 0,
    discount_price: p.pricing?.discount_price ?? product.discount_price,
    image: p.full_image_url ?? product.image,
    rating: product.average_rating,
    reviews_count: product.reviews_count,
  };
}

export default function CategoryProductsView({ data, title }: CategoryProductsViewProps) {
  const categoryData = data.data as CategoryProductsRoutePayload;
  const products = (categoryData?.products ?? []) as Product[];
  const categoryName = categoryData?.name || title || 'Products';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{categoryName}</h1>
        {categoryData?.description && (
          <p className="text-gray-600">{categoryData.description}</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 shrink-0">
          <ProductFilters />
        </aside>

        <div className="flex-1">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={normalizeProductForCard(product)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

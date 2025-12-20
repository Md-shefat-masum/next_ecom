'use client';

import { RouteData } from '@/types';
import ProductCard from '@/components/features/ecommerce/ProductCard';
import ProductFilters from '@/components/features/ecommerce/ProductFilters';

interface CategoryProductsViewProps {
  data: RouteData;
  title?: string;
}

export default function CategoryProductsView({ data, title }: CategoryProductsViewProps) {
  const categoryData = data.data as any;
  const products = categoryData?.products || [];
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
        <aside className="w-full lg:w-64 flex-shrink-0">
          <ProductFilters />
        </aside>

        <div className="flex-1">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
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


'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ProductCard from '@/components/features/ecommerce/ProductCard';
import ProductFilters from '@/components/features/ecommerce/ProductFilters';

export default function CategoryPage() {
  const params = useParams();
  const slugArray = Array.isArray(params.slug) ? params.slug : [params.slug];
  const currentSlug = slugArray[slugArray.length - 1];

  // Placeholder data
  const category = {
    name: currentSlug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Category',
    slug: currentSlug,
    description: 'Explore our wide range of products',
    image: null,
    products_count: 120,
  };

  const products = [
    { id: 1, name: 'Wireless Headphones', slug: 'wireless-headphones', price: 2500, discount_price: 2000, image: null, rating: 4.5 },
    { id: 2, name: 'Smart Watch', slug: 'smart-watch', price: 4500, discount_price: null, image: null, rating: 4.0 },
    { id: 3, name: 'Bluetooth Speaker', slug: 'bluetooth-speaker', price: 1500, discount_price: 1200, image: null, rating: 4.2 },
    { id: 4, name: 'Power Bank', slug: 'power-bank', price: 1000, discount_price: null, image: null, rating: 4.3 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-[var(--bme-orange)]">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/categories" className="hover:text-[var(--bme-orange)]">Categories</Link>
        {slugArray.map((s, i) => (
          <span key={s} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4" />
            {i === slugArray.length - 1 ? (
              <span className="text-gray-900">{s?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
            ) : (
              <Link href={`/categories/${slugArray.slice(0, i + 1).join('/')}`} className="hover:text-[var(--bme-orange)]">
                {s?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Link>
            )}
          </span>
        ))}
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        <p className="text-gray-600">{category.description}</p>
        <p className="text-sm text-gray-500 mt-2">{category.products_count} products</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <ProductFilters />
        </aside>

        {/* Products */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">Showing {products.length} products</p>
            <select className="px-4 py-2 border rounded-lg">
              <option>Sort by: Default</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
              <option>Best Rating</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


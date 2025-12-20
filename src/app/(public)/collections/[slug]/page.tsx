'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ProductCard from '@/components/features/ecommerce/ProductCard';

export default function CollectionPage() {
  const params = useParams();

  const collection = {
    name: 'Summer Collection',
    slug: params.slug,
    image: null,
    description: 'Hot deals for the summer season',
    products_count: 35,
  };

  const products = [
    { id: 1, name: 'Summer Hat', slug: 'summer-hat', price: 500, discount_price: 350, image: null, rating: 4.2 },
    { id: 2, name: 'Beach Towel', slug: 'beach-towel', price: 800, discount_price: null, image: null, rating: 4.0 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-[var(--bme-orange)]">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/collections" className="hover:text-[var(--bme-orange)]">Collections</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">{collection.name}</span>
      </nav>

      {/* Collection Header */}
      <div className="relative h-64 rounded-xl overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bme-orange)] to-[var(--primary-hover)]">
          {collection.image && <img src={collection.image} alt={collection.name} className="w-full h-full object-cover opacity-50" />}
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div>
            <h1 className="text-4xl font-bold mb-2">{collection.name}</h1>
            <p className="text-lg opacity-90">{collection.description}</p>
            <p className="mt-2 text-white/80">{collection.products_count} products</p>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product as any} />
        ))}
      </div>
    </div>
  );
}


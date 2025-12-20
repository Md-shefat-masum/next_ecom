'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ProductCard from '@/components/features/ecommerce/ProductCard';

export default function BrandPage() {
  const params = useParams();

  const brand = {
    name: 'SoundMax',
    slug: params.slug,
    logo: null,
    description: 'Premium audio equipment for audiophiles',
    products_count: 45,
  };

  const products = [
    { id: 1, name: 'Pro Headphones', slug: 'pro-headphones', price: 5000, discount_price: 4500, image: null, rating: 4.8 },
    { id: 2, name: 'Studio Earbuds', slug: 'studio-earbuds', price: 3000, discount_price: null, image: null, rating: 4.5 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-[var(--bme-orange)]">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/brands" className="hover:text-[var(--bme-orange)]">Brands</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">{brand.name}</span>
      </nav>

      {/* Brand Header */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-8 flex items-center gap-6">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
          {brand.logo ? (
            <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain p-2" />
          ) : (
            <span className="text-4xl font-bold text-gray-400">{brand.name.charAt(0)}</span>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{brand.name}</h1>
          <p className="text-gray-600 mb-2">{brand.description}</p>
          <p className="text-sm text-[var(--bme-orange)]">{brand.products_count} products</p>
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


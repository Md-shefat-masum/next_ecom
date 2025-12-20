'use client';

import Link from 'next/link';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product?: {
    id: number;
    name: string;
    slug: string;
    price: number;
    discount_price?: number;
    image?: string;
    rating?: number;
    reviews_count?: number;
  };
  viewMode?: 'grid' | 'list';
}

export default function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  // Placeholder data
  const item = product || {
    id: 1,
    name: 'Product Name',
    slug: 'product-name',
    price: 1500,
    discount_price: 1200,
    image: null,
    rating: 4.5,
    reviews_count: 12,
  };

  const discount = item.discount_price 
    ? Math.round((1 - item.discount_price / item.price) * 100) 
    : 0;

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden flex">
        <div className="w-48 h-48 bg-gray-100 flex-shrink-0 relative">
          {item.image ? (
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
          )}
          {discount > 0 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              -{discount}%
            </span>
          )}
        </div>
        <div className="flex-1 p-4 flex flex-col">
          <Link href={`/products/${item.slug}`} className="font-semibold hover:text-amber-600 transition">
            {item.name}
          </Link>
          <div className="flex items-center gap-1 mt-1">
            {'★'.repeat(Math.floor(item.rating || 0))}
            <span className="text-sm text-gray-500">({item.reviews_count})</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xl font-bold text-amber-600">৳{item.discount_price || item.price}</span>
            {item.discount_price && (
              <span className="text-gray-400 line-through">৳{item.price}</span>
            )}
          </div>
          <div className="flex gap-2 mt-auto pt-4">
            <button className="flex-1 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition flex items-center justify-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
            <button className="p-2 border rounded-lg hover:bg-gray-50">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden group">
      <div className="relative aspect-square bg-gray-100">
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
        )}
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            -{discount}%
          </span>
        )}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
          <button className="p-2 bg-white rounded-full shadow hover:bg-amber-50 hover:text-amber-600">
            <Heart className="w-5 h-5" />
          </button>
          <Link href={`/products/${item.slug}`} className="p-2 bg-white rounded-full shadow hover:bg-amber-50 hover:text-amber-600">
            <Eye className="w-5 h-5" />
          </Link>
        </div>
      </div>
      <div className="p-4">
        <Link href={`/products/${item.slug}`} className="font-semibold hover:text-amber-600 transition line-clamp-2">
          {item.name}
        </Link>
        <div className="flex items-center gap-1 mt-1 text-amber-500">
          {'★'.repeat(Math.floor(item.rating || 0))}
          <span className="text-sm text-gray-500">({item.reviews_count})</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-bold text-amber-600">৳{item.discount_price || item.price}</span>
          {item.discount_price && (
            <span className="text-sm text-gray-400 line-through">৳{item.price}</span>
          )}
        </div>
        <button className="w-full mt-3 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition flex items-center justify-center gap-2">
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}


'use client';

import Link from 'next/link';
import { Scale, X, ShoppingCart } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';

export default function ComparePage() {
  const { products, maxItems } = useAppSelector((state) => state.compare);

  // Placeholder data
  const compareProducts = products.length > 0 ? products : [
    { id: 1, name: 'Product A', slug: 'product-a', price: 2500, discount_price: 2000, image: null, brand: { name: 'Brand A' }, rating: 4.5, features: ['Feature 1', 'Feature 2'] },
    { id: 2, name: 'Product B', slug: 'product-b', price: 3000, discount_price: null, image: null, brand: { name: 'Brand B' }, rating: 4.0, features: ['Feature 1', 'Feature 3'] },
  ];

  if (compareProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Scale className="w-24 h-24 mx-auto text-gray-300 mb-6" />
        <h1 className="text-2xl font-bold mb-4">No products to compare</h1>
        <p className="text-gray-500 mb-8">Add products to compare their features.</p>
        <Link href="/shop" className="px-8 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Compare Products ({compareProducts.length}/{maxItems})</h1>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr>
              <th className="text-left p-4 bg-gray-50 w-40">Product</th>
              {compareProducts.map((product) => (
                <th key={product.id} className="p-4 bg-gray-50">
                  <div className="relative">
                    <button className="absolute -top-2 -right-2 p-1 bg-red-100 text-red-500 rounded-full hover:bg-red-200">
                      <X className="w-4 h-4" />
                    </button>
                    <div className="w-32 h-32 mx-auto bg-gray-200 rounded-lg mb-3">
                      {product.image && <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />}
                    </div>
                    <Link href={`/products/${product.slug}`} className="font-semibold hover:text-amber-600">
                      {product.name}
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-4 font-medium">Price</td>
              {compareProducts.map((product) => (
                <td key={product.id} className="p-4 text-center">
                  <span className="text-lg font-bold text-amber-600">
                    ৳{product.discount_price || product.price}
                  </span>
                  {product.discount_price && (
                    <span className="block text-sm text-gray-400 line-through">৳{product.price}</span>
                  )}
                </td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-4 font-medium">Brand</td>
              {compareProducts.map((product) => (
                <td key={product.id} className="p-4 text-center">{product.brand?.name || '-'}</td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-4 font-medium">Rating</td>
              {compareProducts.map((product) => (
                <td key={product.id} className="p-4 text-center">
                  <span className="text-amber-500">{'★'.repeat(Math.floor(product.rating || 0))}</span>
                  <span className="text-gray-300">{'★'.repeat(5 - Math.floor(product.rating || 0))}</span>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-medium">Action</td>
              {compareProducts.map((product) => (
                <td key={product.id} className="p-4 text-center">
                  <button className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition flex items-center gap-2 mx-auto">
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}


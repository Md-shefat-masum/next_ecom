'use client';

import Link from 'next/link';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';

export default function WishlistPage() {
  const { items } = useAppSelector((state) => state.wishlist);

  // Placeholder data
  const wishlistItems = [
    { id: 1, name: 'Wireless Headphones', price: 2500, originalPrice: 3000, image: null, inStock: true },
    { id: 2, name: 'Smart Watch', price: 4500, originalPrice: 5000, image: null, inStock: true },
    { id: 3, name: 'Laptop Stand', price: 1200, originalPrice: 1500, image: null, inStock: false },
  ];

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-16">
        <Heart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
        <h1 className="text-2xl font-bold mb-4">Your wishlist is empty</h1>
        <p className="text-gray-500 mb-8">Save items you love to your wishlist.</p>
        <Link href="/shop" className="px-8 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden group">
            <div className="relative aspect-square bg-gray-100">
              {item.image ? (
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
              <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:bg-red-50 text-red-500">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">{item.name}</h3>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-amber-600">৳{item.price}</span>
                {item.originalPrice > item.price && (
                  <span className="text-sm text-gray-400 line-through">৳{item.originalPrice}</span>
                )}
              </div>
              {item.inStock ? (
                <button className="w-full py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition flex items-center justify-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              ) : (
                <button disabled className="w-full py-2 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed">
                  Out of Stock
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


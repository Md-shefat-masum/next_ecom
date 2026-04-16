'use client';

import Link from 'next/link';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';

export default function WishlistPage() {
  const { items } = useAppSelector((state) => state.wishlist);

  // Placeholder data
  const wishlistItems = items.length > 0 ? items : [
    { id: 1, product_id: 1, product: { id: 1, name: 'Wireless Headphones', slug: 'wireless-headphones', price: 2500, discount_price: 2000, image: null }, added_at: '' },
    { id: 2, product_id: 2, product: { id: 2, name: 'Smart Watch', slug: 'smart-watch', price: 4500, discount_price: null, image: null }, added_at: '' },
  ];

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist ({wishlistItems.length} items)</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden group">
            <div className="relative aspect-square bg-gray-100">
              {item.product?.image ? (
                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
              )}
              <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:bg-red-50 text-red-500">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <Link href={`/products/${item.product?.slug}`} className="font-semibold hover:text-amber-600 line-clamp-2">
                {item.product?.name}
              </Link>
              <div className="flex items-center gap-2 mt-2 mb-3">
                <span className="text-lg font-bold text-amber-600">
                  ৳{item.product?.discount_price || item.product?.price}
                </span>
                {item.product?.discount_price && (
                  <span className="text-sm text-gray-400 line-through">৳{item.product.price}</span>
                )}
              </div>
              <button className="w-full py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition flex items-center justify-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


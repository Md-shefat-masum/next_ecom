'use client';

import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';

export default function CartPage() {
  const { items, totalItems, totalPrice } = useAppSelector((state) => state.cart);

  if (totalItems === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-6" />
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven&apos;t added anything to your cart yet.</p>
        <Link href="/shop" className="px-8 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm">
            {items.map((item, index) => (
              <div key={item.id} className={`p-6 flex gap-4 ${index > 0 ? 'border-t' : ''}`}>
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0">
                  {item.product?.image && (
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover rounded-lg" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.product?.name || 'Product'}</h3>
                  {item.variant && <p className="text-sm text-gray-500">{item.variant.name}</p>}
                  <p className="text-amber-600 font-semibold mt-1">৳{item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1 border rounded hover:bg-gray-50">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center">{item.quantity}</span>
                  <button className="p-1 border rounded hover:bg-gray-50">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-right">
                  <p className="font-semibold">৳{item.price * item.quantity}</p>
                  <button className="text-red-500 hover:text-red-600 mt-2">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                <span>৳{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-amber-600">৳{totalPrice}</span>
              </div>
            </div>

            <Link 
              href="/checkout"
              className="block w-full py-3 bg-amber-500 text-white text-center rounded-lg hover:bg-amber-600 transition"
            >
              Proceed to Checkout
            </Link>

            <Link 
              href="/shop"
              className="block w-full py-3 mt-3 border border-gray-200 text-center rounded-lg hover:bg-gray-50 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


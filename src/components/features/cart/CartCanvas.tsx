'use client';

import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useAppSelector } from '@/store/hooks';
import { cn } from '@/lib/utils';

interface CartCanvasProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartCanvas({ isOpen, onClose }: CartCanvasProps) {
  const { items, totalItems, totalPrice } = useAppSelector((state) => state.cart);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50"
          onClick={onClose}
        />
      )}

      {/* Canvas */}
      <div
        className={cn(
          'fixed right-0 top-0 h-screen w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Shopping Cart ({totalItems})</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4" style={{ height: 'calc(100vh - 180px)' }}>
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <button onClick={onClose} className="text-amber-600 hover:underline">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                    {item.product?.image && (
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{item.product?.name || 'Product'}</h3>
                    {item.variant && <p className="text-sm text-gray-500">{item.variant.name}</p>}
                    <p className="text-amber-600 font-semibold">৳{item.price}</p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 border rounded">
                        <button className="p-1 hover:bg-gray-100">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button className="p-1 hover:bg-gray-100">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button className="p-1 text-red-500 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Subtotal</span>
              <span className="font-bold text-lg">৳{totalPrice}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Link 
                href="/cart"
                onClick={onClose}
                className="py-3 text-center border rounded-lg hover:bg-gray-50 transition"
              >
                View Cart
              </Link>
              <Link 
                href="/checkout"
                onClick={onClose}
                className="py-3 text-center bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}


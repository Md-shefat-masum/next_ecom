'use client';

import { ShoppingCart } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';

interface CartIconProps {
  onClick: () => void;
}

export default function CartIcon({ onClick }: CartIconProps) {
  const { totalItems, totalPrice } = useAppSelector((state) => state.cart);

  return (
    <button
      onClick={onClick}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 bg-amber-500 text-white p-4 rounded-full shadow-lg hover:bg-amber-600 transition group"
    >
      <ShoppingCart className="w-6 h-6" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
      
      {/* Tooltip */}
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
        <div className="font-medium">{totalItems} items</div>
        <div className="text-amber-400">৳{totalPrice}</div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
      </div>
    </button>
  );
}


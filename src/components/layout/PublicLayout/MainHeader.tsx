'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, User, Heart, ShoppingCart, Menu } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import SearchBar from './SearchBar';

interface MainHeaderProps {
  onMenuClick: () => void;
}

export default function MainHeader({ onMenuClick }: MainHeaderProps) {
  const [showSearch, setShowSearch] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { itemsCount: cartItems } = useAppSelector((state) => state.cart);
  const { totalItems: wishlistItems } = useAppSelector((state) => state.wishlist);

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Menu Button (Mobile) */}
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-bme-black">
            BME<span className="text-bme-orange">Store</span>
          </Link>

          {/* Search (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-8">
            <SearchBar />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search Toggle (Mobile) */}
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link href="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Heart className="w-5 h-5" />
              {wishlistItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-bme-orange text-white text-xs rounded-full flex items-center justify-center">
                  {wishlistItems}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg">
              <ShoppingCart className="w-5 h-5" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-bme-orange text-white text-xs rounded-full flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Link>

            {/* User */}
            {isAuthenticated ? (
              <Link href="/account" className="p-2 hover:bg-gray-100 rounded-lg">
                <User className="w-5 h-5" />
              </Link>
            ) : (
              <Link href="/login" className="px-4 py-2 bg-bme-orange text-white rounded-lg hover:bg-primary-hover transition text-sm font-medium">
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        {showSearch && (
          <div className="lg:hidden mt-4">
            <SearchBar />
          </div>
        )}
      </div>
    </div>
  );
}


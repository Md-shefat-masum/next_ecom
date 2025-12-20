'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import SearchBar from './SearchBar';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { itemsCount: cartItems } = useAppSelector((state) => state.cart);
  const { totalItems: wishlistItems } = useAppSelector((state) => state.wishlist);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-[var(--bme-blue)] text-white text-sm py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span>Free shipping on orders over $50</span>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-[var(--bme-orange)] transition">About</Link>
            <Link href="/contact" className="hover:text-[var(--bme-orange)] transition">Contact</Link>
            <Link href="/faq" className="hover:text-[var(--bme-orange)] transition">FAQ</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-[var(--bme-black)]">
            BME<span className="text-[var(--bme-orange)]">Store</span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-xl">
            <SearchBar />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Mobile Search Toggle */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link href="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-full">
              <Heart className="w-5 h-5" />
              {wishlistItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--bme-orange)] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistItems}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-full">
              <ShoppingCart className="w-5 h-5" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--bme-orange)] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Link>

            {/* User */}
            {isAuthenticated ? (
              <Link href="/account" className="p-2 hover:bg-gray-100 rounded-full">
                <User className="w-5 h-5" />
              </Link>
            ) : (
              <Link href="/login" className="px-4 py-2 bg-[var(--bme-orange)] text-white rounded-lg hover:bg-[var(--primary-hover)] transition">
                Login
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="lg:hidden mt-4">
            <SearchBar />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="border-t border-gray-100">
        <div className="container mx-auto px-4">
          <ul className={`lg:flex lg:items-center lg:gap-8 py-3 ${isMenuOpen ? 'block' : 'hidden lg:flex'}`}>
            <li><Link href="/shop" className="block py-2 lg:py-0 hover:text-[var(--bme-orange)] transition">Shop</Link></li>
            <li><Link href="/categories" className="block py-2 lg:py-0 hover:text-[var(--bme-orange)] transition">Categories</Link></li>
            <li><Link href="/brands" className="block py-2 lg:py-0 hover:text-[var(--bme-orange)] transition">Brands</Link></li>
            <li><Link href="/collections" className="block py-2 lg:py-0 hover:text-[var(--bme-orange)] transition">Collections</Link></li>
            <li><Link href="/blog" className="block py-2 lg:py-0 hover:text-[var(--bme-orange)] transition">Blog</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}


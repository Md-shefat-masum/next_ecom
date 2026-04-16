'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Grid, Tag, Package, BookOpen, Phone, Info, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Grid, label: 'Categories', href: '/categories' },
  { icon: Tag, label: 'Brands', href: '/brands' },
  { icon: Package, label: 'Collections', href: '/collections' },
  { icon: BookOpen, label: 'Blog', href: '/blog' },
  { icon: Info, label: 'About', href: '/about' },
  { icon: Phone, label: 'Contact', href: '/contact' },
];

interface PublicSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PublicSidebar({ isOpen, onClose }: PublicSidebarProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-screen bg-slate-900 text-white z-50 transition-all duration-300',
          'w-[300px] lg:w-[60px] lg:hover:w-[300px]',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
        onMouseLeave={() => {}}
      >
        <div className="h-full flex flex-col overflow-hidden">
          {/* Logo */}
          <div className="p-4 border-b border-slate-800">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-white">B</span>
              </div>
              <span className="font-bold text-xl whitespace-nowrap overflow-hidden">BMEStore</span>
            </Link>
          </div>

          {/* Menu */}
          <nav className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 transition group"
                    >
                      <Icon className="w-5 h-5 flex-shrink-0 text-gray-400 group-hover:text-amber-500" />
                      <span className="whitespace-nowrap overflow-hidden">{item.label}</span>
                      <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-slate-800 text-xs text-gray-500">
            <p className="whitespace-nowrap overflow-hidden">© 2024 BMEStore</p>
          </div>
        </div>
      </aside>
    </>
  );
}


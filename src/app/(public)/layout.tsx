'use client';

import { useState } from 'react';
import PublicSidebar from '@/components/layout/PublicLayout/PublicSidebar';
import TopHeader from '@/components/layout/PublicLayout/TopHeader';
import MainHeader from '@/components/layout/PublicLayout/MainHeader';
import CategoryHeader from '@/components/layout/PublicLayout/CategoryHeader';
import Footer from '@/components/layout/PublicLayout/Footer';
import { CartIcon, CartCanvas } from '@/components/features/cart';
import ProductQuickViewModal from '@/components/features/ecommerce/ProductQuickViewModal';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <PublicSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 lg:ml-[60px] flex flex-col min-h-screen">
        <TopHeader />
        <MainHeader onMenuClick={() => setSidebarOpen(true)} />
        <CategoryHeader />
        
        <main className="flex-1">{children}</main>
        
        <Footer />
      </div>

      {/* Floating Cart Icon */}
      <CartIcon onClick={() => setCartOpen(true)} />
      
      {/* Cart Canvas */}
      <CartCanvas isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Product Quick View Modal */}
      <ProductQuickViewModal />
    </div>
  );
}

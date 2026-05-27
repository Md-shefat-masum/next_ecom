"use client";

import { CategoryMenuBar } from "@/components/layout/category-menu";
import { Footer } from "@/components/layout/footer";
import { HeaderTop } from "@/components/layout/header";
import { CartSync } from "@/components/cart/CartSync";
import { AuthSync } from "@/components/auth/AuthSync";
import { ProductQuickViewModal } from "@/components/product-quick-view";
import { defaultGeneralInfo } from "@/config";

export function SiteLayout({ children }) {
  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ backgroundColor: defaultGeneralInfo.page_background_color }}
    >
      <AuthSync />
      <CartSync />
      <HeaderTop />
      <CategoryMenuBar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ProductQuickViewModal />
    </div>
  );
}

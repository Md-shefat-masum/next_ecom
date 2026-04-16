'use client';

import Header from '@/components/layout/PublicLayout/Header';
import Footer from '@/components/layout/PublicLayout/Footer';
import AccountSidebar from '@/components/layout/AccountLayout/AccountSidebar';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <AccountSidebar />
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


'use client';

import Link from 'next/link';
import { Package, Heart, Star, MapPin, Bell } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';

export default function AccountDashboard() {
  const { user } = useAppSelector((state) => state.auth);

  const stats = [
    { label: 'Total Orders', value: '12', icon: Package, href: '/account/orders' },
    { label: 'Wishlist Items', value: '5', icon: Heart, href: '/account/wishlist' },
    { label: 'Reviews', value: '8', icon: Star, href: '/account/reviews' },
    { label: 'Addresses', value: '2', icon: MapPin, href: '/account/addresses' },
  ];

  const recentOrders = [
    { id: 'ORD-001', date: '2024-01-15', status: 'Delivered', total: 2500 },
    { id: 'ORD-002', date: '2024-01-10', status: 'Processing', total: 1800 },
    { id: 'ORD-003', date: '2024-01-05', status: 'Shipped', total: 3200 },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name || 'User'}!</h1>
        <p className="text-amber-100">Manage your account and track your orders from your dashboard.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <Icon className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Recent Orders</h2>
          <Link href="/account/orders" className="text-amber-600 hover:underline text-sm">
            View All
          </Link>
        </div>
        <div className="divide-y">
          {recentOrders.map((order) => (
            <div key={order.id} className="p-6 flex items-center justify-between">
              <div>
                <p className="font-semibold">{order.id}</p>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                'bg-amber-100 text-amber-700'
              }`}>
                {order.status}
              </span>
              <p className="font-semibold">৳{order.total}</p>
              <Link href={`/account/orders/${order.id}`} className="text-amber-600 hover:underline">
                View
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


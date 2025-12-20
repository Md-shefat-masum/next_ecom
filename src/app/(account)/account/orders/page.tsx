'use client';

import Link from 'next/link';
import { Package, Eye, FileText } from 'lucide-react';

export default function OrdersPage() {
  const orders = [
    { id: 'ORD-001', date: '2024-01-15', status: 'Delivered', items: 3, total: 2500 },
    { id: 'ORD-002', date: '2024-01-10', status: 'Processing', items: 2, total: 1800 },
    { id: 'ORD-003', date: '2024-01-05', status: 'Shipped', items: 1, total: 3200 },
    { id: 'ORD-004', date: '2024-01-01', status: 'Cancelled', items: 4, total: 4500 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Processing': return 'bg-blue-100 text-blue-700';
      case 'Shipped': return 'bg-amber-100 text-amber-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Order ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Items</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Total</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{order.id}</td>
                  <td className="px-6 py-4 text-gray-500">{order.date}</td>
                  <td className="px-6 py-4">{order.items} items</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold">৳{order.total}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link 
                        href={`/account/orders/${order.id}`}
                        className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      <button 
                        className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg"
                        title="Download Invoice"
                      >
                        <FileText className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


import Link from 'next/link';
import { Package, Eye, FileText } from 'lucide-react';
import { Order } from '@/types';

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'shipped': return 'bg-[var(--primary-light)] text-[var(--bme-orange)]';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Package className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h3 className="font-semibold">{order.order_number}</h3>
            <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm capitalize ${getStatusColor(order.status)}`}>
          {order.status}
        </span>
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <div>
          <p className="text-sm text-gray-500">{order.items?.length || 0} items</p>
          <p className="font-bold text-lg">৳{order.total}</p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/account/orders/${order.id}`}
            className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 flex items-center gap-1"
          >
            <Eye className="w-4 h-4" />
            View
          </Link>
          <button className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 flex items-center gap-1">
            <FileText className="w-4 h-4" />
            Invoice
          </button>
        </div>
      </div>
    </div>
  );
}


'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Package, Truck, CheckCircle, MapPin, CreditCard, FileText } from 'lucide-react';

export default function OrderDetailPage() {
  const params = useParams();

  // Placeholder order
  const order = {
    id: params.id,
    order_number: `ORD-${params.id}`,
    status: 'shipped',
    created_at: '2024-01-15',
    total: 5999,
    subtotal: 5500,
    shipping_cost: 60,
    discount: 0,
    payment_method: 'Cash on Delivery',
    shipping_address: {
      name: 'John Doe',
      phone: '01712345678',
      address: '123 Main Street, Dhaka',
      city: 'Dhaka',
    },
    items: [
      { id: 1, name: 'Wireless Headphones', quantity: 1, price: 3500, image: null },
      { id: 2, name: 'Smart Watch', quantity: 1, price: 2000, image: null },
    ],
    timeline: [
      { status: 'Order Placed', date: '2024-01-15 10:30 AM', completed: true },
      { status: 'Processing', date: '2024-01-15 02:00 PM', completed: true },
      { status: 'Shipped', date: '2024-01-16 09:00 AM', completed: true },
      { status: 'Delivered', date: '', completed: false },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'shipped': return 'text-[var(--bme-orange)] bg-[var(--primary-light)]';
      case 'processing': return 'text-blue-600 bg-blue-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div>
      <Link href="/account/orders" className="inline-flex items-center gap-2 text-[var(--bme-orange)] hover:underline mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Orders
      </Link>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{order.order_number}</h1>
          <p className="text-gray-500">Placed on {new Date(order.created_at).toLocaleDateString()}</p>
        </div>
        <span className={`px-4 py-2 rounded-full capitalize ${getStatusColor(order.status)}`}>
          {order.status}
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Order Items
            </h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0">
                    {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">৳{item.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Order Timeline
            </h2>
            <div className="space-y-4">
              {order.timeline.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${step.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`font-medium ${step.completed ? '' : 'text-gray-400'}`}>{step.status}</h3>
                    <p className="text-sm text-gray-500">{step.date || 'Pending'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>৳{order.subtotal}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>৳{order.shipping_cost}</span></div>
              {order.discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-৳{order.discount}</span></div>}
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-amber-600">৳{order.total}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Shipping Address
            </h2>
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-900">{order.shipping_address.name}</p>
              <p>{order.shipping_address.phone}</p>
              <p>{order.shipping_address.address}</p>
              <p>{order.shipping_address.city}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Method
            </h2>
            <p className="text-gray-600">{order.payment_method}</p>
          </div>

          <button className="w-full py-3 border rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
            <FileText className="w-5 h-5" />
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
}


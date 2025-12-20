'use client';

import { Bell, Check, Trash2, Package, Star, Tag } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';

export default function NotificationsPage() {
  const { notifications, unreadCount } = useAppSelector((state) => state.notification);

  // Placeholder data
  const notificationsList = [
    { id: 1, type: 'order', title: 'Order Delivered', message: 'Your order #ORD-001 has been delivered.', read: false, time: '2 hours ago' },
    { id: 2, type: 'promo', title: 'Flash Sale!', message: 'Get 50% off on selected items. Limited time offer!', read: false, time: '5 hours ago' },
    { id: 3, type: 'review', title: 'Review Approved', message: 'Your review for "Wireless Headphones" has been approved.', read: true, time: '1 day ago' },
    { id: 4, type: 'order', title: 'Order Shipped', message: 'Your order #ORD-002 has been shipped.', read: true, time: '2 days ago' },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'order': return Package;
      case 'review': return Star;
      case 'promo': return Tag;
      default: return Bell;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <button className="text-amber-600 hover:underline text-sm flex items-center gap-1">
          <Check className="w-4 h-4" />
          Mark all as read
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm divide-y">
        {notificationsList.map((notification) => {
          const Icon = getIcon(notification.type);
          return (
            <div 
              key={notification.id} 
              className={`p-4 flex gap-4 hover:bg-gray-50 transition ${!notification.read ? 'bg-amber-50/50' : ''}`}
            >
              <div className={`p-3 rounded-full flex-shrink-0 ${
                notification.type === 'order' ? 'bg-blue-100 text-blue-600' :
                notification.type === 'promo' ? 'bg-green-100 text-green-600' :
                'bg-amber-100 text-amber-600'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                    {notification.title}
                  </h3>
                  <span className="text-xs text-gray-400">{notification.time}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
              </div>
              <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg flex-shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}


import { Bell, Package, Star, Tag, Trash2 } from 'lucide-react';
import { Notification } from '@/types';

interface NotificationCardProps {
  notification: Notification;
  onMarkRead?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export default function NotificationCard({ notification, onMarkRead, onDelete }: NotificationCardProps) {
  const getIcon = () => {
    switch (notification.type) {
      case 'order_placed':
      case 'order_shipped':
      case 'order_delivered':
        return Package;
      case 'review_approved':
        return Star;
      case 'promotion':
      case 'price_drop':
        return Tag;
      default:
        return Bell;
    }
  };

  const getIconColor = () => {
    switch (notification.type) {
      case 'order_placed':
      case 'order_shipped':
      case 'order_delivered':
        return 'bg-blue-100 text-blue-600';
      case 'promotion':
      case 'price_drop':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-[var(--primary-light)] text-[var(--bme-orange)]';
    }
  };

  const Icon = getIcon();
  const isUnread = !notification.read_at;

  return (
    <div 
      className={`p-4 flex gap-4 hover:bg-gray-50 transition ${isUnread ? 'bg-[var(--primary-light)]/50' : ''}`}
      onClick={() => isUnread && onMarkRead?.(notification.id)}
    >
      <div className={`p-3 rounded-full flex-shrink-0 ${getIconColor()}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className={`font-semibold ${isUnread ? 'text-gray-900' : 'text-gray-600'}`}>
            {notification.title}
          </h3>
          <span className="text-xs text-gray-400">
            {new Date(notification.created_at).toLocaleDateString()}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
      </div>
      {onDelete && (
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(notification.id); }}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg flex-shrink-0"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}


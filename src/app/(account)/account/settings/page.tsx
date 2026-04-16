'use client';

import { useState } from 'react';
import { User, Lock, Bell, Trash2 } from 'lucide-react';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email_orders: true,
    email_promotions: false,
    sms_orders: true,
  });

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Account Settings</h1>

      {/* Profile */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          Profile Information
        </h2>
        <form className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input type="text" defaultValue="John Doe" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input type="email" defaultValue="john@example.com" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input type="tel" defaultValue="01712345678" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none" />
          </div>
          <button className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600">Save Changes</button>
        </form>
      </div>

      {/* Password */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Change Password
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Current Password</label>
            <input type="password" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">New Password</label>
              <input type="password" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <input type="password" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none" />
            </div>
          </div>
          <button className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600">Update Password</button>
        </form>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notification Preferences
        </h2>
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <span>Email notifications for orders</span>
            <input type="checkbox" checked={notifications.email_orders} onChange={(e) => setNotifications({...notifications, email_orders: e.target.checked})} className="w-5 h-5 text-amber-500 rounded" />
          </label>
          <label className="flex items-center justify-between">
            <span>Email notifications for promotions</span>
            <input type="checkbox" checked={notifications.email_promotions} onChange={(e) => setNotifications({...notifications, email_promotions: e.target.checked})} className="w-5 h-5 text-amber-500 rounded" />
          </label>
          <label className="flex items-center justify-between">
            <span>SMS notifications for orders</span>
            <input type="checkbox" checked={notifications.sms_orders} onChange={(e) => setNotifications({...notifications, sms_orders: e.target.checked})} className="w-5 h-5 text-amber-500 rounded" />
          </label>
        </div>
      </div>

      {/* Delete Account */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-red-200">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-red-600">
          <Trash2 className="w-5 h-5" />
          Delete Account
        </h2>
        <p className="text-gray-600 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
        <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Delete Account</button>
      </div>
    </div>
  );
}


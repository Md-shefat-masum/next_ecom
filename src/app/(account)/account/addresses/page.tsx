'use client';

import { useState } from 'react';
import { MapPin, Plus, Edit2, Trash2, Check } from 'lucide-react';

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([
    { id: 1, name: 'John Doe', phone: '01712345678', address: '123 Main St, Dhaka', city: 'Dhaka', is_default: true },
    { id: 2, name: 'John Doe', phone: '01712345678', address: '456 Office Rd, Chittagong', city: 'Chittagong', is_default: false },
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Addresses</h1>
        <button className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Address
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div key={address.id} className={`bg-white rounded-xl shadow-sm p-6 relative ${address.is_default ? 'ring-2 ring-amber-500' : ''}`}>
            {address.is_default && (
              <span className="absolute top-4 right-4 px-2 py-1 bg-amber-100 text-amber-600 text-xs rounded-full flex items-center gap-1">
                <Check className="w-3 h-3" />
                Default
              </span>
            )}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-100 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{address.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{address.phone}</p>
                <p className="text-gray-600 text-sm">{address.address}</p>
                <p className="text-gray-600 text-sm">{address.city}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t">
              <button className="flex-1 py-2 text-sm border rounded-lg hover:bg-gray-50 flex items-center justify-center gap-1">
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              {!address.is_default && (
                <>
                  <button className="flex-1 py-2 text-sm border rounded-lg hover:bg-gray-50">
                    Set Default
                  </button>
                  <button className="py-2 px-3 text-sm border border-red-200 text-red-500 rounded-lg hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


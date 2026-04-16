'use client';

import { useState } from 'react';
import { CreditCard, Plus, Edit2, Trash2, Check } from 'lucide-react';

export default function PaymentMethodsPage() {
  const [methods, setMethods] = useState([
    { id: 1, type: 'visa', last_four: '4242', holder: 'John Doe', expiry: '12/25', is_default: true },
    { id: 2, type: 'mastercard', last_four: '5555', holder: 'John Doe', expiry: '06/24', is_default: false },
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payment Methods</h1>
        <button className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Card
        </button>
      </div>

      <div className="space-y-4">
        {methods.map((method) => (
          <div key={method.id} className={`bg-white rounded-xl shadow-sm p-6 ${method.is_default ? 'ring-2 ring-amber-500' : ''}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <CreditCard className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold capitalize">{method.type}</span>
                    <span className="text-gray-500">•••• {method.last_four}</span>
                    {method.is_default && (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-600 text-xs rounded-full flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{method.holder} • Expires {method.expiry}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Edit2 className="w-4 h-4" />
                </button>
                {!method.is_default && (
                  <button className="p-2 hover:bg-red-50 text-red-500 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


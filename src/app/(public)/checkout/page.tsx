'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, MapPin, CreditCard, FileText } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';

const steps = [
  { id: 'shipping', label: 'Shipping', icon: MapPin },
  { id: 'payment', label: 'Payment', icon: CreditCard },
  { id: 'review', label: 'Review', icon: FileText },
];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const { items, totalPrice } = useAppSelector((state) => state.cart);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/shop" className="text-amber-600 hover:underline">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Steps */}
      <div className="flex items-center justify-center mb-12">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          
          return (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                isActive ? 'bg-amber-500 text-white' : 
                isCompleted ? 'bg-green-500 text-white' : 'bg-gray-100'
              }`}>
                {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                <span className="font-medium">{step.label}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-1 mx-2 ${index < currentStep ? 'bg-green-500' : 'bg-gray-200'}`} />
              )}
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          {currentStep === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Shipping Address</h2>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input type="text" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input type="tel" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <input type="text" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none" />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">City</label>
                    <input type="text" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">State</label>
                    <input type="text" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Postal Code</label>
                    <input type="text" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none" />
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="w-full py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
                >
                  Continue to Payment
                </button>
              </form>
            </div>
          )}

          {currentStep === 1 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Payment Method</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:border-amber-500">
                  <input type="radio" name="payment" className="w-5 h-5 text-amber-500" defaultChecked />
                  <span>Cash on Delivery</span>
                </label>
                <label className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:border-amber-500">
                  <input type="radio" name="payment" className="w-5 h-5 text-amber-500" />
                  <span>bKash</span>
                </label>
                <label className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:border-amber-500">
                  <input type="radio" name="payment" className="w-5 h-5 text-amber-500" />
                  <span>Credit/Debit Card</span>
                </label>
              </div>
              <div className="flex gap-4 mt-6">
                <button onClick={() => setCurrentStep(0)} className="flex-1 py-3 border rounded-lg hover:bg-gray-50">Back</button>
                <button onClick={() => setCurrentStep(2)} className="flex-1 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600">Continue</button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Review Order</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.product?.name}</h3>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">৳{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <button onClick={() => setCurrentStep(1)} className="flex-1 py-3 border rounded-lg hover:bg-gray-50">Back</button>
                <button className="flex-1 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600">Place Order</button>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div>
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between"><span>Subtotal</span><span>৳{totalPrice}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>৳60</span></div>
              <div className="flex justify-between"><span>Tax</span><span>৳0</span></div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-amber-600">৳{totalPrice + 60}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


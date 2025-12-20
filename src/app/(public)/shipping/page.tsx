import { Truck, Clock, MapPin, Package } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Shipping Information</h1>

      <div className="max-w-4xl mx-auto">
        {/* Shipping Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-amber-100 rounded-lg">
                <Truck className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold">Standard Shipping</h3>
                <p className="text-gray-500">3-5 Business Days</p>
              </div>
            </div>
            <p className="text-gray-600">Free for orders over ৳5000. Otherwise ৳60-120 based on location.</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-amber-100 rounded-lg">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold">Express Shipping</h3>
                <p className="text-gray-500">1-2 Business Days</p>
              </div>
            </div>
            <p className="text-gray-600">৳150-250 based on location. Available for Dhaka and major cities.</p>
          </div>
        </div>

        {/* Delivery Areas */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <MapPin className="w-6 h-6 text-amber-600" />
            Delivery Areas
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Dhaka Division</h3>
              <p className="text-gray-600 text-sm">1-2 days delivery</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Chittagong Division</h3>
              <p className="text-gray-600 text-sm">2-3 days delivery</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Other Divisions</h3>
              <p className="text-gray-600 text-sm">3-5 days delivery</p>
            </div>
          </div>
        </div>

        {/* Order Tracking */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Package className="w-6 h-6 text-amber-600" />
            Order Tracking
          </h2>
          <p className="text-gray-600 mb-4">
            Once your order ships, you will receive an email with tracking information.
            You can also track your order from your account dashboard.
          </p>
          <p className="text-gray-600">
            For any shipping inquiries, contact us at shipping@bmestore.com
          </p>
        </div>
      </div>
    </div>
  );
}


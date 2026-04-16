import { RefreshCw, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Returns & Refunds</h1>

      <div className="max-w-4xl mx-auto">
        {/* Policy Overview */}
        <div className="bg-amber-50 rounded-xl p-6 mb-12">
          <div className="flex items-center gap-4">
            <RefreshCw className="w-12 h-12 text-amber-600" />
            <div>
              <h2 className="text-2xl font-bold">30-Day Return Policy</h2>
              <p className="text-gray-600">We want you to be completely satisfied with your purchase.</p>
            </div>
          </div>
        </div>

        {/* Eligible Items */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              Eligible for Return
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Unused items in original packaging</li>
              <li>• Items with all tags attached</li>
              <li>• Items returned within 30 days</li>
              <li>• Defective or damaged items</li>
              <li>• Wrong items received</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-red-600">
              <XCircle className="w-5 h-5" />
              Not Eligible for Return
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Used or worn items</li>
              <li>• Items without original packaging</li>
              <li>• Personalized or custom items</li>
              <li>• Perishable goods</li>
              <li>• Intimate or sanitary goods</li>
            </ul>
          </div>
        </div>

        {/* Return Process */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">How to Return</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <h3 className="font-semibold">Initiate Return</h3>
                <p className="text-gray-600">Go to your account → Orders → Select order → Request Return</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <h3 className="font-semibold">Pack the Item</h3>
                <p className="text-gray-600">Pack the item securely in original packaging</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <h3 className="font-semibold">Ship or Drop Off</h3>
                <p className="text-gray-600">Use the provided shipping label or drop off at a pickup point</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
              <div>
                <h3 className="font-semibold">Receive Refund</h3>
                <p className="text-gray-600">Refund processed within 5-7 business days after inspection</p>
              </div>
            </div>
          </div>
        </div>

        {/* Refund Timeline */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Clock className="w-6 h-6 text-amber-600" />
            Refund Timeline
          </h2>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Payment Method</th>
                <th className="text-left py-3">Refund Time</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr className="border-b">
                <td className="py-3">Credit/Debit Card</td>
                <td className="py-3">5-7 business days</td>
              </tr>
              <tr className="border-b">
                <td className="py-3">bKash/Nagad</td>
                <td className="py-3">2-3 business days</td>
              </tr>
              <tr>
                <td className="py-3">Cash on Delivery</td>
                <td className="py-3">Bank transfer within 5-7 days</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


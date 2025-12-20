export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">Last updated: January 2024</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
          <p className="text-gray-600 mb-6">
            We collect information you provide directly, including name, email, phone, and shipping address.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Your Information</h2>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
            <li>Process and fulfill your orders</li>
            <li>Send order confirmations and updates</li>
            <li>Respond to your inquiries</li>
            <li>Improve our services</li>
            <li>Send promotional communications (with your consent)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Information Sharing</h2>
          <p className="text-gray-600 mb-6">
            We do not sell your personal information. We share data only with service providers necessary for order fulfillment.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Data Security</h2>
          <p className="text-gray-600 mb-6">
            We implement industry-standard security measures to protect your information.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Your Rights</h2>
          <p className="text-gray-600 mb-6">
            You can access, update, or delete your personal information through your account settings.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-600">
            For privacy concerns, contact us at privacy@bmestore.com
          </p>
        </div>
      </div>
    </div>
  );
}


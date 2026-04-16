export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>
        
        <div className="prose prose-lg mx-auto">
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Welcome to BMEStore, your trusted destination for quality products at competitive prices. 
            We are committed to providing an exceptional shopping experience with a wide range of products 
            across various categories.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            Our mission is to make quality products accessible to everyone. We believe that great products 
            shouldn&apos;t come with a hefty price tag, and we work tirelessly to bring you the best deals 
            without compromising on quality.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Why Choose Us?</h2>
          <ul className="space-y-3 text-gray-600">
            <li>✓ Wide selection of quality products</li>
            <li>✓ Competitive prices</li>
            <li>✓ Fast and reliable shipping</li>
            <li>✓ Excellent customer service</li>
            <li>✓ Easy returns and refunds</li>
            <li>✓ Secure payment options</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Values</h2>
          <p className="text-gray-600 mb-6">
            At BMEStore, we value integrity, customer satisfaction, and continuous improvement. 
            We are constantly evolving to meet the changing needs of our customers and to stay 
            ahead in the e-commerce landscape.
          </p>
        </div>
      </div>
    </div>
  );
}


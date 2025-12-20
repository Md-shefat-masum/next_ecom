import Link from 'next/link';
import { Truck, Shield, Headphones, RefreshCw } from 'lucide-react';
import Hero from '@/components/features/ecommerce/home/Hero';

export default function HomePage() {
  return (
    <div>
      <Hero />

      {/* Features */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary-light rounded-lg">
                <Truck className="w-6 h-6 text-bme-orange" />
              </div>
              <div>
                <h3 className="font-semibold">Free Shipping</h3>
                <p className="text-sm text-gray-500">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary-light rounded-lg">
                <Shield className="w-6 h-6 text-bme-orange" />
              </div>
              <div>
                <h3 className="font-semibold">Secure Payment</h3>
                <p className="text-sm text-gray-500">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary-light rounded-lg">
                <Headphones className="w-6 h-6 text-bme-orange" />
              </div>
              <div>
                <h3 className="font-semibold">24/7 Support</h3>
                <p className="text-sm text-gray-500">Dedicated support</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary-light rounded-lg">
                <RefreshCw className="w-6 h-6 text-bme-orange" />
              </div>
              <div>
                <h3 className="font-semibold">Easy Returns</h3>
                <p className="text-sm text-gray-500">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports', 'Books'].map((cat) => (
              <Link
                key={cat}
                href={`/categories/${cat.toLowerCase()}`}
                className="group p-6 bg-gray-50 rounded-xl text-center hover:bg-primary-light transition"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center group-hover:bg-primary-light transition">
                  <span className="text-2xl">📦</span>
                </div>
                <h3 className="font-medium group-hover:text-bme-orange transition">{cat}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-bme-orange">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Newsletter</h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Subscribe to get special offers, free giveaways, and exclusive deals.
          </p>
          <form className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-6 py-3 bg-bme-blue text-white rounded-lg hover:bg-secondary-hover transition">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}


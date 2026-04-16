import { Truck, Shield, Headphones, RefreshCw } from 'lucide-react';
import Hero from '@/components/features/ecommerce/home/Hero';
import FeaturedCategoryProducts from '@/components/features/ecommerce/home/FeaturedCategoryProducts';

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
      <FeaturedCategoryProducts />

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


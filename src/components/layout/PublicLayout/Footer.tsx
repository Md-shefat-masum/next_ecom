import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              BME<span className="text-amber-500">Store</span>
            </h3>
            <p className="text-sm mb-4">
              Your trusted destination for quality products at competitive prices. 
              Shop with confidence and enjoy our excellent customer service.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-amber-500 transition"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-amber-500 transition"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-amber-500 transition"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-amber-500 transition"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="hover:text-amber-500 transition">Shop</Link></li>
              <li><Link href="/categories" className="hover:text-amber-500 transition">Categories</Link></li>
              <li><Link href="/brands" className="hover:text-amber-500 transition">Brands</Link></li>
              <li><Link href="/collections" className="hover:text-amber-500 transition">Collections</Link></li>
              <li><Link href="/blog" className="hover:text-amber-500 transition">Blog</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-amber-500 transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-amber-500 transition">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-amber-500 transition">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-amber-500 transition">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-amber-500 transition">Returns Policy</Link></li>
              <li><Link href="/terms" className="hover:text-amber-500 transition">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-amber-500 transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>123 Business Street, City, Country 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span>+1 234 567 8900</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span>support@bmestore.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>&copy; {new Date().getFullYear()} BMEStore. All rights reserved.</p>
            <div className="flex gap-4">
              <img src="/images/payment/visa.svg" alt="Visa" className="h-6" />
              <img src="/images/payment/mastercard.svg" alt="Mastercard" className="h-6" />
              <img src="/images/payment/paypal.svg" alt="PayPal" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


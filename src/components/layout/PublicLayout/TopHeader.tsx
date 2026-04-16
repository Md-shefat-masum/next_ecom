import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function TopHeader() {
  return (
    <div className="bg-[var(--bme-blue)] text-white text-sm py-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center gap-2">
          {/* Contact Info */}
          <div className="flex items-center gap-4">
            <a href="tel:+1234567890" className="flex items-center gap-1 hover:text-[var(--bme-orange)] transition">
              <Phone className="w-3 h-3" />
              <span className="hidden sm:inline">+1 234 567 890</span>
            </a>
            <a href="mailto:support@bmestore.com" className="flex items-center gap-1 hover:text-[var(--bme-orange)] transition">
              <Mail className="w-3 h-3" />
              <span className="hidden sm:inline">support@bmestore.com</span>
            </a>
          </div>

          {/* Announcement */}
          <div className="hidden md:block text-[var(--bme-orange)]">
            🎉 Free shipping on orders over ৳5000!
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-[var(--bme-orange)] transition">About</Link>
            <Link href="/contact" className="hover:text-[var(--bme-orange)] transition">Contact</Link>
            <Link href="/faq" className="hover:text-[var(--bme-orange)] transition">FAQ</Link>
          </div>
        </div>
      </div>
    </div>
  );
}


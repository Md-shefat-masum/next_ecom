import Link from 'next/link';
import { Brand } from '@/types';

interface BrandCardProps {
  brand: Brand;
}

export default function BrandCard({ brand }: BrandCardProps) {
  return (
    <Link
      href={`/brands/${brand.slug}`}
      className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center justify-center hover:shadow-md transition group"
    >
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 overflow-hidden">
        {brand.logo ? (
          <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain p-2" />
        ) : (
          <span className="text-3xl font-bold text-gray-400">{brand.name.charAt(0)}</span>
        )}
      </div>
      <h3 className="font-semibold text-center group-hover:text-[var(--bme-orange)] transition">{brand.name}</h3>
      {brand.products_count !== undefined && (
        <p className="text-sm text-gray-500 mt-1">{brand.products_count} products</p>
      )}
    </Link>
  );
}


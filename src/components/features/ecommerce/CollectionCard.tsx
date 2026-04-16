import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Collection } from '@/types';

interface CollectionCardProps {
  collection: Collection;
  variant?: 'default' | 'large';
}

export default function CollectionCard({ collection, variant = 'default' }: CollectionCardProps) {
  const isLarge = variant === 'large';

  return (
    <Link
      href={`/collections/${collection.slug}`}
      className={`relative overflow-hidden rounded-xl group ${isLarge ? 'h-80' : 'h-48'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--bme-blue)] to-[var(--secondary-dark)]">
        {collection.image && (
          <img 
            src={collection.image} 
            alt={collection.name} 
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-500" 
          />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className={`font-bold mb-2 group-hover:text-[var(--bme-orange)] transition ${isLarge ? 'text-2xl' : 'text-lg'}`}>
          {collection.name}
        </h3>
        {collection.description && (
          <p className={`text-gray-300 mb-3 line-clamp-2 ${isLarge ? '' : 'text-sm'}`}>
            {collection.description}
          </p>
        )}
        <span className="inline-flex items-center gap-1 text-[var(--bme-orange)] text-sm font-medium">
          Shop Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
        </span>
      </div>
    </Link>
  );
}


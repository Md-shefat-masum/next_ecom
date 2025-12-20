import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="bg-white rounded-xl shadow-sm overflow-hidden group"
    >
      <div className="aspect-video bg-gray-100 relative">
        {category.image ? (
          <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--primary-light)] to-[var(--primary-light)]">
            <span className="text-4xl font-bold text-[var(--bme-orange)]">{category.name.charAt(0)}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-bold text-lg">{category.name}</h3>
          {category.products_count !== undefined && (
            <p className="text-sm text-gray-200">{category.products_count} products</p>
          )}
        </div>
      </div>
      {category.subcategories && category.subcategories.length > 0 && (
        <div className="p-4">
          <div className="flex flex-wrap gap-2">
            {category.subcategories.slice(0, 4).map((sub) => (
              <span key={sub.id} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                {sub.name}
              </span>
            ))}
            {category.subcategories.length > 4 && (
              <span className="text-xs px-2 py-1 bg-[var(--primary-light)] text-[var(--bme-orange)] rounded-full">
                +{category.subcategories.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}
    </Link>
  );
}


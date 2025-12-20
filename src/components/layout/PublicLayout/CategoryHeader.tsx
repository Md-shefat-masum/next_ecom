'use client';

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const categories = [
  { name: 'Electronics', slug: 'electronics', subcategories: ['Phones', 'Laptops', 'Tablets', 'Accessories'] },
  { name: 'Fashion', slug: 'fashion', subcategories: ['Men', 'Women', 'Kids', 'Shoes'] },
  { name: 'Home & Garden', slug: 'home-garden', subcategories: ['Furniture', 'Decor', 'Kitchen', 'Garden'] },
  { name: 'Sports', slug: 'sports', subcategories: ['Fitness', 'Outdoor', 'Team Sports', 'Water Sports'] },
  { name: 'Beauty', slug: 'beauty', subcategories: ['Skincare', 'Makeup', 'Hair Care', 'Fragrances'] },
  { name: 'Books', slug: 'books', subcategories: ['Fiction', 'Non-Fiction', 'Children', 'Educational'] },
];

export default function CategoryHeader() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <nav className="bg-white border-b hidden lg:block">
      <div className="container mx-auto px-4">
        <ul className="flex items-center gap-1">
          <li>
            <Link href="/shop" className="px-4 py-3 hover:text-[var(--bme-orange)] transition font-medium inline-block">
              All Products
            </Link>
          </li>
          {categories.map((category) => (
            <li 
              key={category.slug}
              className="relative"
              onMouseEnter={() => setActiveCategory(category.slug)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <Link 
                href={`/categories/${category.slug}`}
                className="px-4 py-3 hover:text-[var(--bme-orange)] transition inline-flex items-center gap-1"
              >
                {category.name}
                <ChevronDown className="w-4 h-4" />
              </Link>

              {/* Dropdown */}
              {activeCategory === category.slug && (
                <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                  {category.subcategories.map((sub) => (
                    <Link
                      key={sub}
                      href={`/categories/${category.slug}/${sub.toLowerCase().replace(' ', '-')}`}
                      className="block px-4 py-2 hover:bg-[var(--primary-light)] hover:text-[var(--bme-orange)] transition"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
          <li>
            <Link href="/brands" className="px-4 py-3 hover:text-[var(--bme-orange)] transition inline-block">
              Brands
            </Link>
          </li>
          <li>
            <Link href="/collections" className="px-4 py-3 hover:text-[var(--bme-orange)] transition inline-block">
              Collections
            </Link>
          </li>
          <li>
            <Link href="/blog" className="px-4 py-3 hover:text-[var(--bme-orange)] transition inline-block">
              Blog
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}


'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

interface FilterSection {
  title: string;
  isOpen: boolean;
}

export default function ProductFilters() {
  const [sections, setSections] = useState<Record<string, boolean>>({
    categories: true,
    price: true,
    brands: true,
    rating: false,
  });

  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  const toggleSection = (key: string) => {
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const categories = ['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 'Beauty'];
  const brands = ['Apple', 'Samsung', 'Sony', 'Nike', 'Adidas', 'Puma'];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg">Filters</h3>
        <button className="text-sm text-amber-600 hover:underline">Clear All</button>
      </div>

      {/* Categories */}
      <div className="border-b pb-4 mb-4">
        <button 
          onClick={() => toggleSection('categories')}
          className="flex justify-between items-center w-full mb-3"
        >
          <span className="font-semibold">Categories</span>
          {sections.categories ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {sections.categories && (
          <div className="space-y-2">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500" />
                <span className="text-sm">{cat}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="border-b pb-4 mb-4">
        <button 
          onClick={() => toggleSection('price')}
          className="flex justify-between items-center w-full mb-3"
        >
          <span className="font-semibold">Price Range</span>
          {sections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {sections.price && (
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                placeholder="Min"
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                placeholder="Max"
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <input
              type="range"
              min="0"
              max="10000"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
              className="w-full accent-amber-500"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>৳{priceRange.min}</span>
              <span>৳{priceRange.max}</span>
            </div>
          </div>
        )}
      </div>

      {/* Brands */}
      <div className="border-b pb-4 mb-4">
        <button 
          onClick={() => toggleSection('brands')}
          className="flex justify-between items-center w-full mb-3"
        >
          <span className="font-semibold">Brands</span>
          {sections.brands ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {sections.brands && (
          <div className="space-y-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500" />
                <span className="text-sm">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating */}
      <div>
        <button 
          onClick={() => toggleSection('rating')}
          className="flex justify-between items-center w-full mb-3"
        >
          <span className="font-semibold">Rating</span>
          {sections.rating ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {sections.rating && (
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500" />
                <span className="text-amber-500">{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</span>
                <span className="text-sm text-gray-500">& up</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


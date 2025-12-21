'use client';

import Link from 'next/link';
import { useCategorySubcategoryBrands } from '@/lib/hooks/useCategories';
import { CategorySubcategoryBrandSubcategory, CategorySubcategoryBrand } from '@/types';
import './CategoryHeader.css';

export default function CategoryHeader() {
  const { data: categoriesData, isLoading } = useCategorySubcategoryBrands();

  // Split subcategories into columns (2 columns for better layout)
  const splitIntoColumns = (items: CategorySubcategoryBrandSubcategory[], columns: number = 2): CategorySubcategoryBrandSubcategory[][] => {
    const itemsPerColumn = Math.ceil(items.length / columns);
    const result: CategorySubcategoryBrandSubcategory[][] = [];
    for (let i = 0; i < columns; i++) {
      result.push(items.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn));
    }
    return result;
  };

  return (
    <nav id="main-nav" className="navbar bg-white border-b hidden lg:block">
      <div className="container mx-auto px-4">
        <ul className="nav-list navbar-nav flex items-center gap-1">
          {isLoading ? (
            <li className="nav-item px-4 py-3 text-gray-400">Loading...</li>
          ) : (
            categoriesData?.map((category) => {
              const hasSubcategories = category.sub_categories && category.sub_categories.length > 0;
              const subcategoryColumns = hasSubcategories ? splitIntoColumns(category.sub_categories, 1) : [];

              return (
                <li 
                  key={category.slug}
                  className={`nav-item main_category_item ${hasSubcategories ? 'has-child multi-col' : ''}`}
                >
                  <Link 
                    href={`/categories/${category.slug}`}
                    className="nav-link px-[5px] py-3 hover:text-bme-orange transition"
                  >
                    {category.name}
                  </Link>

                  {/* Level 1 Dropdown - Subcategories */}
                  {hasSubcategories && (
                    <div className="drop-down drop-menu-1">
                      {subcategoryColumns.map((column, colIndex) => (
                        <ul key={colIndex}>
                          {column.map((subcategory) => {
                            const hasBrands = subcategory.brands && subcategory.brands.length > 0;
                            return (
                              <li 
                                key={subcategory.slug}
                                className={`nav-item ${hasBrands ? 'has-child' : ''}`}
                              >
                                <Link
                                  href={`/categories/${category.slug}/${subcategory.slug}`}
                                  className="nav-link"
                                >
                                  {subcategory.name}
                                </Link>

                                {/* Level 2 Dropdown - Brands */}
                                {hasBrands && (
                                  <ul className="drop-down drop-menu-2">
                                    {subcategory.brands.map((brand: CategorySubcategoryBrand) => {
                                      const brandUrl = brand.category_sub_category_brand_slug 
                                        ? `/categories/${category.slug}/${subcategory.slug}/${brand.category_sub_category_brand_slug}`
                                        : `/brands/${brand.slug}`;
                                      return (
                                        <li key={brand.slug} className="nav-item">
                                          <Link
                                            href={brandUrl}
                                            className="nav-link"
                                          >
                                            {brand.name}
                                          </Link>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      ))}
                      {/* Show All Link */}
                      <ul>
                        <li>
                          <Link 
                            href={`/categories/${category.slug}`}
                            className="see-all"
                          >
                            Show All {category.name}
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
              );
            })
          )}
        </ul>
      </div>
    </nav>
  );
}


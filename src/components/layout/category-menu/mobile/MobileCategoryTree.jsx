"use client";

import { useMemo, useState } from "react";
import { MobileCategoryItem } from "./MobileCategoryItem";

function itemMatchesSearch(item, searchTerm) {
  if (!searchTerm) return true;
  return item.name?.toLowerCase().includes(searchTerm);
}

function filterCategories(categories, searchTerm) {
  const term = searchTerm.trim().toLowerCase();
  if (!term) return categories;

  return categories
    .map((category) => {
      const subcategories = category.subcategories || [];
      const filteredSubcategories = subcategories
        .map((subcategory) => {
          const childCategories = subcategory.child_categories || [];
          const filteredChildren = childCategories.filter((child) =>
            itemMatchesSearch(child, term),
          );
          const keepSubcategory =
            itemMatchesSearch(subcategory, term) || filteredChildren.length > 0;

          return keepSubcategory
            ? { ...subcategory, child_categories: filteredChildren.length > 0 ? filteredChildren : childCategories }
            : null;
        })
        .filter(Boolean);

      const keepCategory = itemMatchesSearch(category, term) || filteredSubcategories.length > 0;
      return keepCategory ? { ...category, subcategories: filteredSubcategories } : null;
    })
    .filter(Boolean);
}

export function MobileCategoryTree({ categories, searchTerm, onNavigate }) {
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [activeSubcategoryId, setActiveSubcategoryId] = useState(null);
  const filteredCategories = useMemo(
    () => filterCategories(categories, searchTerm),
    [categories, searchTerm],
  );

  const handleCategoryToggle = (categoryId) => {
    setActiveCategoryId((currentId) => (currentId === categoryId ? null : categoryId));
    setActiveSubcategoryId(null);
  };

  const handleSubcategoryToggle = (subcategoryId) => {
    setActiveSubcategoryId((currentId) =>
      currentId === subcategoryId ? null : subcategoryId,
    );
  };

  if (filteredCategories.length === 0) {
    return (
      <div className="px-6 py-10 text-center text-sm text-slate-500">
        No categories found.
      </div>
    );
  }

  return (
    <div>
      {filteredCategories.map((category) => (
        <MobileCategoryItem
          key={`category-${category.id}-${category.slug}`}
          category={category}
          expanded={activeCategoryId === category.id}
          activeSubcategoryId={activeSubcategoryId}
          onCategoryToggle={handleCategoryToggle}
          onSubcategoryToggle={handleSubcategoryToggle}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
}

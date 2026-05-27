import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { defaultGeneralInfo } from "@/config";

function ToggleIcon({ expanded }) {
  const Icon = expanded ? Minus : Plus;
  return <Icon size={18} strokeWidth={2} />;
}

export function MobileCategoryItem({
  category,
  expanded,
  activeSubcategoryId,
  onCategoryToggle,
  onSubcategoryToggle,
  onNavigate,
}) {
  const subcategories = category.subcategories || [];
  const hasSubcategories = subcategories.length > 0;

  if (!hasSubcategories) {
    return (
      <Link
        href={`/${category.slug}`}
        onClick={onNavigate}
        className="flex h-14 items-center justify-between border-b px-6 text-[15px] font-semibold"
        style={{
          borderColor: defaultGeneralInfo.border_soft_color,
          color: defaultGeneralInfo.title_color,
        }}
      >
        <span>{category.name}</span>
        <Plus size={18} strokeWidth={2} />
      </Link>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => onCategoryToggle(category.id)}
        aria-expanded={expanded}
        className="flex h-14 w-full items-center justify-between border-b px-6 text-left text-[15px] font-semibold transition"
        style={{
          backgroundColor: expanded ? defaultGeneralInfo.outline_button_hover_background_color : "transparent",
          borderColor: defaultGeneralInfo.border_soft_color,
          color: expanded ? defaultGeneralInfo.primary_color : defaultGeneralInfo.title_color,
        }}
      >
        <span>{category.name}</span>
        <ToggleIcon expanded={expanded} />
      </button>

      <div
        className="overflow-hidden transition-all duration-200 ease-out"
        style={{
          maxHeight: expanded ? `${Math.max(subcategories.length * 190, 240)}px` : "0px",
          opacity: expanded ? 1 : 0,
        }}
      >
        <div className="relative ml-6 border-l py-1" style={{ borderColor: defaultGeneralInfo.border_soft_color }}>
          {subcategories.map((subcategory) => {
            const childCategories = subcategory.child_categories || [];
            const hasChildren = childCategories.length > 0;
            const isExpanded = activeSubcategoryId === subcategory.id;

            if (!hasChildren) {
              return (
                <Link
                  key={`subcategory-link-${category.id}-${subcategory.id}-${subcategory.slug}`}
                  href={`/${subcategory.slug}`}
                  onClick={onNavigate}
                  className="flex h-12 items-center border-b py-1 pl-7 pr-6 text-sm font-medium"
                  style={{
                    borderColor: defaultGeneralInfo.border_soft_color,
                    color: defaultGeneralInfo.text_body_color,
                  }}
                >
                  {subcategory.name}
                </Link>
              );
            }

            return (
              <div key={`subcategory-group-${category.id}-${subcategory.id}-${subcategory.slug}`}>
                <button
                  type="button"
                  onClick={() => onSubcategoryToggle(subcategory.id)}
                  aria-expanded={isExpanded}
                  className="flex h-12 w-full items-center justify-between border-b py-1 pl-7 pr-6 text-left text-sm font-medium transition"
                  style={{
                    backgroundColor: isExpanded
                      ? defaultGeneralInfo.outline_button_hover_background_color
                      : "transparent",
                    borderColor: defaultGeneralInfo.border_soft_color,
                    color: isExpanded
                      ? defaultGeneralInfo.primary_color
                      : defaultGeneralInfo.text_body_color,
                  }}
                >
                  <span>{subcategory.name}</span>
                  <ToggleIcon expanded={isExpanded} />
                </button>

                <div
                  className="overflow-hidden transition-all duration-200 ease-out"
                  style={{
                    maxHeight: isExpanded ? `${childCategories.length * 44}px` : "0px",
                    opacity: isExpanded ? 1 : 0,
                  }}
                >
                  <div className="relative ml-6 border-l py-1" style={{ borderColor: defaultGeneralInfo.border_soft_color }}>
                    {childCategories.map((childCategory) => (
                      <Link
                        key={`child-${category.id}-${subcategory.id}-${childCategory.id}-${childCategory.slug}`}
                        href={`/${childCategory.slug}`}
                        onClick={onNavigate}
                        className="flex min-h-10 items-center gap-3 py-2 pl-7 pr-6 text-sm"
                        style={{ color: defaultGeneralInfo.text_body_color }}
                      >
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: defaultGeneralInfo.primary_bright_color }}
                        />
                        <span>{childCategory.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

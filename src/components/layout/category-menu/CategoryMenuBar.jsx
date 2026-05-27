"use client";

import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { defaultGeneralInfo } from "@/config";
import { useGetCategoriesQuery } from "@/store/api";
import { previewCategories } from "./previewCategories";

function getInitialSubcategory(category) {
  return category?.subcategories?.[0] || null;
}

function getVisibleCategoryCount() {
  if (typeof window === "undefined") return 8;
  if (window.matchMedia("(min-width: 1440px)").matches) return 11;
  if (window.matchMedia("(min-width: 1200px)").matches) return 9;
  return 7;
}

function getMegaMenuWidth() {
  if (typeof window === "undefined") return 820;
  if (window.matchMedia("(max-width: 1199px)").matches) {
    return Math.min(680, window.innerWidth - 32);
  }

  return Math.min(820, Math.max(760, window.innerWidth * 0.58));
}

function getChildCategoryKey(childCategory, index) {
  const type = childCategory.brand_id ? "brand" : "child";

  return `${type}-${childCategory.id}-${childCategory.slug || index}`;
}

function CategoryMegaPanel({ category, activeSubcategory, onSubcategoryChange, left, width }) {
  const subcategories = category?.subcategories || [];
  const childCategories = activeSubcategory?.child_categories || [];

  if (!category || subcategories.length === 0) return null;

  return (
    <div
      className="bme-tech-dropdown absolute top-[calc(100%+6px)] z-40"
      style={{
        left,
        width,
        maxWidth: "calc(100vw - 32px)",
      }}
    >
      <div
        className="flex h-12 items-center gap-3 border-b px-8 text-sm"
        style={{
          borderColor: defaultGeneralInfo.border_soft_color,
          color: defaultGeneralInfo.text_muted_color,
        }}
      >
        <Link
          href={`/${category.slug}`}
          className="font-medium transition hover:text-[var(--menu-primary)]"
          style={{ "--menu-primary": defaultGeneralInfo.primary_color }}
        >
          {category.name}
        </Link>
        <ChevronRight size={16} />
        {activeSubcategory ? (
          <Link
            href={`/${activeSubcategory.slug}`}
            className="font-medium transition hover:text-[var(--menu-primary)]"
            style={{ "--menu-primary": defaultGeneralInfo.primary_color }}
          >
            {activeSubcategory.name}
          </Link>
        ) : null}
      </div>

      <div className="grid min-h-[390px] grid-cols-3">
        <div
          className="border-r py-3"
          style={{ borderColor: defaultGeneralInfo.border_soft_color }}
        >
          {subcategories.map((subcategory) => {
            const isActive = activeSubcategory?.id === subcategory.id;

            return (
              <Link
                key={subcategory.id}
                href={`/${subcategory.slug}`}
                onMouseEnter={() => onSubcategoryChange(subcategory)}
                onFocus={() => onSubcategoryChange(subcategory)}
                className="relative flex h-12 items-center justify-between px-8 text-sm font-medium transition"
                style={{
                  backgroundColor: isActive
                    ? defaultGeneralInfo.outline_button_hover_background_color
                    : "transparent",
                  color: isActive
                    ? defaultGeneralInfo.primary_bright_color
                    : defaultGeneralInfo.title_color,
                }}
              >
                {isActive ? (
                  <span
                    className="absolute left-0 top-0 h-full w-1 rounded-r"
                    style={{ backgroundColor: defaultGeneralInfo.primary_bright_color }}
                  />
                ) : null}
                <span>{subcategory.name}</span>
                <ChevronRight size={16} />
              </Link>
            );
          })}
        </div>

        <div
          className="border-r py-3"
          style={{ borderColor: defaultGeneralInfo.border_soft_color }}
        >
          <Link
            href={`/${activeSubcategory?.slug || category.slug}`}
            className="flex h-12 items-center px-8 text-sm font-semibold transition hover:text-[var(--menu-primary)]"
            style={{
              color: defaultGeneralInfo.primary_bright_color,
              "--menu-primary": defaultGeneralInfo.primary_dark_color,
            }}
          >
            {activeSubcategory ? `All ${activeSubcategory.name}` : `All ${category.name}`}
          </Link>

          {childCategories.map((childCategory, index) => (
            <Link
              key={getChildCategoryKey(childCategory, index)}
              href={`/${childCategory.slug}`}
              className="flex h-12 items-center justify-between px-8 text-sm font-medium transition hover:bg-[var(--menu-hover)] hover:text-[var(--menu-primary)]"
              style={{
                color: defaultGeneralInfo.title_color,
                "--menu-hover": defaultGeneralInfo.mega_menu_hover_background_color,
                "--menu-primary": defaultGeneralInfo.primary_color,
              }}
            >
              <span>{childCategory.name}</span>
              <ChevronRight size={16} />
            </Link>
          ))}
        </div>

        <div className="px-8 py-6">
          <p
            className="text-sm font-semibold"
            style={{ color: defaultGeneralInfo.title_color }}
          >
            Explore
          </p>
          <div className="mt-4 space-y-3">
            <Link
              href={`/${category.slug}`}
              className="block text-sm transition hover:text-[var(--menu-primary)]"
              style={{
                color: defaultGeneralInfo.text_body_color,
                "--menu-primary": defaultGeneralInfo.primary_color,
              }}
            >
              All {category.name}
            </Link>
            {activeSubcategory ? (
              <Link
                href={`/${activeSubcategory.slug}`}
                className="block text-sm transition hover:text-[var(--menu-primary)]"
                style={{
                  color: defaultGeneralInfo.text_body_color,
                  "--menu-primary": defaultGeneralInfo.primary_color,
                }}
              >
                All {activeSubcategory.name}
              </Link>
            ) : null}
            {childCategories.slice(0, 5).map((childCategory, index) => (
              <Link
                key={getChildCategoryKey(childCategory, index)}
                href={`/${childCategory.slug}`}
                className="block text-sm transition hover:text-[var(--menu-primary)]"
                style={{
                  color: defaultGeneralInfo.text_muted_color,
                  "--menu-primary": defaultGeneralInfo.primary_color,
                }}
              >
                {childCategory.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CategoryMenuBar() {
  const navRef = useRef(null);
  const moreDropdownRef = useRef(null);
  const { data: categoriesResponse = [] } = useGetCategoriesQuery();
  const categories = categoriesResponse.length > 0 ? categoriesResponse : previewCategories;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const [megaMenuLeft, setMegaMenuLeft] = useState(16);
  const [megaMenuWidth, setMegaMenuWidth] = useState(820);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const activeCategory = useMemo(
    () => categories.find((category) => category.id === activeCategoryId) || null,
    [activeCategoryId, categories],
  );
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const visibleCategories = categories.slice(0, visibleCount);
  const moreCategories = categories.slice(visibleCount);

  useEffect(() => {
    const updateResponsiveState = () => {
      setVisibleCount(getVisibleCategoryCount());
      setMegaMenuWidth(getMegaMenuWidth());
    };

    updateResponsiveState();
    window.addEventListener("resize", updateResponsiveState);

    return () => window.removeEventListener("resize", updateResponsiveState);
  }, []);

  const updateMegaMenuPosition = (itemElement) => {
    const navElement = navRef.current;
    if (!itemElement || !navElement) return;

    const safePadding = 16;
    const containerWidth = navElement.offsetWidth;
    const menuWidth = getMegaMenuWidth();
    let left = itemElement.offsetLeft;

    if (left + menuWidth > containerWidth) {
      left = containerWidth - menuWidth - safePadding;
    }

    if (left < safePadding) {
      left = safePadding;
    }

    setMegaMenuWidth(menuWidth);
    setMegaMenuLeft(left);
  };

  const handleCategoryEnter = (category, itemElement) => {
    setIsMenuOpen(true);
    setIsMoreOpen(false);
    setActiveCategoryId(category.id);
    setActiveSubcategory(getInitialSubcategory(category));
    updateMegaMenuPosition(itemElement);
  };

  const updateMoreMegaMenuPosition = () => {
    const navElement = navRef.current;
    const moreDropdownElement = moreDropdownRef.current;
    if (!navElement || !moreDropdownElement) return;

    const safePadding = 16;
    const navRect = navElement.getBoundingClientRect();
    const moreDropdownRect = moreDropdownElement.getBoundingClientRect();
    const menuWidth = getMegaMenuWidth();
    let left = moreDropdownRect.left - navRect.left - menuWidth;

    if (left < safePadding) {
      left = safePadding;
    }

    if (left + menuWidth > navElement.offsetWidth) {
      left = navElement.offsetWidth - menuWidth - safePadding;
    }

    if (left < safePadding) {
      left = safePadding;
    }

    setMegaMenuWidth(menuWidth);
    setMegaMenuLeft(left);
  };

  const handleMoreCategoryEnter = (category) => {
    setActiveCategoryId(category.id);

    if (!category.subcategories?.length) {
      setIsMenuOpen(false);
      setActiveSubcategory(null);
      return;
    }

    setIsMoreOpen(true);
    setIsMenuOpen(true);
    setActiveSubcategory(getInitialSubcategory(category));
    requestAnimationFrame(updateMoreMegaMenuPosition);
  };

  return (
    <div
      className="hidden w-full min-[992px]:block"
      style={{
        backgroundColor: defaultGeneralInfo.card_background_color,
        borderTop: `1px solid ${defaultGeneralInfo.border_soft_color}`,
        borderBottom: `1px solid ${defaultGeneralInfo.border_soft_color}`,
      }}
    >
      <div className="relative mx-auto w-full max-w-[1520px] px-6 md:px-8">
        <nav
          ref={navRef}
          onMouseLeave={() => {
            setIsMenuOpen(false);
            setIsMoreOpen(false);
            setActiveSubcategory(null);
          }}
          className="relative"
          aria-label="Product categories"
          style={{
            backgroundColor: defaultGeneralInfo.card_background_color,
          }}
        >
          <div
            className="flex h-12 min-w-0 items-center justify-between overflow-visible"
            style={{ gap: "clamp(10px, 1.2vw, 24px)" }}
          >
            {visibleCategories.map((category) => {
              const isActive = activeCategory?.id === category.id;

              return (
                <Link
                  key={category.id}
                  href={`/${category.slug}`}
                  onMouseEnter={(event) => handleCategoryEnter(category, event.currentTarget)}
                  onFocus={(event) => handleCategoryEnter(category, event.currentTarget)}
                  className="relative flex h-full min-w-0 shrink items-center whitespace-nowrap font-semibold transition hover:bg-[var(--menu-hover)] hover:text-[var(--menu-primary)]"
                  style={{
                    color: isActive
                      ? defaultGeneralInfo.primary_color
                      : defaultGeneralInfo.title_color,
                    fontSize: "clamp(12px, 0.72vw, 14px)",
                    paddingInline: "clamp(4px, 0.6vw, 10px)",
                    "--menu-primary": defaultGeneralInfo.primary_color,
                    "--menu-hover": defaultGeneralInfo.soft_blue_background_color,
                  }}
                >
                  {category.name}
                  {isActive ? (
                    <span
                      className="absolute inset-x-1 bottom-0 h-0.5 rounded-full"
                      style={{ backgroundColor: defaultGeneralInfo.accent_color }}
                    />
                  ) : null}
                </Link>
              );
            })}

            {moreCategories.length > 0 ? (
              <div
                className="relative flex h-full shrink-0 items-center"
                onMouseEnter={() => {
                  setIsMenuOpen(false);
                  setIsMoreOpen(true);
                }}
              >
                <button
                  type="button"
                  className="flex h-full items-center gap-1 whitespace-nowrap font-semibold transition hover:bg-[var(--menu-hover)] hover:text-[var(--menu-primary)]"
                  style={{
                    color: defaultGeneralInfo.title_color,
                    fontSize: "clamp(12px, 0.72vw, 14px)",
                    paddingInline: "clamp(6px, 0.7vw, 12px)",
                    "--menu-hover": defaultGeneralInfo.soft_blue_background_color,
                    "--menu-primary": defaultGeneralInfo.primary_color,
                  }}
                  aria-expanded={isMoreOpen}
                  aria-haspopup="menu"
                >
                  More
                  <ChevronDown size={15} />
                </button>

                {isMoreOpen ? (
                  <div
                    ref={moreDropdownRef}
                    className="bme-tech-dropdown absolute right-0 top-[calc(100%+6px)] z-50 min-w-56"
                    style={{
                      boxShadow: `0 18px 42px ${defaultGeneralInfo.title_color}18`,
                    }}
                    role="menu"
                  >
                    {moreCategories.map((category) => {
                      const hasSubcategories = category.subcategories?.length > 0;
                      const isActive = activeCategory?.id === category.id;

                      return (
                        <Link
                          key={category.id}
                          href={`/${category.slug}`}
                          onMouseEnter={() => handleMoreCategoryEnter(category)}
                          onFocus={() => handleMoreCategoryEnter(category)}
                          className="flex whitespace-nowrap px-4 py-3 text-sm font-medium transition hover:bg-[var(--menu-hover)] hover:text-[var(--menu-primary)]"
                          style={{
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "16px",
                            backgroundColor: isActive
                              ? defaultGeneralInfo.outline_button_hover_background_color
                              : "transparent",
                            color: isActive
                              ? defaultGeneralInfo.primary_color
                              : defaultGeneralInfo.title_color,
                            "--menu-hover": defaultGeneralInfo.soft_blue_background_color,
                            "--menu-primary": defaultGeneralInfo.primary_color,
                          }}
                          role="menuitem"
                        >
                          <span>{category.name}</span>
                          {hasSubcategories ? <ChevronRight size={14} /> : null}
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          <CategoryMegaPanel
            category={isMenuOpen ? activeCategory : null}
            activeSubcategory={activeSubcategory}
            onSubcategoryChange={setActiveSubcategory}
            left={megaMenuLeft}
            width={megaMenuWidth}
          />
        </nav>
      </div>
    </div>
  );
}

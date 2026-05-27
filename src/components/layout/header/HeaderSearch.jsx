"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const categories = [
  { label: "All Categories", slug: "" },
  { label: "Computer", slug: "computer" },
  { label: "Printer", slug: "printer" },
  { label: "Office Equipment", slug: "office-equipment" },
];

export function HeaderSearch() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [categorySlug, setCategorySlug] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const searchText = keyword.trim();
    if (!searchText) return;

    const params = new URLSearchParams({ keyword: searchText });

    if (categorySlug) {
      params.set("category", categorySlug);
    }

    router.push(`/search?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bme-tech-frame bme-header-search"
      role="search"
    >
      <input
        aria-label="Search products"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        placeholder="Search for products, brands and more..."
        className="bme-tech-input flex-1"
      />

      <div className="hidden h-full shrink-0 sm:block">
        <select
          aria-label="Select category"
          value={categorySlug}
          onChange={(event) => setCategorySlug(event.target.value)}
          className="bme-tech-select"
        >
          {categories.map((category) => (
            <option key={category.label} value={category.slug}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        aria-label="Search"
        className="bme-tech-btn bme-tech-btn-primary"
      >
        <Search size={21} strokeWidth={2.4} />
      </button>
    </form>
  );
}

export function productListHref(item, type = "category", parents = {}) {
  const params = new URLSearchParams();

  if (!item) return "/products";

  if (type === "category") {
    return item.slug ? `/products/${item.slug}` : "/products";
  }

  if (type === "subcategory") {
    const categorySlug = parents.category?.slug || item.category_slug;
    return categorySlug && item.slug ? `/products/${categorySlug}/${item.slug}` : "/products";
  }

  if (type === "child") {
    const categorySlug = parents.category?.slug || item.category_slug;
    const subcategorySlug = parents.subcategory?.slug || item.subcategory_slug;
    return categorySlug && subcategorySlug && item.slug
      ? `/products/${categorySlug}/${subcategorySlug}/${item.slug}`
      : "/products";
  }

  if (type === "brand" && item.brand_id) {
    const categorySlug = parents.category?.slug || item.category_slug;
    const subcategorySlug = parents.subcategory?.slug || item.subcategory_slug;
    params.set("brand_id", item.brand_id);
    const queryString = params.toString();
    return categorySlug && subcategorySlug
      ? `/products/${categorySlug}/${subcategorySlug}${queryString ? `?${queryString}` : ""}`
      : `/products${queryString ? `?${queryString}` : ""}`;
  }

  return "/products";
}

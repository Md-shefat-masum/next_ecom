import { getFileUrl } from "@/lib/utils";

export const getImageUrl = (imageUrl) => {
  if (!imageUrl) return "";
  return getFileUrl(imageUrl);
};

export const shouldUnoptimize = (imageUrl) => imageUrl.startsWith("http://");

export const extractProductImages = (product) => {
  if (!product) return [];

  const rawSources = [
    ...(product.full_image_url ? [product.full_image_url] : []),
    ...(product.image_url ? [product.image_url] : []),
    ...(product.image ? [product.image] : []),
    ...(product.full_multiple_images_url ? product.full_multiple_images_url : []),
    ...(product.images
      ? product.images.map((image) =>
          typeof image === "string" ? image : image.full_image_url || image.image || ""
        )
      : []),
  ].filter((img) => typeof img === "string" && Boolean(img));

  const seen = new Set();

  return rawSources.filter((img) => {
    const normalized = getFileUrl(img);
    if (!normalized || seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  });
};

export const getProductPrice = (product) => {
  if (!product) return 0;
  const pricing = product.pricing || {};
  return product.final_price || pricing.final_price || product.unit_price || pricing.price || product.price || 0;
};

export const getAvailableStock = (product) => {
  if (!product) return 0;
  const stock = product.stock || 0;
  return stock > 0 ? stock : 0;
};

export const getProductHasVariants = (product) => Boolean(product?.has_variants ?? product?.has_variant);

export const getVariantGroups = (product) => {
  if (!product) return {};

  if (product.product_variants && Object.keys(product.product_variants).length > 0) {
    return product.product_variants;
  }

  if (product.variant_values?.length) {
    return product.variant_values.reduce((groups, entry) => {
      Object.entries(entry).forEach(([key, values]) => {
        groups[key] = values;
      });
      return groups;
    }, {});
  }

  const groups = {};
  product.variants?.forEach((variant) => {
    Object.entries(variant.variant_values ?? {}).forEach(([key, value]) => {
      if (!groups[key]) groups[key] = new Set();
      groups[key].add(value);
    });
  });

  return Object.fromEntries(Object.entries(groups).map(([key, values]) => [key, Array.from(values)]));
};

export const getVariantCombinations = (product) => {
  if (!product) return [];

  if (product.product_variant_combinations?.length) {
    return product.product_variant_combinations;
  }

  return (product.variants ?? []).map((variant) => ({
    id: variant.id,
    stock: variant.stock ?? 0,
    ...(variant.variant_values ?? {}),
  }));
};

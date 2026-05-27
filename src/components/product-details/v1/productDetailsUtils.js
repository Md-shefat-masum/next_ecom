import { getFileUrl } from "@/lib/utils";

export const variantKeyPriority = ["color", "size", "ram", "storage"];

export const toNumber = (value, fallback = 0) => {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : fallback;
};

export const formatMoney = (value) =>
  `৳${toNumber(value).toLocaleString("en-BD", {
    maximumFractionDigits: Number.isInteger(toNumber(value)) ? 0 : 2,
  })}`;

export const getProductName = (product) => product?.title || product?.name || product?.text || "Product";

export const getBrandName = (product) =>
  typeof product?.brand === "string" ? product.brand : product?.brand?.name || "";

export const getProductHasVariants = (product) => Boolean(product?.has_variants ?? product?.has_variant);

export const getProductImages = (product) => {
  if (!product) return [];

  const sources = [
    product.full_image_url,
    product.image_url,
    product.image,
    ...(Array.isArray(product.full_multiple_images_url) ? product.full_multiple_images_url : []),
    ...(Array.isArray(product.multiple_images) ? product.multiple_images : []),
    ...(Array.isArray(product.images)
      ? product.images.map((image) =>
          typeof image === "string" ? image : image.full_image_url || image.image_url || image.image || image.url
        )
      : []),
  ].filter(Boolean);

  const seen = new Set();
  return sources
    .map((source) => getFileUrl(source))
    .filter((source) => {
      if (!source || seen.has(source)) return false;
      seen.add(source);
      return true;
    });
};

export const getVariantValue = (combination, key) => {
  const directValue = combination?.[key];
  if (directValue !== undefined && directValue !== null) return String(directValue);

  const nestedValue = combination?.variant_values?.[key];
  if (nestedValue !== undefined && nestedValue !== null) return String(nestedValue);

  return undefined;
};

export const getVariantValues = (combination) => {
  if (combination?.variant_values && typeof combination.variant_values === "object") {
    return Object.fromEntries(
      Object.entries(combination.variant_values)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([key, value]) => [key, String(value)])
    );
  }

  const ignoredKeys = new Set([
    "id",
    "stock",
    "qty",
    "price",
    "pricing",
    "sku",
    "barcode",
    "image",
    "image_url",
    "full_image_url",
    "combination_key",
  ]);

  return Object.fromEntries(
    Object.entries(combination || {})
      .filter(([key, value]) => !ignoredKeys.has(key) && value !== undefined && value !== null)
      .map(([key, value]) => [key, String(value)])
  );
};

export const getVariantGroups = (product) => {
  if (!product) return {};

  if (product.product_variants && Object.keys(product.product_variants).length > 0) {
    return Object.fromEntries(
      Object.entries(product.product_variants).map(([key, values]) => [key, values.map((value) => String(value))])
    );
  }

  if (Array.isArray(product.variant_values) && product.variant_values.length > 0) {
    return product.variant_values.reduce((groups, entry) => {
      Object.entries(entry).forEach(([key, values]) => {
        groups[key] = values.map((value) => String(value));
      });
      return groups;
    }, {});
  }

  return (product.variants || []).reduce((groups, combination) => {
    Object.entries(getVariantValues(combination)).forEach(([key, value]) => {
      if (!groups[key]) groups[key] = [];
      if (!groups[key].includes(value)) groups[key].push(value);
    });
    return groups;
  }, {});
};

export const getVariantCombinations = (product) => {
  if (!product) return [];

  if (Array.isArray(product.variants) && product.variants.length > 0) {
    return product.variants.map((combination) => ({
      ...combination,
      variant_values: getVariantValues(combination),
    }));
  }

  return (product.product_variant_combinations || []).map((combination) => ({
    ...combination,
    variant_values: getVariantValues(combination),
  }));
};

export const getCombinationStockKey = (combination) => combination?.combination_key || "";

export const getCombinationStock = (product, combination) => {
  if (!combination) return 0;

  const directStock = toNumber(combination.stock ?? combination.qty, NaN);
  if (Number.isFinite(directStock)) return Math.max(0, directStock);

  const stockKey = getCombinationStockKey(combination);
  const stockFromMap = stockKey ? product?.variant_stocks?.[stockKey] : undefined;
  return Math.max(0, toNumber(stockFromMap));
};

export const combinationMatches = (combination, selectedOptions) =>
  Object.entries(selectedOptions).every(([key, value]) => getVariantValue(combination, key) === value);

export const getVariantKeyOrder = (groups) => {
  const groupKeys = Object.keys(groups);
  return [
    ...variantKeyPriority.filter((key) => groupKeys.includes(key)),
    ...groupKeys.filter((key) => !variantKeyPriority.includes(key)),
  ];
};

export const getPriceInfo = (product, selectedVariant) => {
  const source = selectedVariant || product || {};
  const pricing = source.pricing || {};
  const productPricing = product?.pricing || {};

  const current =
    pricing.final_price ??
    source.final_price ??
    pricing.discount_price ??
    source.discount_price ??
    productPricing.final_price ??
    product?.final_price ??
    product?.unit_price ??
    productPricing.price ??
    product?.price ??
    0;

  const original =
    pricing.price ??
    source.main_price ??
    source.mrp_price ??
    source.unit_price ??
    source.price ??
    productPricing.price ??
    product?.main_price ??
    product?.unit_price ??
    current;

  const currentPrice = toNumber(current);
  const originalPrice = toNumber(original, currentPrice);
  const discountPercent =
    originalPrice > currentPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;

  return {
    currentPrice,
    originalPrice,
    discountPercent,
    hasDiscount: originalPrice > currentPrice,
  };
};

export const getProductStock = (product) => Math.max(0, toNumber(product?.stock));

export const CART_STORAGE_KEY = "bme_cart";
export const CART_UPDATED_EVENT = "bme_cart_updated";
export const CART_OPEN_EVENT = "bme_cart_open";

const stockKeyOrder = ["size", "ram", "storage", "color"];

const canUseStorage = () => typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const toNumber = (value, fallback = 0) => {
  const nextValue = Number(value);
  return Number.isFinite(nextValue) ? nextValue : fallback;
};

const getProductId = (product) => toNumber(product.id || product.product_id);

const getCombinationValue = (combination, key) => {
  const directValue = combination[key];
  if (typeof directValue === "string" || typeof directValue === "number") {
    return String(directValue);
  }

  const nestedValues = combination.variant_values;
  if (nestedValues && typeof nestedValues === "object" && !Array.isArray(nestedValues)) {
    const nestedValue = nestedValues[key];
    if (typeof nestedValue === "string" || typeof nestedValue === "number") {
      return String(nestedValue);
    }
  }

  return undefined;
};

export const parseStockKey = (stockKey) =>
  stockKey.split("-").reduce((options, value, index) => {
    const variantKey = stockKeyOrder[index];
    if (variantKey && value) options[variantKey] = value;
    return options;
  }, {});

export const buildStockKey = (selectedOptions) =>
  stockKeyOrder
    .map((key) => selectedOptions?.[key])
    .filter(Boolean)
    .join("-");

export const buildSelectedOptionsFromCombination = (combination) => {
  const nestedValues = combination.variant_values;
  if (nestedValues && typeof nestedValues === "object" && !Array.isArray(nestedValues)) {
    return Object.fromEntries(
      Object.entries(nestedValues)
        .filter(([, value]) => value !== null && value !== undefined)
        .map(([key, value]) => [key, String(value)])
    );
  }

  const excludedKeys = [
    "id",
    "product_id",
    "price",
    "final_price",
    "unit_price",
    "main_price",
    "mrp_price",
    "discount_price",
    "stock",
    "image",
    "image_url",
    "thumbnail",
    "photo",
    "media",
    "full_image_url",
    "created_at",
    "updated_at",
  ];

  return Object.keys(combination).reduce((options, key) => {
    const value = combination[key];
    if (!excludedKeys.includes(key) && value !== null && value !== undefined) {
      options[key] = String(value);
    }
    return options;
  }, {});
};

export const getCartItemImage = (product, matchedCombination = null) =>
  String(
    matchedCombination?.full_image_url ||
      matchedCombination?.image_url ||
      matchedCombination?.image ||
      matchedCombination?.thumbnail ||
      matchedCombination?.photo ||
      matchedCombination?.media ||
      product?.full_image_url ||
      product?.image_url ||
      product?.image ||
      product?.thumbnail ||
      ""
  );

export const buildCartItemKey = (product, matchedCombination = null) => {
  const productId = getProductId(product);
  const hasVariants = Boolean(product.has_variants ?? product.has_variant);

  if (hasVariants && matchedCombination?.id) {
    return `product_${productId}_combination_${matchedCombination.id}`;
  }

  return `product_${productId}`;
};

export const getCart = () => {
  if (!canUseStorage()) return [];

  try {
    const cartItems = JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) || "[]");
    return Array.isArray(cartItems) ? cartItems : [];
  } catch {
    return [];
  }
};

export const saveCart = (cartItems) => {
  if (!canUseStorage()) return;
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
};

export const getCartTotal = () => getCart().reduce((total, item) => total + item.price * item.quantity, 0);

export const getCartCount = () => getCart().reduce((count, item) => count + item.quantity, 0);

export const addToCart = (productInput, options = {}) => {
  const product = productInput;
  const {
    quantity = 1,
    selectedOptions = null,
    matchedCombination = null,
    stock = null,
    stockKey = null,
  } = options;

  const productId = getProductId(product);
  const hasVariants = Boolean(product.has_variants ?? product.has_variant);

  if (!productId) {
    return { success: false, message: "Invalid product" };
  }

  if (hasVariants && !matchedCombination?.id) {
    return { success: false, message: "Please select a valid variant" };
  }

  const availableStock = hasVariants ? toNumber(stock) : toNumber(product.stock);
  if (availableStock <= 0) {
    return {
      success: false,
      message: hasVariants ? "Selected variant is out of stock" : "Product is out of stock",
    };
  }

  const requestedQty = Math.max(1, toNumber(quantity, 1));
  const cartItemKey = buildCartItemKey(product, matchedCombination);
  const combinationPricing = matchedCombination?.pricing ?? {};

  const price = hasVariants
    ? toNumber(
        matchedCombination?.final_price ||
          combinationPricing.final_price ||
          matchedCombination?.price ||
          combinationPricing.price ||
          matchedCombination?.unit_price ||
          product.final_price ||
          product.unit_price ||
          product.main_price
      )
    : toNumber(product.final_price || product.unit_price || product.main_price);

  const originalPrice = hasVariants
    ? toNumber(
        matchedCombination?.main_price ||
          matchedCombination?.mrp_price ||
          product.main_price ||
          product.unit_price ||
          price
      )
    : toNumber(product.main_price || product.unit_price || price);

  const discountPrice = hasVariants
    ? toNumber(matchedCombination?.discount_price || combinationPricing.discount_price || product.discount_price)
    : toNumber(product.discount_price);

  const cartItems = getCart();
  const existingIndex = cartItems.findIndex((item) => item.cartItemKey === cartItemKey);

  if (existingIndex > -1) {
    const existingItem = cartItems[existingIndex];
    const newQty = existingItem.quantity + requestedQty;

    if (newQty > availableStock) {
      return { success: false, message: `Only ${availableStock} item(s) available in stock` };
    }

    cartItems[existingIndex] = {
      ...existingItem,
      quantity: newQty,
      stock: availableStock,
    };
  } else {
    if (requestedQty > availableStock) {
      return { success: false, message: `Only ${availableStock} item(s) available in stock` };
    }

    cartItems.push({
      cartItemKey,
      productId,
      productSlug: product.slug || null,
      productCombinationId: hasVariants ? toNumber(matchedCombination?.id) : null,
      hasVariants,
      title: String(product.title || product.name || "Product"),
      image: getCartItemImage(product, matchedCombination),
      quantity: requestedQty,
      stock: availableStock,
      price,
      originalPrice,
      discountPrice,
      selectedOptions: hasVariants ? selectedOptions : null,
      stockKey: hasVariants ? stockKey : null,
      matchedCombination: hasVariants ? matchedCombination : null,
      productVariantCombinations: hasVariants ? product.product_variant_combinations ?? [] : undefined,
      productVariants: hasVariants ? product.product_variants : undefined,
      variantValues: hasVariants ? product.variant_values : undefined,
      variantStocks: hasVariants ? product.variant_stocks : undefined,
    });
  }

  saveCart(cartItems);
  return { success: true, message: "Added to cart successfully", cartItems };
};

export const removeFromCart = (cartItemKey) => {
  const cartItems = getCart().filter((item) => item.cartItemKey !== cartItemKey);
  saveCart(cartItems);
  return cartItems;
};

export const updateCartQuantity = (cartItemKey, quantity) => {
  const cartItems = getCart();
  const itemIndex = cartItems.findIndex((item) => item.cartItemKey === cartItemKey);
  if (itemIndex < 0) return { success: false, message: "Cart item not found" };

  const item = cartItems[itemIndex];
  const nextQuantity = Math.max(1, toNumber(quantity, 1));
  if (nextQuantity > item.stock) {
    return { success: false, message: `Only ${item.stock} item(s) available in stock` };
  }

  cartItems[itemIndex] = { ...item, quantity: nextQuantity };
  saveCart(cartItems);
  return { success: true, message: "Cart updated", cartItems };
};

export const clearCart = () => {
  saveCart([]);
};

const combinationMatchesOptions = (combination, selectedOptions) =>
  Object.entries(selectedOptions).every(([key, value]) => getCombinationValue(combination, key) === value);

export const getAvailableCombinationsForCartItem = (cartItem) =>
  Object.entries(cartItem.variantStocks ?? {})
    .map(([stockKey, stock]) => {
      const selectedOptions = parseStockKey(stockKey);
      const combination = cartItem.productVariantCombinations?.find((item) =>
        combinationMatchesOptions(item, selectedOptions)
      );

      return {
        combinationId: toNumber(combination?.id),
        stockKey,
        selectedOptions,
        stock: toNumber(stock),
        combination,
      };
    })
    .filter((item) => item.stock > 0 && item.combinationId && item.combination);

export const switchCartItemVariant = (oldCartItemKey, newCombinationId) => {
  const cartItems = getCart();
  const oldIndex = cartItems.findIndex((item) => item.cartItemKey === oldCartItemKey);
  if (oldIndex < 0) return { success: false, message: "Cart item not found" };

  const oldItem = cartItems[oldIndex];
  if (!oldItem.hasVariants) return { success: false, message: "This cart item has no variants" };

  const newCombination = oldItem.productVariantCombinations?.find(
    (combination) => toNumber(combination.id) === newCombinationId
  );
  if (!newCombination) return { success: false, message: "Variant combination not found" };

  const selectedOptions = buildSelectedOptionsFromCombination(newCombination);
  const stockKey = buildStockKey(selectedOptions);
  const stock = toNumber(oldItem.variantStocks?.[stockKey]);
  if (stock <= 0) return { success: false, message: "Selected variant is out of stock" };

  const newCartItemKey = `product_${oldItem.productId}_combination_${newCombinationId}`;
  const quantity = Math.min(oldItem.quantity, stock);
  const price = toNumber(
    newCombination.final_price ||
      newCombination.pricing?.final_price ||
      newCombination.price ||
      newCombination.pricing?.price ||
      newCombination.unit_price ||
      oldItem.price
  );
  const originalPrice = toNumber(newCombination.main_price || newCombination.mrp_price || oldItem.originalPrice || price);
  const discountPrice = toNumber(
    newCombination.discount_price || newCombination.pricing?.discount_price || oldItem.discountPrice
  );
  const image = getCartItemImage({ image_url: oldItem.image, image: oldItem.image }, newCombination);
  const existingIndex = cartItems.findIndex(
    (item) => item.cartItemKey === newCartItemKey && item.cartItemKey !== oldCartItemKey
  );
  let adjusted = oldItem.quantity > stock;

  if (existingIndex > -1) {
    const existingItem = cartItems[existingIndex];
    const mergedQuantity = existingItem.quantity + oldItem.quantity;
    const finalQuantity = Math.min(mergedQuantity, stock);
    adjusted = adjusted || mergedQuantity > stock;

    cartItems[existingIndex] = {
      ...existingItem,
      quantity: finalQuantity,
      stock,
      price,
      originalPrice,
      discountPrice,
      image,
      selectedOptions,
      stockKey,
      matchedCombination: newCombination,
    };
    cartItems.splice(oldIndex, 1);
  } else {
    cartItems[oldIndex] = {
      ...oldItem,
      cartItemKey: newCartItemKey,
      productCombinationId: newCombinationId,
      quantity,
      stock,
      price,
      originalPrice,
      discountPrice,
      image,
      selectedOptions,
      stockKey,
      matchedCombination: newCombination,
    };
  }

  saveCart(cartItems);
  return {
    success: true,
    message: adjusted ? "Quantity adjusted based on selected variant stock" : "Variant updated",
    cartItems,
    adjusted,
  };
};

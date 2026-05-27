"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useGetProductBySlugQuery } from "@/store/api";
import { closeProductQuickView } from "@/store/slices/modalSlice";
import { syncCartFromStorage } from "@/store/slices/cartSlice";
import { addToCart, CART_OPEN_EVENT } from "@/lib/cart/cartUtils";
import { ModalBackdrop } from "./ModalBackdrop";
import { ImageGallery } from "./ImageGallery";
import { ProductInfo } from "./ProductInfo";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import {
  extractProductImages,
  getAvailableStock,
  getProductHasVariants,
  getProductPrice,
} from "./utils";
import "./ProductQuickViewModal.css";

export function ProductQuickViewModal() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isProductQuickViewOpen, productSlug } = useAppSelector((state) => state.modal);

  const stateKey = useMemo(() => productSlug || "", [productSlug]);

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState(null);
  const [variantStock, setVariantStock] = useState(0);
  const [stockKey, setStockKey] = useState(null);

  const { data: productResponse, isLoading } = useGetProductBySlugQuery(productSlug || "", {
    skip: !isProductQuickViewOpen || !productSlug,
  });

  const product = productResponse?.data;

  const [prevKey, setPrevKey] = useState(stateKey);
  const [prevProductId, setPrevProductId] = useState(undefined);

  if (stateKey !== prevKey) {
    setPrevKey(stateKey);
    setQuantity(1);
    setSelectedVariant(null);
    setSelectedOptions(null);
    setVariantStock(0);
    setStockKey(null);
    setPrevProductId(undefined);
  }

  const handleClose = () => {
    dispatch(closeProductQuickView());
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    if (newQuantity > availableStock) return;
    setQuantity(newQuantity);
  };

  const hasVariants = getProductHasVariants(product);

  if (product?.id && product.id !== prevProductId) {
    setPrevProductId(product.id);
    setQuantity(1);
    setSelectedVariant(null);
    setSelectedOptions(null);
    setVariantStock(0);
    setStockKey(null);
  }

  const selectedVariantPricing = product?.variants?.find((variant) => variant.id === selectedVariant?.id)?.pricing;
  const price = selectedVariantPricing?.final_price || getProductPrice(product);
  const availableStock = hasVariants ? variantStock : getAvailableStock(product);

  const handleVariantChange = useCallback(
    ({ matchedCombination, quantity: variantQuantity, selectedOptions: nextSelectedOptions, stock, stockKey: nextStockKey }) => {
      setSelectedVariant(matchedCombination);
      setSelectedOptions(nextSelectedOptions);
      setVariantStock(stock);
      setStockKey(nextStockKey ?? null);
      setQuantity(variantQuantity);
    },
    []
  );

  const addCurrentProductToCart = () => {
    if (!product?.id && !product?.product_id) return { success: false };

    const result = addToCart(product, {
      quantity,
      selectedOptions,
      matchedCombination: selectedVariant,
      stock: availableStock,
      stockKey,
    });

    if (!result.success) {
      window.alert(result.message);
      return result;
    }

    dispatch(syncCartFromStorage());
    return result;
  };

  const handleAddToCart = () => {
    const result = addCurrentProductToCart();
    if (!result?.success) return;

    window.dispatchEvent(new Event(CART_OPEN_EVENT));
    handleClose();
  };

  const handleBuyNow = () => {
    const result = addCurrentProductToCart();
    if (!result?.success) return;

    handleClose();
    router.push("/checkout");
  };

  const images = extractProductImages(product);

  return (
    <ModalBackdrop isOpen={isProductQuickViewOpen} onClose={handleClose} className="product-quick-view-hud">
      {isLoading ? (
        <LoadingState />
      ) : !product ? (
        <ErrorState message="Product not found" onClose={handleClose} />
      ) : (
        <div className="product-quick-view-modal-v1-content">
          <ImageGallery key={productSlug} images={images} productName={product.name || "Product"} />
          <ProductInfo
            name={product.name || "Product"}
            price={price}
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
            availableStock={availableStock}
            description={product.short_description}
            hasVariants={hasVariants}
            product={product}
            selectedVariant={selectedVariant}
            onVariantChange={handleVariantChange}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />
        </div>
      )}
    </ModalBackdrop>
  );
}

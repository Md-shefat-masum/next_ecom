'use client';

import { useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeProductQuickView } from '@/store/slices';
import { useProduct } from '@/lib/hooks/useProducts';
import {
  ModalBackdrop,
  ImageGallery,
  ProductInfo,
  LoadingState,
  ErrorState,
} from '../components';
import { 
  getImageUrl, 
  shouldUnoptimize, 
  extractProductImages, 
  getProductPrice, 
  getAvailableStock,
  type ProductWithExtras 
} from './utils';
import './ProductQuickViewModalV1.css';

export default function ProductQuickViewModalV1() {
  const dispatch = useAppDispatch();
  const { isProductQuickViewOpen, productSlug } = useAppSelector((state) => state.modal);
  
  // Use productSlug as key to reset state when it changes
  const stateKey = useMemo(() => productSlug || '', [productSlug]);
  
  const [quantity, setQuantity] = useState(1);

  const { data: productResponse, isLoading } = useProduct(productSlug || '', {
    enabled: isProductQuickViewOpen && !!productSlug,
  });

  const product = productResponse?.data as ProductWithExtras | undefined;

  // Reset state when productSlug changes by using it as a dependency
  // This pattern avoids setState in effect by resetting when key changes
  const [prevKey, setPrevKey] = useState(stateKey);
  if (stateKey !== prevKey) {
    setPrevKey(stateKey);
    setQuantity(1);
  }

  const handleClose = () => {
    dispatch(closeProductQuickView());
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    const availableStock = getAvailableStock(product);
    if (newQuantity > availableStock) return;
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    // TODO: Implement add to cart logic
    console.log('Add to cart:', { productSlug, quantity });
    // Close modal after adding to cart
    // handleClose();
  };

  // Extract product data
  const images = extractProductImages(product);
  const price = getProductPrice(product);
  const availableStock = getAvailableStock(product);

  return (
    <ModalBackdrop isOpen={isProductQuickViewOpen} onClose={handleClose}>
      {isLoading ? (
        <LoadingState />
      ) : !product ? (
        <ErrorState message="Product not found" onClose={handleClose} />
      ) : (
        <div className="product-quick-view-modal-v1-content">
          {/* Left Side - Images */}
          <ImageGallery
            key={productSlug} // Reset gallery when product changes
            images={images}
            productName={product.name || 'Product'}
            getImageUrl={getImageUrl}
            shouldUnoptimize={shouldUnoptimize}
          />

          {/* Right Side - Product Info */}
          <ProductInfo
            name={product.name || 'Product'}
            price={price}
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
            availableStock={availableStock}
            description={product.short_description}
            onAddToCart={handleAddToCart}
          />
        </div>
      )}
    </ModalBackdrop>
  );
}


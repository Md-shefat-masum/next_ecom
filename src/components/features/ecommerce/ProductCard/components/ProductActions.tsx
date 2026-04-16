'use client';

import { ShoppingCart, Heart } from 'lucide-react';
import { useAppDispatch } from '@/store/hooks';
import { openProductQuickView } from '@/store/slices';
import './ProductActions.css';

interface ProductActionsProps {
  productSlug: string;
  onAddToCart?: () => void;
  onWishlistClick?: () => void;
  variant?: 'grid' | 'list';
  disabled?: boolean;
}

export default function ProductActions({
  productSlug,
  onAddToCart,
  onWishlistClick,
  variant = 'grid',
  disabled = false,
}: ProductActionsProps) {
  const dispatch = useAppDispatch();

  const handleQuickView = () => {
    if (productSlug) {
      dispatch(openProductQuickView(productSlug));
    }
  };

  const handleAddToCartClick = () => {
    if (onAddToCart) {
      onAddToCart();
    } else {
      handleQuickView();
    }
  };

  if (variant === 'list') {
    return (
      <div className="product-actions product-actions-list">
        <button
          onClick={handleAddToCartClick}
          disabled={disabled}
          className="product-actions-add-to-cart product-actions-add-to-cart-list"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
        <button
          onClick={onWishlistClick}
          className="product-actions-wishlist product-actions-wishlist-list"
          aria-label="Add to wishlist"
        >
          <Heart className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleAddToCartClick}
      disabled={disabled}
      className="product-actions-add-to-cart product-actions-add-to-cart-grid"
    >
      <ShoppingCart className="w-4 h-4" />
      Add to Cart
    </button>
  );
}


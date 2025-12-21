'use client';

import { ProductCardV1, ProductCardV1List } from './V1';
import type { ProductCardData } from './components/utils';

interface ProductCardProps {
  product?: ProductCardData;
  viewMode?: 'grid' | 'list';
  onAddToCart?: () => void;
  onWishlistClick?: () => void;
}

/**
 * Main ProductCard component that supports both grid and list views
 * Maintains backward compatibility with existing code
 */
export default function ProductCard({ 
  product, 
  viewMode = 'grid',
  onAddToCart,
  onWishlistClick,
}: ProductCardProps) {
  if (viewMode === 'list') {
    return (
      <ProductCardV1List
        product={product}
        onAddToCart={onAddToCart}
        onWishlistClick={onWishlistClick}
      />
    );
  }

  return (
    <ProductCardV1
      product={product}
      onAddToCart={onAddToCart}
      onWishlistClick={onWishlistClick}
    />
  );
}


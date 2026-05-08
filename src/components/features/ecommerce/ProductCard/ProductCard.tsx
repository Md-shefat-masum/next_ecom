'use client';

import { ProductCardV1, ProductCardV1List } from './V1';
import { ProductCardV2 } from './V2';
import type { ProductCardV2Product } from './V2';
import { ProductCardV3 } from './V3';
import type { ProductCardV3Product } from './V3';
import type { ProductCardData } from './components/utils';

type ProductCardProduct = ProductCardData | ProductCardV2Product | ProductCardV3Product;

interface ProductCardProps {
  product?: ProductCardProduct;
  viewMode?: 'grid' | 'list';
  version?: 'v1' | 'v2' | 'v3';
  onAddToCart?: () => void;
  onWishlistClick?: () => void;
  onCompareClick?: () => void;
  onBuyNowClick?: () => void;
}

/**
 * Main ProductCard component that supports both grid and list views
 * Maintains backward compatibility with existing code
 */
export default function ProductCard({ 
  product, 
  viewMode = 'grid',
  version = 'v1',
  onAddToCart,
  onWishlistClick,
  onCompareClick,
  onBuyNowClick,
}: ProductCardProps) {
  if (viewMode === 'list') {
    return (
      <ProductCardV1List
        product={product as ProductCardData | undefined}
        onAddToCart={onAddToCart}
        onWishlistClick={onWishlistClick}
      />
    );
  }

  if (version === 'v2') {
    return (
      <ProductCardV2
        product={product as ProductCardV2Product | undefined}
        onAddToCart={onAddToCart}
        onWishlistClick={onWishlistClick}
      />
    );
  }

  if (version === 'v3') {
    return (
      <ProductCardV3
        product={product as ProductCardV3Product | undefined}
        onAddToCart={onAddToCart}
        onWishlistClick={onWishlistClick}
        onCompareClick={onCompareClick}
        onBuyNowClick={onBuyNowClick}
      />
    );
  }

  return (
    <ProductCardV1
      product={product as ProductCardData | undefined}
      onAddToCart={onAddToCart}
      onWishlistClick={onWishlistClick}
    />
  );
}


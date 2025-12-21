'use client';

import Image from 'next/image';
import { Heart, Eye } from 'lucide-react';
import Link from 'next/link';
import { getImageUrl, shouldUnoptimize, calculateDiscount } from './utils';
import './ProductImage.css';

interface ProductImageProps {
  image?: string | null;
  alt: string;
  productSlug: string;
  price: number;
  discountPrice?: number;
  showHoverActions?: boolean;
  onWishlistClick?: () => void;
  sizes?: string;
  aspectRatio?: 'square' | 'fixed';
  fixedHeight?: string;
}

export default function ProductImage({
  image,
  alt,
  productSlug,
  price,
  discountPrice,
  showHoverActions = true,
  onWishlistClick,
  sizes = '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw',
  aspectRatio = 'square',
  fixedHeight,
}: ProductImageProps) {
  const imageUrl = getImageUrl(image);
  const discount = calculateDiscount(price, discountPrice);

  const imageContainerClass = aspectRatio === 'square' 
    ? 'product-image-container-square' 
    : 'product-image-container-fixed';

  return (
    <div className={`product-image-wrapper ${imageContainerClass}`} style={fixedHeight ? { height: fixedHeight } : undefined}>
      {image ? (
        <Image
          src={imageUrl}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          loading="lazy"
          unoptimized={shouldUnoptimize(imageUrl)}
          onError={(e) => {
            e.currentTarget.src = '/placeholder-product.jpg';
          }}
        />
      ) : (
        <div className="product-image-placeholder">No Image</div>
      )}
      
      {/* Discount Badge */}
      {discount > 0 && (
        <span className="product-image-discount-badge">
          -{discount}%
        </span>
      )}

      {/* Hover Actions */}
      {showHoverActions && (
        <div className="product-image-hover-actions">
          <button
            onClick={onWishlistClick}
            className="product-image-action-button"
            aria-label="Add to wishlist"
          >
            <Heart className="w-5 h-5" />
          </button>
          <Link
            href={`/products/${productSlug}`}
            className="product-image-action-button"
            aria-label="Quick view"
          >
            <Eye className="w-5 h-5" />
          </Link>
        </div>
      )}
    </div>
  );
}


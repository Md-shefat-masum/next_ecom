'use client';

import './ProductPrice.css';

interface ProductPriceProps {
  price: number;
  discountPrice?: number;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function ProductPrice({ 
  price, 
  discountPrice,
  className = '',
  size = 'medium'
}: ProductPriceProps) {
  const finalPrice = discountPrice || price;
  const hasDiscount = discountPrice && discountPrice < price;

  const priceSizeClass = `product-price-${size}`;
  const discountPriceSizeClass = `product-price-discount-${size}`;

  return (
    <div className={`product-price ${className}`}>
      <span className={`product-price-current ${priceSizeClass}`}>
        ৳{finalPrice.toLocaleString()}
      </span>
      {hasDiscount && (
        <span className={`product-price-original ${discountPriceSizeClass}`}>
          ৳{price.toLocaleString()}
        </span>
      )}
    </div>
  );
}


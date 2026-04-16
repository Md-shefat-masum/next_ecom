'use client';

import './ProductRating.css';

interface ProductRatingProps {
  rating?: number;
  reviewsCount?: number;
  className?: string;
}

export default function ProductRating({ 
  rating = 0, 
  reviewsCount = 0,
  className = '' 
}: ProductRatingProps) {
  const fullStars = Math.floor(rating);
  
  return (
    <div className={`product-rating ${className}`}>
      <span className="product-rating-stars">
        {'★'.repeat(fullStars)}
      </span>
      {reviewsCount > 0 && (
        <span className="product-rating-count">
          ({reviewsCount})
        </span>
      )}
    </div>
  );
}


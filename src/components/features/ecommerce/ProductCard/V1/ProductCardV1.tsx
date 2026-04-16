'use client';

import { ProductImage, ProductTitle, ProductRating, ProductPrice, ProductActions, type ProductCardData } from '../components';
import './ProductCardV1.css';

interface ProductCardV1Props {
  product?: ProductCardData;
  onAddToCart?: () => void;
  onWishlistClick?: () => void;
}

export default function ProductCardV1({ 
  product,
  onAddToCart,
  onWishlistClick,
}: ProductCardV1Props) {
  // Placeholder data
  const item: ProductCardData = product || {
    id: 1,
    name: 'Product Name',
    slug: 'product-name',
    price: 1500,
    discount_price: 1200,
    image: null,
    rating: 4.5,
    reviews_count: 12,
  };

  return (
    <div className="product-card-v1">
      <ProductImage
        image={item.image}
        alt={item.name}
        productSlug={item.slug}
        price={item.price}
        discountPrice={item.discount_price}
        showHoverActions={true}
        onWishlistClick={onWishlistClick}
      />
      
      <div className="product-card-v1-content">
        <ProductTitle 
          name={item.name} 
          slug={item.slug}
          maxLines={2}
        />
        
        <ProductRating 
          rating={item.rating} 
          reviewsCount={item.reviews_count}
          className="mt-1"
        />
        
        <ProductPrice 
          price={item.price} 
          discountPrice={item.discount_price}
          className="mt-2"
        />
        
        <ProductActions
          productSlug={item.slug}
          onAddToCart={onAddToCart}
          onWishlistClick={onWishlistClick}
          variant="grid"
        />
      </div>
    </div>
  );
}


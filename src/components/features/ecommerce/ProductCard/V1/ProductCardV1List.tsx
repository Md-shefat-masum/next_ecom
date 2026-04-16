'use client';

import { ProductImage, ProductTitle, ProductRating, ProductPrice, ProductActions, type ProductCardData } from '../components';
import './ProductCardV1List.css';

interface ProductCardV1ListProps {
  product?: ProductCardData;
  onAddToCart?: () => void;
  onWishlistClick?: () => void;
}

export default function ProductCardV1List({ 
  product,
  onAddToCart,
  onWishlistClick,
}: ProductCardV1ListProps) {
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
    <div className="product-card-v1-list">
      <ProductImage
        image={item.image}
        alt={item.name}
        productSlug={item.slug}
        price={item.price}
        discountPrice={item.discount_price}
        showHoverActions={false}
        aspectRatio="fixed"
        fixedHeight="192px"
        sizes="192px"
      />
      
      <div className="product-card-v1-list-content">
        <ProductTitle 
          name={item.name} 
          slug={item.slug}
          maxLines={3}
          className="font-semibold"
        />
        
        <ProductRating 
          rating={item.rating} 
          reviewsCount={item.reviews_count}
          className="mt-1"
        />
        
        <ProductPrice 
          price={item.price} 
          discountPrice={item.discount_price}
          size="large"
          className="mt-2"
        />
        
        <ProductActions
          productSlug={item.slug}
          onAddToCart={onAddToCart}
          onWishlistClick={onWishlistClick}
          variant="list"
        />
      </div>
    </div>
  );
}


'use client';

import { ShoppingCart } from 'lucide-react';
import QuantitySelector from './QuantitySelector';
import './ProductInfo.css';

interface ProductInfoProps {
  name: string;
  price: number;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  availableStock: number;
  description?: string;
  onAddToCart: () => void;
}

export default function ProductInfo({
  name,
  price,
  quantity,
  onQuantityChange,
  availableStock,
  description,
  onAddToCart,
}: ProductInfoProps) {
  const totalPrice = price * quantity;

  return (
    <div className="product-info">
      <h2 className="product-info-title">{name}</h2>

      {/* Price */}
      <div className="product-info-price">
        <span className="price-label">Price:</span>
        <span className="price-value">
          ৳{price.toLocaleString()} /Unit
        </span>
      </div>

      {/* Quantity Selector */}
      <QuantitySelector
        quantity={quantity}
        onQuantityChange={onQuantityChange}
        min={1}
        max={availableStock}
        availableStock={availableStock}
      />

      {/* Total Price */}
      <div className="product-info-total">
        <span className="total-label">Total Price:</span>
        <span className="total-value">
          ৳{totalPrice.toLocaleString()}
        </span>
      </div>

      {/* Description */}
      {description && (
        <div className="product-info-description">
          <h3 className="description-title">Description:</h3>
          <div
            className="description-content"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      )}

      {/* Add to Cart Button */}
      <button
        onClick={onAddToCart}
        disabled={availableStock === 0}
        className="product-info-add-to-cart"
      >
        <ShoppingCart className="w-5 h-5" />
        ADD TO CART
      </button>
    </div>
  );
}


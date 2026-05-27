"use client";

import { ShoppingCart } from "lucide-react";
import { QuantitySelector } from "./QuantitySelector";
import { ProductVariantSelector } from "./ProductVariantSelector";
import "./ProductInfo.css";

export function ProductInfo({
  name,
  price,
  quantity,
  onQuantityChange,
  availableStock,
  description,
  hasVariants = false,
  product,
  selectedVariant,
  onVariantChange,
  onAddToCart,
  onBuyNow,
}) {
  const totalPrice = price * quantity;
  const variantSelectionComplete = !hasVariants || Boolean(selectedVariant);

  return (
    <div className="product-info">
      <span className="product-info-kicker">Quick acquisition module</span>
      <h2 className="product-info-title">{name}</h2>

      <div className="product-info-price">
        <span className="price-label">Price:</span>
        <span className="price-value">৳{price.toLocaleString("en-BD")} /Unit</span>
      </div>

      {hasVariants && product ? (
        <ProductVariantSelector
          key={product.id ?? product.slug}
          product={product}
          onVariantChange={onVariantChange ?? (() => undefined)}
        />
      ) : null}

      {!hasVariants ? (
        <QuantitySelector
          quantity={quantity}
          onQuantityChange={onQuantityChange}
          min={1}
          max={availableStock}
          availableStock={availableStock}
        />
      ) : null}

      <div className="product-info-total">
        <span className="total-label">Total Price:</span>
        <span className="total-value">৳{totalPrice.toLocaleString("en-BD")}</span>
      </div>

      {description ? (
        <div className="product-info-description">
          <h3 className="description-title">Description:</h3>
          <div className="description-content" dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      ) : null}

      <div className="product-info-actions">
        <button
          type="button"
          onClick={onAddToCart}
          disabled={availableStock === 0 || !variantSelectionComplete || (hasVariants && !selectedVariant)}
          className="product-info-add-to-cart"
        >
          <ShoppingCart className="h-5 w-5" />
          ADD TO CART
        </button>
        <button
          type="button"
          onClick={onBuyNow}
          disabled={availableStock === 0 || !variantSelectionComplete || (hasVariants && !selectedVariant)}
          className="product-info-buy-now"
        >
          BUY NOW
        </button>
      </div>
    </div>
  );
}

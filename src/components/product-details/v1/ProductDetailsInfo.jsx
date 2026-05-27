"use client";

import { CheckCircle2, ShoppingCart, Zap } from "lucide-react";
import { QuantitySelector } from "@/components/product-quick-view/QuantitySelector";
import { ProductDetailsVariantSelector } from "./ProductDetailsVariantSelector";
import { formatMoney, getBrandName } from "./productDetailsUtils";

export function ProductDetailsInfo({
  product,
  name,
  priceInfo,
  quantity,
  onQuantityChange,
  availableStock,
  hasVariants,
  selectedVariant,
  onVariantChange,
  onAddToCart,
  onBuyNow,
}) {
  const brandName = getBrandName(product);
  const canOrder = hasVariants ? Boolean(selectedVariant && availableStock > 0) : availableStock > 0;

  return (
    <section className="pdv1_info">
      <div className="pdv1_badgeRow">
        <span className={`pdv1_stockBadge${availableStock > 0 ? " is-stock" : ""}`}>
          {availableStock > 0 ? "In Stock" : "Stock Out"}
        </span>
        {product?.sku ? <span className="pdv1_metaBadge">SKU: {product.sku}</span> : null}
      </div>

      <h1 className="pdv1_title">{name}</h1>

      <div className="pdv1_metaGrid">
        {brandName ? <span>Brand: {brandName}</span> : null}
        {product?.model ? <span>Model: {product.model}</span> : null}
        {product?.category?.name ? <span>Category: {product.category.name}</span> : null}
      </div>

      <div className="pdv1_priceBox">
        <strong>{formatMoney(priceInfo.currentPrice)}</strong>
        {priceInfo.hasDiscount ? <del>{formatMoney(priceInfo.originalPrice)}</del> : null}
        {priceInfo.discountPercent > 0 ? <span>-{priceInfo.discountPercent}%</span> : null}
      </div>

      {hasVariants ? (
        <ProductDetailsVariantSelector product={product} onVariantChange={onVariantChange} />
      ) : (
        <p className="pdv1_simpleStock">
          <CheckCircle2 size={16} />
          {availableStock > 0 ? `${availableStock} available` : "This product is currently unavailable"}
        </p>
      )}

      {canOrder ? (
        <QuantitySelector
          availableStock={availableStock}
          max={availableStock}
          min={1}
          onQuantityChange={onQuantityChange}
          quantity={quantity}
        />
      ) : null}

      <div className="pdv1_totalRow">
        <span>Total</span>
        <strong>{formatMoney(priceInfo.currentPrice * quantity)}</strong>
      </div>

      <div className="pdv1_actions">
        <button className="pdv1_cartBtn" disabled={!canOrder} onClick={onAddToCart} type="button">
          <ShoppingCart size={18} />
          Add to Cart
        </button>
        <button className="pdv1_buyBtn" disabled={!canOrder} onClick={onBuyNow} type="button">
          <Zap size={18} />
          Buy Now
        </button>
      </div>

      {product?.short_description ? (
        <div className="pdv1_overview" dangerouslySetInnerHTML={{ __html: product.short_description }} />
      ) : null}
    </section>
  );
}

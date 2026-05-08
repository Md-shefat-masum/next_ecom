'use client';

import Image from 'next/image';
import Link from 'next/link';
import { GitCompareArrows, Heart, ShoppingCart, Star, Zap } from 'lucide-react';
import { shouldUnoptimize } from '../components/utils';
import ProductCardV3DiscountCountdown from './ProductCardV3DiscountCountdown';
import type { ProductCardV3Product } from './productCardV3Types';
import {
  formatV3Taka,
  getV3PriceDisplay,
  getV3Rating,
  resolveV3ImageUrl,
} from './productCardV3Utils';
import './ProductCardV3.css';

interface ProductCardV3Props {
  product?: ProductCardV3Product;
  onAddToCart?: () => void;
  onWishlistClick?: () => void;
  onCompareClick?: () => void;
  onBuyNowClick?: () => void;
}

const PLACEHOLDER: ProductCardV3Product = {
  id: 0,
  name: 'Futuristic product',
  slug: '#',
  price: 1000,
  discount_price: 850,
  discount_parcent: 15,
  brand: { name: 'BME' },
  category: { name: 'Tech Gear' },
  offer_end_time: '2026-10-08T12:00:00Z',
};

export default function ProductCardV3({
  product,
  onAddToCart,
  onWishlistClick,
  onCompareClick,
  onBuyNowClick,
}: ProductCardV3Props) {
  const item = product ?? PLACEHOLDER;
  const imageUrl = resolveV3ImageUrl(item);
  const productHref = item.slug === '#' ? '#' : `/products/${item.slug}`;
  const { current, original, discountPercent } = getV3PriceDisplay(item);
  const rating = getV3Rating(item);
  const brandName = item.brand?.name?.trim() || 'BME';
  const categoryName = item.category?.name?.trim() || 'Product';
  const hasDiscount = discountPercent > 0;
  const countdownEnd = item.offer_end_time || (hasDiscount ? '2026-10-08T12:00:00Z' : null);

  return (
    <article className="hudpv1_card">
      <span className="hudpv1_ambient hudpv1_ambient_cyan" aria-hidden />
      <span className="hudpv1_ambient hudpv1_ambient_gold" aria-hidden />
      <span className="hudpv1_noise" aria-hidden />
      <span className="hudpv1_corner hudpv1_corner_tl" aria-hidden />
      <span className="hudpv1_corner hudpv1_corner_tr" aria-hidden />
      <span className="hudpv1_corner hudpv1_corner_bl" aria-hidden />
      <span className="hudpv1_corner hudpv1_corner_br" aria-hidden />

      <header className="hudpv1_header">
        <div>
          <span className="hudpv1_eyebrow">{brandName}</span>
          <span className="hudpv1_category">{categoryName}</span>
        </div>
        {hasDiscount ? (
          <div className="hudpv1_discount_badge" aria-label={`${discountPercent}% discount`}>
            <strong>{discountPercent}%</strong>
            <span>OFF</span>
          </div>
        ) : (
          <div className="hudpv1_status_chip">HUD</div>
        )}
      </header>

      <Link href={productHref} className="hudpv1_visual" aria-label={item.name}>
        <span className="hudpv1_scanline" aria-hidden />
        <span className="hudpv1_orbit hudpv1_orbit_one" aria-hidden />
        <span className="hudpv1_orbit hudpv1_orbit_two" aria-hidden />
        <span className="hudpv1_orbit hudpv1_orbit_three" aria-hidden />
        <span className="hudpv1_radar_sweep" aria-hidden />
        <span className="hudpv1_crosshair hudpv1_crosshair_x" aria-hidden />
        <span className="hudpv1_crosshair hudpv1_crosshair_y" aria-hidden />
        <span className="hudpv1_target" aria-hidden />
        <Image
          src={imageUrl}
          alt={item.name}
          fill
          className="hudpv1_image"
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 42vw, 300px"
          unoptimized={shouldUnoptimize(imageUrl)}
        />
        <span className="hudpv1_visual_readout" aria-hidden>
          optical scan
        </span>
      </Link>

      <div className="hudpv1_signal_bar" aria-hidden>
        <span />
        <span />
        <span />
        <span />
      </div>

      <section className="hudpv1_body">
        <div className="hudpv1_meta_row">
          <div className="hudpv1_rating" aria-label={`Average rating ${rating} out of 5`}>
            <Star size={15} fill="currentColor" strokeWidth={0} aria-hidden />
            <strong>{rating}</strong>
            <span>avg</span>
          </div>
          {countdownEnd ? (
            <ProductCardV3DiscountCountdown endsAt={countdownEnd} />
          ) : (
            <span className="hudpv1_inventory">In stock</span>
          )}
        </div>

        <Link href={productHref} className="hudpv1_title">
          {item.name}
        </Link>

        <div className="hudpv1_price_row">
          <div className="hudpv1_price_stack">
            <span className="hudpv1_current_price">{formatV3Taka(current)}</span>
            {original !== null ? (
              <span className="hudpv1_original_price">{formatV3Taka(original)}</span>
            ) : null}
          </div>
          {hasDiscount ? (
            <span className="hudpv1_savings">Save {formatV3Taka((original ?? current) - current)}</span>
          ) : null}
        </div>
      </section>

      <footer className="hudpv1_actions">
        <button
          type="button"
          className="hudpv1_icon_button"
          aria-label="Add to wishlist"
          onClick={onWishlistClick}
        >
          <Heart size={19} aria-hidden />
        </button>
        <button
          type="button"
          className="hudpv1_buy_button"
          onClick={onBuyNowClick}
        >
          <Zap size={16} aria-hidden />
          <span>Buy now</span>
        </button>
        <button
          type="button"
          className="hudpv1_icon_button"
          aria-label="Compare product"
          onClick={onCompareClick}
        >
          <GitCompareArrows size={18} aria-hidden />
        </button>
        <button
          type="button"
          className="hudpv1_cart_button"
          aria-label="Add to cart"
          onClick={onAddToCart}
        >
          <ShoppingCart size={19} aria-hidden />
        </button>
      </footer>
    </article>
  );
}

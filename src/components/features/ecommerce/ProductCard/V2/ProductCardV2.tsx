'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { shouldUnoptimize } from '../components/utils';
import type { ProductCardV2Product } from './productCardV2Types';
import {
  formatV2Taka,
  getV2PriceDisplay,
  resolveV2ImageUrl,
} from './productCardV2Utils';
import ProductCardV2DiscountCountdown from './ProductCardV2DiscountCountdown';
import './ProductCardV2.css';

interface ProductCardV2Props {
  product?: ProductCardV2Product;
  onAddToCart?: () => void;
  onWishlistClick?: () => void;
}

const PLACEHOLDER: ProductCardV2Product = {
  id: 0,
  name: 'Product name',
  slug: '#',
  price: 0,
};

export default function ProductCardV2({
  product,
  onAddToCart,
  onWishlistClick,
}: ProductCardV2Props) {
  const item = product ?? PLACEHOLDER;
  const imageUrl = resolveV2ImageUrl(item);
  const unopt = shouldUnoptimize(imageUrl);
  const { current, original, discountPercent } = getV2PriceDisplay(item);

  const ratingNum = typeof item.rating === 'string'
    ? parseFloat(item.rating)
    : (item.rating ?? 0);
  const ratingText = Number.isFinite(ratingNum) ? ratingNum.toFixed(1) : '—';

  const brandName = item.brand?.name?.trim() || 'Brand';
  const categoryTag = item.category?.name?.trim();
  const productHref = `/products/${item.slug}`;

  return (
    <article className="pcv2_card">
      <div className="pcv2_image_block">
        <div className="pcv2_image_bg">
          {(discountPercent > 0 || categoryTag) && (
            <div className="pcv2_badges" aria-live="polite">
              {discountPercent > 0 ? (
                <span className="pcv2_badge_discount">{`- ${discountPercent}%`}</span>
              ) : null}
              {categoryTag ? (
                <span className="pcv2_badge_tag">{categoryTag}</span>
              ) : null}
            </div>
          )}

          <Link href={productHref} className="pcv2_image_link" aria-label={item.name}>
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={item.name}
                fill
                className="pcv2_image"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 280px"
                unoptimized={unopt}
              />
            ) : (
              <div style={{ alignSelf: 'center', color: '#8e8e8e' }}>
                No image
              </div>
            )}
          </Link>
        </div>

        <ProductCardV2DiscountCountdown endsAt={item.offer_end_time || '2026-10-08T12:00:00Z'} />

        <div className="pcv2_utility_row">
          {/*
            Previous W × H × D dimensions block (uses getV2DimensionParts(item) from productCardV2Utils):

            <div className="pcv2_dims">
              <div className="pcv2_dims_labels" aria-hidden>
                <span className="pcv2_dims_label">W</span>
                <span className="pcv2_dims_label">H</span>
                <span className="pcv2_dims_label">D</span>
              </div>
              <div className="pcv2_dims_line">…dims.line…</div>
            </div>
          */}

          <div className="pcv2_rating_box" aria-label={`Rating ${ratingText} out of 5`}>
            <Star className="pcv2_rating_star" size={18} fill="currentColor" strokeWidth={0} aria-hidden />
            <span className="pcv2_rating_value">{ratingText}</span>
          </div>

          <button
            type="button"
            className="pcv2_icon_btn"
            aria-label="Add to wishlist"
            onClick={onWishlistClick}
          >
            <Heart aria-hidden strokeWidth={1.75} />
          </button>
          <button
            type="button"
            className="pcv2_icon_btn"
            aria-label="Add to cart"
            onClick={onAddToCart}
          >
            <ShoppingBag aria-hidden strokeWidth={1.75} />
          </button>
        </div>
  
      </div>

      <footer className="pcv2_footer">
        <div className="pcv2_footer_top">
          <span className="pcv2_brand">{brandName}</span>
          {original !== null ? (
            <span className="pcv2_price_original">{formatV2Taka(original)}</span>
          ) : (
            <span className="pcv2_footer_top_spacer" aria-hidden />
          )}
        </div>
        <div className="pcv2_footer_bottom">
          <Link href={productHref} className="pcv2_title">
            {item.name}
          </Link>
          <span className="pcv2_price_current">{formatV2Taka(current)}</span>
        </div>
      </footer>
    </article>
  );
}

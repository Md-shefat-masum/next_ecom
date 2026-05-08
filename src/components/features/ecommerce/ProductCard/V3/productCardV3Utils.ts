import { calculateDiscount, getImageUrl } from '../components/utils';
import type { ProductCardV3Product } from './productCardV3Types';

function parseMoney(value: number | string | null | undefined): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number.parseFloat(value.replace(/,/g, ''));
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

export function resolveV3ImageUrl(product: ProductCardV3Product): string {
  const raw =
    product.full_image_url ??
    product.thumbnail_img ??
    product.image ??
    null;

  return getImageUrl(raw);
}

export function getV3PriceDisplay(product: ProductCardV3Product): {
  current: number;
  original: number | null;
  discountPercent: number;
} {
  const listPrice =
    parseMoney(product.mrp_price) ??
    parseMoney(product.price) ??
    0;
  const discountPrice = parseMoney(product.discount_price);
  const cashPrice = parseMoney(product.cash_price);
  const retailPrice = parseMoney(product.retail_price);

  const currentCandidate =
    discountPrice && discountPrice > 0 && discountPrice < listPrice
      ? discountPrice
      : cashPrice ?? retailPrice ?? parseMoney(product.price) ?? listPrice;

  const current = Math.max(0, currentCandidate);
  const hasSale = listPrice > 0 && current > 0 && current < listPrice;
  const fieldPercent =
    product.discount_parcent ||
    product.discount_percent ||
    0;
  const computedPercent = calculateDiscount(listPrice, current);

  return {
    current,
    original: hasSale ? listPrice : null,
    discountPercent: hasSale
      ? Math.max(1, Math.round(fieldPercent || computedPercent))
      : 0,
  };
}

export function formatV3Taka(value: number): string {
  return `৳${Math.round(value).toLocaleString()}`;
}

export function getV3Rating(product: ProductCardV3Product): string {
  const raw = product.average_rating ?? product.rating ?? 0;
  const rating = typeof raw === 'string' ? Number.parseFloat(raw) : raw;

  return Number.isFinite(rating) && rating > 0 ? rating.toFixed(1) : '0.0';
}


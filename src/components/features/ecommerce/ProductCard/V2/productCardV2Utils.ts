import type { ProductCardV2Product } from './productCardV2Types';
import { getImageUrl, calculateDiscount } from '../components/utils';

export function resolveV2ImageUrl(product: ProductCardV2Product): string {
  const raw =
    product.full_image_url ??
    product.image ??
    null;
  return getImageUrl(raw);
}

export function getV2DimensionParts(product: ProductCardV2Product): {
  w: string;
  h: string;
  d: string;
  line: string;
} {
  const wRaw = product.length ?? product.chest;
  const hRaw = product.waist ?? product.sleeve;
  const dRaw = product.chest ?? product.waist;

  if (
    wRaw !== null &&
    wRaw !== undefined &&
    String(wRaw).trim() !== '' &&
    hRaw !== null &&
    hRaw !== undefined &&
    String(hRaw).trim() !== ''
  ) {
    const w = String(wRaw);
    const h = String(hRaw);
    const d =
      dRaw !== null && dRaw !== undefined && String(dRaw).trim() !== ''
        ? String(dRaw)
        : '—';
    return {
      w,
      h,
      d,
      line: `${w} × ${h} × ${d}`,
    };
  }

  const html = product.short_description ?? '';
  const portMatch =
    html.match(/Ports?:<\/strong>\s*(\d+)/i) ||
    html.match(/(\d+)\s*(?:×|&times;)\s*Gigabit/i);
  const sfpMatch =
    html.match(/SFP\s*(?:Ports?:)?(?:<\/strong>)?\s*[✅/&nbsp;\s]*(\d+)/i) ||
    html.match(/(\d+)\s*(?:×|&times;)\s*SFP/i);
  const w = portMatch?.[1] ?? '—';
  const h = sfpMatch?.[1] ?? '—';
  const hasPoe = /802\.3at|PoE\+|\bPoE\b/i.test(html);
  const d = hasPoe ? 'PoE+' : '—';

  return {
    w,
    h,
    d,
    line: `${w} × ${h} × ${d}`,
  };
}

export function parseV2CashPrice(product: ProductCardV2Product): number {
  const cp = product.cash_price;
  if (typeof cp === 'number' && !Number.isNaN(cp)) return cp;
  if (typeof cp === 'string') {
    const n = parseFloat(cp.replace(/,/g, ''));
    if (!Number.isNaN(n)) return n;
  }
  return product.price;
}

export function getV2PriceDisplay(product: ProductCardV2Product): {
  current: number;
  original: number | null;
  discountPercent: number;
} {
  const listPrice = product.price;
  const discountPrice =
    product.discount_price && product.discount_price > 0
      ? product.discount_price
      : undefined;
  const current = discountPrice && discountPrice < listPrice
    ? discountPrice
    : parseV2CashPrice(product);

  const fromFields =
    product.discount_parcent && product.discount_parcent > 0
      ? product.discount_parcent
      : calculateDiscount(listPrice, discountPrice);

  const hasSale =
    (discountPrice !== undefined && discountPrice < listPrice) ||
    (current < listPrice && listPrice > 0);

  return {
    current,
    original: hasSale ? listPrice : null,
    discountPercent: hasSale && fromFields > 0 ? fromFields : hasSale
      ? Math.max(1, Math.round((1 - current / listPrice) * 100))
      : 0,
  };
}

export function formatV2Taka(n: number): string {
  return `৳${Math.round(n).toLocaleString()}`;
}

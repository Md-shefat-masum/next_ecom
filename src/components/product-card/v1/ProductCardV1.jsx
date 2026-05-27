"use client";

/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from "react";
import { defaultGeneralInfo } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openProductQuickView } from "@/store/slices/modalSlice";
import { getFileUrl } from "@/lib/utils";
import styles from "./ProductCardV1.module.css";

const cx = (...classNames) => classNames.filter(Boolean).join(" ");

function getConfigValue(config, key, fallback) {
  return config?.[key] || defaultGeneralInfo[key] || fallback;
}

function getProductPayload(product) {
  return product?.data || product || {};
}

function getCurrencySymbol(currency) {
  if (!currency) return "৳";
  if (typeof currency === "string") return currency === "BDT" ? "৳" : currency;

  return currency.symbol || currency.icon || currency.sign || (currency.code === "BDT" ? "৳" : currency.code) || "৳";
}

function asNumber(value) {
  if (value === null || value === undefined || value === "") return null;

  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : null;
}

function formatMoney(value, symbol) {
  const numberValue = asNumber(value);
  if (numberValue === null) return "";

  return `${symbol}${numberValue.toLocaleString("en-BD", {
    maximumFractionDigits: Number.isInteger(numberValue) ? 0 : 2,
  })}`;
}

function formatPercent(value) {
  const numberValue = asNumber(value);
  if (numberValue === null) return "";

  return `${numberValue.toLocaleString("en-BD", {
    maximumFractionDigits: Number.isInteger(numberValue) ? 0 : 1,
  })}%`;
}

function normalizeImageItem(item, index, title) {
  const rawSrc =
    typeof item === "string"
      ? item
      : item?.full_image_url ||
        item?.full_url ||
        item?.url ||
        item?.image_url ||
        item?.image ||
        item?.path ||
        item?.file_path;

  if (!rawSrc) return null;

  return {
    id: typeof item === "object" && item?.id ? item.id : `${rawSrc}-${index}`,
    src: getFileUrl(rawSrc),
    alt: typeof item === "object" && item?.alt ? item.alt : title,
  };
}

function getProductImages(product, title) {
  const imageSources = [
    product.full_image_url,
    product.image,
    product.image_url,
    product.thumbnail_img,
    product.thumbnail,
    product.photo,
    ...(Array.isArray(product.full_multiple_images_url) ? product.full_multiple_images_url : []),
    ...(Array.isArray(product.multiple_images) ? product.multiple_images : []),
    ...(Array.isArray(product.images) ? product.images : []),
  ];

  const seen = new Set();

  return imageSources
    .map((item, index) => normalizeImageItem(item, index, title))
    .filter((item) => {
      if (!item || seen.has(item.src)) return false;
      seen.add(item.src);
      return true;
    })
    .slice(0, 4);
}

function getProductPrice(product) {
  const current =
    product.pricing?.final_price ??
    product.final_price ??
    product.pricing?.discount_price ??
    product.discount_price ??
    product.unit_price ??
    product.sale_price ??
    product.price;

  const old =
    product.pricing?.price ??
    product.main_price ??
    product.mrp_price ??
    product.retail_price ??
    product.regular_price ??
    product.price;

  return {
    current: asNumber(current),
    old: asNumber(old),
  };
}

function getDiscountPercent(product, currentPrice, oldPrice) {
  const provided =
    product.discount?.percent ??
    product.discount_parcent ??
    product.discount_percent ??
    product.discount_percentage;

  const providedNumber = asNumber(provided);
  if (providedNumber !== null) return providedNumber;

  if (!oldPrice || !currentPrice || oldPrice <= currentPrice) return null;
  return Math.round(((oldPrice - currentPrice) / oldPrice) * 100);
}

function getRating(product) {
  return asNumber(product.reviews_summary?.average_rating ?? product.average_rating ?? product.rating) || 0;
}

function getReviewCount(product) {
  return asNumber(product.reviews_summary?.count ?? product.review_count ?? product.reviews_count ?? product.total_reviews) || 0;
}

function renderStars(rating) {
  return Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;
    const className =
      rating >= starValue
        ? undefined
        : rating >= starValue - 0.5
          ? styles.starHalf
          : styles.starEmpty;

    return (
      <span key={starValue} className={className}>
        ★
      </span>
    );
  });
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <circle cx="9" cy="20" r="1.8" />
      <circle cx="18" cy="20" r="1.8" />
      <path d="M3 4h2l2.5 11h10.8l2.2-7H7" />
    </svg>
  );
}

function WishlistIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M20.8 4.6c-1.7-1.7-4.5-1.7-6.2 0L12 7.2 9.4 4.6c-1.7-1.7-4.5-1.7-6.2 0s-1.7 4.5 0 6.2L12 19.6l8.8-8.8c1.7-1.7 1.7-4.5 0-6.2Z" />
    </svg>
  );
}

function CompareIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
      <path d="M8 6h8M6 8v8M18 8v8M8 18h8" />
    </svg>
  );
}

function QuickViewIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M2 12s3.8-6.5 10-6.5S22 12 22 12s-3.8 6.5-10 6.5S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export default function ProductCardV1({ product }) {
  const dispatch = useAppDispatch();
  const configState = useAppSelector((state) => state.config);
  const productPayload = useMemo(() => getProductPayload(product), [product]);
  const themeConfig =
    configState.data?.general_info || configState.data?.generalInfo || configState.data || defaultGeneralInfo;
  const currencySymbol = getCurrencySymbol(configState.currency || configState.data?.currency);
  const title = productPayload.title || productPayload.name || productPayload.text || "Product";
  const images = useMemo(() => getProductImages(productPayload, title), [productPayload, title]);
  const [selectedImageSrc, setSelectedImageSrc] = useState("");
  const selectedImage = images.some((image) => image.src === selectedImageSrc)
    ? selectedImageSrc
    : images[0]?.src || "";
  const { current: currentPrice, old: oldPrice } = getProductPrice(productPayload);
  const showOldPrice = oldPrice !== null && currentPrice !== null && oldPrice > currentPrice;
  const saveAmount = showOldPrice ? oldPrice - currentPrice : null;
  const discountPercent = getDiscountPercent(productPayload, currentPrice, oldPrice);
  const rating = getRating(productPayload);
  const reviewCount = getReviewCount(productPayload);
  const inStock = productPayload.in_stock ?? productPayload.stock > 0;

  const themeVars = {
    "--hud-blue": getConfigValue(themeConfig, "primary_color", "#075ee8"),
    "--hud-blue-dark": getConfigValue(themeConfig, "primary_dark_color", "#0046c7"),
    "--hud-blue-soft": getConfigValue(themeConfig, "soft_blue_background_color", "#eef6ff"),
    "--hud-navy": getConfigValue(themeConfig, "title_color", "#061943"),
    "--hud-muted": getConfigValue(themeConfig, "text_muted_color", "#5f6c80"),
    "--hud-line": getConfigValue(themeConfig, "border_color", "#9eafc3"),
    "--hud-line-soft": getConfigValue(themeConfig, "border_soft_color", "#d8e2ef"),
    "--hud-bg": getConfigValue(themeConfig, "page_background_color", "#eaf1f8"),
    "--hud-card-bg": getConfigValue(themeConfig, "card_background_color", "#ffffff"),
    "--hud-star": getConfigValue(themeConfig, "rating_star_color", "#ff9800"),
    "--hud-button-text": getConfigValue(themeConfig, "button_text_color", "#ffffff"),
  };

  const badgeText =
    saveAmount && discountPercent
      ? `Save: ${formatMoney(saveAmount, currencySymbol)} (-${formatPercent(discountPercent)})`
      : inStock
        ? "In Stock"
        : "Stock Out";

  const productSlug = productPayload.slug;

  const handleQuickView = () => {
    if (productSlug) dispatch(openProductQuickView(productSlug));
  };

  const handleAddToCart = () => {
    if (productSlug) dispatch(openProductQuickView(productSlug));
  };

  const handleBuyNow = () => {
    if (productSlug) dispatch(openProductQuickView(productSlug));
  };

  return (
    <article className={styles.hudCard} style={themeVars}>
      <div className={styles.frameBorder} />

      <div className={styles.frameAccent} aria-hidden="true">
        <span className={cx(styles.corner, styles.cornerTl)} />
        <span className={cx(styles.corner, styles.cornerTr)} />
        <span className={cx(styles.corner, styles.cornerBl)} />
        <span className={cx(styles.corner, styles.cornerBr)} />
        <span className={cx(styles.cutLine, styles.cutTl)} />
        <span className={cx(styles.cutLine, styles.cutBr)} />
        <span className={cx(styles.centerChip, styles.chipTop)} />
        <span className={cx(styles.centerChip, styles.chipBottom)} />
      </div>

      <div className={cx(styles.cardContent, styles.v1CardContentWrapper)}>
        <div className={styles.saveBadge}>
          <span className={styles.saveInner}>
            <span className={styles.saveDot} />
            {badgeText}
          </span>
        </div>

        <section className={styles.heroWrap} aria-label={`${title} image gallery`}>
          <div className={styles.mainImageBox}>
            {selectedImage ? (
              <img className={styles.mainImage} src={selectedImage} alt={title} loading="lazy" />
            ) : (
              <div className={styles.imagePlaceholder}>No Image</div>
            )}
          </div>

          <div className={styles.actionStack}>
            <button className={styles.actionBtn} type="button" aria-label="Wishlist">
              <span className={styles.actionInner}>
                <WishlistIcon />
              </span>
            </button>

            {/* <button
              className={cx(styles.actionBtn, styles.actionBtnActive)}
              type="button"
              aria-label="Compare"
            >
              <span className={styles.actionInner}>
                <CompareIcon />
              </span>
            </button> */}

            {/* <button className={styles.actionBtn} type="button" aria-label="Quick View" onClick={handleQuickView}>
              <span className={styles.actionInner}>
                <QuickViewIcon />
              </span>
            </button> */}
          </div>
        </section>

        {images.length > 1 ? (
          <section className={cx(styles.thumbs, styles.v1ThumbnailsWrapper)} aria-label={`${title} thumbnails`}>
            {images.map((image) => (
              <button
                key={image.id}
                className={cx(styles.thumb, selectedImage === image.src && styles.thumbActive)}
                type="button"
                onClick={() => setSelectedImageSrc(image.src)}
                aria-label={`Show ${image.alt || title}`}
              >
                <span className={styles.thumbInner}>
                  <img src={image.src} alt={image.alt || title} loading="lazy" />
                </span>
              </button>
            ))}
          </section>
        ) : null}

        <h2 className={styles.title}>{title}</h2>

        {/* <div className={styles.ratingRow}>
          <div className={styles.stars} aria-label={`${rating.toFixed(1)} rating`}>
            {renderStars(rating)}
          </div>
          <span className={styles.score}>{rating.toFixed(1)}</span>
          <span className={styles.reviews}>
            ({reviewCount.toLocaleString("en-BD")} {reviewCount === 1 ? "review" : "reviews"})
          </span>
        </div> */}

        <div className={styles.priceRow}>
          <strong className={styles.price}>{formatMoney(currentPrice, currencySymbol) || "Price unavailable"}</strong>
          {showOldPrice ? (
            <span className={styles.oldPrice}>{formatMoney(oldPrice, currencySymbol)}</span>
          ) : null}
        </div>

        <div className={styles.buttonRow}>
          <button className={cx(styles.hudBtn, styles.iconOnly)} type="button" aria-label="Cart" onClick={handleAddToCart}>
            <span className={styles.btnInner}>
              <CartIcon />
            </span>
          </button>

          {/* <button className={cx(styles.hudBtn, styles.primary)} type="button" onClick={handleAddToCart}>
            <span className={styles.btnInner}>
              <CartIcon />
              Add to Cart
            </span>
          </button> */}

          <button className={cx(styles.hudBtn, styles.primary)} type="button" onClick={handleBuyNow}>
            <span className={styles.btnInner}>Buy Now</span>
          </button>
        </div>
      </div>
    </article>
  );
}

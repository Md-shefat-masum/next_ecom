"use client";

import { useCallback, useMemo, useState } from "react";
import { Headphones, ShieldCheck, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { defaultGeneralInfo } from "@/config";
import { useGetProductBySlugQuery } from "@/store/api";
import { useAppDispatch } from "@/store/hooks";
import { syncCartFromStorage } from "@/store/slices/cartSlice";
import { addToCart, CART_OPEN_EVENT } from "@/lib/cart/cartUtils";
import { ProductDetailsGallery } from "./ProductDetailsGallery";
import { ProductDetailsInfo } from "./ProductDetailsInfo";
import {
  getPriceInfo,
  getProductHasVariants,
  getProductImages,
  getProductName,
  getProductStock,
} from "./productDetailsUtils";
import "./ProductDetailsV1.css";

function LoadingState() {
  return (
    <div className="pdv1_shell">
      <div className="pdv1_skeleton pdv1_skeletonImage" />
      <div className="pdv1_skeletonPanel">
        <div className="pdv1_skeleton pdv1_skeletonLine wide" />
        <div className="pdv1_skeleton pdv1_skeletonLine" />
        <div className="pdv1_skeleton pdv1_skeletonLine short" />
      </div>
    </div>
  );
}

function ServiceCards() {
  const contact = defaultGeneralInfo.contact || defaultGeneralInfo.phone || "0967 881 4452";
  const whatsapp = defaultGeneralInfo.whatsapp || "+8801301884400";

  return (
    <aside className="pdv1_services" aria-label="Product service information">
      <div className="pdv1_serviceCard">
        <Headphones size={20} />
        <div>
          <b>Support</b>
          <span>{defaultGeneralInfo.support_time || "Saturday - Thursday, 09 AM - 06 PM"}</span>
        </div>
      </div>
      <div className="pdv1_serviceCard">
        <Truck size={20} />
        <div>
          <b>Delivery</b>
          <span>Inside Dhaka ৳{defaultGeneralInfo.inside_dhaka_shipping_charge || "120"}</span>
        </div>
      </div>
      <div className="pdv1_serviceCard">
        <ShieldCheck size={20} />
        <div>
          <b>Hotline</b>
          <span>{contact}</span>
        </div>
      </div>
      <div className="pdv1_serviceCard">
        <Headphones size={20} />
        <div>
          <b>WhatsApp</b>
          <span>{whatsapp}</span>
        </div>
      </div>
    </aside>
  );
}

function DetailsTabs({ product }) {
  const description = product?.description || product?.specification || product?.warrenty_policy;

  if (!description && !product?.shipping_info) return null;

  return (
    <section className="pdv1_bottom">
      {product?.description ? (
        <article className="pdv1_textCard">
          <h2>Description</h2>
          <div dangerouslySetInnerHTML={{ __html: product.description }} />
        </article>
      ) : null}

      {product?.specification ? (
        <article className="pdv1_textCard">
          <h2>Specification</h2>
          <div dangerouslySetInnerHTML={{ __html: product.specification }} />
        </article>
      ) : null}

      <article className="pdv1_textCard">
        <h2>Shipping & Warranty</h2>
        <p>
          Package: {product?.shipping_info?.package_type || "Standard"} · Returnable:{" "}
          {product?.shipping_info?.returnable ? `${product.shipping_info.return_policy_days || 7} days` : "No"}
        </p>
        {product?.warrenty_policy ? <div dangerouslySetInnerHTML={{ __html: product.warrenty_policy }} /> : null}
      </article>
    </section>
  );
}

function ProductDetailsContent({ product }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [variantStock, setVariantStock] = useState(0);
  const [stockKey, setStockKey] = useState("");

  const name = getProductName(product);
  const images = useMemo(() => getProductImages(product), [product]);
  const hasVariants = getProductHasVariants(product);
  const availableStock = hasVariants ? variantStock : getProductStock(product);
  const safeQuantity = availableStock > 0 ? Math.min(quantity, availableStock) : quantity;
  const priceInfo = useMemo(() => getPriceInfo(product, selectedVariant), [product, selectedVariant]);

  const handleVariantChange = useCallback(({ matchedCombination, selectedOptions: options, stock, stockKey: key }) => {
    setSelectedVariant(matchedCombination);
    setSelectedOptions(options || {});
    setVariantStock(stock || 0);
    setStockKey(key || "");
    setQuantity(1);
  }, []);

  const handleQuantityChange = (nextQuantity) => {
    if (nextQuantity < 1) return;
    if (availableStock && nextQuantity > availableStock) return;
    setQuantity(nextQuantity);
  };

  const addCurrentProductToCart = () => {
    if (!product) return { success: false };

    const result = addToCart(product, {
      quantity: safeQuantity,
      selectedOptions,
      matchedCombination: selectedVariant,
      stock: availableStock,
      stockKey,
    });

    if (!result.success) window.alert(result.message);
    return result;
  };

  const handleAddToCart = () => {
    const result = addCurrentProductToCart();
    if (!result.success) return;

    dispatch(syncCartFromStorage());
    window.dispatchEvent(new Event(CART_OPEN_EVENT));
  };

  const handleBuyNow = () => {
    const result = addCurrentProductToCart();
    if (!result.success) return;

    dispatch(syncCartFromStorage());
    router.push("/checkout");
  };

  return (
    <div className="pdv1_page">
      <div className="pdv1_breadcrumb">Home / Products / {name}</div>

      <div className="pdv1_shell">
        <ProductDetailsGallery images={images} productName={name} />
        <ProductDetailsInfo
          availableStock={availableStock}
          hasVariants={hasVariants}
          name={name}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onQuantityChange={handleQuantityChange}
          onVariantChange={handleVariantChange}
          priceInfo={priceInfo}
          product={product}
          quantity={safeQuantity}
          selectedVariant={selectedVariant}
        />
        <ServiceCards />
      </div>

      <DetailsTabs product={product} />
    </div>
  );
}

export function ProductDetailsV1({ slug }) {
  const { data: productResponse, isLoading, isError } = useGetProductBySlugQuery(slug, {
    skip: !slug,
  });

  const product = productResponse?.data;

  if (isLoading) return <LoadingState />;

  if (isError || !product) {
    return (
      <div className="pdv1_error">
        <h1>Product not found</h1>
        <p>We could not load this product right now.</p>
      </div>
    );
  }

  return <ProductDetailsContent key={product.id || product.slug || slug} product={product} />;
}

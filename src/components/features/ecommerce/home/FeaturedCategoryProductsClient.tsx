'use client';

import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ProductCard from '@/components/features/ecommerce/ProductCard';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Product } from '@/types';
import type { FeaturedCategorySection } from '@/types/featuredCategoryHome';
import { fetchCategoryProducts } from '@/lib/api/server/featuredCategoryProducts';
import 'swiper/css';
import 'swiper/css/navigation';
import './FeaturedCategoryProducts.css';

interface CategorySectionProps {
  section: FeaturedCategorySection;
}

function CategorySection({ section }: CategorySectionProps) {
  const { category } = section;
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasRequestedProductsRef = useRef(section.products.length > 0);
  const [products, setProducts] = useState<Product[]>(section.products);
  const [hasRequestedProducts, setHasRequestedProducts] = useState(
    section.products.length > 0
  );
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  useEffect(() => {
    if (hasRequestedProductsRef.current) return;

    let cancelled = false;
    let observer: IntersectionObserver | null = null;
    const target = sectionRef.current;

    const loadProducts = async () => {
      if (cancelled || hasRequestedProductsRef.current) return;

      hasRequestedProductsRef.current = true;
      setHasRequestedProducts(true);
      setIsLoadingProducts(true);

      const nextProducts = await fetchCategoryProducts(category.slug, 20).catch(
        () => []
      );

      if (!cancelled) {
        setProducts(nextProducts);
        setIsLoadingProducts(false);
      }
    };

    const observeTimer = window.setTimeout(() => {
      if (!target || cancelled) return;

      if (!('IntersectionObserver' in window)) {
        void loadProducts();
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          observer?.disconnect();
          void loadProducts();
        },
        {
          root: null,
          rootMargin: '0px 0px -12% 0px',
          threshold: 0.18,
        }
      );

      observer.observe(target);
    }, 180);

    return () => {
      cancelled = true;
      window.clearTimeout(observeTimer);
      observer?.disconnect();
    };
  }, [category.slug]);

  return (
    <section
      ref={sectionRef}
      className="featured-category-section"
      id={`category-${category.slug}`}
    >
      <span className="featured-category-corner featured-category-corner-tl" aria-hidden />
      <span className="featured-category-corner featured-category-corner-tr" aria-hidden />
      <span className="featured-category-corner featured-category-corner-bl" aria-hidden />
      <span className="featured-category-corner featured-category-corner-br" aria-hidden />

      <div className="featured-category-panel">
        <div className="featured-category-header">
          <div className="featured-category-title-block">
            <span className="featured-category-kicker">BME curated systems</span>
            <h2>{category.name}</h2>
            <p>Precision-selected devices in a premium HUD product matrix.</p>
          </div>
          <Link
            href={`/categories/${category.slug}`}
            className="featured-category-view-all"
          >
            <span>View All</span>
            <ArrowUpRight size={16} aria-hidden />
          </Link>
        </div>

        <div className="featured-category-controlbar" aria-label={`${category.name} product controls`}>
          <div className="featured-category-pills" aria-label="Category filters">
            <span className="featured-category-pill featured-category-pill-active">
              {category.name}
            </span>
            <span className="featured-category-pill">
              {hasRequestedProducts ? `${products.length} units` : 'Standby'}
            </span>
            <span className="featured-category-pill">
              {isLoadingProducts ? 'Scanning' : 'Ready stock'}
            </span>
          </div>
        </div>

        {!hasRequestedProducts || isLoadingProducts ? (
          <div className="featured-category-placeholder-grid" aria-label={`${category.name} products loading`}>
            {Array.from({ length: 4 }).map((_, index) => (
              <div className="featured-category-product-skeleton" key={index}>
                <span className="featured-category-skeleton-corner featured-category-skeleton-corner-tl" aria-hidden />
                <span className="featured-category-skeleton-corner featured-category-skeleton-corner-br" aria-hidden />
                <div className="featured-category-skeleton-visual" />
                <div className="featured-category-skeleton-signal" />
                <div className="featured-category-skeleton-line featured-category-skeleton-line-wide" />
                <div className="featured-category-skeleton-line" />
                <div className="featured-category-skeleton-price" />
                <div className="featured-category-skeleton-actions" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="featured-category-empty">
            No products found in this category
          </div>
        ) : (
          <Swiper
            modules={[Navigation]}
            spaceBetween={22}
            slidesPerView={1}
            navigation={true}
            breakpoints={{
              440: {
                slidesPerView: 2,
                spaceBetween: 22,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 28,
              },
            }}
            className="featured-category-swiper"
          >
            {products.map((product: Product) => {
              interface ProductWithPricing extends Product {
                pricing?: {
                  final_price?: number;
                  discount_price?: number;
                };
                full_image_url?: string;
              }
              const productWithPricing = product as ProductWithPricing;
              return (
                <SwiperSlide key={product.id}>
                  <ProductCard
                    version="v3"
                    product={{
                      id: product.id,
                      name: product.name,
                      slug: product.slug,
                      price:
                        productWithPricing.pricing?.final_price ||
                        product.price ||
                        0,
                      discount_price:
                        productWithPricing.pricing?.discount_price ||
                        product.discount_price,
                      image:
                        productWithPricing.full_image_url || product.image,
                      rating: product.average_rating,
                      reviews_count: product.reviews_count,
                    }}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </section>
  );
}

interface FeaturedCategoryProductsClientProps {
  sections: FeaturedCategorySection[];
}

export default function FeaturedCategoryProductsClient({
  sections,
}: FeaturedCategoryProductsClientProps) {
  return (
    <section className="featured-categories-hud">
      <div className="container mx-auto px-4">
        <div className="featured-categories-shell">
          <div className="featured-categories-intro">
            <span className="featured-categories-kicker">Featured acquisition grid</span>
            <h2>Featured Categories</h2>
            <p>Explore category systems through a clean light-theme cockpit interface.</p>
          </div>

          <nav className="featured-categories-nav" aria-label="Featured category navigation">
            {sections.map((section, index) => (
              <Link
                key={section.category.id}
                href={`#category-${section.category.slug}`}
                className={`featured-categories-nav-pill${index === 0 ? ' featured-categories-nav-pill-active' : ''}`}
              >
                {section.category.name}
              </Link>
            ))}
          </nav>

          <div className="featured-categories-stack">
            {sections.map((section) => (
              <CategorySection key={section.category.id} section={section} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useFeaturedCategories, useCategoryProducts } from '@/lib/hooks/useCategories';
import ProductCard from '@/components/features/ecommerce/ProductCard';
import Link from 'next/link';
import { Product } from '@/types';
import 'swiper/css';
import 'swiper/css/navigation';
import './FeaturedCategoryProducts.css';

interface FeaturedCategory {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  featured: number;
  serial: number;
}

interface CategorySectionProps {
  category: FeaturedCategory;
}

function CategorySection({ category }: CategorySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasLoaded) {
            setShouldLoad(true);
            setHasLoaded(true);
          }
        });
      },
      {
        rootMargin: '100px', // Load 100px before viewport
        threshold: 0.1,
      }
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, [hasLoaded]);

  const { data: productsData, isLoading } = useCategoryProducts(
    category.slug,
    { per_page: 20 },
    { enabled: shouldLoad }
  );

  // Handle different response structures
  interface PaginatedProducts {
    data?: Product[];
  }
  const products: Product[] = 
    (productsData?.data as PaginatedProducts)?.data || 
    (productsData?.data as Product[]) || 
    [];

  return (
    <section
      ref={sectionRef}
      className="featured-category-section"
      style={{ minHeight: '400px' }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-bme-black">{category.name}</h2>
          <Link
            href={`/categories/${category.slug}`}
            className="text-bme-orange hover:text-primary-hover font-medium transition"
          >
            View All →
          </Link>
        </div>

        {!shouldLoad ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-xl aspect-square" />
            ))}
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-xl aspect-square" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No products found in this category
          </div>
        ) : (
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={2}
            navigation={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 24,
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
                    product={{
                      id: product.id,
                      name: product.name,
                      slug: product.slug,
                      price: productWithPricing.pricing?.final_price || product.price || 0,
                      discount_price: productWithPricing.pricing?.discount_price || product.discount_price,
                      image: productWithPricing.full_image_url || product.image,
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

export default function FeaturedCategoryProducts() {
  const { data: categories, isLoading } = useFeaturedCategories();

  if (isLoading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
            <div className="grid grid-cols-1 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-bme-black mb-8 text-center">
          Featured Categories
        </h2>
        <div className="space-y-12">
          {(categories as FeaturedCategory[]).map((category: FeaturedCategory) => (
            <CategorySection key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}

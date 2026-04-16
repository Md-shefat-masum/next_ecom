'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ProductCard from '@/components/features/ecommerce/ProductCard';
import Link from 'next/link';
import { Product } from '@/types';
import type { FeaturedCategorySection } from '@/types/featuredCategoryHome';
import 'swiper/css';
import 'swiper/css/navigation';
import './FeaturedCategoryProducts.css';

interface CategorySectionProps {
  section: FeaturedCategorySection;
}

function CategorySection({ section }: CategorySectionProps) {
  const { category, products } = section;

  return (
    <section className="featured-category-section">
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

        {products.length === 0 ? (
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
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-bme-black mb-8 text-center">
          Featured Categories
        </h2>
        <div className="space-y-12">
          {sections.map((section) => (
            <CategorySection key={section.category.id} section={section} />
          ))}
        </div>
      </div>
    </section>
  );
}

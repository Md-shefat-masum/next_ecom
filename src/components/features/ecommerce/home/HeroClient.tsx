'use client';

import { useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Hero.css';
import {
    transformBannerData,
    getProductImageUrl,
    getProductUrl,
    shouldUnoptimizeImage,
    type BannerProduct,
} from './actions/heroActions';

interface HeroClientProps {
    bannerData?: BannerProduct[][][];
}

interface ProductItemProps {
    product: BannerProduct | null;
    className?: string;
    priority?: boolean;
}

function ProductItem({ product, className = '', priority = false }: ProductItemProps) {
    if (!product) {
        return <div className={`product-item ${className}`}></div>;
    }

    const imageUrl = getProductImageUrl(product);
    const productUrl = getProductUrl(product);

    return (
        <Link href={productUrl} className={`product-item border_item ${className}`}>
            <div className="product-item-image">
                <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading={priority ? 'eager' : 'lazy'}
                    priority={priority}
                    style={{ objectFit: 'contain' }}
                    unoptimized={shouldUnoptimizeImage(imageUrl)}
                />
            </div>
            <div className="product-item-title">
                <h3>{product.name}</h3>
            </div>
        </Link>
    );
}

export default function HeroClient({ bannerData }: HeroClientProps) {
    const slideContent = transformBannerData(bannerData);
    const swiperRef = useRef<SwiperType | null>(null);

    const handleMouseEnter = useCallback(() => {
        if (swiperRef.current?.autoplay) {
            swiperRef.current.autoplay.stop();
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (swiperRef.current?.autoplay) {
            swiperRef.current.autoplay.start();
        }
    }, []);

    if (slideContent.length === 0) {
        return null;
    }

    return (
        <section className="hero_section">
            <div className="container mx-auto">
                <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <Swiper
                        className="slider_el_wrapper"
                        modules={[Autoplay, Pagination, Navigation]}
                        spaceBetween={8}
                        slidesPerView={1}
                        breakpoints={{
                            922: {
                                slidesPerView: 2,
                            },
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        loop={slideContent.length > 1}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                    >
                        {slideContent.map((slide, index) => (
                            <SwiperSlide key={index}>
                                {slide.type === 'v1' ? (
                                    <div className="slider_el_v1">
                                        <div className="slider_el_left_top">
                                            <div className="slider_el_left_top_left">
                                                <ProductItem
                                                    product={slide.products[0] || null}
                                                    className="slider_el_left_top_left_item"
                                                    priority={index === 0}
                                                />
                                                <ProductItem
                                                    product={slide.products[1] || null}
                                                    className="slider_el_left_top_left_item"
                                                />
                                            </div>
                                            <ProductItem
                                                product={slide.products[2] || null}
                                                className="slider_el_left_top_right"
                                                priority={index === 0}
                                            />
                                        </div>
                                        <div className="slider_el_left_bottom">
                                            <ProductItem
                                                product={slide.products[3] || null}
                                                className="slider_el_left_bottom_item"
                                            />
                                            <ProductItem
                                                product={slide.products[4] || null}
                                                className="slider_el_left_bottom_item"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="slider_el_v2">
                                        <ProductItem
                                            product={slide.products[0] || null}
                                            className="slider_el_right_top"
                                            priority={index === 0}
                                        />
                                        <div className="slider_el_right_bottom">
                                            <ProductItem
                                                product={slide.products[1] || null}
                                                className="slider_el_right_bottom_item"
                                            />
                                            <ProductItem
                                                product={slide.products[2] || null}
                                                className="slider_el_right_bottom_item"
                                            />
                                        </div>
                                    </div>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}

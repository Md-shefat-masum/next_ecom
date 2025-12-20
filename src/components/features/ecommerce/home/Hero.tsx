'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "./Hero.css";

export default function Hero() {
    const slideContent = [
        { type: 'v1' },
        { type: 'v2' },
        { type: 'v1' },
        { type: 'v2' },
    ];

    return (
        <section className="hero_section">
            <div className="container mx-auto">
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
                    loop={true}
                >
                    {slideContent.map((slide, index) => (
                        <SwiperSlide key={index}>
                            {slide.type === 'v1' ? (
                                <div className="slider_el_v1">
                                    <div className="slider_el_left_top">
                                        <div className="slider_el_left_top_left">
                                            <div className="slider_el_left_top_left_item"></div>
                                            <div className="slider_el_left_top_left_item"></div>
                                        </div>
                                        <div className="slider_el_left_top_right"></div>
                                    </div>
                                    <div className="slider_el_left_bottom">
                                        <div className="slider_el_left_bottom_item"></div>
                                        <div className="slider_el_left_bottom_item"></div>
                                    </div>
                                </div>
                            ) : (
                                <div className="slider_el_v2">
                                    <div className="slider_el_right_top"></div>
                                    <div className="slider_el_right_bottom">
                                        <div className="slider_el_right_bottom_item"></div>
                                        <div className="slider_el_right_bottom_item"></div>
                                    </div>
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}


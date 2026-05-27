"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const bannerColumns = [
  {
    id: 1,
    type: "long",
    src_image: "/assets/images/banner/long.png",
    link: "/campaign/power-station",
    alt: "Power station campaign banner",
  },
  {
    id: 2,
    type: "square",
    top_image: "/assets/images/banner/square.png",
    top_link: "/campaign/printer",
    top_alt: "Printer campaign banner",
    bottom_image: "/assets/images/banner/square.png",
    bottom_link: "/campaign/ups",
    bottom_alt: "UPS campaign banner",
  },
  {
    id: 3,
    type: "square",
    top_image: "/assets/images/banner/square.png",
    top_link: "/campaign/audio",
    top_alt: "Audio campaign banner",
    bottom_image: "/assets/images/banner/square.png",
    bottom_link: "/campaign/smart-plug",
    bottom_alt: "Smart plug campaign banner",
  },
  {
    id: 5,
    type: "long",
    src_image: "/assets/images/banner/long.png",
    link: "/campaign/energy",
    alt: "Energy campaign banner",
  },
  {
    id: 4,
    type: "square",
    top_image: "/assets/images/banner/square.png",
    top_link: "/campaign/monitor",
    top_alt: "Monitor campaign banner",
    bottom_image: "/assets/images/banner/square.png",
    bottom_link: "/campaign/power-bank",
    bottom_alt: "Power bank campaign banner",
  },

  {
    id: 6,
    type: "wide-square",
    src_image: "/assets/images/banner/square.png",
    link: "/campaign/big-printer",
    alt: "Big printer campaign banner",
  },
  {
    id: 7,
    type: "long",
    src_image: "/assets/images/banner/long.png",
    link: "/campaign/security",
    alt: "Security campaign banner",
  },
  {
    id: 8,
    type: "square",
    top_image: "/assets/images/banner/square.png",
    top_link: "/campaign/camera",
    top_alt: "Camera campaign banner",
    bottom_image: "/assets/images/banner/square.png",
    bottom_link: "/campaign/access-control",
    bottom_alt: "Access control campaign banner",
  },
  {
    id: 9,
    type: "square",
    top_image: "/assets/images/banner/square.png",
    top_link: "/campaign/scanner",
    top_alt: "Scanner campaign banner",
    bottom_image: "/assets/images/banner/square.png",
    bottom_link: "/campaign/accessories",
    bottom_alt: "Accessories campaign banner",
  },
  {
    id: 10,
    type: "square",
    top_image: "/assets/images/banner/square.png",
    top_link: "/campaign/medical-device",
    top_alt: "Medical device campaign banner",
    bottom_image: "/assets/images/banner/square.png",
    bottom_link: "/campaign/office-equipment",
    bottom_alt: "Office equipment campaign banner",
  },
  {
    id: 11,
    type: "long",
    src_image: "/assets/images/banner/long.png",
    link: "/campaign/printer-offer",
    alt: "Printer offer campaign banner",
  },
  {
    id: 12,
    type: "square",
    top_image: "/assets/images/banner/square.png",
    top_link: "/campaign/medical-device",
    top_alt: "Medical device campaign banner",
    bottom_image: "/assets/images/banner/square.png",
    bottom_link: "/campaign/office-equipment",
    bottom_alt: "Office equipment campaign banner",
  },
];

function BannerImageBlock({ href, src, alt, ariaLabel, priority = false }) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className="group relative block h-full overflow-hidden bg-slate-100 shadow-[0_14px_34px_rgba(15,23,42,0.08)] outline-none transition duration-300 hover:shadow-[0_18px_46px_rgba(11,95,174,0.16)] focus-visible:ring-2 focus-visible:ring-[#0B5FAE]"
      style={{ clipPath: "polygon(12px 0, 100% 0, 100% 100%, 0 100%, 0 12px)" }}
    >
      <div
        className="relative h-full w-full overflow-hidden"
        style={{ clipPath: "polygon(12px 0, 100% 0, 100% 100%, 0 100%, 0 12px)" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 575px) 92vw, (max-width: 767px) 46vw, (max-width: 1199px) 30vw, (max-width: 1399px) 23vw, 18vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          priority={priority}
        />
        <span className="absolute inset-0 bg-gradient-to-tr from-[#071B3A]/20 via-[#0B5FAE]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <span className="absolute left-4 top-4 h-0.5 w-5 bg-[#0B5FAE]/35 transition-all duration-300 group-hover:w-7 group-hover:bg-[#F5A623]" />
      <span className="absolute left-4 top-4 h-5 w-0.5 bg-[#0B5FAE]/35 transition-all duration-300 group-hover:h-7 group-hover:bg-[#F5A623]" />
      <span className="absolute bottom-4 right-4 h-0.5 w-5 bg-[#0B5FAE]/35 transition-all duration-300 group-hover:w-7 group-hover:bg-[#F5A623]" />
      <span className="absolute bottom-4 right-4 h-5 w-0.5 bg-[#0B5FAE]/35 transition-all duration-300 group-hover:h-7 group-hover:bg-[#F5A623]" />
    </Link>
  );
}

function BannerColumn({ column, priority }) {
  if (column.type === "long" || column.type === "wide-square") {
    return (
      <div className="h-[420px] md:h-[480px] xl:h-[520px]">
        <BannerImageBlock
          href={column.link}
          src={column.src_image}
          alt={column.alt || "BME campaign banner"}
          ariaLabel={`Open ${column.alt || "BME campaign"}`}
          priority={priority}
        />
      </div>
    );
  }

  return (
    <div className="grid h-[420px] grid-rows-2 gap-3 md:h-[480px] xl:h-[520px]">
      <BannerImageBlock
        href={column.top_link}
        src={column.top_image}
        alt={column.top_alt || "BME campaign banner"}
        ariaLabel={`Open ${column.top_alt || "BME campaign"}`}
        priority={priority}
      />
      <BannerImageBlock
        href={column.bottom_link}
        src={column.bottom_image}
        alt={column.bottom_alt || "BME campaign banner"}
        ariaLabel={`Open ${column.bottom_alt || "BME campaign"}`}
      />
    </div>
  );
}

export function BannerMosaicSlider() {
  const [columns] = useState(bannerColumns);

  return (
    <section className="w-full bg-[#F5F7FA] py-6 sm:py-8">
      <div className="container">
        <div className="relative bg-white/85 p-3 shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur sm:p-4">
          <Swiper
            modules={[Navigation, Pagination]}
            loop={columns.length > 5}
            spaceBetween={12}
            slidesPerView="auto"
            navigation={{
              prevEl: ".banner-mosaic-prev",
              nextEl: ".banner-mosaic-next",
            }}
            pagination={{
              clickable: true,
              el: ".banner-mosaic-pagination",
              bulletClass: "banner-mosaic-bullet",
              bulletActiveClass: "banner-mosaic-bullet-active",
            }}
            breakpoints={{
              576: { spaceBetween: 12 },
              768: { spaceBetween: 12 },
              1200: { spaceBetween: 14 },
              1400: { spaceBetween: 16 },
            }}
            className="!overflow-hidden"
          >
            {columns.map((column, index) => (
              <SwiperSlide
                key={column.id}
                className={
                  column.type === "wide-square"
                    ? "!w-full sm:!w-[calc((100%_-_12px)/2)] md:!w-[calc(((100%_-_24px)/3)*2_+_12px)] xl:!w-[calc(((100%_-_42px)/4)*2_+_14px)] min-[1400px]:!w-[calc(((100%_-_64px)/5)*2_+_16px)]"
                    : "!w-full sm:!w-[calc((100%_-_12px)/2)] md:!w-[calc((100%_-_24px)/3)] xl:!w-[calc((100%_-_42px)/4)] min-[1400px]:!w-[calc((100%_-_64px)/5)]"
                }
              >
                <BannerColumn column={column} priority={index < 5} />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type="button"
            aria-label="Previous banner"
            className="banner-mosaic-prev absolute left-0 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#0B5FAE] shadow-[0_14px_34px_rgba(15,23,42,0.14)] transition hover:bg-[#EEF5FF] hover:text-[#F5A623] md:flex"
          >
            <ChevronLeft size={26} strokeWidth={2.4} />
          </button>
          <button
            type="button"
            aria-label="Next banner"
            className="banner-mosaic-next absolute right-0 top-1/2 z-10 hidden h-12 w-12 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#0B5FAE] shadow-[0_14px_34px_rgba(15,23,42,0.14)] transition hover:bg-[#EEF5FF] hover:text-[#F5A623] md:flex"
          >
            <ChevronRight size={26} strokeWidth={2.4} />
          </button>
        </div>

        <div className="banner-mosaic-pagination mt-5 flex justify-center gap-2" />
      </div>
    </section>
  );
}

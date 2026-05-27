"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useGetFeaturedCategoriesQuery } from "@/store/api";
import { getFileUrl } from "@/lib/utils";

const mechanicalLineClass =
  "bg-[#0B5FAE]/45 transition-colors duration-300 group-hover:bg-[#F58220]";

function MechanicalCorners() {
  return (
    <>
      <span className={`absolute left-0 top-0 h-px w-5 ${mechanicalLineClass}`} />
      <span className={`absolute left-0 top-0 h-5 w-px ${mechanicalLineClass}`} />
      <span className={`absolute right-0 top-0 h-px w-5 ${mechanicalLineClass}`} />
      <span className={`absolute right-0 top-0 h-5 w-px ${mechanicalLineClass}`} />
      <span className={`absolute bottom-0 left-0 h-px w-5 ${mechanicalLineClass}`} />
      <span className={`absolute bottom-0 left-0 h-5 w-px ${mechanicalLineClass}`} />
      <span className={`absolute bottom-0 right-0 h-px w-5 ${mechanicalLineClass}`} />
      <span className={`absolute bottom-0 right-0 h-5 w-px ${mechanicalLineClass}`} />
      <span className={`absolute left-6 top-0 h-px w-3 ${mechanicalLineClass}`} />
      <span className={`absolute bottom-0 right-6 h-px w-3 ${mechanicalLineClass}`} />
    </>
  );
}

const cardClipPath =
  "[clip-path:polygon(14px_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%,0_14px)]";

const frameClipPath =
  "[clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]";

function CategoryImagePlaceholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[linear-gradient(145deg,#F8FBFF,#ECF4FF)] text-[#5D6B82]">
      <svg
        aria-hidden="true"
        className="h-10 w-10 opacity-45"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022 18.75V5.25A2.25 2.25 0 0019.75 3H4.25A2.25 2.25 0 002 5.25v13.5A2.25 2.25 0 004.25 21z"
        />
      </svg>
      <span className="text-[10px] font-semibold uppercase tracking-wide">No Image</span>
    </div>
  );
}

function CategoryImage({ icon, name }) {
  const [hasError, setHasError] = useState(false);
  const imageSrc = getFileUrl(icon);

  if (!icon || !imageSrc || hasError) {
    return <CategoryImagePlaceholder />;
  }

  return (
    <Image
      src={imageSrc}
      alt={name}
      fill
      sizes="(max-width: 639px) 45vw, (max-width: 767px) 30vw, (max-width: 1279px) 22vw, 185px"
      unoptimized
      onError={() => setHasError(true)}
      className="block h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
    />
  );
}

function CategoryCardSkeleton() {
  return (
    <div
      className={`relative flex flex-col overflow-hidden border border-[rgba(11,95,174,0.18)] bg-white/90 p-[14px] text-center shadow-[0_12px_32px_rgba(15,23,42,0.06)] ${cardClipPath}`}
    >
      <div
        className={`aspect-square w-full animate-pulse bg-[linear-gradient(145deg,#F8FBFF,#ECF4FF)] ${frameClipPath}`}
      />
      <div className="mx-auto mt-[14px] h-3 w-3/4 animate-pulse rounded bg-slate-100" />
    </div>
  );
}

export function FeaturedCategory() {
  const { data: categories = [], isLoading, isError } = useGetFeaturedCategoriesQuery();

  if (isError || (!isLoading && !categories.length)) {
    return null;
  }

  return (
    <section
      aria-labelledby="featured-category-title"
      className="relative overflow-hidden bg-[linear-gradient(135deg,#F7FAFF_0%,#EEF4FB_100%)] py-10 sm:py-12 lg:py-16"
    >
      <div className="pointer-events-none absolute left-6 top-8 h-20 w-32 border-l border-t border-[#0B5FAE]/10" />
      <div className="pointer-events-none absolute bottom-8 right-6 h-24 w-40 border-b border-r border-[#F58220]/10" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-72 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#0B5FAE]/15 to-transparent" />

      <div className="container relative">
        <div className="text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#0B5FAE]" />
            <h2
              id="featured-category-title"
              className="text-2xl font-extrabold text-[#07152F] sm:text-3xl lg:text-[38px]"
            >
              Featured Category
            </h2>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#0B5FAE]" />
          </div>
          <p className="mt-2 text-sm text-[#5D6B82] sm:text-base">
            Get your desired product from featured categories
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-[18px] sm:grid-cols-3 md:grid-cols-4 md:gap-5 xl:grid-cols-8 xl:gap-[20px]">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => <CategoryCardSkeleton key={index} />)
            : categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/${category.slug}`}
                  aria-label={`View ${category.name} category`}
                  className={`group relative flex flex-col overflow-hidden border border-[rgba(11,95,174,0.18)] bg-white/90 p-[14px] text-center shadow-[0_12px_32px_rgba(15,23,42,0.06)] outline-none transition duration-300 hover:-translate-y-1 hover:border-[#F58220]/45 hover:shadow-[0_18px_44px_rgba(245,130,32,0.14)] focus-visible:ring-2 focus-visible:ring-[#0B5FAE] ${cardClipPath}`}
                >
                  <MechanicalCorners />
                  <div
                    className={`relative aspect-square w-full shrink-0 overflow-hidden border border-[rgba(11,95,174,0.18)] bg-[linear-gradient(145deg,#F8FBFF,#ECF4FF)] transition duration-300 group-hover:border-[#F58220]/45 ${frameClipPath}`}
                  >
                    <CategoryImage icon={category.icon} name={category.name} />
                    <MechanicalCorners />
                  </div>
                  <p className="mt-[14px] line-clamp-2 text-[12px] text-center leading-snug text-[#07152F] transition-colors duration-300 group-hover:text-[#F58220]">
                    {category.name}
                  </p>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
}

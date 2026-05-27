"use client";

import Image from "next/image";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { defaultGeneralInfo } from "@/config";
import { getFileUrl } from "@/lib/utils";
import { useGetCategoriesQuery } from "@/store/api";
import { previewCategories } from "../previewCategories";
import { MobileCategoryTree } from "./MobileCategoryTree";

export function MobileCategoryDrawer() {
  const { data: categoriesResponse = [] } = useGetCategoriesQuery();
  const categories = categoriesResponse.length > 0 ? categoriesResponse : previewCategories;
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!isOpen) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const closeDrawer = () => setIsOpen(false);

  return (
    <>
      <button
        type="button"
        aria-label="Open categories menu"
        onClick={() => setIsOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-md transition min-[992px]:hidden"
        style={{ color: defaultGeneralInfo.title_color }}
      >
        <Menu size={26} strokeWidth={2.2} />
      </button>

      <div
        className={[
          "fixed inset-0 z-[90] transition-opacity duration-200 min-[992px]:hidden",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        style={{ backgroundColor: "rgba(7, 27, 58, 0.65)" }}
        onClick={closeDrawer}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Categories menu"
        className={[
          "fixed inset-y-0 left-0 z-[100] flex w-[89vw] max-w-[420px] flex-col overflow-hidden bg-white shadow-2xl transition-transform duration-300 ease-out sm:max-w-[420px] md:max-w-[460px] min-[992px]:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div
          className="flex h-[68px] shrink-0 items-center gap-4 border-b px-5 sm:h-[72px]"
          style={{ borderColor: defaultGeneralInfo.border_soft_color }}
        >
          <button
            type="button"
            aria-label="Close categories menu"
            onClick={closeDrawer}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md"
            style={{ color: defaultGeneralInfo.title_color }}
          >
            <X size={25} strokeWidth={2.1} />
          </button>

          <Image
            src={getFileUrl(defaultGeneralInfo.logo)}
            alt={defaultGeneralInfo.company_name || "BME"}
            width={130}
            height={44}
            className="h-auto max-h-11 w-[118px] object-contain object-left sm:w-[130px]"
            unoptimized
          />

          <h2
            className="ml-auto text-lg font-bold"
            style={{ color: defaultGeneralInfo.title_color }}
          >
            Categories
          </h2>
        </div>

        <div className="shrink-0 px-5 py-4">
          <label
            className="flex h-12 items-center gap-3 rounded-lg border px-4"
            style={{
              borderColor: defaultGeneralInfo.border_color,
              color: defaultGeneralInfo.text_muted_color,
            }}
          >
            <Search size={20} strokeWidth={2} />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search categories..."
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
              style={{ color: defaultGeneralInfo.title_color }}
            />
          </label>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto pb-6">
          <MobileCategoryTree
            categories={categories}
            searchTerm={searchTerm}
            onNavigate={closeDrawer}
          />
        </div>
      </aside>
    </>
  );
}

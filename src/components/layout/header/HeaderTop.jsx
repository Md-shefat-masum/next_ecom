import { MobileCategoryDrawer } from "@/components/layout/category-menu";
import { defaultGeneralInfo } from "@/config";
import { HeaderActions } from "./HeaderActions";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderSearch } from "./HeaderSearch";

export function HeaderTop() {
  return (
    <header
      className="w-full border-b"
      style={{
        backgroundColor: defaultGeneralInfo.card_background_color,
        borderColor: defaultGeneralInfo.border_color,
      }}
    >
      <div className="mx-auto flex min-h-[86px] w-full max-w-[1520px] flex-col justify-center gap-3 px-4 py-3 sm:px-6 md:px-8 lg:min-h-[92px] lg:flex-row lg:items-center lg:gap-6 xl:gap-8">
        <div className="flex w-full items-center justify-between gap-4 lg:w-auto">
          <div className="flex items-center gap-3">
            <MobileCategoryDrawer />
            <HeaderLogo />
          </div>
          <div className="lg:hidden">
            <HeaderActions />
          </div>
        </div>

        <div className="w-full flex-1 lg:flex lg:justify-center">
          <HeaderSearch />
        </div>

        <div className="hidden lg:block">
          <HeaderActions />
        </div>
      </div>
    </header>
  );
}

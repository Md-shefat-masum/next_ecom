import { CategoryMenuBar } from "@/components/layout/category-menu";
import { HeaderTop } from "@/components/layout/header";
import { defaultGeneralInfo } from "@/config";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: defaultGeneralInfo.page_background_color }}>
      <HeaderTop />
      <CategoryMenuBar />
    </div>
  );
}

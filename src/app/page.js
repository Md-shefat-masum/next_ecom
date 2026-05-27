import { BannerMosaicSlider } from "@/components/home/BannerMosaicSlider";
import { FeaturedCategory } from "@/components/home/FeaturedCategory";
import { FeaturedCategoryProducts } from "@/components/home/FeaturedCategoryProducts";
import { SiteLayout } from "@/components/layout/site-layout";

export default function Home() {
  return (
    <SiteLayout>
      <BannerMosaicSlider />
      <FeaturedCategory />
      <FeaturedCategoryProducts />
    </SiteLayout>
  );
}

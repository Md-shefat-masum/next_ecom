import FeaturedCategoryProductsClient from './FeaturedCategoryProductsClient';
import { fetchFeaturedCategorySections } from '@/lib/api/server/featuredCategoryProducts';

export default async function FeaturedCategoryProducts() {
  const sections = await fetchFeaturedCategorySections();

  if (!sections || sections.length === 0) {
    return null;
  }

  return <FeaturedCategoryProductsClient sections={sections} />;
}

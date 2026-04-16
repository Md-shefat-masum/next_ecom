import type { Product } from './product';

export interface FeaturedCategoryMeta {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  featured: number;
  serial: number;
}

export interface FeaturedCategorySection {
  category: FeaturedCategoryMeta;
  products: Product[];
}

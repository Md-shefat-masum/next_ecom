export interface Category {
  id: number;
  name: string;
  slug: string;
  image?: string;
  description?: string;
  parent_id?: number;
  children?: Category[];
  products_count?: number;
}

export interface Subcategory extends Category {
  category_id: number;
}

export interface Childcategory extends Category {
  subcategory_id: number;
}

export interface CategorySubcategoryBrand {
  id: number;
  name: string;
  slug: string;
  logo?: string;
  image?: string;
  banner?: string;
  description?: string;
  featured?: boolean;
  brand_short_content?: string;
  brand_content?: string;
  category_sub_category_brand_id?: number;
  category_sub_category_brand_slug?: string;
  url: string;
}

export interface CategorySubcategoryBrandSubcategory {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  image?: string;
  brands: CategorySubcategoryBrand[];
}

export interface CategorySubcategoryBrandCategory {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  image?: string;
  sub_categories: CategorySubcategoryBrandSubcategory[];
}


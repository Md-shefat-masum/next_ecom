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


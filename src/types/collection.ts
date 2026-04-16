export interface Collection {
  id: number;
  name: string;
  slug: string;
  image?: string;
  banner?: string;
  description?: string;
  products_count?: number;
  is_featured?: boolean;
}


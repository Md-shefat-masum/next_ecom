export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo?: string;
  banner?: string;
  description?: string;
  featured?: boolean;
  products_count?: number;
}


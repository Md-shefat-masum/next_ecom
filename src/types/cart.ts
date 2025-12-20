export interface CartItem {
  id: number;
  product_id: number;
  variant_id?: number;
  quantity: number;
  price: number;
  discount_price?: number;
  product: {
    id: number;
    name: string;
    slug: string;
    image?: string;
  };
  variant?: {
    id: number;
    name: string;
    attributes?: Record<string, string>;
  };
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  coupon?: {
    code: string;
    discount: number;
    type: 'fixed' | 'percentage';
  };
  items_count: number;
}

export interface AddToCartRequest {
  product_id: number;
  variant_id?: number;
  quantity: number;
}

export interface UpdateCartRequest {
  quantity: number;
}

export interface ApplyCouponRequest {
  code: string;
}


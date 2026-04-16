export interface Address {
  id: number;
  name: string;
  phone: string;
  email?: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state?: string;
  postal_code?: string;
  country?: string;
  is_default: boolean;
  address_type?: 'home' | 'work' | 'other';
  created_at: string;
  updated_at: string;
}

export interface CreateAddressData {
  name: string;
  phone: string;
  email?: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state?: string;
  postal_code?: string;
  country?: string;
  is_default?: boolean;
  address_type?: 'home' | 'work' | 'other';
}

export interface UpdateAddressData extends Partial<CreateAddressData> {}


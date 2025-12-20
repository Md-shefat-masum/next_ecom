export interface UserPaymentMethod {
  id: number;
  card_type: string;
  card_last_four: string;
  card_holder_name: string;
  expiry_month: string;
  expiry_year: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreatePaymentMethodData {
  card_type: string;
  card_number: string;
  card_holder_name: string;
  expiry_month: string;
  expiry_year: string;
  cvv: string;
  is_default?: boolean;
}

export interface UpdatePaymentMethodData {
  card_holder_name?: string;
  expiry_month?: string;
  expiry_year?: string;
  is_default?: boolean;
}

export type CardType = 'visa' | 'mastercard' | 'amex' | 'discover' | 'other';


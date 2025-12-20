import { api } from '../client';
import { ApiResponse } from '@/types';

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

export const paymentMethodService = {
  getPaymentMethods: () => 
    api.get<ApiResponse<{ payment_methods: UserPaymentMethod[] }>>('/account/payment-methods'),

  getPaymentMethod: (paymentId: number) => 
    api.get<ApiResponse<UserPaymentMethod>>(`/account/payment-methods/${paymentId}`),

  createPaymentMethod: (data: CreatePaymentMethodData) => 
    api.post<ApiResponse<UserPaymentMethod>>('/account/payment-methods', data),

  updatePaymentMethod: (paymentId: number, data: UpdatePaymentMethodData) => 
    api.put<ApiResponse<UserPaymentMethod>>(`/account/payment-methods/${paymentId}`, data),

  deletePaymentMethod: (paymentId: number) => 
    api.delete<ApiResponse<null>>(`/account/payment-methods/${paymentId}`),

  setDefaultPaymentMethod: (paymentId: number) => 
    api.put<ApiResponse<UserPaymentMethod>>(`/account/payment-methods/${paymentId}/set-default`),
};

export default paymentMethodService;


import { api } from '../client';
import { ApiResponse } from '@/types';

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

export const addressService = {
  getAddresses: () => 
    api.get<ApiResponse<{ addresses: Address[] }>>('/account/addresses'),

  getAddress: (addressId: number) => 
    api.get<ApiResponse<Address>>(`/account/addresses/${addressId}`),

  createAddress: (data: CreateAddressData) => 
    api.post<ApiResponse<Address>>('/account/addresses', data),

  updateAddress: (addressId: number, data: UpdateAddressData) => 
    api.put<ApiResponse<Address>>(`/account/addresses/${addressId}`, data),

  deleteAddress: (addressId: number) => 
    api.delete<ApiResponse<null>>(`/account/addresses/${addressId}`),

  setDefaultAddress: (addressId: number) => 
    api.put<ApiResponse<Address>>(`/account/addresses/${addressId}/set-default`),
};

export default addressService;


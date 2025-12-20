import { api } from '../client';
import { ApiResponse, User } from '@/types';

export interface Account extends User {
  orders_count?: number;
  reviews_count?: number;
  wishlist_count?: number;
}

export interface UpdateAccountData {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  image?: string;
  password?: string;
  password_confirmation?: string;
}

export interface DeleteAccountData {
  password: string;
}

export const accountService = {
  getAccount: () => 
    api.get<ApiResponse<Account>>('/account'),

  updateAccount: (data: UpdateAccountData) => 
    api.put<ApiResponse<Account>>('/account', data),

  deleteAccount: (data: DeleteAccountData) => 
    api.delete<ApiResponse<null>>('/account', { data }),
};

export default accountService;


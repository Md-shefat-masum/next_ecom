import { User } from './auth';

export interface Account extends User {
  orders_count?: number;
  reviews_count?: number;
  wishlist_count?: number;
  addresses_count?: number;
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


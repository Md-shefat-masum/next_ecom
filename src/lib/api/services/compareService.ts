import { api } from '../client';
import { ApiResponse, Product } from '@/types';

export interface CompareList {
  products: Product[];
  total_items: number;
  max_items: number;
}

export const compareService = {
  getCompareList: () => 
    api.get<ApiResponse<CompareList>>('/compare'),

  addToCompare: (productId: number) => 
    api.post<ApiResponse<CompareList>>(`/compare/${productId}`),

  removeFromCompare: (productId: number) => 
    api.delete<ApiResponse<CompareList>>(`/compare/${productId}`),

  clearCompare: () => 
    api.delete<ApiResponse<null>>('/compare'),
};

export default compareService;


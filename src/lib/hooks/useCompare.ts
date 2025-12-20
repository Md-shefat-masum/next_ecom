import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { addProduct, removeProduct, clearAll } from '@/store/slices/compareSlice';
import { Product } from '@/types';

export const useCompare = () => {
  const dispatch = useAppDispatch();
  const { products, maxItems } = useAppSelector((state) => state.compare);

  const addToCompare = (product: Product) => {
    if (products.length >= maxItems) {
      return { success: false, message: `Maximum ${maxItems} items allowed` };
    }
    if (products.find((p) => p.id === product.id)) {
      return { success: false, message: 'Product already in compare' };
    }
    dispatch(addProduct(product));
    return { success: true, message: 'Added to compare' };
  };

  const removeFromCompare = (productId: number) => {
    dispatch(removeProduct(productId));
  };

  const clearCompare = () => {
    dispatch(clearAll());
  };

  const isInCompare = (productId: number) => {
    return products.some((p) => p.id === productId);
  };

  return {
    products,
    count: products.length,
    maxItems,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isInCompare,
  };
};


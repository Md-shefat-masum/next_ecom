import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, PaginationMeta } from '@/types';

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  pagination: PaginationMeta | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  pagination: null,
  isLoading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<{ orders: Order[]; pagination?: PaginationMeta }>) => {
      state.orders = action.payload.orders;
      state.pagination = action.payload.pagination || null;
      state.isLoading = false;
      state.error = null;
    },
    setCurrentOrder: (state, action: PayloadAction<Order | null>) => {
      state.currentOrder = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
    },
    updateOrder: (state, action: PayloadAction<Order>) => {
      const index = state.orders.findIndex(o => o.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
      if (state.currentOrder?.id === action.payload.id) {
        state.currentOrder = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setOrders, setCurrentOrder, addOrder, updateOrder, setLoading, setError } = orderSlice.actions;
export default orderSlice.reducer;


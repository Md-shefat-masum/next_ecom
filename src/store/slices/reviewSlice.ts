import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Review, PaginationMeta } from '@/types';

interface ReviewState {
  reviews: Review[];
  myReviews: Review[];
  currentReview: Review | null;
  pagination: PaginationMeta | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  reviews: [],
  myReviews: [],
  currentReview: null,
  pagination: null,
  isLoading: false,
  error: null,
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setReviews: (state, action: PayloadAction<{ reviews: Review[]; pagination?: PaginationMeta }>) => {
      state.reviews = action.payload.reviews;
      state.pagination = action.payload.pagination || null;
      state.isLoading = false;
      state.error = null;
    },
    setMyReviews: (state, action: PayloadAction<Review[]>) => {
      state.myReviews = action.payload;
    },
    setCurrentReview: (state, action: PayloadAction<Review | null>) => {
      state.currentReview = action.payload;
    },
    addReview: (state, action: PayloadAction<Review>) => {
      state.reviews.unshift(action.payload);
    },
    updateReview: (state, action: PayloadAction<Review>) => {
      const index = state.reviews.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.reviews[index] = action.payload;
      }
      const myIndex = state.myReviews.findIndex(r => r.id === action.payload.id);
      if (myIndex !== -1) {
        state.myReviews[myIndex] = action.payload;
      }
    },
    removeReview: (state, action: PayloadAction<number>) => {
      state.reviews = state.reviews.filter(r => r.id !== action.payload);
      state.myReviews = state.myReviews.filter(r => r.id !== action.payload);
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

export const {
  setReviews,
  setMyReviews,
  setCurrentReview,
  addReview,
  updateReview,
  removeReview,
  setLoading,
  setError,
} = reviewSlice.actions;
export default reviewSlice.reducer;


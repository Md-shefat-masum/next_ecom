import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Collection } from '@/types';

interface CollectionState {
  collections: Collection[];
  currentCollection: Collection | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CollectionState = {
  collections: [],
  currentCollection: null,
  isLoading: false,
  error: null,
};

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    setCollections: (state, action: PayloadAction<Collection[]>) => {
      state.collections = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setCurrentCollection: (state, action: PayloadAction<Collection | null>) => {
      state.currentCollection = action.payload;
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

export const { setCollections, setCurrentCollection, setLoading, setError } = collectionSlice.actions;
export default collectionSlice.reducer;


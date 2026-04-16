import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchSuggestion, SearchFilters } from '@/types';

interface SearchState {
  query: string;
  suggestions: SearchSuggestion[];
  filters: SearchFilters;
  recentSearches: string[];
  isSearching: boolean;
  showSuggestions: boolean;
}

const initialState: SearchState = {
  query: '',
  suggestions: [],
  filters: {
    query: '',
    sort: 'relevance',
    page: 1,
    per_page: 20,
  },
  recentSearches: [],
  isSearching: false,
  showSuggestions: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.filters.query = action.payload;
    },
    setSuggestions: (state, action: PayloadAction<SearchSuggestion[]>) => {
      state.suggestions = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<SearchFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    addRecentSearch: (state, action: PayloadAction<string>) => {
      const search = action.payload.trim();
      if (search && !state.recentSearches.includes(search)) {
        state.recentSearches = [search, ...state.recentSearches.slice(0, 9)];
      }
    },
    clearRecentSearches: (state) => {
      state.recentSearches = [];
    },
    setSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload;
    },
    setShowSuggestions: (state, action: PayloadAction<boolean>) => {
      state.showSuggestions = action.payload;
    },
    clearSearch: (state) => {
      state.query = '';
      state.suggestions = [];
      state.filters = { ...initialState.filters };
      state.showSuggestions = false;
    },
  },
});

export const {
  setQuery,
  setSuggestions,
  setFilters,
  addRecentSearch,
  clearRecentSearches,
  setSearching,
  setShowSuggestions,
  clearSearch,
} = searchSlice.actions;
export default searchSlice.reducer;


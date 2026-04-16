import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlogPost, BlogCategory, BlogTag, PaginationMeta } from '@/types';

interface BlogState {
  posts: BlogPost[];
  currentPost: BlogPost | null;
  categories: BlogCategory[];
  tags: BlogTag[];
  pagination: PaginationMeta | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  posts: [],
  currentPost: null,
  categories: [],
  tags: [],
  pagination: null,
  isLoading: false,
  error: null,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<{ posts: BlogPost[]; pagination?: PaginationMeta }>) => {
      state.posts = action.payload.posts;
      state.pagination = action.payload.pagination || null;
      state.isLoading = false;
      state.error = null;
    },
    setCurrentPost: (state, action: PayloadAction<BlogPost | null>) => {
      state.currentPost = action.payload;
    },
    setCategories: (state, action: PayloadAction<BlogCategory[]>) => {
      state.categories = action.payload;
    },
    setTags: (state, action: PayloadAction<BlogTag[]>) => {
      state.tags = action.payload;
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

export const { setPosts, setCurrentPost, setCategories, setTags, setLoading, setError } = blogSlice.actions;
export default blogSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeModal: null,
  sidebarOpen: false,
  searchOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openModal(state, action) {
      state.activeModal = action.payload;
    },
    closeModal(state) {
      state.activeModal = null;
    },
    setSidebarOpen(state, action) {
      state.sidebarOpen = action.payload;
    },
    setSearchOpen(state, action) {
      state.searchOpen = action.payload;
    },
  },
});

export const { openModal, closeModal, setSidebarOpen, setSearchOpen } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;


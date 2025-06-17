import { createSlice } from '@reduxjs/toolkit';

const viewOrderDrawerSlice = createSlice({
  name: 'viewOrderDrawer',
  initialState: {
    isOpen: false,
  },
  reducers: {
    openViewOrderDrawer: (state) => {
      state.isOpen = true;
    },
    closeViewOrderDrawer: (state) => {
      state.isOpen = false;
    },
    toggleViewOrderDrawer: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const {
  openViewOrderDrawer,
  closeViewOrderDrawer,
  toggleViewOrderDrawer,
} = viewOrderDrawerSlice.actions;

export default viewOrderDrawerSlice.reducer;

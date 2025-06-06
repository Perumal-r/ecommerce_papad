// store/slices/drawerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const drawerSlice = createSlice({
  name: 'drawer',
  initialState: {
    isOpen: false,
  },
  reducers: {
    openDrawer: (state) => {
      state.isOpen = true;
    },
    closeDrawer: (state) => {
      state.isOpen = false;
    },
    toggleDrawer: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openDrawer, closeDrawer, toggleDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;

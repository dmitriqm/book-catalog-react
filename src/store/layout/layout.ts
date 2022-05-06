import { createSlice } from "@reduxjs/toolkit";

interface LayoutState {
  navmenu: {
    isOpen: boolean;
  }
}

const initialState = {
  navmenu: {
    isOpen: false,
  },
} as LayoutState;

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleMenu(state) {
      state.navmenu.isOpen = !state.navmenu.isOpen;
    },
  },
});

export const { toggleMenu } = layoutSlice.actions;
export default layoutSlice.reducer;

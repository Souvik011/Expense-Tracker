import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = { theme: null };

const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    switchTheme: (state) => {state.theme = "DarkExpense";},
    restoreTheme: (state) => {state.theme = null}
  },
});

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;
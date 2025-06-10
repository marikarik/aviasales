import { createSlice } from "@reduxjs/toolkit";

const initialState = "cheap";

const sortSlice = createSlice({
  name: "sortSlice",
  initialState,
  reducers: {
    changeSort(state, action) {
      return action.payload;
    },
  },
});

export const { changeSort } = sortSlice.actions;
export default sortSlice.reducer;

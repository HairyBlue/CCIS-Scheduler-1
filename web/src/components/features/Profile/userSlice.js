import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    login: false,
  },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogin: (state, action) => {
      state.login = action.payload;
    }
  }
});

export const { setUser, setLogin } = userSlice.actions;

export default userSlice.reducer;

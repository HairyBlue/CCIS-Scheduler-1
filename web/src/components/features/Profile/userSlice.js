import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    name: "",
    token: "",
    login: false,
  },

  reducers: {
    setID: (state, action) => {
      state.id = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLogin: (state, action) => {
      state.login = action.payload;
    },
  },
});

export const { setID, setName, setToken, setLogin } = userSlice.actions;

export default userSlice.reducer;

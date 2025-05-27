import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  username: "",
  useremail:"",
};

const UserSlice = createSlice({
  name: "user",
  initialState: initialUserState, // כאן יש לשים initialState
  reducers: {
    setUserData: (state, action) => {
      state.username = action.payload.username;
      state.useremail = action.payload.useremail;
    },
    clearUser: (state) => {
      state.username = "";
      state.useremail = "";
    },
  },
});

export const { setUserData, clearUser } = UserSlice.actions;
export default UserSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  username: "",
  useremail: "",
  token: "", 
};

const UserSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUserData: (state, action) => {
      state.username = action.payload.username;
      state.useremail = action.payload.useremail;
      state.token = action.payload.token; // שמירת הטוקן
    },
    clearUser: (state) => {
      state.username = "";
      state.useremail = "";
      state.token = ""; // ניקוי הטוקן
    },
  },
});

export const { setUserData, clearUser } = UserSlice.actions;
export default UserSlice.reducer;

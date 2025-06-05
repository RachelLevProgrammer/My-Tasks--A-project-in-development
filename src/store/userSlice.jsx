import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
  username: '',
  useremail: '',
  token: '',
  calendar: [],
};

const UserSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUserData: (state, action) => {
      state.username = action.payload.username;
      state.useremail = action.payload.useremail;
      state.token = action.payload.token;
      state.calendar = action.payload.calendar;
    },
    clearUser: (state) => {
      state.username = "";
      state.useremail = "";
      state.token = "";
      state.calendar = [];
    },
    setCalendar: (state, action) => {
      state.calendar = action.payload;
    },
  },
});

export const { setUserData, clearUser, setCalendar } = UserSlice.actions;
export default UserSlice.reducer;

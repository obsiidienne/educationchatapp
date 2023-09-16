import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstname: "",
  lastname: "",
  role: "",
  typetab: "",
  id: "",
  email: "",
  phonenumber: "",
  pic:"",
  
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.id = action.payload.id;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.role = action.payload.role;
      state.typetab= action.payload.typetab;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.pic = action.payload.pic;
    },
  },
});

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;

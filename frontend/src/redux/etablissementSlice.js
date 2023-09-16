import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nometab: "",
  typetab: "",
 id:""
  
};

const etablissementSlice = createSlice({
  name: "etablissement",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.id = action.payload.id;
      state.nometab = action.payload.nometab;
      state.typetab= action.payload.typetab;
     
    },
  },
});

export const { setEtablissementDetails } = etablissementSlice.actions;
export default etablissementSlice.reducer;

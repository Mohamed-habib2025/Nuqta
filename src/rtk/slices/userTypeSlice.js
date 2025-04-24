import { createSlice } from "@reduxjs/toolkit";

const userTypeSlice = createSlice({
  name:'userType',
  initialState:{
    scope:localStorage.getItem("scope") || null,
  },
  reducers:{
    setUserType:(state , action) => {
      state.scope = action.payload;
    },
  },
});

export const {setUserType} = userTypeSlice.actions;
export default userTypeSlice.reducer
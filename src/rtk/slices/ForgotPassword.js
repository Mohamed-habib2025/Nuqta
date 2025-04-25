import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const ForgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, thunkAPI) => {
    console.log(email)
    try {
      const response = await axios.post(
        `https://nuqta-production.up.railway.app/api/auth/forgotPassword?email=${email}`, null,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Email not found'
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ email, otp, newPassword }, thunkAPI) => {

    try {
      const response = await axios.post(
        `https://nuqta-production.up.railway.app/api/auth/resetPassword?otp=${otp}&newPassword=${newPassword}&email=${email}`, null,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to reset Password'
      );
    }
  }
);

const forgetpassword = createSlice({
  name: 'forgetpassword',
  initialState: {
    loading: false,
    error: null,
    message: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ForgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ForgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(ForgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default forgetpassword.reducer;
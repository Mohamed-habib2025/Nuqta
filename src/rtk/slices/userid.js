// userid.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserid = createAsyncThunk(
  'profile/fetchUserid',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = localStorage.getItem('userToken');
      const userId = state.user.user_id;
      const response = await axios.get(
        `https://nuqta-production.up.railway.app/api/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Accept-Language': 'en',
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch user profile'
      );
    }
  }
);

const userid = createSlice({
  name: 'userid',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserid.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userid.reducer;

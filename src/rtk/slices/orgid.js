// orgid.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchorgid = createAsyncThunk(
  'profile/fetchorgid',
  async (orgId, thunkAPI) => {
    try {
      const token = localStorage.getItem('organizationToken');
      const response = await axios.get(
        `https://nuqta-production.up.railway.app/api/org/${orgId}`,
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

export const deleteorgById = createAsyncThunk(
  'profile/deleteorgById',
  async (orgId, thunkAPI) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.delete(
        `https://nuqta-production.up.railway.app/api/org/${orgId}`,
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
        error.response?.data?.message || 'Failed to delete user'
      );
    }
  }
);

const userid = createSlice({
  name: 'orgid',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchorgid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchorgid.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchorgid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // delele
      .addCase(deleteorgById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteorgById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(deleteorgById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userid.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRequests  = createAsyncThunk(
  'requests/fetch',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('userToken') || localStorage.getItem('organizationToken');
      const response = await axios.get(
        'https://nuqta-production.up.railway.app/api/request',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      console.log("requests from API:", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch request'
      );
    }
  }
);

const requestsSlice = createSlice({
  name: 'requests',
  initialState: {
    requests: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default requestsSlice.reducer;

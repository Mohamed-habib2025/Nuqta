import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrganizations = createAsyncThunk(
  'organizations/fetchOrganizations',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('https://nuqta-production.up.railway.app/api/org');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch organizations');
    }
  }
);

const organizationsSlice = createSlice({
  name: 'organizations',
  initialState: {
    organizations: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.loading = false;
        state.organizations = action.payload;
      })
      .addCase(fetchOrganizations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default organizationsSlice.reducer;

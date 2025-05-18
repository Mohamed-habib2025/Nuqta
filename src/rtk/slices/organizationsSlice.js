import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrganizations = createAsyncThunk(
  'organizations/fetchOrganizations',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('organizationToken') || "";
      const response = await axios.get('https://nuqta-02f0fc9e8c38.herokuapp.com/api/org', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept-Language': 'en',
        },
      });
      console.log("Organizations from API:", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch organizations');
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

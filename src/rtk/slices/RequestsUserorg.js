import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Add request
export const addRequestOrg = createAsyncThunk(
  'requests/addRequestOrg',
  async (newRequest, thunkAPI) => {
    try {
      const token = localStorage.getItem('organizationToken');
      const response = await axios.post(
        'https://nuqta-production.up.railway.app/api/request', newRequest,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error adding request:', error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Update request
export const updateRequestOrg = createAsyncThunk(
  'requests/updateRequestOrg',
  async (updatedRequest, thunkAPI) => {
    try {
      console.log(updatedRequest)
      const token = localStorage.getItem('organizationToken');
      const response = await axios.put(
        'https://nuqta-production.up.railway.app/api/request',
        updatedRequest,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept-Language': 'en',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error to updateing request:', error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Delete request
export const deleteRequestOrga = createAsyncThunk(
  'requests/deleteRequestOrg',
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem('organizationToken');
      await axios.delete(
        `https://nuqta-production.up.railway.app/api/request/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Accept-Language': 'en',
          },
        }
      );
      return id;
    } catch (error) {
      console.error('Error to delete request:', error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const bloodRequestSliceOrg = createSlice({
  name: 'bloodRequestsorg',
  initialState: {
    requests: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Add request
      .addCase(addRequestOrg.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRequestOrg.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(addRequestOrg.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update request
      .addCase(updateRequestOrg.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRequestOrg.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(updateRequestOrg.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete request
      .addCase(deleteRequestOrga.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRequestOrga.fulfilled, (state, action) => {
        state.requests = action.payload;
        state.loading = false;
      })
      .addCase(deleteRequestOrga.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetRequests } = bloodRequestSliceOrg.actions;

export default bloodRequestSliceOrg.reducer;
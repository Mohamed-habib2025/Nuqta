import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Add request
export const addRequest = createAsyncThunk(
  'requests/addRequest',
  async (newRequest, thunkAPI) => {
    try {
      const token = localStorage.getItem('userToken') || localStorage.getItem('organizationToken');
      const response = await axios.post(
        'https://nuqta-02f0fc9e8c38.herokuapp.com/api/request', newRequest,
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
export const updateRequest = createAsyncThunk(
  'requests/updateRequest',
  async (updatedRequest, thunkAPI) => {
    try {
      console.log(updatedRequest)
      const token = localStorage.getItem('userToken') || localStorage.getItem('organizationToken');
      const response = await axios.put(
        'https://nuqta-02f0fc9e8c38.herokuapp.com/api/request',
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
export const deleteRequest = createAsyncThunk(
  'requests/deleteRequest',
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem('userToken') || localStorage.getItem('organizationToken');
      await axios.delete(
        `https://nuqta-02f0fc9e8c38.herokuapp.com/api/request/${id}`,
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

const bloodRequestSlice = createSlice({
  name: 'bloodRequests',
  initialState: {
    requests: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Add request
      .addCase(addRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(addRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update request
      .addCase(updateRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(updateRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete request
      .addCase(deleteRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRequest.fulfilled, (state, action) => {
        state.requests = action.payload;
        state.loading = false;
      })
      .addCase(deleteRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetRequests } = bloodRequestSlice.actions;

export default bloodRequestSlice.reducer;

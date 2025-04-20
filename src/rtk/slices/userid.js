// userid.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserid = createAsyncThunk(
  'profile/fetchUserid',
  async (userId, thunkAPI) => {
    try {
      // const state = thunkAPI.getState();
      // const userId = state.user.user_id;
      // const userId = localStorage.getItem('userid');
      const token = localStorage.getItem('userToken');
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

export const deleteUserById = createAsyncThunk(
  'profile/deleteUserById',
  async (userId, thunkAPI) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.delete(
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
        error.response?.data?.message || 'Failed to delete user'
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (updatedData, thunkAPI) => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.put(
        "https://nuqta-production.up.railway.app/api/user",
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Updated user:", response.data);
      return response.data;
    } catch (error) {
      console.error("Update failed:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Update failed"
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
      })

      // delele
      .addCase(deleteUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userid.reducer;
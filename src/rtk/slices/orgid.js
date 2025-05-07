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
      const token = localStorage.getItem('organizationToken');
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

export const updateOrg = createAsyncThunk(
  "users/updateOrg",
  async (updatedData, thunkAPI) => {
    try {
      const token = localStorage.getItem("organizationToken");
      const response = await axios.put(
        "https://nuqta-production.up.railway.app/api/org",
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Updated org:", response.data);
      return response.data;
    } catch (error) {
      console.error("Update failed:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Update failed"
      );
    }
  }
);

export const changePasswordorg = createAsyncThunk(
  'profile/changePassword',
  async ({ orgId, oldPassword, newPassword }, thunkAPI) => {
    try {
      const token = localStorage.getItem('organizationToken');
      const response = await axios.post(
        `https://nuqta-production.up.railway.app/api/org/changePassword`,
        null,
        {
          params: {
            orgId,
            oldPassword,
            newPassword
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("RESPONSE FROM CHANGE PASSWORD:", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to change password'
      );
    }
  }
);

const orgid = createSlice({
  name: 'orgid',
  initialState: {
    org: null,
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
        state.org = action.payload;
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
        state.org = null;
        localStorage.removeItem("orgaid")
        localStorage.removeItem("organizationToken")
        localStorage.removeItem("scope")
      })
      .addCase(deleteorgById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update
      // .addCase(updateOrg.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(updateOrg.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.org = action.payload;
      // })
      // .addCase(updateOrg.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // })

      // changepassword
      .addCase(changePasswordorg.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePasswordorg.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changePasswordorg.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default orgid.reducer;
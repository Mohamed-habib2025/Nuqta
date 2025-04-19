import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const REGISTER_ORG_URL = 'https://nuqta-production.up.railway.app/api/auth/register/org';
const LOGIN_ORG_URL = 'https://nuqta-production.up.railway.app/api/auth/login/org';

// register
export const registerOrg = createAsyncThunk(
  'organization/register',
  async (userData, { rejectWithValue }) => {
    try {
      const state = thunkAPI.getState();
      const { userType } = state.userType;
      const fullData = {
        ...userData,
        userType
      }
      const response = await axios.post(REGISTER_ORG_URL, fullData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// login
export const loginOrg = createAsyncThunk(
  'organization/login',
  async (loginData, { rejectWithValue, getState }) => {
    try {
      const token = localStorage.getItem("userToken");
      const config = {
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      };
      const response = await axios.post(LOGIN_ORG_URL, loginData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  org: null,
  loading: false,
  error: null,
  token: localStorage.getItem('org_token') || null,
};

const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    logoutOrg: (state) => {
      state.org = null;
      state.token = null;
      localStorage.removeItem('org_token');
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerOrg.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerOrg.fulfilled, (state, action) => {
        state.loading = false;
        state.org = action.payload;
        state.token = action.payload.token;
        localStorage.setItem('org_token', action.payload.token);
      })
      .addCase(registerOrg.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(loginOrg.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginOrg.fulfilled, (state, action) => {
        state.loading = false;
        state.org = action.payload;
        state.token = action.payload.token;
        localStorage.setItem('org_token', action.payload.token);
      })
      .addCase(loginOrg.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutOrg } = organizationSlice.actions;

export default organizationSlice.reducer;

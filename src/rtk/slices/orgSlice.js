import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// register
export const registerOrg = createAsyncThunk(
  'organization/register',
  async (userData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { userType } = state.userType;
      const fullData = {
        ...userData,
        userType
      }
      const response = await axios.post('https://nuqta-production.up.railway.app/api/auth/register/org', fullData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

// login
export const loginOrg = createAsyncThunk(
  'organization/login',
  async (credentials, thunkAPI) => {
    try {
      const token = localStorage.getItem("organizationToken");
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

      const response = await axios.post('https://nuqta-production.up.railway.app/api/auth/login/org',
        credentials, config);

      if (response.data.token) {
        localStorage.setItem("organizationToken", response.data.token);
      }

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

const initialState = {
  org: [],
  loading: false,
  error: null,
  token: localStorage.getItem('organizationToken') || null,
  org_id: localStorage.getItem("orgaid") || null,
};

const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    logoutOrg: (state) => {
      state.org = null;
      state.token = null;
      localStorage.removeItem('organizationToken');
      localStorage.removeItem('orgaid');
    },
    setorgToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("organizationToken", action.payload);
    },
    setorgId: (state, action) => {
      state.org_id = action.payload;
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
        // state.token = action.payload.token;
        // localStorage.setItem('org_token', action.payload.token);
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
        localStorage.setItem('organizationToken', action.payload.token);
        localStorage.setItem("orgaid", action.payload.org_id);
      })
      .addCase(loginOrg.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutOrg, setorgToken } = organizationSlice.actions;

export default organizationSlice.reducer;

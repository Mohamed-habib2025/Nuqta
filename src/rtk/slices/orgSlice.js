import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// register
export const registerOrg = createAsyncThunk(
  'organization/register',
  async (userData, thunkAPI) => {
    console.log(userData)
    try {
      const state = thunkAPI.getState();
      // const { userType } = state.userType.scope;
      // const fullData = {
      //   ...userData,
      //   scope : userType
      // }
      const response = await axios.post('https://nuqta-production.up.railway.app/api/auth/register/org', userData);
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
      const response = await axios.post('https://nuqta-production.up.railway.app/api/auth/login/org',
        credentials
      );

      if (response.data.token) {
        localStorage.setItem("organizationToken", response.data.token);
        localStorage.setItem("orgaid", response.data.org_id);
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
      state.org_id = null;
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
        state.token = action.payload.token;
        state.org_id = action.payload.org_id;
        state.org = action.payload;
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

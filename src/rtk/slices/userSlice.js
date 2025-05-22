import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { userType } = state.userType.scope;
      const fullData = {
        ...userData,
        userType
      };
      const response = await axios.post("https://nuqta-02f0fc9e8c38.herokuapp.com/api/auth/register/user", fullData);
      return response.data;
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://nuqta-02f0fc9e8c38.herokuapp.com/api/auth/login/user",
        credentials
      );

      if (response.data.token) {
        localStorage.setItem("userToken", response.data.token);
        localStorage.setItem("userid", response.data.user_id);
      }

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

const initialState = {
  user: [],
  loading: false,
  error: null,
  token: localStorage.getItem("userToken") || null,
  user_id: localStorage.getItem("userid") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.token = null;
      state.user = null;
      state.user_id = null;
      localStorage.removeItem("userToken");
      localStorage.removeItem("userid");
    },
    setUserToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("userToken", action.payload);
    },
    setUserId: (state, action) => {
      state.user_id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user_id = action.payload.user_id;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser, setUserToken } = userSlice.actions;
export default userSlice.reducer;

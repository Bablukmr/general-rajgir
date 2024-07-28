import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";

// Async thunk for login (real API call)
export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://zoo-api.nextindiainitiative.com/public/api/v1/login",
        null,
        {
          params: {
            api_key: "CHANlBUoAGBjMyLch1GIh3MXW5Ga8e9pji0dPFO2dkDODAN",
            user_name: username,
            password: password,
          },
        }
      );

      if (response.data.status) {
        const { accessToken, data } = response.data;
        // Store token in cookies 
        Cookies.set("authToken", accessToken);
        Cookies.set("userId", data.id);
        return { 
          username, 
          token: accessToken, 
          userId: data.id, 
          userName: data.name, 
          userPhone: data.phone, 
          userStatus: data.status, 
          userDeleted: data.deleted 
        };
      } else {
        return thunkAPI.rejectWithValue("Invalid credentials");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue("Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      Cookies.remove("authToken");
      Cookies.remove("userId");
    },
    checkAuth: (state) => {
      const token = Cookies.get("authToken");
      if (token) {
        state.isAuthenticated = true;
        state.user = { username: "aa" }; // Mock user since we don't have actual user data from token
      } else {
        state.isAuthenticated = false;
        state.user = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, checkAuth } = authSlice.actions;

export default authSlice.reducer;

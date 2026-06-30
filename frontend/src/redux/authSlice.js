import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Base_Url } from './data';
import axios from 'axios';
// Helper function to extract friendly error message
const extractErrorMessage = (error, defaultMsg) => {
  if (error.response && error.response.data) {
    const data = error.response.data;
    if (data.username) {
      return 'Username already exists.';
    }
    if (data.detail) {
      return data.detail;
    }
    if (typeof data === 'object') {
      return Object.entries(data)
        .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(' ') : val}`)
        .join(' | ');
    }
    if (typeof data === 'string') {
      return data;
    }
  }
  return error.message || defaultMsg;
};

// Async Thunk for User Login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${Base_Url}/api/users/login/`, { username, password });

      const data = response.data;

      if (response.status >= 400) {
        const errorMsg = response.data?.detail || 'Login failed. Please check your credentials.';
        return rejectWithValue(errorMsg);
      }

      // Store in localStorage
      localStorage.setItem('token', data.access);
      localStorage.setItem('user', JSON.stringify({ username }));
      
      // Dispatch custom event to notify other parts of the app (like Header)
      window.dispatchEvent(new Event('auth-change'));

      return { token: data.access, user: { username } };
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error, 'An error occurred during login.'));
    }
  }
);

// Async Thunk for User Registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ username, email, password, phone, occupation, gender, invite_code }, { rejectWithValue }) => {
    try {
      const payload = {
        username,
        email,
        password,
        phone,
        occupation,
        gender,
        invite_code: invite_code || undefined,
      };

      const response = await axios.post(`${Base_Url}/api/users/register/`, payload);

      const data = response.data;

      if (response.status >= 400) {
        let errorMessage = 'Registration failed.';
        if (typeof data === 'object') {
          errorMessage = Object.entries(data)
            .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(' ') : val}`)
            .join(' | ');
        }
        return rejectWithValue(errorMessage);
      }

      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error, 'An error occurred during registration.'));
    }
  }
);

// Async Thunk for Fetching User Profile
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(`${Base_Url}/api/users/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error, 'Failed to fetch profile.'));
    }
  }
);

// Async Thunk for Updating User Profile
export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (formData, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.put(`${Base_Url}/api/users/profile/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error, 'Failed to update profile.'));
    }
  }
);

const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
  registrationSuccess: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.registrationSuccess = false;
      window.dispatchEvent(new Event('auth-change'));
    },
    clearError: (state) => {
      state.error = null;
    },
    resetRegistrationStatus: (state) => {
      state.registrationSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login User Reducers
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Register User Reducers
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registrationSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.registrationSuccess = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.registrationSuccess = false;
        state.error = action.payload;
      })

      // Fetch User Profile Reducers
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })

      // Update User Profile Reducers
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, resetRegistrationStatus } = authSlice.actions;
export default authSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../../services/auth.service'

const user = JSON.parse(localStorage.getItem('user'))
const token = localStorage.getItem('accessToken')

console.log('🔧 authSlice initialState:', {
  user: user ? 'exists' : 'null',
  token: token ? 'exists' : 'null',
  isAuthenticated: !!token,
  loading: false
})

const initialState = {
  user: user || null,
  token: token || null,
  isAuthenticated: !!token,
  loading: false,
  error: null,
}

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      console.log('🔐 Login attempt with credentials:', { username: credentials.username })
      const response = await authService.login(credentials)
      console.log('✅ Login response received:', response)
      return response
    } catch (error) {
      console.error('❌ Login error:', error)
      console.error('Error response:', error.response)
      return rejectWithValue(error.response?.data?.message || 'Login failed')
    }
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed')
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getCurrentUser()
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Authentication check failed')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
      localStorage.setItem('user', JSON.stringify(state.user))
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        console.log('⏳ login.pending - setting loading=true')
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('✅ login.fulfilled - setting loading=false, isAuthenticated=true')
        console.log('Payload:', action.payload)
        console.log('Payload structure:', JSON.stringify(action.payload, null, 2))
        
        state.loading = false
        state.isAuthenticated = true
        
        // Handle the response structure safely
        const responseData = action.payload?.data || action.payload
        console.log('Response data:', responseData)
        
        if (responseData.user && responseData.accessToken) {
          state.user = responseData.user
          state.token = responseData.accessToken
          localStorage.setItem('accessToken', responseData.accessToken)
          localStorage.setItem('refreshToken', responseData.refreshToken)
          localStorage.setItem('user', JSON.stringify(responseData.user))
          console.log('✅ Tokens and user saved successfully')
        } else {
          console.error('❌ Invalid response structure:', responseData)
        }
        
        console.log('State after login:', { loading: state.loading, isAuthenticated: state.isAuthenticated, hasUser: !!state.user })
      })
      .addCase(login.rejected, (state, action) => {
        console.log('❌ login.rejected - setting loading=false')
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
        state.user = null
        state.token = null
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('user', JSON.stringify(action.payload.user))
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.isAuthenticated = false
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
      })
      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.loading = true
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload
        localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false
        state.isAuthenticated = false
        state.user = null
        state.token = null
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
      })
  },
})

export const { clearError, updateUser } = authSlice.actions
export default authSlice.reducer

// Made with Bob

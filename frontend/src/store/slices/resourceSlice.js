import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import resourceService from '../../services/resource.service'

const initialState = {
  resources: [],
  currentResource: null,
  loading: false,
  error: null,
}

// Async thunks
export const fetchResources = createAsyncThunk(
  'resources/fetchAll',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await resourceService.getAll(filters)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchResourceById = createAsyncThunk(
  'resources/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await resourceService.getById(id)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const createResource = createAsyncThunk(
  'resources/create',
  async (resourceData, { rejectWithValue }) => {
    try {
      const response = await resourceService.create(resourceData)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateResource = createAsyncThunk(
  'resources/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await resourceService.update(id, data)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteResource = createAsyncThunk(
  'resources/delete',
  async (id, { rejectWithValue }) => {
    try {
      await resourceService.delete(id)
      return id
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const resourceSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearCurrentResource: (state) => {
      state.currentResource = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all resources
      .addCase(fetchResources.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchResources.fulfilled, (state, action) => {
        state.loading = false
        state.resources = action.payload
      })
      .addCase(fetchResources.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Fetch resource by ID
      .addCase(fetchResourceById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchResourceById.fulfilled, (state, action) => {
        state.loading = false
        state.currentResource = action.payload
      })
      .addCase(fetchResourceById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Create resource
      .addCase(createResource.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createResource.fulfilled, (state, action) => {
        state.loading = false
        state.resources.push(action.payload)
      })
      .addCase(createResource.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Update resource
      .addCase(updateResource.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateResource.fulfilled, (state, action) => {
        state.loading = false
        const index = state.resources.findIndex((r) => r.id === action.payload.id)
        if (index !== -1) {
          state.resources[index] = action.payload
        }
        if (state.currentResource?.id === action.payload.id) {
          state.currentResource = action.payload
        }
      })
      .addCase(updateResource.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Delete resource
      .addCase(deleteResource.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteResource.fulfilled, (state, action) => {
        state.loading = false
        state.resources = state.resources.filter((r) => r.id !== action.payload)
        if (state.currentResource?.id === action.payload) {
          state.currentResource = null
        }
      })
      .addCase(deleteResource.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError, clearCurrentResource } = resourceSlice.actions
export default resourceSlice.reducer

// Made with Bob

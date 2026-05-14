import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import projectService from '../../services/project.service'

const initialState = {
  projects: [],
  currentProject: null,
  stats: null,
  loading: false,
  error: null,
  filters: {
    status: '',
    priority: '',
    manager: '',
  },
}

// Async thunks
export const fetchProjects = createAsyncThunk(
  'projects/fetchAll',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await projectService.getAll(filters)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchProjectById = createAsyncThunk(
  'projects/fetchById',
  async ({ id, include }, { rejectWithValue }) => {
    try {
      const response = await projectService.getById(id, include)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const createProject = createAsyncThunk(
  'projects/create',
  async (projectData, { rejectWithValue }) => {
    try {
      const response = await projectService.create(projectData)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateProject = createAsyncThunk(
  'projects/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await projectService.update(id, data)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteProject = createAsyncThunk(
  'projects/delete',
  async (id, { rejectWithValue }) => {
    try {
      await projectService.delete(id)
      return id
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchProjectStats = createAsyncThunk(
  'projects/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await projectService.getStats()
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
    },
    clearCurrentProject: (state) => {
      state.currentProject = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all projects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false
        state.projects = action.payload
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Fetch project by ID
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false
        state.currentProject = action.payload
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Create project
      .addCase(createProject.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false
        state.projects.push(action.payload)
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Update project
      .addCase(updateProject.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false
        const index = state.projects.findIndex((p) => p.id === action.payload.id)
        if (index !== -1) {
          state.projects[index] = action.payload
        }
        if (state.currentProject?.id === action.payload.id) {
          state.currentProject = action.payload
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Delete project
      .addCase(deleteProject.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false
        state.projects = state.projects.filter((p) => p.id !== action.payload)
        if (state.currentProject?.id === action.payload) {
          state.currentProject = null
        }
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Fetch stats
      .addCase(fetchProjectStats.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProjectStats.fulfilled, (state, action) => {
        state.loading = false
        state.stats = action.payload
      })
      .addCase(fetchProjectStats.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError, setFilters, clearFilters, clearCurrentProject } = projectSlice.actions
export default projectSlice.reducer

// Made with Bob

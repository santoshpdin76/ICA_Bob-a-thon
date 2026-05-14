import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import taskService from '../../services/task.service'

const initialState = {
  tasks: [],
  myTasks: [],
  currentTask: null,
  loading: false,
  error: null,
}

// Async thunks
export const fetchTasksByProject = createAsyncThunk(
  'tasks/fetchByProject',
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await taskService.getByProject(projectId)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchMyTasks = createAsyncThunk(
  'tasks/fetchMyTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await taskService.getMyTasks()
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchTaskById = createAsyncThunk(
  'tasks/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await taskService.getById(id)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const createTask = createAsyncThunk(
  'tasks/create',
  async ({ projectId, taskData }, { rejectWithValue }) => {
    try {
      const response = await taskService.create(projectId, taskData)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateTask = createAsyncThunk(
  'tasks/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await taskService.update(id, data)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateTaskStatus = createAsyncThunk(
  'tasks/updateStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await taskService.updateStatus(id, status)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteTask = createAsyncThunk(
  'tasks/delete',
  async (id, { rejectWithValue }) => {
    try {
      await taskService.delete(id)
      return id
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearCurrentTask: (state) => {
      state.currentTask = null
    },
    clearTasks: (state) => {
      state.tasks = []
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks by project
      .addCase(fetchTasksByProject.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTasksByProject.fulfilled, (state, action) => {
        state.loading = false
        state.tasks = action.payload
      })
      .addCase(fetchTasksByProject.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Fetch my tasks
      .addCase(fetchMyTasks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMyTasks.fulfilled, (state, action) => {
        state.loading = false
        state.myTasks = action.payload
      })
      .addCase(fetchMyTasks.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Fetch task by ID
      .addCase(fetchTaskById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.loading = false
        state.currentTask = action.payload
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Create task
      .addCase(createTask.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false
        state.tasks.push(action.payload)
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Update task
      .addCase(updateTask.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false
        const index = state.tasks.findIndex((t) => t.id === action.payload.id)
        if (index !== -1) {
          state.tasks[index] = action.payload
        }
        if (state.currentTask?.id === action.payload.id) {
          state.currentTask = action.payload
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Update task status
      .addCase(updateTaskStatus.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        state.loading = false
        const index = state.tasks.findIndex((t) => t.id === action.payload.id)
        if (index !== -1) {
          state.tasks[index] = action.payload
        }
        if (state.currentTask?.id === action.payload.id) {
          state.currentTask = action.payload
        }
      })
      .addCase(updateTaskStatus.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Delete task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false
        state.tasks = state.tasks.filter((t) => t.id !== action.payload)
        if (state.currentTask?.id === action.payload) {
          state.currentTask = null
        }
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError, clearCurrentTask, clearTasks } = taskSlice.actions
export default taskSlice.reducer

// Made with Bob

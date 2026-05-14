import api from './api'

const taskService = {
  // Get all tasks for a project
  getByProject: async (projectId) => {
    const response = await api.get(`/projects/${projectId}/tasks`)
    return response.data
  },

  // Get task by ID
  getById: async (id) => {
    const response = await api.get(`/tasks/${id}`)
    return response.data
  },

  // Create new task
  create: async (projectId, taskData) => {
    const response = await api.post(`/projects/${projectId}/tasks`, taskData)
    return response.data
  },

  // Update task
  update: async (id, taskData) => {
    const response = await api.put(`/tasks/${id}`, taskData)
    return response.data
  },

  // Delete task
  delete: async (id) => {
    const response = await api.delete(`/tasks/${id}`)
    return response.data
  },

  // Update task status
  updateStatus: async (id, status) => {
    const response = await api.patch(`/tasks/${id}/status`, { status })
    return response.data
  },

  // Get current user's tasks
  getMyTasks: async () => {
    const response = await api.get('/tasks/my-tasks')
    return response.data
  },

  // Assign task to user
  assign: async (id, userId) => {
    const response = await api.patch(`/tasks/${id}`, { assigned_to: userId })
    return response.data
  },
}

export default taskService

// Made with Bob

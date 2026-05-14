import api from './api'

const projectService = {
  // Get all projects
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString()
    const response = await api.get(`/projects${params ? `?${params}` : ''}`)
    return response.data
  },

  // Get project by ID
  getById: async (id, include = []) => {
    const params = include.length ? `?include=${include.join(',')}` : ''
    const response = await api.get(`/projects/${id}${params}`)
    return response.data
  },

  // Create new project
  create: async (projectData) => {
    const response = await api.post('/projects', projectData)
    return response.data
  },

  // Update project
  update: async (id, projectData) => {
    const response = await api.put(`/projects/${id}`, projectData)
    return response.data
  },

  // Delete project
  delete: async (id) => {
    const response = await api.delete(`/projects/${id}`)
    return response.data
  },

  // Get project summary
  getSummary: async (id) => {
    const response = await api.get(`/projects/${id}/summary`)
    return response.data
  },

  // Get project timeline
  getTimeline: async (id) => {
    const response = await api.get(`/projects/${id}/timeline`)
    return response.data
  },

  // Get portfolio statistics
  getStats: async () => {
    const response = await api.get('/projects/stats')
    return response.data
  },

  // Get project tasks
  getTasks: async (projectId) => {
    const response = await api.get(`/projects/${projectId}/tasks`)
    return response.data
  },

  // Get project milestones
  getMilestones: async (projectId) => {
    const response = await api.get(`/projects/${projectId}/milestones`)
    return response.data
  },

  // Get project risks
  getRisks: async (projectId) => {
    const response = await api.get(`/projects/${projectId}/risks`)
    return response.data
  },

  // Get project stakeholders
  getStakeholders: async (projectId) => {
    const response = await api.get(`/projects/${projectId}/stakeholders`)
    return response.data
  },

  // Add stakeholder to project
  addStakeholder: async (projectId, stakeholderId) => {
    const response = await api.post(`/projects/${projectId}/stakeholders`, { stakeholderId })
    return response.data
  },

  // Remove stakeholder from project
  removeStakeholder: async (projectId, stakeholderId) => {
    const response = await api.delete(`/projects/${projectId}/stakeholders/${stakeholderId}`)
    return response.data
  },
}

export default projectService

// Made with Bob

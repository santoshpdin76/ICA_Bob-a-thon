import api from './api'

const resourceService = {
  // Get all resources
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString()
    const response = await api.get(`/resources${params ? `?${params}` : ''}`)
    return response.data
  },

  // Get resource by ID
  getById: async (id) => {
    const response = await api.get(`/resources/${id}`)
    return response.data
  },

  // Create new resource
  create: async (resourceData) => {
    const response = await api.post('/resources', resourceData)
    return response.data
  },

  // Update resource
  update: async (id, resourceData) => {
    const response = await api.put(`/resources/${id}`, resourceData)
    return response.data
  },

  // Delete resource
  delete: async (id) => {
    const response = await api.delete(`/resources/${id}`)
    return response.data
  },

  // Get resource availability
  getAvailability: async (id) => {
    const response = await api.get(`/resources/${id}/availability`)
    return response.data
  },

  // Get resource assignments
  getAssignments: async (id) => {
    const response = await api.get(`/resources/${id}/assignments`)
    return response.data
  },
}

export default resourceService

// Made with Bob

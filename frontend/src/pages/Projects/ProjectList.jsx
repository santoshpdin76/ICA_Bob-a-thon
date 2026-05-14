import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchProjects, deleteProject } from '../../store/slices/projectSlice'
import './ProjectList.scss'

const ProjectList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { projects, loading } = useSelector((state) => state.projects)
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  const getStatusBadge = (status) => {
    const statusMap = {
      planning: { class: 'badge-blue', label: 'Planning' },
      active: { class: 'badge-green', label: 'Active' },
      on_hold: { class: 'badge-yellow', label: 'On Hold' },
      completed: { class: 'badge-gray', label: 'Completed' },
      cancelled: { class: 'badge-red', label: 'Cancelled' },
    }
    const config = statusMap[status] || { class: 'badge-gray', label: status }
    return <span className={`badge ${config.class}`}>{config.label}</span>
  }

  const getPriorityBadge = (priority) => {
    const priorityMap = {
      low: { class: 'badge-green', label: 'Low' },
      medium: { class: 'badge-blue', label: 'Medium' },
      high: { class: 'badge-yellow', label: 'High' },
      critical: { class: 'badge-red', label: 'Critical' },
    }
    const config = priorityMap[priority] || { class: 'badge-gray', label: priority }
    return <span className={`badge ${config.class}`}>{config.label}</span>
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      dispatch(deleteProject(id))
    }
  }

  const filteredProjects = projects.filter((project) =>
    project.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.code?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const paginatedProjects = filteredProjects.slice(
    (page - 1) * pageSize,
    page * pageSize
  )

  const totalPages = Math.ceil(filteredProjects.length / pageSize)

  return (
    <div className="project-list">
      <div className="page-header">
        <div>
          <h1>Projects</h1>
          <p>{filteredProjects.length} total projects</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/projects/new')}
        >
          <span className="btn-icon">+</span>
          New Project
        </button>
      </div>

      <div className="table-toolbar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Code</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Manager</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="loading-cell">
                  <div className="loading-spinner">Loading projects...</div>
                </td>
              </tr>
            ) : paginatedProjects.length === 0 ? (
              <tr>
                <td colSpan="8" className="empty-cell">
                  {searchTerm ? 'No projects found matching your search.' : 'No projects found. Create your first project to get started.'}
                </td>
              </tr>
            ) : (
              paginatedProjects.map((project) => (
                <tr key={project.id}>
                  <td className="project-name">{project.name}</td>
                  <td><code className="project-code">{project.code}</code></td>
                  <td>{getStatusBadge(project.status)}</td>
                  <td>{getPriorityBadge(project.priority)}</td>
                  <td>{project.manager_name || 'Unassigned'}</td>
                  <td>{project.start_date ? new Date(project.start_date).toLocaleDateString() : '-'}</td>
                  <td>{project.end_date ? new Date(project.end_date).toLocaleDateString() : '-'}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-icon-small"
                        onClick={() => navigate(`/projects/${project.id}`)}
                        title="View Details"
                      >
                        👁️
                      </button>
                      <button
                        className="btn-icon-small"
                        onClick={() => navigate(`/projects/${project.id}/edit`)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        className="btn-icon-small btn-danger"
                        onClick={() => handleDelete(project.id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            ← Previous
          </button>
          <span className="pagination-info">
            Page {page} of {totalPages}
          </span>
          <button
            className="pagination-btn"
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  )
}

export default ProjectList

// Made with Bob

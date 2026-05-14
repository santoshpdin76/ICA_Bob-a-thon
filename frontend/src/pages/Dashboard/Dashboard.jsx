import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjectStats } from '../../store/slices/projectSlice'
import './Dashboard.scss'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { stats, loading } = useSelector((state) => state.projects)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchProjectStats())
  }, [dispatch])

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
        </div>
        <div className="dashboard-stats">
          <div className="stat-card skeleton">
            <div className="skeleton-content"></div>
          </div>
          <div className="stat-card skeleton">
            <div className="skeleton-content"></div>
          </div>
          <div className="stat-card skeleton">
            <div className="skeleton-content"></div>
          </div>
          <div className="stat-card skeleton">
            <div className="skeleton-content"></div>
          </div>
        </div>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Projects',
      value: stats?.totalProjects || 0,
      icon: '📁',
      color: 'primary'
    },
    {
      title: 'Active Projects',
      value: stats?.activeProjects || 0,
      icon: '✓',
      color: 'success'
    },
    {
      title: 'Completed',
      value: stats?.completedProjects || 0,
      icon: '🎯',
      color: 'info'
    },
    {
      title: 'On Hold',
      value: stats?.onHoldProjects || 0,
      icon: '⏸',
      color: 'warning'
    }
  ]

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.full_name || 'User'}!</h1>
        <p>Here's an overview of your portfolio</p>
      </div>

      <div className="dashboard-stats">
        {statCards.map((card, index) => (
          <div key={index} className={`stat-card stat-card--${card.color}`}>
            <div className="stat-icon">{card.icon}</div>
            <div className="stat-content">
              <h3>{card.value}</h3>
              <p>{card.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Recent Projects</h3>
            <div className="card-content">
              <p className="placeholder-text">
                Project list will be displayed here. Connect to backend to see real data.
              </p>
            </div>
          </div>

          <div className="dashboard-card">
            <h3>My Tasks</h3>
            <div className="card-content">
              <p className="placeholder-text">
                Your assigned tasks will be displayed here. Connect to backend to see real data.
              </p>
            </div>
          </div>

          <div className="dashboard-card dashboard-card--wide">
            <h3>Project Timeline</h3>
            <div className="card-content">
              <div className="placeholder-chart">
                <p className="placeholder-text">
                  Gantt chart will be displayed here. Connect to backend to see real data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

// Made with Bob

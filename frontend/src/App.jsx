import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AppLayout from './components/layout/AppLayout'
import Login from './pages/Auth/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import ProjectList from './pages/Projects/ProjectList'
import TaskList from './pages/Tasks/TaskList'
import ResourceList from './pages/Resources/ResourceList'
import ReportList from './pages/Reports/ReportList'
import NotFound from './pages/NotFound/NotFound'
import { checkAuth } from './store/slices/authSlice'
import PrivateRoute from './components/common/PrivateRoute'
import './App.scss'

function App() {
  const dispatch = useDispatch()
  const { isAuthenticated, loading } = useSelector((state) => state.auth)

  useEffect(() => {
    // Only check auth if there's a token in localStorage
    const token = localStorage.getItem('accessToken')
    console.log('🔍 App mounted, token exists:', !!token)
    if (token) {
      console.log('🔐 Checking auth with existing token...')
      dispatch(checkAuth())
    }
  }, [dispatch])

  console.log('🎯 App render - isAuthenticated:', isAuthenticated, 'loading:', loading)

  if (loading) {
    console.log('⏳ App showing loading screen...')
    return (
      <div className="app-loading">
        <div className="loading-spinner">Loading...</div>
      </div>
    )
  }

  return (
    <div className="app">
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<ProjectList />} />
          <Route path="tasks" element={<TaskList />} />
          <Route path="resources" element={<ResourceList />} />
          <Route path="reports" element={<ReportList />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App

// Made with Bob

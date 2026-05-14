import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, clearError } from '../../store/slices/authSlice'
import './Login.scss'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(clearError())
    
    console.log('📝 Submitting login form...')
    const result = await dispatch(login(formData))
    console.log('📦 Login result:', result)
    
    if (result.type === 'auth/login/fulfilled') {
      console.log('✅ Login fulfilled, navigating to dashboard...')
      navigate('/dashboard')
    } else {
      console.log('❌ Login failed:', result)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-icon">◆</div>
            <h1>PPM Application</h1>
            <p>Project Portfolio Management</p>
          </div>

          {error && (
            <div className="error-notification">
              <span className="error-icon">⚠️</span>
              <div className="error-content">
                <strong>Login Failed</strong>
                <p>{error}</p>
              </div>
              <button 
                className="error-close"
                onClick={() => dispatch(clearError())}
                aria-label="Close"
              >
                ×
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
                autoComplete="username"
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                className="form-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="login-button"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="login-footer">
            <p>Default credentials for testing:</p>
            <ul>
              <li><strong>Admin:</strong> admin / admin123</li>
              <li><strong>Manager:</strong> jsmith / password123</li>
              <li><strong>Member:</strong> bwilson / password123</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

// Made with Bob

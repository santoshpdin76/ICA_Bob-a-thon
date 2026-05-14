import { useNavigate } from 'react-router-dom'
import './NotFound.scss'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        <button
          className="btn-home"
          onClick={() => navigate('/')}
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  )
}

export default NotFound

// Made with Bob

import { verifyAccessToken } from '../utils/jwt.js'
import { User, Role } from '../models/index.js'

export const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided',
      })
    }

    const token = authHeader.substring(7)

    // Verify token
    const decoded = verifyAccessToken(token)

    // Get user from database
    const user = await User.findByPk(decoded.id, {
      include: [
        {
          model: Role,
          as: 'role',
          attributes: ['id', 'name', 'permissions'],
        },
      ],
      attributes: { exclude: ['password'] },
    })

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      })
    }

    if (!user.is_active) {
      return res.status(401).json({
        success: false,
        message: 'User account is inactive',
      })
    }

    // Attach user to request
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
      error: error.message,
    })
  }
}

export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      })
    }

    const userRole = req.user.role?.name
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions',
      })
    }

    next()
  }
}

export const checkPermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      })
    }

    const userPermissions = req.user.role?.permissions || {}
    if (!userPermissions[permission]) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions',
      })
    }

    next()
  }
}

// Made with Bob

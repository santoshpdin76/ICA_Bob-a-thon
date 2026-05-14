import { Op } from 'sequelize'
import { User, Role } from '../models/index.js'
import { generateTokens } from '../utils/jwt.js'

export const register = async (req, res) => {
  try {
    const { username, email, password, full_name, role_id } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    })

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Username or email already exists',
      })
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      full_name,
      role_id,
    })

    // Generate tokens
    const tokens = generateTokens(user)

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: user.toJSON(),
        ...tokens,
      },
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message,
    })
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body

    // Find user
    const user = await User.findOne({
      where: { username },
      include: [
        {
          model: Role,
          as: 'role',
          attributes: ['id', 'name', 'permissions'],
        },
      ],
    })

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      })
    }

    // Check if user is active
    if (!user.is_active) {
      return res.status(401).json({
        success: false,
        message: 'User account is inactive',
      })
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      })
    }

    // Update last login
    await user.update({ last_login: new Date() })

    // Generate tokens
    const tokens = generateTokens(user)

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: user.toJSON(),
        ...tokens,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message,
    })
  }
}

export const getProfile = async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        user: req.user,
      },
    })
  } catch (error) {
    console.error('Get profile error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message,
    })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { full_name, phone, department } = req.body
    const userId = req.user.id

    const user = await User.findByPk(userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    await user.update({
      full_name: full_name || user.full_name,
      phone: phone || user.phone,
      department: department || user.department,
    })

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: user.toJSON(),
      },
    })
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message,
    })
  }
}

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    const userId = req.user.id

    const user = await User.findByPk(userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword)
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect',
      })
    }

    // Update password
    await user.update({ password: newPassword })

    res.json({
      success: true,
      message: 'Password changed successfully',
    })
  } catch (error) {
    console.error('Change password error:', error)
    res.status(500).json({
      success: false,
      message: 'Error changing password',
      error: error.message,
    })
  }
}

// Made with Bob

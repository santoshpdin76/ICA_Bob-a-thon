import express from 'express'
import { body, param } from 'express-validator'
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectStats,
} from '../controllers/project.controller.js'
import { authenticate } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'

const router = express.Router()

// Validation rules
const projectValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Project name is required')
    .isLength({ max: 200 })
    .withMessage('Project name must not exceed 200 characters'),
  body('code')
    .trim()
    .notEmpty()
    .withMessage('Project code is required')
    .isLength({ max: 50 })
    .withMessage('Project code must not exceed 50 characters'),
  body('status')
    .optional()
    .isIn(['planning', 'active', 'on_hold', 'completed', 'cancelled'])
    .withMessage('Invalid status'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'critical'])
    .withMessage('Invalid priority'),
  body('start_date')
    .optional()
    .isISO8601()
    .withMessage('Invalid start date format'),
  body('end_date')
    .optional()
    .isISO8601()
    .withMessage('Invalid end date format'),
  body('budget')
    .optional()
    .isDecimal()
    .withMessage('Budget must be a valid number'),
]

const idValidation = [
  param('id')
    .isUUID()
    .withMessage('Invalid project ID'),
]

// Routes
router.get('/', authenticate, getAllProjects)
router.get('/stats', authenticate, getProjectStats)
router.get('/:id', authenticate, idValidation, validate, getProjectById)
router.post('/', authenticate, projectValidation, validate, createProject)
router.put('/:id', authenticate, idValidation, projectValidation, validate, updateProject)
router.delete('/:id', authenticate, idValidation, validate, deleteProject)

export default router

// Made with Bob

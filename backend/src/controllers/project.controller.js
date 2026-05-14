import { Op } from 'sequelize'
import { Project, User, sequelize } from '../models/index.js'

export const getAllProjects = async (req, res) => {
  try {
    const { status, priority, manager_id, search } = req.query

    const where = {}
    if (status) where.status = status
    if (priority) where.priority = priority
    if (manager_id) where.manager_id = manager_id
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { code: { [Op.iLike]: `%${search}%` } },
      ]
    }

    const projects = await Project.findAll({
      where,
      include: [
        {
          model: User,
          as: 'manager',
          attributes: ['id', 'full_name', 'email'],
        },
      ],
      order: [['created_at', 'DESC']],
    })

    res.json({
      success: true,
      data: projects,
    })
  } catch (error) {
    console.error('Get all projects error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message,
    })
  }
}

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params

    const project = await Project.findByPk(id, {
      include: [
        {
          model: User,
          as: 'manager',
          attributes: ['id', 'full_name', 'email', 'phone'],
        },
      ],
    })

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      })
    }

    res.json({
      success: true,
      data: project,
    })
  } catch (error) {
    console.error('Get project by ID error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching project',
      error: error.message,
    })
  }
}

export const createProject = async (req, res) => {
  try {
    const projectData = req.body

    const project = await Project.create(projectData)

    const createdProject = await Project.findByPk(project.id, {
      include: [
        {
          model: User,
          as: 'manager',
          attributes: ['id', 'full_name', 'email'],
        },
      ],
    })

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: createdProject,
    })
  } catch (error) {
    console.error('Create project error:', error)
    res.status(500).json({
      success: false,
      message: 'Error creating project',
      error: error.message,
    })
  }
}

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body

    const project = await Project.findByPk(id)
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      })
    }

    await project.update(updateData)

    const updatedProject = await Project.findByPk(id, {
      include: [
        {
          model: User,
          as: 'manager',
          attributes: ['id', 'full_name', 'email'],
        },
      ],
    })

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: updatedProject,
    })
  } catch (error) {
    console.error('Update project error:', error)
    res.status(500).json({
      success: false,
      message: 'Error updating project',
      error: error.message,
    })
  }
}

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params

    const project = await Project.findByPk(id)
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      })
    }

    await project.destroy()

    res.json({
      success: true,
      message: 'Project deleted successfully',
    })
  } catch (error) {
    console.error('Delete project error:', error)
    res.status(500).json({
      success: false,
      message: 'Error deleting project',
      error: error.message,
    })
  }
}

export const getProjectStats = async (req, res) => {
  try {
    const totalProjects = await Project.count()
    const activeProjects = await Project.count({ where: { status: 'active' } })
    const completedProjects = await Project.count({ where: { status: 'completed' } })
    const onHoldProjects = await Project.count({ where: { status: 'on_hold' } })

    const projectsByStatus = await Project.findAll({
      attributes: [
        'status',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
      ],
      group: ['status'],
    })

    const projectsByPriority = await Project.findAll({
      attributes: [
        'priority',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
      ],
      group: ['priority'],
    })

    res.json({
      success: true,
      data: {
        totalProjects,
        activeProjects,
        completedProjects,
        onHoldProjects,
        activeTasks: 0, // Placeholder - will be implemented with Task model
        totalResources: 0, // Placeholder - will be implemented with Resource model
        highPriorityRisks: 0, // Placeholder - will be implemented with Risk model
        byStatus: projectsByStatus,
        byPriority: projectsByPriority,
      },
    })
  } catch (error) {
    console.error('Get project stats error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching project statistics',
      error: error.message,
    })
  }
}

// Made with Bob

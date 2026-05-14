import sequelize from '../config/database.js'
import User from './User.js'
import Role from './Role.js'
import Project from './Project.js'

// Define associations
const setupAssociations = () => {
  // User - Role relationship
  Role.hasMany(User, {
    foreignKey: 'role_id',
    as: 'users',
  })
  User.belongsTo(Role, {
    foreignKey: 'role_id',
    as: 'role',
  })

  // Project - User (Manager) relationship
  User.hasMany(Project, {
    foreignKey: 'manager_id',
    as: 'managed_projects',
  })
  Project.belongsTo(User, {
    foreignKey: 'manager_id',
    as: 'manager',
  })
}

// Initialize associations
setupAssociations()

// Sync database
export const syncDatabase = async (options = {}) => {
  try {
    await sequelize.sync(options)
    console.log('✅ Database synchronized successfully.')
  } catch (error) {
    console.error('❌ Error synchronizing database:', error.message)
    throw error
  }
}

export { sequelize, User, Role, Project }

// Made with Bob

import { sequelize, User, Role, Project } from '../models/index.js'
import dotenv from 'dotenv'

dotenv.config()

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...')

    // Sync database (force: true will drop existing tables)
    await sequelize.sync({ force: true })
    console.log('✅ Database synced')

    // Create roles
    console.log('Creating roles...')
    const adminRole = await Role.create({
      name: 'admin',
      description: 'Administrator with full access',
      permissions: {
        projects: { create: true, read: true, update: true, delete: true },
        tasks: { create: true, read: true, update: true, delete: true },
        resources: { create: true, read: true, update: true, delete: true },
        users: { create: true, read: true, update: true, delete: true },
        reports: { create: true, read: true, update: true, delete: true },
      },
    })

    const managerRole = await Role.create({
      name: 'manager',
      description: 'Project Manager with project management access',
      permissions: {
        projects: { create: true, read: true, update: true, delete: false },
        tasks: { create: true, read: true, update: true, delete: true },
        resources: { create: true, read: true, update: true, delete: false },
        users: { create: false, read: true, update: false, delete: false },
        reports: { create: true, read: true, update: false, delete: false },
      },
    })

    const memberRole = await Role.create({
      name: 'member',
      description: 'Team Member with limited access',
      permissions: {
        projects: { create: false, read: true, update: false, delete: false },
        tasks: { create: false, read: true, update: true, delete: false },
        resources: { create: false, read: true, update: false, delete: false },
        users: { create: false, read: true, update: false, delete: false },
        reports: { create: false, read: true, update: false, delete: false },
      },
    })

    console.log('✅ Roles created')

    // Create users
    console.log('Creating users...')
    const users = []
    
    users.push(await User.create({
      username: 'admin',
      email: 'admin@ppm.com',
      password: 'admin123',
      full_name: 'System Administrator',
      role_id: adminRole.id,
      department: 'IT',
      phone: '+1-555-0100',
      is_active: true,
    }))

    // Create 10 managers
    const managerNames = [
      { username: 'jsmith', name: 'John Smith', dept: 'Engineering' },
      { username: 'mjones', name: 'Mary Jones', dept: 'Product' },
      { username: 'rjohnson', name: 'Robert Johnson', dept: 'Operations' },
      { username: 'swilliams', name: 'Sarah Williams', dept: 'Marketing' },
      { username: 'dbrown', name: 'David Brown', dept: 'Finance' },
      { username: 'ldavis', name: 'Linda Davis', dept: 'HR' },
      { username: 'jmiller', name: 'James Miller', dept: 'Sales' },
      { username: 'pwilson', name: 'Patricia Wilson', dept: 'Engineering' },
      { username: 'tmoore', name: 'Thomas Moore', dept: 'Product' },
      { username: 'mtaylor', name: 'Michael Taylor', dept: 'Operations' },
    ]

    for (let i = 0; i < managerNames.length; i++) {
      users.push(await User.create({
        username: managerNames[i].username,
        email: `${managerNames[i].username}@ppm.com`,
        password: 'password123',
        full_name: managerNames[i].name,
        role_id: managerRole.id,
        department: managerNames[i].dept,
        phone: `+1-555-01${10 + i}`,
        is_active: true,
      }))
    }

    // Create 5 team members
    const memberNames = [
      { username: 'bwilson', name: 'Bob Wilson', dept: 'Engineering' },
      { username: 'aanderson', name: 'Alice Anderson', dept: 'Product' },
      { username: 'cthomas', name: 'Charlie Thomas', dept: 'Operations' },
      { username: 'djackson', name: 'Diana Jackson', dept: 'Marketing' },
      { username: 'ewhite', name: 'Edward White', dept: 'Engineering' },
    ]

    for (let i = 0; i < memberNames.length; i++) {
      users.push(await User.create({
        username: memberNames[i].username,
        email: `${memberNames[i].username}@ppm.com`,
        password: 'password123',
        full_name: memberNames[i].name,
        role_id: memberRole.id,
        department: memberNames[i].dept,
        phone: `+1-555-02${10 + i}`,
        is_active: true,
      }))
    }

    console.log(`✅ ${users.length} users created`)

    // Create 60 sample projects
    console.log('Creating sample projects...')
    const projectTemplates = [
      { prefix: 'CPR', name: 'Customer Portal Redesign', type: 'Web Development' },
      { prefix: 'DAP', name: 'Data Analytics Platform', type: 'Analytics' },
      { prefix: 'MAD', name: 'Mobile App Development', type: 'Mobile' },
      { prefix: 'SCU', name: 'Security Compliance Upgrade', type: 'Security' },
      { prefix: 'LSM', name: 'Legacy System Migration', type: 'Infrastructure' },
      { prefix: 'CRM', name: 'CRM Implementation', type: 'Business Systems' },
      { prefix: 'ERP', name: 'ERP Integration', type: 'Enterprise' },
      { prefix: 'API', name: 'API Gateway Development', type: 'Backend' },
      { prefix: 'ML', name: 'Machine Learning Pipeline', type: 'AI/ML' },
      { prefix: 'IOT', name: 'IoT Platform', type: 'IoT' },
      { prefix: 'BC', name: 'Blockchain Integration', type: 'Blockchain' },
      { prefix: 'AR', name: 'AR Experience', type: 'AR/VR' },
      { prefix: 'CI', name: 'CI/CD Pipeline', type: 'DevOps' },
      { prefix: 'DW', name: 'Data Warehouse', type: 'Data' },
      { prefix: 'UI', name: 'UI Component Library', type: 'Frontend' },
    ]

    const statuses = ['planning', 'active', 'on_hold', 'completed', 'cancelled']
    const priorities = ['low', 'medium', 'high', 'critical']
    const healthStatuses = ['green', 'yellow', 'red']
    const departments = ['Engineering', 'Product', 'Operations', 'Marketing', 'Finance', 'HR', 'Sales']

    const managers = users.filter(u => u.role_id === managerRole.id)

    for (let i = 0; i < 60; i++) {
      const template = projectTemplates[i % projectTemplates.length]
      const year = 2024
      const quarter = Math.floor(i / 15) + 1
      const status = statuses[Math.floor(Math.random() * statuses.length)]
      const priority = priorities[Math.floor(Math.random() * priorities.length)]
      const health = healthStatuses[Math.floor(Math.random() * healthStatuses.length)]
      const manager = managers[i % managers.length]
      
      const startMonth = Math.floor(Math.random() * 12) + 1
      const duration = Math.floor(Math.random() * 8) + 3 // 3-10 months
      const endMonth = (startMonth + duration) % 12 || 12
      
      const budget = (Math.floor(Math.random() * 50) + 10) * 10000 // $100k - $500k
      const progress = status === 'completed' ? 100 : 
                      status === 'cancelled' ? Math.floor(Math.random() * 30) :
                      status === 'planning' ? Math.floor(Math.random() * 15) :
                      status === 'on_hold' ? Math.floor(Math.random() * 60) + 10 :
                      Math.floor(Math.random() * 80) + 10
      const actualCost = Math.floor(budget * (progress / 100) * (0.8 + Math.random() * 0.4))

      await Project.create({
        name: `${template.name} ${quarter > 1 ? 'Phase ' + quarter : ''}`,
        code: `${template.prefix}-${year}-${String(i + 1).padStart(3, '0')}`,
        description: `${template.type} project focusing on ${template.name.toLowerCase()} with modern architecture and best practices`,
        status: status,
        priority: priority,
        start_date: `${year}-${String(startMonth).padStart(2, '0')}-01`,
        end_date: `${year}-${String(endMonth).padStart(2, '0')}-28`,
        budget: budget,
        actual_cost: actualCost,
        manager_id: manager.id,
        progress: progress,
        health_status: health,
        objectives: `Deliver high-quality ${template.type} solution, meet business requirements, ensure scalability and performance`,
        deliverables: [
          'Technical documentation',
          'Implementation code',
          'Testing reports',
          'Deployment guide',
          'User training materials',
        ],
      })
    }

    console.log('✅ 60 sample projects created')

    console.log('\n🎉 Database seeding completed successfully!')
    console.log(`\n📊 Summary:`)
    console.log(`   - Roles: 3`)
    console.log(`   - Users: ${users.length}`)
    console.log(`   - Projects: 60`)
    console.log('\n📝 Test Credentials:')
    console.log('   Admin: admin / admin123')
    console.log('   Manager: jsmith / password123')
    console.log('   Member: bwilson / password123')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()

// Made with Bob

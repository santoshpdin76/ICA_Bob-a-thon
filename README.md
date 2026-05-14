# Project Portfolio Management (PPM) Application

A comprehensive web-based project portfolio management system built with React (IBM Carbon Design System) and Node.js.

## Features

- 📊 **Portfolio Dashboard** - Real-time overview of all projects
- 📁 **Project Management** - Create, track, and manage projects
- ✅ **Task Management** - Kanban board and list views
- 👥 **Resource Management** - Team allocation and utilization
- 📈 **Analytics & Reports** - Gantt charts, budget analysis, risk matrix
- 🔒 **Role-Based Access Control** - Admin, Manager, Team Member, Viewer roles
- 🎨 **IBM Carbon Design** - Professional, accessible UI components

## Tech Stack

### Frontend
- React 18
- IBM Carbon Design System
- Redux Toolkit
- React Router v6
- Recharts
- Axios

### Backend
- Node.js 20 LTS
- Express.js
- PostgreSQL 15
- Sequelize ORM
- JWT Authentication
- Winston Logger

### DevOps
- Docker & Docker Compose
- Nginx
- PM2

## Prerequisites

- Node.js 18.x or higher
- PostgreSQL 14.x or higher
- npm 9.x or higher

## Quick Start

### Manual Setup

#### 1. Install Dependencies

```bash
# Install all dependencies (root, frontend, and backend)
npm install
```

#### 2. Set Up Database

```bash
# Create PostgreSQL database
createdb ppm_db

# Or using psql:
psql -U postgres
CREATE DATABASE ppm_db;
\q

# Seed database with sample data
cd backend
npm run seed
```

#### 3. Configure Environment Variables

**Backend (.env):**
```bash
cd backend
cp .env.example .env
# Edit .env with your database credentials
```

**Frontend (.env):**
```bash
cd frontend
cp .env.example .env
# Default: VITE_API_URL=http://localhost:5000/api/v1
```

#### 4. Start Development Servers

```bash
# From root directory - starts both frontend and backend
npm run dev

# Frontend will be available at: http://localhost:5173
# Backend API will be available at: http://localhost:5000/api/v1
```

For detailed setup instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)

## Project Structure

```
ppm-app/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── store/           # Redux store
│   │   ├── services/        # API services
│   │   ├── hooks/           # Custom hooks
│   │   └── utils/           # Utility functions
│   ├── public/              # Static assets
│   └── package.json
├── backend/                  # Node.js backend application
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Express middleware
│   │   ├── services/        # Business logic
│   │   └── utils/           # Utility functions
│   ├── migrations/          # Database migrations
│   ├── seeders/             # Database seeders
│   └── package.json
├── docker-compose.yml        # Docker configuration
├── .gitignore
└── README.md
```

## Available Scripts

### Root Level

- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build frontend for production
- `npm run test` - Run all tests
- `npm run docker:up` - Start Docker containers
- `npm run docker:down` - Stop Docker containers

### Frontend

- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests

### Backend

- `npm run dev` - Start development server (nodemon)
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed database with sample data

## Default Credentials

After seeding the database, you can log in with:

**Admin User:**
- Username: `admin`
- Password: `admin123`

**Manager User:**
- Username: `jsmith`
- Password: `password123`

**Team Member:**
- Username: `bwilson`
- Password: `password123`

## API Documentation

API endpoints are documented in [SETUP_GUIDE.md](./SETUP_GUIDE.md#api-documentation)

Key endpoints:
- `POST /api/v1/auth/login` - User authentication
- `GET /api/v1/auth/profile` - Get user profile
- `GET /api/v1/projects` - List all projects
- `GET /api/v1/projects/stats` - Get project statistics
- `POST /api/v1/projects` - Create new project

## Environment Variables

### Backend Environment Variables

```env
# Server
NODE_ENV=development
PORT=5000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ppm_db
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:3000

# Logging
LOG_LEVEL=info
```

### Frontend Environment Variables

```env
# API
VITE_API_URL=http://localhost:5000/api/v1

# App
VITE_APP_NAME=PPM Application
VITE_APP_VERSION=1.0.0
```

## Testing

### Run All Tests
```bash
npm test
```

### Run Backend Tests
```bash
cd backend
npm test
```

### Run Frontend Tests
```bash
cd frontend
npm test
```

## Deployment

### Production Build

```bash
# Build frontend
cd frontend
npm run build

# The build output will be in frontend/dist/
```

### Docker Production Deployment

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Start production containers
docker-compose -f docker-compose.prod.yml up -d
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@ppm.com or open an issue in the repository.

## Acknowledgments

- IBM Carbon Design System
- React Community
- Node.js Community
- All contributors

---

**Built with ❤️ using IBM Carbon Design System**
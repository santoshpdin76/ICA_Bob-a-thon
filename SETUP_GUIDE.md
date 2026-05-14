# PPM Application - Setup Guide

## Overview

This is a full-stack Project Portfolio Management (PPM) application built with:
- **Frontend**: React 18 + IBM Carbon Design System + Redux Toolkit
- **Backend**: Node.js + Express + PostgreSQL + Sequelize ORM
- **Authentication**: JWT-based authentication

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v9 or higher)
- PostgreSQL (v14 or higher)
- Git

## Project Structure

```
ppm-app/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── store/         # Redux store and slices
│   │   └── App.jsx        # Main app component
│   └── package.json
├── backend/           # Node.js backend API
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # Sequelize models
│   │   ├── routes/        # API routes
│   │   ├── utils/         # Utility functions
│   │   └── server.js      # Express server
│   └── package.json
└── package.json       # Root workspace config
```

## Installation Steps

### 1. Clone the Repository

```bash
cd ppm-app
```

### 2. Install Dependencies

Install all dependencies for both frontend and backend:

```bash
npm install
```

This will install dependencies for the root workspace, frontend, and backend.

### 3. Set Up PostgreSQL Database

Create a PostgreSQL database for the application:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE ppm_db;

# Create user (optional)
CREATE USER ppm_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE ppm_db TO ppm_user;

# Exit psql
\q
```

### 4. Configure Environment Variables

#### Backend Configuration

Create a `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

Edit the `.env` file with your database credentials:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
API_PREFIX=/api/v1

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ppm_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_DIALECT=postgres

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
JWT_REFRESH_EXPIRES_IN=30d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=debug
```

#### Frontend Configuration

Create a `.env` file in the `frontend` directory:

```bash
cd ../frontend
cp .env.example .env
```

Edit the `.env` file:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

### 5. Seed the Database

Populate the database with initial data (roles, users, sample projects):

```bash
cd backend
npm run seed
```

This will create:
- 3 roles (admin, manager, member)
- 4 users with different roles
- 5 sample projects

**Test Credentials:**
- Admin: `admin` / `admin123`
- Manager: `jsmith` / `password123`
- Member: `bwilson` / `password123`

## Running the Application

### Development Mode

You can run both frontend and backend simultaneously from the root directory:

```bash
# From root directory
npm run dev
```

Or run them separately:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api/v1
- **Health Check**: http://localhost:5000/health

### Production Mode

Build and run for production:

```bash
# Build frontend
cd frontend
npm run build

# Start backend
cd ../backend
npm start
```

## API Documentation

### Authentication Endpoints

#### POST /api/v1/auth/register
Register a new user.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "full_name": "John Doe",
  "role_id": "uuid-of-role"
}
```

#### POST /api/v1/auth/login
Login with username and password.

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "accessToken": "jwt-token",
    "refreshToken": "refresh-token"
  }
}
```

#### GET /api/v1/auth/profile
Get current user profile (requires authentication).

**Headers:**
```
Authorization: Bearer <access-token>
```

### Project Endpoints

#### GET /api/v1/projects
Get all projects (with optional filters).

**Query Parameters:**
- `status`: Filter by status (planning, active, on_hold, completed, cancelled)
- `priority`: Filter by priority (low, medium, high, critical)
- `manager_id`: Filter by manager
- `search`: Search by name or code

#### GET /api/v1/projects/stats
Get project statistics for dashboard.

#### GET /api/v1/projects/:id
Get project by ID.

#### POST /api/v1/projects
Create a new project.

**Request Body:**
```json
{
  "name": "New Project",
  "code": "NP-2024",
  "description": "Project description",
  "status": "planning",
  "priority": "high",
  "start_date": "2024-01-01",
  "end_date": "2024-12-31",
  "budget": 100000,
  "manager_id": "uuid-of-manager"
}
```

#### PUT /api/v1/projects/:id
Update a project.

#### DELETE /api/v1/projects/:id
Delete a project.

## Frontend Features

### Implemented Pages

1. **Login Page** (`/login`)
   - Username/password authentication
   - IBM Carbon form components
   - Error handling and validation

2. **Dashboard** (`/dashboard`)
   - Project statistics cards
   - Recent projects overview
   - Task summary
   - Project timeline placeholder

3. **Projects List** (`/projects`)
   - Data table with sorting and filtering
   - Search functionality
   - Pagination
   - CRUD operations (view, edit, delete)

### IBM Carbon Design System

The application uses IBM Carbon Design System components:
- Forms (TextInput, Button, Checkbox)
- Data tables (DataTable, TableToolbar)
- Navigation (Header, SideNav)
- Layout (Grid, Column, Tile)
- Feedback (Tag, Notification)
- Icons (@carbon/icons-react)

### State Management

Redux Toolkit is used for state management with the following slices:
- `authSlice`: User authentication state
- `projectSlice`: Project data and operations
- `taskSlice`: Task management (placeholder)
- `resourceSlice`: Resource allocation (placeholder)
- `notificationSlice`: App notifications

## Database Schema

### Tables

1. **roles**
   - id (UUID, PK)
   - name (string)
   - description (text)
   - permissions (JSONB)

2. **users**
   - id (UUID, PK)
   - username (string, unique)
   - email (string, unique)
   - password (string, hashed)
   - full_name (string)
   - role_id (UUID, FK → roles)
   - phone (string)
   - department (string)
   - is_active (boolean)
   - last_login (timestamp)

3. **projects**
   - id (UUID, PK)
   - name (string)
   - code (string, unique)
   - description (text)
   - status (enum)
   - priority (enum)
   - start_date (date)
   - end_date (date)
   - budget (decimal)
   - actual_cost (decimal)
   - manager_id (UUID, FK → users)
   - progress (integer, 0-100)
   - health_status (enum)
   - objectives (text)
   - deliverables (JSONB)

## Troubleshooting

### Database Connection Issues

If you encounter database connection errors:

1. Verify PostgreSQL is running:
   ```bash
   # macOS
   brew services list
   
   # Linux
   sudo systemctl status postgresql
   ```

2. Check database credentials in `backend/.env`

3. Ensure the database exists:
   ```bash
   psql -U postgres -l
   ```

### Port Already in Use

If port 5000 or 5173 is already in use:

1. Change the port in `backend/.env` (PORT variable)
2. Change the port in `frontend/vite.config.js` (server.port)
3. Update CORS_ORIGIN in `backend/.env`
4. Update VITE_API_URL in `frontend/.env`

### Module Not Found Errors

If you encounter module not found errors:

```bash
# Clean install
rm -rf node_modules frontend/node_modules backend/node_modules
rm package-lock.json frontend/package-lock.json backend/package-lock.json
npm install
```

## Next Steps

### Planned Features

1. **Task Management**
   - Task CRUD operations
   - Kanban board view
   - Task assignment and tracking

2. **Resource Management**
   - Resource allocation
   - Capacity planning
   - Utilization reports

3. **Risk Management**
   - Risk identification and tracking
   - Risk mitigation strategies
   - Risk matrix visualization

4. **Reports and Analytics**
   - Gantt charts
   - Budget analysis
   - Performance metrics
   - Custom reports

5. **Docker Support**
   - Dockerfile for frontend
   - Dockerfile for backend
   - Docker Compose configuration

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Check application logs in the terminal

## License

MIT License
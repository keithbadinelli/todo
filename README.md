# Todo List App

## Project Structure

- `frontend/`: Next.js application
- `backend/`: Express.js API

## Prerequisites

- Node.js (v14 or higher)
- MySQL server running locally
- npm

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up MySQL database and user:
   ```sql
   -- Connect to MySQL as an admin user
   mysql -u your_admin_user -p

   -- Create the database
   CREATE DATABASE todo_db;

   -- Create a dedicated user
   CREATE USER 'todo_user'@'localhost' IDENTIFIED BY 'todo_password';

   -- Grant privileges to the user
   GRANT ALL PRIVILEGES ON todo_db.* TO 'todo_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

4. Configure environment variables in `.env`:
   ```
   DATABASE_URL="mysql://todo_user:todo_password@localhost:3306/todo_db"
   HOST="localhost"
   PORT=3001
   FRONTEND_URL="http://localhost:3000"
   ```

5. Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

The backend server will run on http://localhost:3001 by default

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend application will run on http://localhost:3000

## Environment Variables

### Backend
- `HOST`: The hostname to bind the server to (default: "localhost")
- `PORT`: The port number for the server (default: 3001)
- `FRONTEND_URL`: The URL of the frontend application for CORS
- `DATABASE_URL`: MySQL connection string with format: `mysql://user:password@host:port/database`

### Frontend
- `NEXT_PUBLIC_API_URL`: The URL of the backend API

## API Endpoints

- `GET /tasks`: Get all tasks
- `GET /tasks/:id`: Get a specific task
- `POST /tasks`: Create a new task
- `PUT /tasks/:id`: Update a task
- `DELETE /tasks/:id`: Delete a task 
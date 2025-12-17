# Guardz Diary Assignment

A full-stack diary application built as part of the Guardz assignment.

## Project Overview

This project consists of:
- **Backend**: NestJS API with SQLite database.
- **Frontend**: React application with modern hooks and context state management.

## Prerequisites

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- **OR** Node.js v22+ and npm (to run locally)

## Running with Docker (Recommended)

To start the entire stack using Docker Compose:

1. **Clone the repository** (if you haven't already).
2. **Environment Setup**:
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   VITE_API_URL=http://localhost:3000
   FRONTEND_URL=http://localhost:5173
   ```
3. **Run Compose**:
   ```bash
   docker-compose up --build
   ```

The applications will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`
- Swagger UI: `http://localhost:3000/api`

## Running Locally (Manual)

If you prefer to run without Docker:

### Backend
1. `cd backend`
2. `npm install`
3. `npm run start:dev`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## Key Technical Decisions

- **Clean Architecture**: Follows a strict separation of concerns to ensure maintainability.
- **Type Safety**: End-to-end TypeScript usage for catching errors at compile time.
- **Error Normalization**: Unified error handling across the stack for consistent user feedback.
- **Local Database**: Used SQLite to ensure the project works out-of-the-box without external dependencies.



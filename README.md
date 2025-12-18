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

- **Local Database**: Used SQLite to ensure the project works out-of-the-box without external dependencies.

> **Disclaimer – Environment Variables**  
> The `.env` file is intentionally included in this repository **only for the purpose of this home assignment**, to allow immediate setup and evaluation without additional configuration.  
> The values contain **no sensitive or production secrets**.  
> In a real-world or production environment, environment files would be excluded from version control and managed securely.

> **Disclaimer – Database Schema Synchronization**  
> The database configuration uses `synchronize: true` to automatically align the schema during development, simplifying setup and reducing boilerplate for this assignment.  
> T



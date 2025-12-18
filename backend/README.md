# Diary API (Backend)

A RESTful API for managing personal diary entries, built with NestJS and TypeORM.

## Features

- **RESTful Endpoints**: Full CRUD operations for diary entries.
- **Validation**: Strict input validation using `class-validator` and `class-transformer`.
- **Database**: SQLite for lightweight, local development (zero configuration required).
- **Swagger Documentation**: Interactive API documentation available at `/api`.
- **Testing**: E2E tests using Jest.
- **Clean Architecture**: Repository-Service-Controller pattern.

## Prerequisites

- Node.js (v22 or later recommended)
- npm

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file in the backend root directory with the following:
   ```env
   PORT=3000
   FRONTEND_URL=http://localhost:5173
   DB_PATH=diary.db
   ```

3. **Run the application**:
   ```bash
   # Development mode
   npm run start:dev
   ```

## Testing

```bash
# E2E tests
npm run test:e2e
```

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **ORM**: [TypeORM](https://typeorm.io/)
- **Database**: [SQLite](https://www.sqlite.org/)
- **Documentation**: [Swagger/OpenAPI](https://swagger.io/)

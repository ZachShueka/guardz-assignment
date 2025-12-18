# Diary Frontend

A modern, responsive web application for writing and managing personal diary entries.

## Features

- **State Management**: React Context API for predictable state flow.
- **Forms**: Robust form handling with `react-hook-form` and `zod` validation.
- **API Layer**: Centralized Axios instance with automatic error normalization.
- **UX**: Pagination, loading states, empty states, and dismissible error banners.
- **Accessibility**: Semantic HTML and keyboard navigation support.

## Prerequisites

- Node.js (v22 or later recommended)
- npm

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   The frontend expects a `.env` file in the project root with the following:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

3. **Run the application**:
   ```bash
   npm run dev
   ```

## Folder Structure

- `src/api`: Axios configuration and domain-specific API calls.
- `src/components`: Reusable UI components.
- `src/contexts`: React Context providers for global state.
- `src/hooks`: Custom React hooks for business logic.
- `src/shared`: Shared types, constants, and utilities.

## Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Validation**: [Zod](https://zod.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)

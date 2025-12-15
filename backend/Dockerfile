# Use a lightweight Node.js image (Alpine Linux)
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package definition files first (Optimizes Docker layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port NestJS runs on
EXPOSE 3000

# Default command (will be overridden by docker-compose for dev mode)
CMD ["npm", "run", "start:dev"]
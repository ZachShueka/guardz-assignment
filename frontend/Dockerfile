FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

# Expose Vite's default port
EXPOSE 5173

# Required for Vite to work inside Docker
# (Host 0.0.0.0 is needed to accept connections from outside the container)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
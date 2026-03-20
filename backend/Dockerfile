# backend/Dockerfile

FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application source
COPY . .

# Set environment variable
ENV NODE_ENV=production

# Expose backend port
EXPOSE 5000

# Start server using node directly for production
CMD ["node", "index.js"]

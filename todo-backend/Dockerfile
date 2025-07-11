# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy source code
COPY . .

# Expose port for Express server
EXPOSE 3002

# Start the backend server (you can switch to production mode if needed)
CMD ["npm", "run", "dev"]

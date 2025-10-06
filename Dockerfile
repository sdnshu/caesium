# Use the official Bun image as the base image
FROM oven/bun:latest AS build

# Set the working directory for the app
WORKDIR /app

# Install dependencies
# Copy the package.json and bun.lockb (if they exist) to utilize caching
COPY package.json bun.lockb* ./

# Install project dependencies
RUN bun install 

# Copy the rest of the app code into the container
COPY . .

# Expose the app port (default for Hono is 3000)
EXPOSE 4444

# Set environment variables for development
ENV NODE_ENV=development

# Command to start the app in development mode
CMD ["bun", "run", "dev"]
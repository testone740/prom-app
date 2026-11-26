# Use an official, lightweight Node.js LTS image
FROM node:24-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files first to leverage Docker layer caching
COPY package*.json ./

# Install only production dependencies cleanly
RUN npm ci --omit=dev

# Copy the rest of the application source code
COPY . .

# Set environment to production
ENV NODE_ENV=production

# Use the built-in non-root 'node' user for security
USER node

# Expose the port the app runs on
EXPOSE 3000

# Start the application directly with Node (avoids npm signal-handling issues)
CMD ["node", "server.js"]


########## Docker Commands ##########

### Build/Remove Docker image
# docker build -t node-exp-app .
# docker build -t node-exp-app:1.0.0 .
# docker rmi node-exp-app:latest

### Run/Stop/Remove Docker container
# docker run -d -p 3000:3000 --name my-app node-exp-app:latest
# docker logs my-app
# docker stop my-app
# docker rm my-app

# docker stop my-app && docker rm my-app && docker build -t node-exp-app .

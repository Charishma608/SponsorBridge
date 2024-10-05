# Use a lightweight Node.js image as the base image
FROM node:14-alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy the files to the container
COPY . .

# Install dependencies
RUN npm install

# Start the application
CMD [ "npm", "start" ]
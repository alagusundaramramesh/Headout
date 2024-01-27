# Use the official Node.js 14 image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files to the working directory
COPY . .

# Create the directory for sample data files
RUN mkdir -p /tmp/data

# Copy sample data files into the container
COPY /tmp/data /tmp/data

# Expose port 8080
EXPOSE 8080

# Command to run the server
CMD ["node", "server.js"]

# Use an official Node.js 22 image as the base
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy the application files to the container
COPY package.json package-lock.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Add the entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/

# Ensure the script is executable (compatible with Linux-based containers)
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Expose the port on which the server runs
EXPOSE 3001

# Use the script as the entrypoint
ENTRYPOINT ["docker-entrypoint.sh"]

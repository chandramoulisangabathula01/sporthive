FROM node:20-alpine

# Setting the working directory
WORKDIR /app

# Copying package.json and package-lock.json
COPY package*.json ./

# Installing the dependencies
RUN npm install

# Copying the rest of sporthive app code
COPY . .

# Expose the port sporthive application runs on
EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev"]

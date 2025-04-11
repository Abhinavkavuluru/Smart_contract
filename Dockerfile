# Dockerfile

FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy everything into the container
COPY . .

# Install dependencies
RUN npm install

# Expose Hardhat node port
EXPOSE 8545

# Start Hardhat node by default
CMD ["npx", "hardhat", "node"]
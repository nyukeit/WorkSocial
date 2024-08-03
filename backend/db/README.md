# How to Deploy the Database Docker Container

## Minimum Requirements
Docker Desktop (Mac/Win)
Docker Desktop/Engine (Linux)
Docker Compose plugin

## Instructions
1. Navigate to `backend/db/`
2. Initiate the Docker container with the command
   ```bash
   docker-compose up -d
   ```
3. The MySQL instance is available at `0.0.0.0:3308`. The port has purposefully been changed to avoid conflicts with any existing MySQL servers and DBs.

> Note: This build uses the official MySQL image from Docker Hub. If this image is not present on your system, Docker will automatically download it.
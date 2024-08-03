# How to Deploy the Database Docker Container

## Minimum Requirements
Docker Desktop (Mac/Win)
Docker Desktop/Engine (Linux)
Docker Compose plugin
Environment File in the Backend Folder (.env)

## Instructions
1. Make a new `.env` file using the `.env.sample` in the `backend` folder.
2. Use `DB_HOST=localhost`, `DB_PORT=3308`
3. Navigate to `db/` and create two files `db_root_password.txt` and `db_password.txt`. These files won't be synced to the repo.
4. Initiate the Docker container with the command
   ```bash
   docker-compose up -d
   ```
5. The MySQL instance is available at `127.0.0.1:3308` or `localhost:3308`. The port has purposefully been changed to avoid conflicts with any existing MySQL servers and DBs.

> Note: This build uses the official MySQL image from Docker Hub. If this image is not present on your system, Docker will automatically download it.
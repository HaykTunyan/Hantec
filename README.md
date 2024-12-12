# README

## Project Description

This project is a Node.js application that runs in a Docker container using `docker-compose`.

### File Structure:
- `Dockerfile` — instructions for building the Docker image.
- `docker-compose.yml` — service definitions and parameters for running the container.
- `.env` — environment variable file for project configuration.
- `.env.values` — all available values for env.

---

## Steps to Run the Project

### 1. Create a `.env` File

Create a `.env` file in the root of the project (if it does not already exist) and add the environment variables. Example content:
```env
APP_PORT=6978
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_WEBSITE_URL=
REACT_APP_COMPANY_ID=
PLATFORM_CAMPAIGN_ID=
REACT_APP_RINEX_PORTAL_BACKEND_URL=
NEXT_PUBLIC_FB_LIFETIME_PAGE_ACCESS_TOKEN=
NEXT_PUBLIC_FB_PAGE_ID=
```

### Environment Variable Descriptions:
- `NEXT_PUBLIC_API_URL` — Base URL for the API.
- `NEXT_PUBLIC_WEBSITE_URL` — URL used in recovery emails.
- `REACT_APP_COMPANY_ID` — Company identifier for the API.
- `PLATFORM_CAMPAIGN_ID` — Campaign identifier for the API.
- `REACT_APP_RINEX_PORTAL_BACKEND_URL` — Backend URL (not used).
- `NEXT_PUBLIC_FB_LIFETIME_PAGE_ACCESS_TOKEN` — Token for Facebook Feed.
- `NEXT_PUBLIC_FB_PAGE_ID` — Facebook Feed page ID.

---

### 2. Ensure Docker is Installed

Check that Docker and Docker Compose are installed on your machine:

- To check Docker version:
  ```bash
  docker --version
  ```
- To check Docker Compose version:
  ```bash
  docker-compose --version
  ```

If they are not installed, download and install them from the official Docker website: [https://www.docker.com/](https://www.docker.com/).

---

### 3. Start the Container

Run the application using `docker-compose`:
```bash
docker-compose -f docker-compose up -d --build
```

This command:
- Builds the Docker image based on the `Dockerfile`.
- Applies the environment variables from `.env`.
- Starts the application on the port specified in the `APP_PORT` variable.

---

### 4. Access the Application

Once started, the application will be accessible at:

```
http://localhost:6978
```

If you changed the `APP_PORT` variable in `.env`, replace `6978` with the port you specified.

---

## Useful Commands

- **Stop Containers:**
  ```bash
  docker-compose down
  ```
  Stops and removes running containers.

- **Start Containers Without Rebuilding:**
  ```bash
  docker-compose up
  ```

- **View Logs:**
  ```bash
  docker-compose logs -f
  ```

- **Check Running Containers:**
  ```bash
  docker ps
  ```

---

## Notes

1. Ensure that the port specified in `APP_PORT` is not occupied by other applications on your machine.
2. If the application fails to start, verify the correctness of the environment variables in `.env` and ensure there are no spaces before the values.
3. To update dependencies, make changes in `package.json` and rebuild the container using `docker-compose up --build`.

---

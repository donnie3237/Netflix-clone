
Netflix clone with NextJS and NestJS
# 🚀 Project Deployment Guide

This guide will help you deploy the full-stack application using `docker-compose`.

## 📦 Services Overview

The `docker-compose.yml` file includes the following services:

- **Redis**: In-memory data store.
- **Frontend**: React or Next.js-based frontend app.
- **Backend**: Node.js/NestJS API server.
- **Nginx**: Reverse proxy server to route requests to frontend and backend.

---

## 🛠️ Prerequisites

Make sure you have the following installed:

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## 📁 Project Structure

```
project-root/
├── docker-compose.yml
├── nginx.conf
├── Front-end/
│   └── Dockerfile
└── Back-end/
    └── Dockerfile
```

---

## ⚙️ Step-by-Step Deployment

1. **Clone the Repository**

```bash
git clone https://github.com/donnie3237/Netflix-clone.git
cd project-root
```

2. **Set Environment Variables**

set your environment on your server:

```
TMDB_TOKEN=your_tmdb_api_token_here
```

3. **Build and Run Containers**

```bash
docker-compose up -d --build
```

This will:

- Build `frontend` and `backend` images from their respective Dockerfiles.
- Start all services in detached mode.

4. **Access the Application with nginx config**

- 🌐 Frontend: http://subdomain.example.com
- 🧠 Backend: http://subdomain.example.com (as configured in `nginx.conf`)
- 📊 Redis: Accessible on port `6379` (typically for internal use only)

---

## 🔄 Common Commands

- **Stop services**:  
  ```bash
  docker-compose down
  ```

- **View logs**:  
  ```bash
  docker-compose logs -f
  ```

- **Rebuild and restart**:  
  ```bash
  docker-compose up -d --build
  ```

---

## 📝 Notes

- `redis` is available internally and can be accessed by the backend using `redis://redis:6379`.

---

## 📬 Questions or Issues?

Feel free to open an issue or contact the maintainer.

## CICD

set `SSH_PRIVATE_KEY` on your github account and click on run button

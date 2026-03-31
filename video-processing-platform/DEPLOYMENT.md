# Project Deployment & Architecture

## Overview
This project uses Docker, Kubernetes, and Helm for deployment and orchestration. This guide covers local, development, and production setup.

## Architecture Diagram

```
flowchart TD
    FE[Frontend (Next.js)] -->|API Calls| BE[Backend (Python)]
    BE -->|DB Connection| MDB[(MongoDB)]
    BE -->|Media| S3[(S3/Cloud Storage)]
    FE & BE -->|Containerized| K8S[(Kubernetes Cluster)]
    K8S -->|Managed by| Helm[Helm Charts]
```

## Local Development

### Prerequisites
- Docker & Docker Compose
- Node.js & npm (for frontend)
- Python & pip (for backend)

### Steps
1. Clone the repository.
2. Start backend:
   - `cd video-processing-platform/backend`
   - `pip install -r requirements.txt`
   - `python main.py` or use Docker.
3. Start frontend:
   - `cd video-processing-platform/frontend`
   - `npm install`
   - `npm run dev`
4. For MongoDB, use Docker Compose or your own instance.

## Docker Compose
- Use `docker-compose.yml` in the project root to start all services:
  ```sh
  docker-compose up --build
  ```

## Kubernetes & Helm
- K8s manifests: `k8s/`
- Helm charts: `charts/video-processing-platform/`
- Deploy with Helm:
  ```sh
  cd charts/video-processing-platform
  helm install vpp .
  ```
- Edit `values.yaml` for environment-specific settings.

## Environments
- **Local**: Use Docker Compose or run services directly.
- **Development/Production**: Use Kubernetes/Helm, configure secrets and persistent storage.

---
For more details, see the backend and frontend READMEs.

# Backend README

## Overview
This backend service powers the video processing platform, handling enrichment, uploads, and API endpoints.

## Features
- Video enrichment and processing
- API endpoints for frontend integration
- Batch processing scripts
- Integration with S3 for media storage

## Requirements
- Python (see .python-version for version)
- pip (Python package manager)
- Docker (optional, for containerized deployment)

## Setup
1. Clone the repository.
2. Navigate to `video-processing-platform/backend`.
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Configure environment variables as needed (see `.env.example` if available).

## Running Locally
```sh
python main.py
```

## Running with Docker
```sh
docker build -t video-backend .
docker run -p 8000:8000 video-backend
```

## Scripts
- See `scripts/` for batch and utility scripts.

## Testing
Add tests in `tests/` and run with your preferred test runner (e.g., pytest).

## Deployment
- See project root and `k8s/` for Kubernetes manifests.
- See `charts/` for Helm charts.

---
For more details, see the main project README and documentation.

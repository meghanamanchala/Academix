
# Video Processing Platform – Frontend

This is the frontend for the Video Processing Platform, built with [Next.js](https://nextjs.org).


## Getting Started

### Prerequisites
- Node.js (see `package.json` for version)
- npm, yarn, pnpm, or bun

### Local Development
1. Install dependencies:
	```sh
	npm install
	# or yarn install, pnpm install, bun install
	```
2. Start the development server:
	```sh
	npm run dev
	# or yarn dev, pnpm dev, bun dev
	```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Editing
Edit pages in `app/` (e.g., `app/page.tsx`). The app auto-updates as you edit files.

### Environment Variables
Create a `.env.local` file for environment-specific variables (see `.env.example` if available).

### Docker
To run the frontend in Docker:
```sh
docker build -t video-frontend .
docker run -p 3000:3000 video-frontend
```

---
For backend/API setup, see `../backend/README.md`.
For deployment and architecture, see `../DEPLOYMENT.md`.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub](https://github.com/vercel/next.js)

---
For deployment, Kubernetes, and Helm instructions, see the main `DEPLOYMENT.md` in the project root.

## Flow

A minimalist task management app focused on simplicity, great UX, and accessibility.

---

### Features

- *Task Management* — Create, update, and delete tasks
- *Status Tracking* — Filter tasks by status
- *Bulk Actions* — Select and manage multiple tasks at once
- *User Authentication* — Fake signup and login flow
- *Accessible by Design* — Built with a11y best practices throughout
- *Responsive UI* — Built mobile first

---

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [React Router v7](https://reactrouter.com/) (framework mode) |
| Language | TypeScript |
| UI Components | [Radix UI](https://www.radix-ui.com/) |
| Styling | [Vanilla Extract](https://vanilla-extract.style/) |
| Bundler | [Vite](https://vitejs.dev/) |
| Testing | [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) |

---

### Architecture

See [architecture.md](task/ARCHITECTURE.md) for details.

### Getting Started

#### Prerequisites

- Node.js 18+
- npm

#### Installation

```bash
npm install
```

#### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

#### Testing

```bash
## Run tests once
npm run test

## Run tests in watch mode
npm run test:watch
```

#### Linting

```bash
npm run lint
```

---

### Project Structure

```
app/
├── api/            # API layer and storage
├── auth/           # Authentication logic
├── components/
│   ├── product/    # Feature components (tasks, session)
│   └── ui/         # Reusable UI components
├── pages/          # Page components
├── routes/         # Route definitions
├── types/          # TypeScript types
└── utils/          # Shared utilities
```

---

### Production

#### Build

```bash
npm run build
```

#### Docker

Build and run the containerized app:

```bash
## Build the image
docker build -t flow .

## Run the container
docker run -p 3000:3000 flow
```

#### Deployment Platforms

The Docker image can be deployed to any container platform:

- Railway
- Fly.io
- Google Cloud Run
- AWS ECS
- Azure Container Apps
- Digital Ocean App Platform

---

### Credits

- [Double check icon](https://icons8.com/icon/aNdZ8pAqBvn5/double-check) by [Icons8](https://icons8.com)

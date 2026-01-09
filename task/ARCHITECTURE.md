## Flow Architecture

This document explains how data flows through the Flow application and the different layers used.

### Overview Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              Browser                                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                       Routes (metadata, SEO)                     │   │
│  │                                ↓                                 │   │
│  │                       Pages (layout, context)                    │   │
│  │                                ↓                                 │   │
│  │  ┌────────────────────────────────────────────────────────────┐  │   │
│  │  │                    React Contexts                          │  │   │
│  │  │  ┌─────────────┐  ┌────────────┐  ┌────────────────────┐   │  │   │
│  │  │  │ AuthContext │  │TasksContext│  │ NewTask / Selection│   │  │   │
│  │  │  └──────┬──────┘  └─────┬──────┘  └─────────┬──────────┘   │  │   │
│  │  └─────────┼───────────────┼───────────────────┼──────────────┘  │   │
│  │            │               │                   │                 │   │
│  │  ┌─────────┴───────────────┴───────────────────┴──────────────┐  │   │
│  │  │                    Product Components                      │  │   │
│  │  │     (tasks table, forms, dialogs, actions)                 │  │   │
│  │  └────────────────────────────────────────────────────────────┘  │   │
│  │                              ↓                                   │   │
│  │  ┌────────────────────────────────────────────────────────────┐  │   │
│  │  │                      UI Components                         │  │   │
│  │  │        (header, badge, input, modal, toast...)             │  │   │
│  │  └────────────────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                  │                                      │
│                                  ↓                                      │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                         API Layer                                │   │
│  │            (tasks.ts, users.ts, auth/session.ts)                 │   │
│  └───────────────────────────────┬──────────────────────────────────┘   │
│                                  ↓                                      │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                       Storage Layer                              │   │
│  │     ┌─────────────────────┐  ┌──────────────────────────────┐    │   │
│  │     │   sessionStorage    │  │        localStorage          │    │   │
│  │     │  (session data)     │  │  (users, tasks per user)     │    │   │
│  │     └─────────────────────┘  └──────────────────────────────┘    │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Layers

#### Storage Layer

The app uses browser storage to persist data:

- **Session Storage** (`app/auth/storage/session.ts`): Stores the current user session. Data is cleared when the browser tab closes. Good for temporary auth state.

- **Local Storage** (`app/api/storage/`): Stores users and tasks. Data persists across browser sessions. Each user's tasks are stored under a unique key.

#### API Layer

The API layer sits between components and storage. It handles business logic and data operations:

- **Tasks API** (`app/api/tasks.ts`): Create, read, update, and delete tasks. Also handles importing tasks.

- **Users API** (`app/api/users.ts`): Fetch users by credentials and create new users.

- **Session API** (`app/auth/session.ts`): Login, logout, and session retrieval. Coordinates between the users API and session storage.

#### React Contexts

Contexts share state across multiple components without prop drilling:

- **AuthContext** (`app/components/product/session/auth-context.tsx`): Manages authentication state. Provides `login`, `signup`, `logout`, and current session info.

- **TasksContext** (`app/components/product/tasks/tasks-context.tsx`): Manages the list of tasks, loading states, and task operations (add, update, delete).

- **NewTaskContext** (`app/components/product/tasks/add-task-dialog/new-task-context.tsx`): Controls the "add task" dialog open/close state.

- **TaskSelectionContext**: Manages bulk selection state for the tasks table.

#### Component-level State

For state that belongs to a single component (like forms), we use:

- **Custom hooks**: Each form has its own state hook (e.g., `use-login-form-state.ts`, `use-add-task-form-state.ts`)
- **React's useState**: For simple local state

#### Pages

Located in `app/pages/`, page components focus on:

- Setting up the layout
- Wrapping content with required context providers
- Composing product components

Example: The Tasks page wraps everything in `TasksProvider`, `TaskSelectionProviderWrapper`, and `NewTaskProviderWrapper`.

#### Routes

Located in `app/routes/`, route components focus on:

- Defining page metadata (title, description) for SEO
- Rendering the appropriate page component

They are intentionally simple—just metadata and a component render.

#### React Router v7

The app uses React Router v7 with routes defined in `app/routes.ts`:

```ts
export default [
  index("routes/home.tsx"),
  route("/login", "routes/login.tsx"),
  route("/signup", "routes/signup.tsx"),
]
```

### Components

#### UI Components (`components/ui/`)

These are the building blocks—the project's component library:

- `badge/` - Status badges
- `callout/` - Error messages
- `content/` - Layout wrapper
- `header/` - App header with auth controls
- `input/` - Form inputs
- `logo/` - App logo
- `modal-page/` - Full-page modal layout
- `toast/` - Notifications

#### Product Components (`components/product/`)

Feature-specific components organized by domain:

- `session/` - Login form, signup form, auth context
- `tasks/` - Tasks table, add task dialog, task actions

#### Radix UI

The app uses [Radix UI](https://www.radix-ui.com/) as the underlying component library. Radix provides:

- Accessible components out of the box
- Full keyboard navigation
- Screen reader support

### Styling

#### Theme with Vanilla Extract

The theme is defined in `app/global-styles/theme.css.ts` using vanilla-extract. This gives us:

- Type-safe CSS variables
- Theme tokens for colors
- No runtime CSS-in-JS overhead

#### Responsive Design

The app uses **container queries** for responsiveness (`app/global-styles/responsive.css.ts`):

```ts
const containerQueries = {
  minSmall: "(min-width: 520px)",
  minLarge: "(min-width: 1024px)",
};
```

Container queries let components respond to their container's size rather than the viewport. This makes components more reusable.

#### Mobile First

Styles are written mobile-first. Base styles target mobile, then container queries add styles for larger containers.

### Server-Side Rendering

The app is server-rendered (configured in `react-router.config.ts`):

```ts
export default {
  ssr: true,
}
```

This provides:

- **Better SEO**: Search engines see fully rendered HTML
- **Faster initial load**: Users see content before JavaScript loads
- **Better performance on slow devices**: Less client-side work needed

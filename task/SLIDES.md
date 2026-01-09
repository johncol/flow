# Flow: Building a Task Management App

Content for an 8-slide presentation on the development approach.

---

## Slide 1: Plan Before You Build

**Clarify goals and constraints upfront**

Before writing any code, documented everything in `/task`:

| What | Why |
|------|-----|
| **Functional requirements** | Sign in/up, tasks CRUD, filtering by status |
| **Non-functional requirements** | Responsive, SEO, WCAG AA, semi-persistent state |
| **Tech constraints** | React, TypeScript, React Router, Vanilla Extract |
| **Implementation thoughts** | Sketched out auth flow, dashboard UX, keyboard navigation |

Also researched key topics:
- **SEO best practices** → Decided on SSR with React Router v7
- **WCAG AA requirements** → Chose Radix UI for built-in accessibility

```
Commits:
• Initial commit with README
• Add requirements and notes as .md files
```

**Why this matters:** Clear requirements prevent scope creep and wrong turns.

---

## Slide 2: Foundation First

**Choosing the right tools before writing features**

Started by setting up a solid foundation:

- **React Router v7** — Server-side rendering out of the box for SEO and fast initial loads
- **Radix UI** — Accessible components (keyboard navigation, screen readers) without reinventing the wheel
- **Vanilla Extract** — Type-safe CSS with no runtime cost

```
Commits:
• Init react-router v7 framework mode app
• Add @radix-ui/themes for accessible react components  
• Add @vanilla-extract/css for CSS in JS
• Create theme and set base global styles
```

**Why this matters:** Good foundations let you move fast later without accumulating tech debt.

---

## Slide 3: Build Visually, Then Wire Up

**UI before logic — see it before you code it**

Built the interface with mock data first:

1. Created reusable UI components (header, badge, content wrapper)
2. Built the tasks table with hardcoded tasks
3. Added the toolbar with non-functional buttons
4. Then wired up real functionality

```
Commits:
• Create header component
• Create badge and status badge components
• Create initial version of the tasks table using mock tasks
• Build toolbar with status filter, delete and add task buttons (non functional yet)
• Implement filtering tasks by status
• Implement deleting tasks functionality
```

**Why this matters:** You catch design issues early when changes are cheap.

---

## Slide 4: Layered Architecture

**Separation of concerns for maintainability**

```
┌─────────────────────────────────────────┐
│     Components (UI + Product)           │
└───────────────────┬─────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│          React Contexts                 │
│   (AuthContext, TasksContext, etc.)     │
└───────────────────┬─────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│             API Layer                   │
│   (tasks.ts, users.ts, session.ts)      │
└───────────────────┬─────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│           Storage Layer                 │
│  (sessionStorage, localStorage)         │
└─────────────────────────────────────────┘
```

Each layer has one job. Components don't know about storage. API doesn't know about React.

---

## Slide 5: Async States & User Feedback

**Every action needs visual feedback**

After building core features, added loading states everywhere:

- Skeleton while tasks load
- Spinners when saving status, adding tasks, deleting
- Toast notifications for success and errors
- Empty states when there's no data

```
Commits:
• Create api layer for tasks, handle and notify errors
• Show table skeleton while tasks load
• Show spinner while saving status
• Show spinner while saving the new task
• Add empty state to render when there are no tasks
```

**Why this matters:** Users need to know what's happening. Silence feels broken.

---

## Slide 6: Mobile-First & Accessible

**Design for constraints, then expand**

Built responsively using container queries (not media queries):

- Base styles for mobile
- Progressive enhancement for larger containers
- Components adapt to their space, not viewport

Accessibility was built-in from the start:

- Radix UI handles keyboard navigation and screen readers
- Explicit ARIA labels where needed
- Semantic HTML throughout

```
Commits:
• Use container queries to hide Delete label on small spaces
• Only show due date column on medium size containers
• Set aria labels in toast and error components
```

---

## Slide 7: Unit Testing

**Test behavior, not implementation**

Set up Vitest + React Testing Library with reusable utilities:

```
app/utils/testing/
├── render-with-providers.tsx  ← Wraps components with Theme, Router, Auth
├── session.ts                 ← Creates mock sessions
└── storage.ts                 ← Mocks localStorage/sessionStorage
```

Testing principles followed:

| Do | Don't |
|----|-------|
| Test user-visible behavior | Test CSS classes or structure |
| Use accessibility queries (`getByRole`, `getByText`) | Use `getByTestId` as first choice |
| Mock external dependencies (navigation, storage) | Mock internal utilities the component relies on |
| Test conditional rendering | Test third-party library internals |

```
Commits:
• Set up vitest + react-testing-library and add sample test
• Add unit tests for key components in components/ui
• Add unit tests for api and session layers
• Add unit tests for product components
```

**Why this matters:** Tests catch regressions and document expected behavior.

---

## Slide 8: Key Takeaways

**What made this approach work**

| Principle | How it was applied |
|-----------|-------------------|
| **Plan first** | Documented requirements, researched SEO & a11y before coding |
| **Foundation first** | Set up SSR, accessibility, and styling before features |
| **Visual then logic** | Mock data → UI → wire up functionality |
| **Separation of layers** | Components → Contexts → API → Storage |
| **Feedback everywhere** | Loading states, spinners, toasts, empty states |
| **Mobile-first & accessible** | Container queries + Radix UI + semantic HTML |
| **Test behavior** | Vitest + RTL, reusable test utilities, accessibility-first queries |

The result: a maintainable, accessible, testable, and responsive app.

---

*Generated from git history and architecture analysis*

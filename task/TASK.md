# Task

#### Instructions
- Build a simple React task management application that allows users to:
- Add tasks with titles and due dates
- View tasks in a list with the ability to filter by status (e.g., All, Pending, Completed)
- Mark tasks as completed or delete them
- Use TypeScript throughout the application
- Ensure the application is responsive and works well on both desktop and mobile screens
- Write unit tests for the components using Jest and React Testing Library

#### Guidelines

- Simulate an API call on each addition and removal (implement promise/resolve and consider potential rate-limiting scenarios)
- Build UI components using Vanilla Extract or an alternative CSS-in-JS library
- Use a provider for state management, incorporating semi-persistent state principles without relying on a full-fledged store
- Add a locally persisted log in form (no need for Google) using session storage for authentication data and local storage for maintaining a semi-persistent list
- Use pages for the log in form and user list 
- Package usage is mandatory, including React, TypeScript, and React Router (all other dependencies are up to your discretion)

#### Evaluation Criteria

- Proficiency in React – Demonstrates expertise in building applications using functional components and hooks
- TypeScript Best Practices – Ensures type safety and adheres to best practices when using TypeScript
- Handling Dynamic Content – Effectively works with forms, lists, and other dynamic content
- State Management – Handling state management, possibly using context or libraries like Redux (if relevant)
- UI Development – Constructs a simple, intuitive, and user-friendly interface
- Test Writing – Writes tests to ensure the application works correctly
- SEO – Ensure app uses SEO best practices 
- Accessibility – Makes sure app is WCAG AA standards

## Notes

#### Tech Stack
- React
- React Router
- TypeScript
- Jest
- React Testing Library
- Vanilla Extract

#### Functional requirements

- Sign in + log in form
- Tasks dashboard which lists all tasks.
- Filter tasks by status (Pending, In Progress, Completed).
- Create new task (title, due date).
- Delete task.
- Mark task as completed.

#### Non-functional requirements

- Responsive design.
- SEO best practices.
- WCAG AA standards.
- UX: simple, intuitive, and user-friendly interface.
- Semi persistent state (session storage for authentication data and local storage for tasks data).
- Unit tests
- Simulate API calls
- React Context

#### Thoughts on login

Initial page is a sign in page that is not only the form, but also has some basic info about the app, it could be a description of how the app was built (architecture, tech stack, UX principles, etc.)
The form should include an option to sign up.

Sign up asks for an email and a password, once. Validate that email is valid, and that password meets certain requirements.
Sign in form validates the email is valid (using HTML attrs) and that password is required.
I can use localStorage as my DB. An API layer can provide access to the data in local storage. 

Components -> Hooks(useAuth, useUser(s), useTask(s)) -> API layer with fake delays (api/users, api/tasks) -> LocalStorage (users, tasks)

Auth forms can use useAuth to access functions like
- login(email, password)
- logout
- signin (email, password)
With standard errors that contain a message
- email and password do not match
- email already registered

On sign-up, login immediately and show a welcome banner in the main page (tasks dashboard)
Once logged in, provide the app with an AuthProvider that stores a user object (email). useUser exposes that user to clients

#### Thoughts on the dashboard

Dashboard with list of tasks is the main page
For each one show title, due date, status.
Other fields that could be visible are creation date.
Offer a simple way to:
- update status (notion)
- delete a task
If later feeling like it, offer bulk update and bulk delete

The page also offers a way to create a new task. It's a form with title and date picker for due date.
In desktop it can be a side panel (not a modal, I don't like modals much)
On mobile the same panel could be absolutely positioned on top of the dashboard to fill up all the space.
Given everything we need is a title and a due date, the task could be text input at the top of the table, date picker input next to it, and a button next to it.
It would require proper validation of fields in a user friendly manner

Use semantic HTML, of course. That will help with SEO and a11y. To increase a11y for keyboard users and efficiency for power users, make the app simple to use with the keyboard. e.g.

Toolbar a the top with options to filter by status, button to add new one.
Filtering can be done using keyboard.
Tabbing to the new button is easy and fast. If it opens a side panel, the focus is set on the text input immediately. On enter, validate is not empty, if not empty, don't submit, but focus data picker. Enter chooses the value and gives focus to submit button. Enter again submits for, closes panel, shows new task in the list, success toast is visible.

Tabbing more will take the user through each task status selector, then delete button. Tabbing on delete and enter can show a confirmation dialog with a checkbox to not ask again.
On delete complete, show toast.
Implement delete first without confirmation.
But toast is mandatory to provide feedback to the user.

For SEO, server side rendering with react router V7.

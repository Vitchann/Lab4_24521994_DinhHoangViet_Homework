
# Project 1 - Photo & Evidence Gallery
## Project Rules

### 1. Technology Stack
- React 19
- React Router v7
- Vite
- JavaScript ES2024
- Native CSS
- Vitest and React Testing Library

### 2. Architecture Rules
- Use functional components only.
- Use nested routes and shared layouts.
- Use useSearchParams for category and photo selection.
- Keep URL as the single source of truth.
- Separate UI components from business logic.

### 3. State Management
- Use immutable state updates.
- Calculate derived state during render.
- Avoid redundant useEffect synchronization.
- Clean up external effects and event listeners.

### 4. Accessibility
- Use semantic HTML.
- Use native HTML dialog for the lightbox.
- Support keyboard navigation.
- Ensure proper focus management.
- Target WCAG 2.2 AA compliance.

### 5. Performance
- Use responsive CSS Grid.
- Specify image dimensions to prevent layout shifts.
- Optimize image loading.
- Target Lighthouse Performance 100/100.

### 6. Development Workflow
1. Define the contract.
2. Write a failing test.
3. Implement the feature.
4. Refactor and verify.
5. Create an atomic Git commit.

### 7. Forbidden Patterns
- ReactDOM.render()
- Class-based React components.
- React Router v5 APIs.
- Direct state mutation.
- Array index keys for dynamic lists.
- Unnecessary useEffect chains.
- Unlabelled icon buttons.

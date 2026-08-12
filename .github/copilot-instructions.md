# GitHub Copilot Instructions for FES Course

## Code Style Guidelines

### General Principles

- Always use arrow functions for components and utilities
- Use React functional components with hooks (no class components)
- Prefer TypeScript for type safety
- Add concise comments for non-trivial logic only
- Keep functions small and focused (single responsibility)

### Styling

- Style with Tailwind CSS classes exclusively
- Avoid inline styles unless absolutely necessary
- Use consistent spacing and color schemes
- Ensure responsive design (mobile-first approach)

### React Patterns

- Use `useState` and `useEffect` hooks appropriately
- Implement proper TypeScript types for props and state
- Handle loading and error states explicitly
- Prefer composition over prop drilling

### Accessibility

- Include aria-labels for interactive elements
- Ensure keyboard navigation support
- Use semantic HTML elements
- Provide alt text for images

### Performance

- Memoize expensive calculations with `useMemo`
- Optimize re-renders with `useCallback` when needed
- Avoid inline function definitions in JSX when performance matters

### Testing

- Write clear, descriptive test names
- Test user behavior, not implementation details
- Include edge cases and error scenarios

## Project-Specific Notes

- This is an educational repository for learning GitHub Copilot
- Code should be clear and demonstrative, optimized for learning
- Include helpful comments that explain the "why" not just the "what"

# Copilot Instructions

- Use React functional components with arrow functions.  
- Write TypeScript types or interfaces for all component props.  
- Style with Tailwind CSS; avoid inline styles.  
- Keep components small, clean, and modular.  
- Add short, meaningful comments for logic that isn't obvious.  
- Prefer accessibility-first HTML (semantic elements and labeled inputs).
- Always include TypeScript types, even for simple components.
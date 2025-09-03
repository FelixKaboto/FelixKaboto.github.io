# CSS Architecture Documentation

## Overview
This CSS is organized using a component-based architecture following modern best practices. The structure separates concerns and makes maintenance easier.

## File Structure

```
css/
├── base/                    # Foundation styles
│   ├── _variables.css      # CSS custom properties (colors, spacing, etc.)
│   └── _reset.css          # Reset, base styles, and utilities
├── components/              # Reusable UI components
│   ├── _navigation.css     # Header, navigation, mobile menu
│   ├── _buttons.css        # Button styles and variants
│   ├── _forms.css          # Form elements and validation
│   ├── _cards.css          # Cards, project cards, tech items
│   └── _badges.css         # Badge components and variants
├── sections/                # Page-specific sections
│   └── _hero.css           # Hero section styles
├── animations/              # Animations and transitions
│   └── _transitions.css    # Keyframes, transitions, hover effects
├── responsive/              # Responsive design
│   └── _mobile.css         # Mobile and tablet styles
├── main.css                 # Main file that imports all components
└── README.md                # This documentation
```

## Import Order
The `main.css` file imports components in a specific order to ensure proper cascade:

1. **Base Layer** - Variables and reset styles (foundation)
2. **Components Layer** - Reusable UI elements
3. **Sections Layer** - Page-specific content
4. **Animations Layer** - Transitions and effects
5. **Responsive Layer** - Mobile and tablet styles

## Adding New Styles

### New Component
1. Create a new file in the appropriate directory (e.g., `components/_modals.css`)
2. Add the import to `main.css`
3. Follow the naming convention: `_filename.css`

### New Section
1. Create a new file in `sections/` (e.g., `sections/_about.css`)
2. Add the import to `main.css`
3. Use semantic class names (e.g., `.about-section`, `.about-title`)

### New Animation
1. Add to `animations/_transitions.css` or create a new file
2. Use consistent naming (e.g., `fadeIn`, `slideUp`)
3. Apply with utility classes (e.g., `.fade-in`, `.slide-up`)

## Naming Conventions

### CSS Classes
- Use kebab-case: `.hero-section`, `.project-card`
- Use BEM methodology for complex components: `.card__title`, `.card--featured`
- Prefix utility classes: `.text-center`, `.d-flex`

### Files
- Use underscores: `_navigation.css`, `_buttons.css`
- Group related styles in the same file
- Keep files focused and single-purpose

## CSS Variables
All design tokens are defined in `base/_variables.css`:

- **Colors**: Primary, secondary, semantic colors
- **Spacing**: Consistent spacing scale
- **Typography**: Font families and sizes
- **Shadows**: Material Design elevation
- **Transitions**: Animation timing

## Responsive Design
- Mobile-first approach
- Breakpoints: 768px (tablet), 480px (mobile)
- Use CSS Grid and Flexbox for layouts
- Maintain consistent spacing across breakpoints

## Performance Tips
- Use CSS custom properties for theming
- Minimize specificity conflicts
- Group related media queries
- Use `will-change` sparingly for animations

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox support required
- Backdrop-filter with fallbacks
- Progressive enhancement approach

## Maintenance
- Keep components focused and single-purpose
- Update variables in one place for consistent theming
- Test responsive behavior across devices
- Document complex animations and interactions

# UI Components

This directory contains reusable UI components based on [shadcn/ui](https://ui.shadcn.com/). These components follow accessibility best practices and are built on top of Radix UI primitives with Tailwind CSS for styling.

## Available Components

- `Button` - Accessible button component with multiple variants
- `Input` - Form input component with consistent styling
- `Card` - Container component with header, title, description, and content sections
- `Dialog` - Accessible modal/popup component
- `Skeleton` - Loading skeleton component

## Usage

You can import and use these components in your project like this:

```tsx
import { Button, Card, Input } from '@/src/components/ui';
```

## Customization

These components can be customized by modifying the CSS variables defined in `src/app/globals.css`. You can change colors, spacing, and other design tokens to match your design system.
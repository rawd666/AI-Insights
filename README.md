# Dashboard Project

A modern, production-ready React + TypeScript dashboard with modular architecture.

## Features

- **Modern Tech Stack**: React 18, TypeScript 5, Vite
- **Modular Architecture**: Separated components, styles, types, and utilities
- **Type-Safe**: Strict TypeScript with no 'any' types
- **Dark/Light Mode**: Theme toggle with CSS variables
- **Responsive Design**: Mobile-first, adaptive grid layout
- **Clean Styling**: All card styles in dedicated CSS file, less inline styles

## Project Structure

```
dashboard-project/
├── src/
│   ├── components/           # React components
│   │   ├── Card.tsx          # Dashboard card component
│   │   ├── PinnedItems.tsx   # Pinned card component
│   │   ├── Sidebar.tsx       # Sidebar navigation component
│   │   └── SkeletonCard.tsx  # Skeleton load component
│   ├── styles/               # CSS modules
│   │   ├── variables.css     # CSS variables and theme definitions
│   │   ├── Card.css          # Card component styles
│   │   ├── PinnedItems.tsx   # Pinned items list Styles
│   │   ├── SkeletonCard.tsx  # Skeleton card layout
│   │   ├── Sidebar.css       # Sidebar component styles
│   │   └── Dashboard.css     # Main dashboard layout styles
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts          # Shared types and interfaces
│   ├── utils/                # Utility functions and data
│   │   └── mockData.ts       # Mock data for dashboard
│   ├── Dashboard.tsx         # Main dashboard component
│   └── main.tsx              # Application entry point
├── index.html                # HTML entry point
├── package.json              # Project dependencies
├── tsconfig.json             # TypeScript configuration
├── tsconfig.node.json        # TypeScript config for Vite
└── vite.config.ts            # Vite configuration
```

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture Highlights

### Component Organization
- **Card.tsx**: Reusable card component with all styling from Card.css
- **Sidebar.tsx**: Navigation sidebar with theme toggle
- **PinnedItems.tsx**: Pinned items list found in sidebar
- **Dashboard.tsx**: Main orchestrator, imports all components

### Styling Strategy
- **variables.css**: Global CSS variables for theming (colors, fonts, spacing)
- **Card.css**: Complete card styling including animations, badges, trends
- **Sidebar.css**: Sidebar navigation and theme toggle styles
- **Dashboard.css**: Grid layout and page structure
- **No inline styling** in components (except dynamic animation delays)

### Type Safety
- All props and state properly typed
- No 'any' types used anywhere
- Strict TypeScript configuration enabled
- Interfaces defined in centralized 'types/' directory

### Data Management
- Mock data separated in 'utils/mockData.ts'
- Easy to replace with API calls
- Type-safe data structures


## Customization

### Adding New Cards
Edit `src/utils/mockData.ts`:
-- with new mock data

### Changing Theme Colors
Edit `src/styles/variables.css`:
-- css variable values

### Adding Navigation Items
Edit `src/utils/mockData.ts`:


## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ required
- CSS Grid and CSS Variables support required

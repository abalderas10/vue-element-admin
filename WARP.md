# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Vue Element Admin is a production-ready Vue.js admin dashboard template built with Vue 2.6.10 and Element UI 2.13.2. It's a comprehensive single-page application that includes authentication, permissions, routing, and numerous UI components and features.

**Key Technologies:**
- Vue 2.6.10 with Vue CLI 4.4.4
- Element UI 2.13.2 
- Vue Router 3.0.2 with dynamic route generation
- Vuex 3.1.0 for state management
- Axios 0.18.1 for HTTP requests
- Mock.js for mock data in development
- Sass for styling
- Jest for unit testing

## Common Development Commands

### Development & Build
```bash
# Start development server (runs on http://localhost:9527)
npm run dev

# Build for production
npm run build:prod

# Build for staging environment  
npm run build:stage

# Preview production build locally
npm run preview

# Preview with bundle analysis
npm run preview -- --report
```

### Code Quality
```bash
# Run ESLint
npm run lint

# Run ESLint with auto-fix
npm run lint -- --fix
```

### Testing
```bash
# Run unit tests
npm run test:unit

# Run both lint and tests (CI command)
npm run test:ci
```

### Utilities
```bash
# Generate new components/views using Plop templates
npm run new

# Optimize SVG icons
npm run svgo
```

## Architecture Overview

### Core Directory Structure
- **`src/`** - Main application source code
  - **`layout/`** - Main layout components (Navbar, Sidebar, AppMain, etc.)
  - **`views/`** - Page components organized by feature
  - **`components/`** - Reusable UI components 
  - **`router/`** - Vue Router configuration with modular route files
  - **`store/`** - Vuex store modules with auto-import
  - **`api/`** - API service functions
  - **`utils/`** - Utility functions and helpers
  - **`styles/`** - Global styles and theme variables
  - **`icons/`** - SVG icon components
- **`mock/`** - Mock server and data for development

### Authentication & Permission System

The app implements a sophisticated role-based permission system:

1. **Token-based authentication** using cookies (`src/utils/auth.js`)
2. **Route guards** in `src/permission.js` handle login checks and role verification  
3. **Dynamic route generation** based on user roles (`src/store/modules/permission.js`)
4. **Two permission levels**: Page-level (routes) and directive-level (UI elements)
5. **Mock authentication** with admin/editor roles in development

**Login Flow:**
- User authenticates → receives token → token stored in cookie
- On route navigation → permission.js checks token → fetches user info if needed
- Generates accessible routes based on user roles → adds routes dynamically

### Router Architecture

Routes are split into two categories:
- **`constantRoutes`** - Public routes accessible to all users (login, 404, dashboard)
- **`asyncRoutes`** - Protected routes that require specific roles

Routes are modularized in `src/router/modules/` for better maintainability when the routing table becomes large.

### State Management (Vuex)

Store modules are auto-imported using webpack's `require.context()`:
- **`app`** - Application-wide settings (sidebar, device type, etc.)
- **`user`** - User authentication and profile data
- **`permission`** - Dynamic route generation based on roles
- **`tagsView`** - Tab navigation state
- **`settings`** - UI configuration settings

### Mock System

Development uses a comprehensive mock server setup:
- **Mock server** runs in `mock/mock-server.js` with hot-reload capability
- **Mock data** organized by feature in `mock/` directory
- **Mock endpoints** automatically registered and accessible in development
- Uses Mock.js for generating realistic fake data

### Environment Configuration

Multiple build environments supported:
- **Development** - `.env.development` with `/dev-api` base URL
- **Staging** - `.env.staging` with `/stage-api` base URL  
- **Production** - `.env.production` with `/prod-api` base URL

### Component Architecture

**Layout System:**
- Main layout wrapper with responsive sidebar, navbar, and content area
- Dynamic breadcrumbs based on current route
- Tags view (tab navigation) with right-click context menu
- Settings panel for theme customization

**Reusable Components:**
- Form components with validation
- Table components with sorting, filtering, pagination
- Chart components using ECharts
- File upload components
- Rich text and markdown editors

## Development Patterns

### Adding New Routes
1. Create the route module in `src/router/modules/` if it's a complex feature
2. Add the route to `asyncRoutes` in `src/router/index.js` 
3. Ensure proper role permissions are set in route meta
4. Create the corresponding view component in `src/views/`

### Creating API Services
1. Add API functions to `src/api/` directory organized by feature
2. Use the request utility (`src/utils/request.js`) which includes interceptors
3. Add corresponding mock endpoints in `mock/` directory for development

### Vuex Store Modules  
1. Create new modules in `src/store/modules/`
2. Export default object with namespaced: true
3. Add getters to `src/store/getters.js` if needed
4. Modules are auto-imported by the store

### Icon System
- Uses SVG sprite loader for optimal icon loading
- Add SVG files to `src/icons/svg/`  
- Icons automatically registered as `<svg-icon icon-class="icon-name" />`
- Run `npm run svgo` to optimize SVG files

### Styling Guidelines
- Uses Sass with global variables in `src/styles/variables.scss`
- Element UI theme customization in `src/styles/element-variables.scss`
- Scoped styles preferred for components
- Global styles in `src/styles/index.scss`

### Testing Patterns
- Unit tests in `tests/unit/` directory
- Uses Vue Test Utils for component testing
- Focus on testing utils and core components
- Mock external dependencies and API calls

### Multi-environment Builds
- Environment-specific variables in `.env.*` files
- Build commands target specific environments
- API base URLs change per environment
- Mock server only runs in development
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with hot reload (server + client)
- `npm run build` - Build for production (Vite + ESBuild)
- `npm run start` - Run production build
- `npm run check` - TypeScript type checking
- `npm run db:push` - Push database schema changes with Drizzle

## Architecture Overview

**LedgerIQ** is an AI-powered financial anomaly detection dashboard built as a full-stack TypeScript application.

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express.js with in-memory storage
- **Database**: PostgreSQL with Drizzle ORM (schema defined, using mock data)
- **UI**: shadcn/ui components with Tailwind CSS
- **State**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing

### Project Structure
```
client/src/
  ├── components/ui/        # shadcn/ui component library
  ├── components/dashboard/ # Dashboard-specific components
  ├── components/layout/    # Header, sidebar, navigation
  ├── pages/               # Route components (Dashboard, Anomalies, etc.)
  ├── hooks/               # Custom React hooks
  └── lib/                 # Utilities and configurations

server/
  ├── index.ts             # Express server entry point
  ├── routes.ts            # API route definitions
  ├── storage.ts           # In-memory data layer with interfaces
  └── vite.ts              # Development server integration

shared/
  └── schema.ts            # Database schema and TypeScript types
```

### Core Data Models
- **Employees**: Payroll data with performance metrics
- **Anomalies**: Detected financial irregularities (overtime spikes, duplicates, rate variances)
- **AI Insights**: Machine learning analysis and recommendations per anomaly
- **Users**: Authentication (schema defined, not implemented)

### API Endpoints
```
GET    /api/dashboard/stats              # Dashboard statistics
GET    /api/anomalies                    # Anomalies with filtering
GET    /api/anomalies/:id                # Single anomaly with AI insights
PATCH  /api/anomalies/:id/status         # Update anomaly status
GET    /api/employees                    # Employee directory
```

### Key Features
- **Dashboard**: Overview with stats and real-time anomaly feed
- **Anomalies**: Advanced filtering, sorting, and status management
- **AI Insights**: ML-driven risk assessment and recommendations
- **Employees**: Directory with payroll metrics
- **Reports**: Analytics and automated reporting (placeholder)

### Configuration Notes
- **Path Aliases**: `@/*` → `client/src/*`, `@shared/*` → `shared/*`
- **Theme**: shadcn/ui "new-york" style with dark/light mode support
- **Storage**: Currently uses in-memory mock data (see `server/storage.ts`)
- **Database**: Schema ready for PostgreSQL, migrations via `db:push`

### Development Patterns
- All components use TypeScript interfaces for props
- Shared types between frontend/backend via `@shared/schema`
- React Query for API calls with automatic caching
- Radix UI primitives with Tailwind utility classes
- Zod validation for API inputs and form handling
# LedgerIQ - AI-Powered Financial Anomaly Detection System

## Overview

LedgerIQ is a comprehensive financial anomaly detection system that leverages AI to identify and analyze payroll irregularities. The system provides real-time monitoring of employee payroll data, detecting patterns like overtime spikes, duplicate entries, and rate variances. It features a modern React frontend with a Node.js/Express backend, utilizing PostgreSQL for data persistence and Drizzle ORM for database operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Full-Stack Architecture
The application follows a monorepo structure with clear separation between client and server code:
- **Frontend**: React 18 with TypeScript, using Vite as the build tool
- **Backend**: Node.js with Express.js for REST API endpoints
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state management

### Directory Structure
- `client/` - React frontend application
- `server/` - Express.js backend API
- `shared/` - Shared TypeScript types and database schema
- `migrations/` - Database migration files

## Key Components

### Frontend Architecture
- **Component Library**: shadcn/ui components built on Radix UI primitives
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **Theme System**: Dark/light theme support with local storage persistence
- **State Management**: React Query for server state, React Context for UI state

### Backend Architecture
- **API Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle with PostgreSQL dialect
- **Data Storage**: In-memory storage implementation with interface for easy database switching
- **Middleware**: Request logging, JSON parsing, error handling
- **Development**: Vite integration for hot module replacement

### Database Schema
The system uses four main entities:
- **Users**: Authentication and user management
- **Employees**: Employee information and payroll data
- **Anomalies**: Detected financial irregularities with risk assessment
- **AI Insights**: Machine learning analysis results and recommendations

### UI/UX Design
- **Design System**: Based on shadcn/ui with "new-york" style variant
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Accessibility**: ARIA compliant components with keyboard navigation
- **Visual Hierarchy**: Consistent color scheme with semantic color tokens

## Data Flow

### Dashboard Workflow
1. Dashboard loads summary statistics from `/api/dashboard/stats`
2. Anomaly table fetches data from `/api/anomalies` with optional filters
3. Real-time updates through React Query's background refetching
4. Modal interactions fetch detailed anomaly data with AI insights

### Anomaly Detection Pipeline
1. System monitors employee payroll data for irregularities
2. AI algorithms analyze patterns and assign risk levels
3. Detected anomalies are stored with confidence scores
4. AI insights provide root cause analysis and recommendations
5. Users can update anomaly status through the interface

### State Management Flow
- Server state managed by React Query with automatic caching
- UI state (modals, filters, sidebar) managed by React hooks
- Theme state persisted in localStorage
- Form state handled by React Hook Form with Zod validation

## External Dependencies

### Core Runtime Dependencies
- **Database**: `@neondatabase/serverless` for PostgreSQL connection
- **ORM**: `drizzle-orm` with `drizzle-zod` for schema validation
- **UI Components**: Comprehensive Radix UI component suite
- **State Management**: `@tanstack/react-query` for server state
- **Styling**: `tailwindcss` with utility-first approach
- **Forms**: `react-hook-form` with `@hookform/resolvers`

### Development Tools
- **Build Tool**: Vite with React plugin and custom Replit integrations
- **Type Checking**: TypeScript with strict configuration
- **Database Migrations**: `drizzle-kit` for schema management
- **Process Management**: `tsx` for TypeScript execution

### Third-Party Integrations
- **Charts**: Recharts for data visualization
- **Date Handling**: date-fns for date manipulation
- **Session Management**: express-session with PostgreSQL store
- **Code Quality**: ESBuild for production bundling

## Deployment Strategy

### Development Environment
- **Hot Reload**: Vite development server with Express proxy
- **Database**: PostgreSQL with connection pooling
- **Environment Variables**: DATABASE_URL for database connection
- **Process Management**: Development server runs both frontend and backend

### Production Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: ESBuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations applied with `db:push` command
4. **Deployment**: Single Node.js process serving static files and API

### Configuration Management
- **Environment-specific settings**: NODE_ENV-based configuration
- **Database URL**: Required environment variable for PostgreSQL connection
- **Build Output**: Optimized bundles with tree-shaking and minification
- **Static Assets**: Served directly by Express in production

### Database Management
- **Schema Definitions**: Centralized in `shared/schema.ts`
- **Migration Strategy**: Push-based schema updates with Drizzle Kit
- **Connection Handling**: Automatic connection pooling and error recovery
- **Data Persistence**: PostgreSQL with ACID compliance for financial data

The system is designed for scalability and maintainability, with clear separation of concerns and type safety throughout the stack. The architecture supports both development efficiency and production performance requirements.

## Recent Changes: Latest modifications with dates

### January 22, 2025
- **Expanded Page Navigation**: Added complete page structure with:
  - Anomalies Management Page with advanced filtering and detailed anomaly analysis
  - AI Insights & Recommendations with machine learning metrics and pattern analysis
  - Employee Management with comprehensive directory and profile management
  - Reports & Analytics with automated report generation and scheduling
  - Settings Page with system configuration, security, and integrations
- **Enhanced Navigation**: Implemented active route highlighting and proper routing between pages
- **UI Component Library**: Added missing components including Table, Textarea, and enhanced date picker
- **Schema Updates**: Extended database schema with proper employee information and AI insights structure
- **Type Safety**: Fixed all TypeScript compatibility issues across new page components
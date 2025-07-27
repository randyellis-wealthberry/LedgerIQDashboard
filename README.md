# LedgerIQ Dashboard

An AI-powered financial anomaly detection dashboard built for comprehensive payroll analysis and fraud detection.

## 🚀 Features

- **Real-time Anomaly Detection**: Advanced algorithms identify overtime spikes, duplicate entries, and rate variances
- **AI-Powered Insights**: Machine learning analysis provides risk assessments and actionable recommendations
- **Interactive Dashboard**: Comprehensive overview with real-time statistics and anomaly feeds
- **Employee Management**: Complete directory with payroll metrics and performance tracking
- **Advanced Filtering**: Sort and filter anomalies by type, severity, status, and date ranges
- **Report Generation**: Automated analytics and reporting capabilities (in development)

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript for type-safe development
- **Vite** for fast development and optimized builds
- **shadcn/ui** component library with Radix UI primitives
- **Tailwind CSS** for responsive, utility-first styling
- **TanStack Query** for efficient server state management
- **Wouter** for lightweight client-side routing
- **Framer Motion** for smooth animations

### Backend
- **Express.js** with TypeScript for robust API development
- **Drizzle ORM** with PostgreSQL schema (currently using mock data)
- **Zod** for runtime validation and type safety
- **In-memory storage** for development (database-ready architecture)

### Development & Build
- **ESBuild** for fast server bundling
- **PostCSS** with Autoprefixer for CSS optimization
- **TypeScript** for end-to-end type safety

## 📁 Project Structure

```
├── client/src/           # Frontend React application
│   ├── components/       # Reusable UI components
│   │   ├── dashboard/    # Dashboard-specific components
│   │   ├── layout/       # Header, sidebar, navigation
│   │   └── ui/           # shadcn/ui component library
│   ├── pages/           # Route components
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utilities and configurations
├── server/              # Backend Express application
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API route definitions
│   ├── storage.ts       # Data layer with interfaces
│   └── vite.ts          # Development server integration
└── shared/              # Shared types and schemas
    └── schema.ts        # Database schema and TypeScript types
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ (for `import.meta` support)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd LedgerIQDashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5000`

## 📝 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (client + server)
- `npm run start` - Run production build
- `npm run check` - TypeScript type checking
- `npm run db:push` - Push database schema changes (Drizzle)

## 🗄️ Data Models

### Core Entities
- **Employees**: Payroll data with performance metrics
- **Anomalies**: Detected financial irregularities with severity levels
- **AI Insights**: Machine learning analysis and recommendations
- **Users**: Authentication system (schema ready, not implemented)

### API Endpoints
```
GET    /api/dashboard/stats              # Dashboard statistics
GET    /api/anomalies                    # Anomalies with filtering
GET    /api/anomalies/:id                # Single anomaly with AI insights
PATCH  /api/anomalies/:id/status         # Update anomaly status
GET    /api/employees                    # Employee directory
```

## 🎨 UI Components

Built with **shadcn/ui** components using the "new-york" style:
- Dark/light mode support with `next-themes`
- Responsive design with Tailwind CSS
- Accessible components with Radix UI primitives
- Custom dashboard components for data visualization

## 🔧 Configuration

### Path Aliases
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`

### Environment Variables
- `NODE_ENV` - Environment mode (development/production)
- `PORT` - Server port (default: 5000)

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Database Setup (Future)
```bash
npm run db:push
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔍 Current Status

- ✅ Core dashboard functionality implemented
- ✅ Anomaly detection and management
- ✅ Employee directory and metrics
- ✅ AI insights integration
- 🚧 Reports and analytics (in development)
- 🚧 User authentication (schema ready)
- 🚧 Database integration (PostgreSQL schema defined)

## 📧 Support

For questions and support, please open an issue in the GitHub repository.
# ServiceHub - Local Service Network

## Overview

ServiceHub is a Next.js-based marketplace platform that connects service seekers with trusted service providers from their personal network. The platform enables users to browse and book local services while allowing providers to offer their services, manage bookings, and receive payments. Built with Next.js 16.0, TypeScript, and Neon PostgreSQL, the application features role-based access control, real-time booking management, and a comprehensive review system.

**Migration Status**: Successfully migrated from Vercel to Replit on November 4, 2025.

## User Preferences

Preferred communication style: Simple, everyday language.

## Environment Setup

**Required Environment Variables** (configured in Replit Secrets):
- `JWT_SECRET` - Secret key for signing and verifying JWT authentication tokens (minimum 32 characters recommended)
- `NEON_DATABASE_URL` - PostgreSQL connection string for Neon database (format: `postgresql://username:password@host/database?sslmode=require`)

**Important Security Notes**:
- Environment variables are enforced at runtime - application will fail to start if either is missing
- Never commit secrets to the repository
- JWT_SECRET should be a cryptographically secure random string

## System Architecture

### Frontend Architecture

**Framework**: Next.js 14+ with App Router
- Uses React Server Components and Client Components pattern
- TypeScript for type safety
- File-based routing in `/app` directory
- API routes colocated in `/app/api`

**State Management**: Zustand
- Global auth state (`useAuthStore`) handles user authentication, login, signup, and session management
- Toast notifications state (`useToastStore`) manages UI feedback messages
- Client-side state persisted to localStorage for auth tokens

**UI Components**: shadcn/ui + Radix UI
- Component library based on Radix UI primitives
- Tailwind CSS for styling with custom theme variables
- Responsive design with mobile-first approach
- Components located in `/components` and `/components/ui`

**Form Handling**: React Hook Form + Zod
- Form validation using Zod schemas in `/lib/validation.ts`
- Type-safe validation for services, bookings, and reviews

### Backend Architecture

**Database**: Neon PostgreSQL (Serverless)
- Connection managed via `@neondatabase/serverless`
- SQL queries executed through `/lib/db.ts` wrapper
- Database schema includes: Users, Services, Bookings, Reviews tables
- Support for file uploads stored as base64 data URLs

**Authentication & Authorization**:
- JWT-based authentication with 7-day token expiration
- Tokens generated and verified in `/lib/jwt.ts`
- Password hashing via bcryptjs
- Role-based access control (RBAC) with two roles: "user" and "provider"
- Protected routes enforced via `ProtectedRoute` component and server-side middleware
- Auth middleware in `/lib/auth-middleware.ts` validates tokens and enforces role permissions

**API Design**: RESTful endpoints
- `/api/auth/*` - Authentication (signup, login, user retrieval)
- `/api/services` - Service listing, creation, updates, deletion (with provider filtering)
- `/api/bookings` - Booking management with availability checking
- `/api/reviews` - Review creation restricted to completed bookings
- `/api/provider/*` - Provider-specific endpoints (profile, notifications)
- Multipart form-data support for file uploads (service images, ID verification)

**Data Validation**: Zod schemas enforce:
- Service constraints (title, description, category, pricing, location coordinates)
- Booking validation (datetime, quantity, service availability)
- Review validation (rating 1-5, comment length, duplicate prevention)
- Filter parameters (category, city, rating thresholds, pagination)

### Key Features & Business Logic

**Service Management**:
- Providers create services with images, pricing, and geographic coordinates
- Services categorized (plumbing, electrical, cleaning, gardening, tutoring, other)
- Rating aggregation and review counts calculated from database
- Filtering by category, city, minimum rating, price range
- Pagination support for large result sets

**Booking System**:
- Real-time availability checking to prevent double-booking
- Booking statuses: pending, confirmed, cancelled, completed
- Provider and user booking views with different perspectives
- Total earnings calculated from completed bookings for providers

**Review & Rating System**:
- Reviews only allowed for completed bookings
- Prevents duplicate reviews on same booking
- Ratings contribute to service provider's average rating
- Reviews displayed with user information on service detail pages

**Provider Portal**:
- Complete profile management with bio, specialties, years of experience
- Banking information storage for payouts (account numbers masked in responses)
- Government ID upload for verification
- Dashboard showing total bookings, earnings, regular clients, average rating
- Service CRUD operations with image uploads

**User Experience**:
- Toast notification system for user feedback
- Loading states during async operations
- Error handling with user-friendly messages
- Responsive navigation with role-based menu items
- Protected routes redirect unauthenticated users to login

### External Dependencies

**Database**:
- Neon PostgreSQL (serverless)
- Connection string stored in `NEON_DATABASE_URL` environment variable

**Authentication**:
- JWT secret stored in `JWT_SECRET` environment variable
- bcryptjs for password hashing

**Key NPM Packages**:
- `next` - React framework
- `@neondatabase/serverless` - Database client
- `axios` - HTTP client with token injection
- `zustand` - State management
- `zod` - Schema validation
- `jsonwebtoken` - JWT handling
- `react-hook-form` - Form state management
- `@radix-ui/*` - UI component primitives
- `tailwindcss` - Utility-first CSS
- `lucide-react` - Icon library

**Development Tools**:
- TypeScript for type safety
- ESLint for code quality
- Postman collection for API testing (included in repository)
- Jest for unit and integration testing

**Deployment Configuration**:
- Next.js production build target
- Server runs on port 5000 with 0.0.0.0 binding
- Environment variables required: `NEON_DATABASE_URL`, `JWT_SECRET`
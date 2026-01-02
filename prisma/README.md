# Database Setup with PlanetScale and Prisma

This project uses PlanetScale as a serverless MySQL-compatible database and Prisma as an ORM for type-safe database queries.

## Setup Instructions

### 1. Install Prisma CLI
```bash
npm install -D prisma
```

### 2. Connect to PlanetScale
1. Create a PlanetScale account at [planetscale.com](https://planetscale.com)
2. Create a new database
3. Create a branch (e.g., `main`)
4. Generate a database password with read/write permissions

### 3. Configure Environment Variables
Update your `.env.local` file with the PlanetScale connection string:
```
DATABASE_URL="mysql://your_username:your_password@your_host.us-east-1.psdb.cloud:3306/your_database_name"
```

### 4. Initialize Prisma
```bash
# Pull the database schema (if starting with an existing database)
npx prisma db pull

# Or push your schema to the database (for a new database)
npx prisma db push

# Generate Prisma client
npx prisma generate
```

### 5. Run Migrations (if needed)
```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations to production
npx prisma migrate deploy
```

## Prisma Studio
You can explore your database using Prisma Studio:
```bash
npx prisma studio
```

## Models
The schema includes the following models:
- `User` - Application users with pro status
- `Course` - AI-generated courses
- `Unit` - Course units containing chapters
- `Chapter` - Individual lessons with content
- `QuizQuestion` - Quiz questions associated with chapters

## Services
The application includes service files for database operations:
- `src/services/courseService.ts` - Course-related operations
- `src/services/userService.ts` - User-related operations

## API Routes
API routes are available for database operations:
- `src/app/api/courses/route.ts` - Create and fetch courses
- `src/app/api/users/route.ts` - Create and fetch users

## Best Practices
- The Prisma client is instantiated with development-safe caching to prevent hot-reload issues
- All database operations are handled through service files for better separation of concerns
- Type-safe queries are ensured through Prisma's generated types
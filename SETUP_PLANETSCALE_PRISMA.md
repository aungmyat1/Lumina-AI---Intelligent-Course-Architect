# PlanetScale & Prisma Setup Guide

This document details the implementation of PlanetScale as a serverless MySQL-compatible database and Prisma as an ORM for type-safe database queries in the Lumina AI project.

## Implementation Details

### 1. Database Configuration

- **PlanetScale**: Used as a serverless MySQL-compatible database that automatically scales and handles database infrastructure
- **Prisma ORM**: Used for type-safe database queries and schema management
- **Connection**: Configured via environment variables in `.env.local`

### 2. Prisma Schema

The [schema.prisma](./prisma/schema.prisma) file defines the following models:

- `User` - Application users with pro status
- `Course` - AI-generated courses
- `Unit` - Course units containing chapters
- `Chapter` - Individual lessons with content
- `QuizQuestion` - Quiz questions associated with chapters
- `QuizOption` - Options for quiz questions

### 3. Prisma Client Setup

The Prisma client is instantiated in [src/lib/prisma.ts](./src/lib/prisma.ts) with a pattern that prevents multiple instances during hot reloads in development:

```typescript
import { PrismaClient } from '@prisma/client'

declare global {
  // This prevents Prisma from creating multiple instances during hot reloads
  // in development environments
  var prisma: PrismaClient | undefined
}

const client = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = client
}

export default client
```

This pattern addresses the issue of multiple Prisma client instances being created during Next.js hot reloads, which can lead to connection leaks and performance issues.

### 4. Service Layer Implementation

Database operations are handled through service files for better separation of concerns:

- [src/services/courseService.ts](./src/services/courseService.ts) - Course-related operations
- [src/services/userService.ts](./src/services/userService.ts) - User-related operations

These services use Prisma's type-safe queries to interact with the database.

## Key Concepts

### Prisma as an ORM with Type-Safe DB Queries

Prisma provides:
- Type-safety at build-time for database queries
- Auto-generated types based on the database schema
- Intuitive query API that reduces boilerplate code
- Automatic SQL injection protection

### PlanetScale as a Serverless MySQL-Compatible DB

PlanetScale provides:
- Serverless infrastructure that scales automatically
- Zero-downtime schema migrations
- Branching capabilities for safe schema changes
- Built-in connection pooling
- MySQL compatibility without the complexity of traditional databases

### Efficient PrismaClient Instantiation Pattern

The instantiation pattern prevents hot-reload leaks by:
- Using a global variable in development to maintain a single Prisma client instance
- Checking the environment to ensure the global instance is only used in development
- Creating a new instance in production to ensure fresh connections

## Setup Process

1. Create a PlanetScale account at [planetscale.com](https://planetscale.com)
2. Create a new database
3. Create a branch (e.g., `main`)
4. Generate a database password with read/write permissions
5. Update your `.env.local` file with the PlanetScale connection string:
   ```
   DATABASE_URL="mysql://your_username:your_password@your_host.us-east-1.psdb.cloud:3306/your_database_name"
   ```
6. Run the following commands to initialize and sync the schema:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

## Commands

- `npx prisma generate` - Generate Prisma client based on the schema
- `npx prisma db push` - Push schema changes to the database
- `npx prisma db pull` - Pull schema from an existing database
- `npx prisma migrate dev` - Create and apply a migration
- `npx prisma studio` - Open Prisma Studio to explore the database

## Best Practices Implemented

1. **Environment-Safe Client Instantiation**: The Prisma client is set up to prevent multiple instances during development hot-reloads
2. **Type Safety**: All database operations use Prisma's generated types
3. **Separation of Concerns**: Database operations are abstracted behind service layers
4. **Cascading Deletes**: Relationships are configured with proper onDelete behavior
5. **Connection Management**: Proper connection handling through PlanetScale's serverless architecture
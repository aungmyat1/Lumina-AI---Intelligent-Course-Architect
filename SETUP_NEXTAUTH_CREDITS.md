# NextAuth Setup with User Credits

## Overview
This document outlines the implementation of NextAuth with Google OAuth, Prisma adapter, JWT callbacks to include user credits, and session typing extensions.

## Implementation Details

### 1. NextAuth Configuration
Located in `src/lib/auth.ts`:
- Google OAuth provider configured with `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- Prisma adapter for database persistence
- JWT strategy for stateless session management
- JWT and session callbacks to include user credits

### 2. Type Extensions
Located in `src/types.ts`:
- Extended Session interface to include `credits` property
- Extended User interface to include `credits` property
- Extended JWT interface to include `credits` property

### 3. Database Schema
Located in `prisma/schema.prisma`:
- Added `credits` field to User model with default value of 10
- Proper relations maintained

### 4. Utility Functions
Located in `src/lib/auth-utils.ts`:
- `hasSufficientCredits()` - Check if user has enough credits
- `deductCredits()` - Deduct specified amount of credits from user
- `addCredits()` - Add specified amount of credits to user

## Migration Steps

To apply the database changes, run the following command after setting up your database:

```bash
# Make sure your DATABASE_URL is set in .env.local
npx prisma migrate dev --name add_credits_to_user
```

## Environment Variables

Make sure to set these environment variables in your `.env.local` file:

```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
DATABASE_URL=your_database_url
```

## API Route

The NextAuth API route is configured at `src/app/api/auth/[...nextauth]/route.ts` and exports both GET and POST handlers.

## Usage

After implementation, user sessions will include a `credits` property that can be accessed in both server and client components:

```typescript
import { getSession } from '@/src/lib/auth-utils';

// In a server-side function
const session = await getSession(req, res);
if (session?.user.credits > 0) {
  // Allow access to premium features
}
```
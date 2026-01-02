# NextAuth Implementation

This document details the NextAuth implementation for the Lumina AI project with Google OAuth, Prisma adapter, JWT callbacks, and session typing extensions.

## Components

### 1. Configuration File
- **Location**: `src/lib/auth.ts`
- **Purpose**: Main NextAuth configuration with Google OAuth provider, Prisma adapter, and custom callbacks

### 2. API Route Handler
- **Location**: `src/app/api/auth/[...nextauth]/route.ts`
- **Purpose**: Handles all NextAuth authentication routes

### 3. Type Extensions
- **Location**: `src/types.ts`
- **Purpose**: Augments NextAuth types to include custom user properties like `isPro`

### 4. Utility Functions
- **Location**: `src/lib/auth-utils.ts`
- **Purpose**: Provides helper functions for session management

## Key Features

### Google OAuth Integration
- Uses `next-auth/providers/google` for OAuth flow
- Requires `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` environment variables
- Handles user creation and login via Google account

### Prisma Adapter
- Uses `@next-auth/prisma-adapter` to store user sessions in the database
- Integrates with existing Prisma schema
- Maintains user data consistency

### JWT Strategy
- Uses JWT strategy for stateless authentication
- Custom JWT callbacks to include user properties like `isPro`
- Session information is passed from JWT to session object

### Custom User Data
- Extends session with user ID and pro status
- Type-safe access to custom user properties
- Maintains user's pro status in both JWT and session

## Environment Variables

The following environment variables need to be configured in `.env.local`:

```bash
# NextAuth Configuration
NEXTAUTH_SECRET="your_nextauth_secret_here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth Configuration
GOOGLE_CLIENT_ID="your_google_client_id_here"
GOOGLE_CLIENT_SECRET="your_google_client_secret_here"
```

## Setup Process

### 1. Google OAuth Configuration
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Create credentials (OAuth 2.0 Client IDs)
5. Set authorized redirect URIs to:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - Your production URL with the same path
6. Copy the Client ID and Client Secret

### 2. NEXTAUTH_SECRET Generation
Generate a secure secret for JWT signing:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Environment Configuration
Add all required environment variables to `.env.local`

## Usage Examples

### Protecting Server Components
```typescript
import { getSession } from '@/src/lib/auth-utils';

export default async function ProtectedPage() {
  const session = await getSession({}, {});
  
  if (!session) {
    redirect('/auth/signin');
  }
  
  return (
    <div>
      <h1>Protected Content</h1>
      <p>Welcome {session.user.name}</p>
    </div>
  );
}
```

### Using Session in Client Components
```typescript
import { useSession } from 'next-auth/react';

export default function ClientComponent() {
  const { data: session } = useSession();
  
  if (!session) {
    return <div>Please sign in</div>;
  }
  
  return (
    <div>
      <p>Pro User: {session.user.isPro ? 'Yes' : 'No'}</p>
    </div>
  );
}
```

### Checking Pro Status
```typescript
import { useSession } from 'next-auth/react';

export default function ProFeature() {
  const { data: session } = useSession();
  
  if (!session || !session.user.isPro) {
    return <div>Upgrade to Pro to access this feature</div>;
  }
  
  return <div>Pro feature content</div>;
}
```

## Type Safety

The implementation includes complete type augmentation:

- `session.user.isPro` is properly typed as boolean
- JWT token includes `id` and `isPro` properties
- All custom properties are type-safe throughout the application

## Security Considerations

- Never expose secrets in client-side code
- Use environment variables for all sensitive data
- The Prisma adapter securely handles session tokens in the database
- JWTs are signed with the NEXTAUTH_SECRET for tamper protection
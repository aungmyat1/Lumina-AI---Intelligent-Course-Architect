# PlanetScale Database Setup Instructions

This guide provides step-by-step instructions for setting up a PlanetScale database for the Lumina AI project.

## Step 1: Create a PlanetScale Account

1. Go to [planetscale.com](https://planetscale.com)
2. Sign up for a free account or log in if you already have one
3. Verify your email address if required

## Step 2: Create a New Database

1. Click the "Create a database" button on your PlanetScale dashboard
2. Choose a descriptive name for your database (e.g., `lumina-ai-db`)
3. Select a region closest to your users
4. Leave the branch as `main` (or create a development branch if preferred)
5. Click "Create database"

## Step 3: Generate Database Credentials

1. Once your database is created, navigate to the "Settings" tab for your database
2. Click on "Passwords" in the left sidebar
3. Click "New password" to generate credentials
4. Select the branch you want to connect to (likely `main`)
5. Choose the appropriate access level (typically "Read & Write" for application use)
6. Give the password a descriptive name (e.g., `lumina-ai-app`)
7. Click "Create password"

## Step 4: Configure Environment Variables

1. Copy the generated connection string from PlanetScale
2. Update your `.env.local` file in the root of your project with the PlanetScale connection string:

```
# Gemini API Key
GEMINI_API_KEY=your_api_key_here

# PlanetScale Database URL
DATABASE_URL="mysql://your_username:your_password@your_host.us-east-1.psdb.cloud:3306/your_database_name"
```

Replace the placeholder values with your actual PlanetScale credentials.

## Step 5: Initialize the Database Schema

Once your environment is configured, you can initialize the database schema using Prisma:

```bash
# Generate the Prisma client
npx prisma generate

# Push the schema to your PlanetScale database
npx prisma db push
```

Alternatively, you can use migrations:

```bash
# Create and apply a new migration
npx prisma migrate dev --name init
```

## Step 6: Verify the Connection

To verify that your application can connect to the PlanetScale database, you can run:

```bash
# Check the database schema
npx prisma db pull

# Or explore your database using Prisma Studio
npx prisma studio
```

## Additional Configuration

### For Development
- The Prisma client is configured to prevent multiple instances during hot reloads
- Use `npx prisma studio` to visually explore and edit your database content

### For Production
- Ensure your PlanetScale database has appropriate scaling settings
- Set up connection pooling parameters if needed
- Monitor your database performance and usage

## Troubleshooting

### Common Issues:

1. **Connection Errors**: Verify your `DATABASE_URL` is properly formatted and credentials are correct
2. **SSL Configuration**: PlanetScale requires SSL connections, which is handled automatically by Prisma
3. **Migration Issues**: Use `npx prisma migrate dev` for development and `npx prisma migrate deploy` for production

### Environment Variables:
- Make sure your `.env.local` file is added to your `.gitignore` to prevent exposing sensitive credentials
- Never commit database credentials to version control

## Security Best Practices

1. Use environment variables for all database credentials
2. Rotate passwords regularly
3. Use the principle of least privilege when setting access levels
4. Regularly monitor database access logs
5. Use PlanetScale's branch feature for safer schema changes in development

## Next Steps

After setting up your PlanetScale database, you can:
- Run the application with `npm run dev`
- Access Prisma Studio to explore your database with `npx prisma studio`
- Develop new features that interact with the database through the service layer
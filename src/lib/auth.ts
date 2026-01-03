import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/src/lib/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt', // Using JWT strategy for stateless authentication
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Initial sign in
      if (account && user) {
        token.id = user.id;
        token.isPro = user.isPro;
        token.credits = user.credits;
      }
      
      return token;
    },
    async session({ session, token }) {
      // Send properties from JWT to session
      if (token.id) {
        session.user.id = token.id as string;
      }
      if (token.isPro !== undefined) {
        session.user.isPro = token.isPro as boolean;
      }
      if (token.credits !== undefined) {
        session.user.credits = token.credits as number;
      }
      
      return session;
    },
    // Handle account creation with default credits
    async signIn({ user, account, profile }) {
      // This callback runs after user creation or sign in
      // The Prisma adapter will handle the default credits value (10) from schema
      return true; // Allow sign in
    }
  },
};

export default NextAuth(authOptions);
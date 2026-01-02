<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Lumina AI - Intelligent Course Architect

Next.js 13+ implementation with App Router for an AI-powered course creation platform.

View your app in AI Studio: https://ai.studio/apps/drive/1MFfE3z4kTLKW-8f_bWD2-wMnb0lem9jr

## Getting Started

First, install the dependencies:

```bash
npm install
```

Second, set your `GEMINI_API_KEY` in [.env.local](.env.local):

```bash
GEMINI_API_KEY=your_api_key_here
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

This is a Next.js 13+ application using the App Router (`/app` directory). Key features:

- **App Router**: Uses the new `/app` directory structure with file-based routing
- **Server Components**: Optimized for performance with server-side rendering
- **Client Components**: Interactive elements using `'use client'` directive
- **File-based Routing**: Pages defined in the `/app` directory structure

## Key Technologies

- Next.js 14 with App Router
- React 18 with Server Components
- TypeScript
- Tailwind CSS
- Google GenAI SDK
- Vercel for deployment

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
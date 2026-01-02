
import React from 'react';
import { Course } from './types';

export const APP_NAME = "Lumina AI";

export const ICONS = {
  Brain: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54Z"/>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54Z"/>
    </svg>
  ),
  Zap: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/>
    </svg>
  ),
  Layout: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
      <line x1="3" x2="21" y1="9" y2="9"/>
      <line x1="9" x2="9" y1="21" y2="9"/>
    </svg>
  ),
  Plus: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14"/><path d="M12 5v14"/>
    </svg>
  ),
  ArrowRight: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
    </svg>
  ),
  BookOpen: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  Search: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  ),
  Check: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  ),
  Play: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  ),
  Settings: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
};

export const SAMPLE_COURSES: Course[] = [
  {
    id: "sample-1",
    title: "The Physics of Supernovae",
    description: "Explore the explosive death of massive stars and the birth of neutron stars and black holes.",
    imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1000",
    createdAt: Date.now(),
    units: [
      {
        id: "s1u1",
        title: "Stellar Evolution",
        chapters: [
          {
            id: "s1c1",
            title: "The Main Sequence",
            description: "How stars burn hydrogen and maintain stability.",
            youtubeId: "8hP9D6kZseM",
            isCompleted: true,
            summary: "Stars spend most of their lives on the main sequence, fusing hydrogen into helium. This process creates outward pressure that balances the inward pull of gravity.",
            quiz: [
              {
                question: "What fuel do stars primarily burn on the main sequence?",
                options: ["Helium", "Hydrogen", "Iron", "Oxygen"],
                correctAnswerIndex: 1
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "sample-2",
    title: "Mastering TypeScript & Architecture",
    description: "Deep dive into advanced types, design patterns, and scalable frontend architecture.",
    imageUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=1000",
    createdAt: Date.now(),
    units: [
      {
        id: "s2u1",
        title: "Advanced Type Systems",
        chapters: [
          {
            id: "s2c1",
            title: "Generics and Conditional Types",
            description: "Building reusable and flexible type definitions.",
            youtubeId: "S0_qX4VJhMQ",
            isCompleted: false,
            summary: "Generics allow you to create components that work over a variety of types rather than a single one. Conditional types provide a way to select types based on relationships.",
            quiz: [
              {
                question: "Which keyword is used to create a generic type parameter?",
                options: ["<T>", "generic", "any", "Type"],
                correctAnswerIndex: 0
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "sample-3",
    title: "Sustainable Urban Gardening",
    description: "Transform small city spaces into thriving organic ecosystems for food and biodiversity.",
    imageUrl: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1000",
    createdAt: Date.now(),
    units: [
      {
        id: "s3u1",
        title: "Soil and Space Optimization",
        chapters: [
          {
            id: "s3c1",
            title: "Vertical Gardening Secrets",
            description: "Maximize your yield by growing upwards in limited square footage.",
            youtubeId: "aircAruvnKk",
            isCompleted: true,
            summary: "Vertical gardening utilizes wall space and trellises to grow crops like tomatoes, beans, and cucumbers, significantly increasing potential harvest in small urban areas.",
            quiz: [
              {
                question: "What is a major benefit of vertical gardening in cities?",
                options: ["Requires less water", "Uses less sunlight", "Space efficiency", "Eliminates all pests"],
                correctAnswerIndex: 2
              }
            ]
          }
        ]
      }
    ]
  }
];

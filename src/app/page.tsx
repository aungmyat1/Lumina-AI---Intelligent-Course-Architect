'use client';

import { useState, useEffect } from 'react';
import { View, Course, UserState } from '@/src/types';
import LandingPage from '@/src/components/LandingPage';
import Dashboard from '@/src/components/Dashboard';
import CourseCreation from '@/src/components/CourseCreation';
import CourseViewer from '@/src/components/CourseViewer';
import Navbar from '@/src/components/Navbar';
import Pricing from '@/src/components/Pricing';
import { SAMPLE_COURSES } from '@/src/constants';

export default function HomePage() {
  const [view, setView] = useState<View>('LANDING');
  const [user, setUser] = useState<UserState>({
    isPro: false,
    courses: [],
  });
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [previewCourse, setPreviewCourse] = useState<Course | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('lumina_data');
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('lumina_data', JSON.stringify(user));
  }, [user]);

  const addCourse = (course: Course) => {
    setUser(prev => ({
      ...prev,
      courses: [course, ...prev.courses],
    }));
    setActiveCourseId(course.id);
    setPreviewCourse(null);
    setView('VIEW_COURSE');
  };

  const deleteCourse = (id: string) => {
    setUser(prev => ({
      ...prev,
      courses: prev.courses.filter(c => c.id !== id),
    }));
  };

  const navigateToCourse = (id: string) => {
    setActiveCourseId(id);
    setPreviewCourse(null);
    setView('VIEW_COURSE');
  };

  const handleViewSample = (course: Course) => {
    setPreviewCourse(course);
    setActiveCourseId(null);
    setView('VIEW_COURSE');
  };

  const handleUpgrade = () => {
    setUser(p => ({...p, isPro: true}));
    setView('DASHBOARD');
  };

  const currentCourse = previewCourse || user.courses.find(c => c.id === activeCourseId);

  return (
    <div className="min-h-screen bg-[#030712] text-gray-100 flex flex-col selection:bg-blue-500/30">
      <Navbar 
        view={view} 
        setView={setView} 
        isPro={user.isPro} 
        onUpgrade={() => setView('PRICING')}
      />
      
      <main className="flex-grow">
        {view === 'LANDING' && (
          <LandingPage 
            onStart={() => setView('DASHBOARD')} 
            onViewSample={handleViewSample} 
            onUpgrade={handleUpgrade}
            isPro={user.isPro}
          />
        )}
        
        {view === 'DASHBOARD' && (
          <Dashboard 
            courses={user.courses} 
            onCreateNew={() => setView('CREATE')}
            onViewCourse={navigateToCourse}
            onDeleteCourse={deleteCourse}
          />
        )}
        
        {view === 'CREATE' && (
          <CourseCreation 
            onCourseCreated={addCourse}
            onCancel={() => setView('DASHBOARD')}
          />
        )}
        
        {view === 'VIEW_COURSE' && currentCourse && (
          <CourseViewer 
            course={currentCourse} 
            onBack={() => setView(previewCourse ? 'LANDING' : 'DASHBOARD')}
          />
        )}

        {view === 'PRICING' && (
          <Pricing 
            isPro={user.isPro} 
            onUpgrade={handleUpgrade} 
          />
        )}
      </main>
      
      <footer className="py-8 border-t border-white/5 text-center text-gray-500 text-sm">
        © 2024 Lumina AI Course Architect. Built with Gemini 3.0.
      </footer>
    </div>
  );
}
'use client';

import React, { useState } from 'react';
import { ICONS } from '@/src/constants';
import { searchYouTubeVideo } from '@/src/services/youtube';
import { Course, Unit, Chapter } from '@/src/types';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';

interface CourseCreationProps {
  onCourseCreated: (course: Course) => void;
  onCancel: () => void;
}

const CourseCreation: React.FC<CourseCreationProps> = ({ onCourseCreated, onCancel }) => {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);

  const callGeminiAPI = async (action: string, data: any) => {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, ...data }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate content');
    }

    const result = await response.json();
    return result.result;
  };

  const handleGenerate = async () => {
    if (!title.trim()) return;
    
    setLoading(true);
    setStatus('Designing your curriculum architecture...');
    setProgress(10);

    try {
      // Step 1: Generate Structure
      const structure = await callGeminiAPI('generateCourseStructure', { title });
      setProgress(40);
      setStatus('Curating high-quality learning materials...');

      // Step 2: For each chapter, find videos and content
      const units: Unit[] = [];
      
      if (structure.units) {
        let totalChapters = structure.units.reduce((acc: number, u: { chapters: any[] }) => acc + u.chapters.length, 0);
        let completedChapters = 0;

        for (const unitData of structure.units) {
          const chapters: Chapter[] = [];
          for (const chapterData of unitData.chapters) {
            setStatus(`Generating content for: ${chapterData.title}...`);
            
            // Parallel fetch video and summary/quiz
            const [youtubeId, aiContent] = await Promise.all([
              searchYouTubeVideo(`${title} ${chapterData.title}`),
              callGeminiAPI('generateChapterContent', { 
                chapterTitle: chapterData.title, 
                unitTitle: unitData.title 
              })
            ]);

            chapters.push({
              id: Math.random().toString(36).substring(7),
              title: chapterData.title,
              description: chapterData.description,
              youtubeId,
              summary: aiContent.summary,
              quiz: aiContent.quiz,
              isCompleted: false,
            });

            completedChapters++;
            setProgress(40 + Math.floor((completedChapters / totalChapters) * 50));
          }
          units.push({
            id: Math.random().toString(36).substring(7),
            title: unitData.title,
            chapters,
          });
        }
      }

      const finalCourse: Course = {
        id: Math.random().toString(36).substring(7),
        title: structure.title || title,
        description: structure.description || '',
        units,
        createdAt: Date.now(),
        imageUrl: `https://picsum.photos/seed/${Math.random()}/1200/800`,
      };

      setProgress(100);
      setStatus('Course generation complete!');
      
      // Small delay to show completion
      setTimeout(() => {
        onCourseCreated(finalCourse);
      }, 800);

    } catch (err) {
      console.error(err);
      setStatus('Error generating course. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      {!loading ? (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">What do you want to learn?</h1>
            <p className="text-gray-400">Describe your learning goal in a few words. Our AI will handle the rest.</p>
          </div>

          <div className="glass p-8 rounded-3xl border-white/10 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Course Topic</label>
              <Input 
                placeholder="e.g. Modern Web Development with Next.js or Italian Home Cooking"
                className="w-full bg-black/50 border border-gray-700 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-colors text-lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              />
            </div>

            <div className="flex items-center gap-4">
              <Button 
                onClick={handleGenerate}
                disabled={!title.trim()}
                className="flex-grow py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all rounded-xl font-bold text-lg"
              >
                Generate Course Structure
              </Button>
              <Button 
                variant="outline"
                onClick={onCancel}
                className="px-6 py-4 glass border-gray-700 rounded-xl font-semibold hover:bg-white/5 transition-all"
              >
                Cancel
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="glass p-4 rounded-xl flex items-center gap-3">
               <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                 <ICONS.Search className="w-4 h-4 text-blue-400" />
               </div>
               <span className="text-sm text-gray-400">Searches YouTube for videos</span>
             </div>
             <div className="glass p-4 rounded-xl flex items-center gap-3">
               <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                 <ICONS.Brain className="w-4 h-4 text-purple-400" />
               </div>
               <span className="text-sm text-gray-400">Generates smart quizzes</span>
             </div>
          </div>
        </div>
      ) : (
        <div className="text-center space-y-8 py-20 animate-in fade-in zoom-in duration-500">
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-blue-500/20"></div>
            <div 
              className="absolute inset-0 rounded-full border-4 border-t-blue-500 animate-spin"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <ICONS.Brain className="w-12 h-12 text-blue-500 animate-pulse" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">{status}</h2>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden max-w-sm mx-auto">
              <div 
                className="h-full bg-blue-500 transition-all duration-500" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-gray-500 text-sm">This can take up to a minute. Greatness takes time.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCreation;
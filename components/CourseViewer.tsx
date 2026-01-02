
import React, { useState } from 'react';
import { Course, Chapter, QuizQuestion } from '../types';
import { ICONS } from '../constants';
import Quiz from './Quiz';

interface CourseViewerProps {
  course: Course;
  onBack: () => void;
}

const CourseViewer: React.FC<CourseViewerProps> = ({ course, onBack }) => {
  const [activeChapter, setActiveChapter] = useState<Chapter>(course.units[0].chapters[0]);
  const [quizMode, setQuizMode] = useState(false);

  const handleChapterClick = (chapter: Chapter) => {
    setActiveChapter(chapter);
    setQuizMode(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar Navigation */}
      <aside className="lg:w-80 lg:sticky lg:top-[73px] h-[calc(100vh-73px)] glass border-r border-gray-800 overflow-y-auto">
        <div className="p-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Dashboard
          </button>
          
          <h1 className="text-xl font-bold mb-6">{course.title}</h1>
          
          <div className="space-y-6">
            {course.units.map((unit, uIdx) => (
              <div key={unit.id} className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 bg-blue-500/20 rounded flex items-center justify-center text-[10px] font-bold text-blue-500">
                    {uIdx + 1}
                  </span>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">{unit.title}</h3>
                </div>
                {unit.chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => handleChapterClick(chapter)}
                    className={`w-full text-left p-3 rounded-xl text-sm transition-all flex items-center gap-3 ${
                      activeChapter.id === chapter.id 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                        : 'text-gray-400 hover:bg-white/5'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${chapter.isCompleted ? 'bg-green-500' : 'bg-gray-700'}`} />
                    <span className="truncate">{chapter.title}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 lg:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">{activeChapter.title}</h2>
            <p className="text-gray-400 text-lg leading-relaxed">{activeChapter.description}</p>
          </div>

          {/* Video Section */}
          <div className="aspect-video rounded-3xl overflow-hidden glass border-white/5 bg-black">
            {activeChapter.youtubeId ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${activeChapter.youtubeId}`}
                title={activeChapter.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-600">
                <ICONS.Play className="w-16 h-16 mb-4 opacity-20" />
                <p>No video available for this chapter</p>
              </div>
            )}
          </div>

          {/* Interactive Toggle */}
          <div className="flex border-b border-gray-800">
             <button 
              onClick={() => setQuizMode(false)}
              className={`px-6 py-4 font-bold text-sm transition-all border-b-2 ${!quizMode ? 'border-blue-500 text-white' : 'border-transparent text-gray-500'}`}
             >
               Summary
             </button>
             <button 
              onClick={() => setQuizMode(true)}
              className={`px-6 py-4 font-bold text-sm transition-all border-b-2 ${quizMode ? 'border-blue-500 text-white' : 'border-transparent text-gray-500'}`}
             >
               Practice Quiz
             </button>
          </div>

          {/* Body Content */}
          <div className="pb-20">
            {!quizMode ? (
              <div className="glass p-8 rounded-3xl prose prose-invert max-w-none">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <ICONS.BookOpen className="w-5 h-5 text-blue-500" />
                  Key Takeaways
                </h3>
                <div className="text-gray-300 space-y-6 leading-relaxed text-lg">
                  {activeChapter.summary?.split('\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                  {!activeChapter.summary && (
                    <div className="animate-pulse flex flex-col gap-4">
                      <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-800 rounded w-full"></div>
                      <div className="h-4 bg-gray-800 rounded w-2/3"></div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4">
                {activeChapter.quiz && activeChapter.quiz.length > 0 ? (
                  <Quiz questions={activeChapter.quiz} />
                ) : (
                  <div className="glass p-12 rounded-3xl text-center">
                    <p className="text-gray-500">Generating quiz questions for this chapter...</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseViewer;

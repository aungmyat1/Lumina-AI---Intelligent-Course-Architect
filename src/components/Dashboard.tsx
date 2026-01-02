import React from 'react';
import { Course } from '@/src/types';
import { ICONS } from '@/src/constants';

interface DashboardProps {
  courses: Course[];
  onCreateNew: () => void;
  onViewCourse: (id: string) => void;
  onDeleteCourse: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ courses, onCreateNew, onViewCourse, onDeleteCourse }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
        <div>
          <h1 className="text-3xl font-bold">Your Course Library</h1>
          <p className="text-gray-400">Continue where you left off or start a new adventure.</p>
        </div>
        <button 
          onClick={onCreateNew}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 transition-colors rounded-xl font-bold flex items-center gap-2"
        >
          <ICONS.Plus className="w-5 h-5" />
          Create New Course
        </button>
      </div>

      {courses.length === 0 ? (
        <div className="glass rounded-3xl p-20 text-center border-dashed border-2 border-gray-800">
          <div className="bg-blue-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ICONS.BookOpen className="text-blue-500 w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No courses yet</h2>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">Generate your first course using AI and start learning something new today.</p>
          <button 
            onClick={onCreateNew}
            className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all"
          >
            Generate First Course
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div 
              key={course.id}
              className="glass rounded-2xl overflow-hidden hover:translate-y-[-4px] transition-all cursor-pointer group flex flex-col h-full"
              onClick={() => onViewCourse(course.id)}
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={course.imageUrl || `https://picsum.photos/seed/${course.id}/600/400`} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteCourse(course.id);
                  }}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-red-500/80 transition-colors rounded-lg opacity-0 group-hover:opacity-100"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="text-xs font-bold text-blue-400 mb-2 tracking-widest uppercase">{course.units.length} Units</div>
                <h3 className="text-xl font-bold mb-2 line-clamp-1">{course.title}</h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2">{course.description}</p>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-800">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <ICONS.Layout className="w-3 h-3" />
                    {course.units.reduce((acc, u) => acc + u.chapters.length, 0)} Chapters
                  </div>
                  <div className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-full">
                    Active
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
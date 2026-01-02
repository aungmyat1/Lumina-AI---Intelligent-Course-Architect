
import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { ICONS } from '../constants';

interface QuizProps {
  questions: QuizQuestion[];
}

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === questions[currentStep].correctAnswerIndex) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentStep + 1 < questions.length) {
      setCurrentStep(s => s + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="glass p-12 rounded-3xl text-center space-y-6 border-blue-500/20">
        <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto">
          <ICONS.Check className="w-10 h-10 text-blue-500" />
        </div>
        <div>
          <h3 className="text-3xl font-bold">Quiz Complete!</h3>
          <p className="text-gray-400">You've finished this section's assessment.</p>
        </div>
        <div className="text-5xl font-black text-blue-500">
          {score} / {questions.length}
        </div>
        <button 
          onClick={() => {
            setIsFinished(false);
            setCurrentStep(0);
            setScore(0);
            setSelectedOption(null);
            setIsAnswered(false);
          }}
          className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  const question = questions[currentStep];

  return (
    <div className="glass p-8 rounded-3xl space-y-8">
      <div className="flex justify-between items-center text-xs font-bold text-gray-500 uppercase tracking-widest">
        <span>Question {currentStep + 1} of {questions.length}</span>
        <span>Score: {score}</span>
      </div>
      
      <h3 className="text-2xl font-bold">{question.question}</h3>

      <div className="space-y-4">
        {question.options.map((option, idx) => {
          let stateClass = "glass border-white/5 hover:border-white/20";
          if (isAnswered) {
            if (idx === question.correctAnswerIndex) {
              stateClass = "bg-green-500/20 border-green-500 text-green-400";
            } else if (idx === selectedOption) {
              stateClass = "bg-red-500/20 border-red-500 text-red-400";
            } else {
              stateClass = "opacity-50 grayscale";
            }
          } else if (selectedOption === idx) {
            stateClass = "border-blue-500 bg-blue-500/10";
          }

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={isAnswered}
              className={`w-full p-5 text-left rounded-2xl font-medium transition-all flex items-center gap-4 ${stateClass}`}
            >
              <div className="w-8 h-8 rounded-lg bg-black/30 flex items-center justify-center text-sm">
                {String.fromCharCode(65 + idx)}
              </div>
              {option}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <button 
          onClick={nextQuestion}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 transition-all rounded-xl font-bold flex items-center justify-center gap-2"
        >
          {currentStep + 1 === questions.length ? 'Show Results' : 'Next Question'}
          <ICONS.ArrowRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Quiz;

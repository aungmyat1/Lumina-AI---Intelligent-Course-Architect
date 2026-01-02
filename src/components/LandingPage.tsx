import React, { useState, useRef } from 'react';
import { ICONS, SAMPLE_COURSES } from '@/src/constants';
import { Course } from '@/src/types';

interface LandingPageProps {
  onStart: () => void;
  onViewSample: (course: Course) => void;
  onUpgrade: () => void;
  isPro: boolean;
}

const FAQ_DATA = [
  {
    question: "How does the AI generate the course content?",
    answer: "Lumina AI uses advanced Gemini models to first architect a logical curriculum structure. It then performs deep-context analysis to generate detailed summaries, find relevant educational videos, and craft interactive assessments tailored specifically to your learning goals."
  },
  {
    question: "Can I generate courses on any topic?",
    answer: "Yes! Whether it's complex quantum physics, modern software architecture, or creative hobbies like sourdough baking, our AI models are trained on a vast corpus of knowledge to provide structured learning paths for almost any subject."
  },
  {
    question: "Is the video content verified?",
    answer: "We use a smart-matching algorithm that cross-references your course units with highly-rated educational content from across the web, prioritizing verified academic channels and top-tier tutorials."
  },
  {
    question: "What's the difference between the Free and Pro plans?",
    answer: "The Free plan allows you to explore course architecture with daily limits. Pro unlocks unlimited high-fidelity generations, priority access to our most advanced reasoning models, and enhanced interactive quiz features."
  }
];

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onViewSample, onUpgrade, isPro }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const pricingRef = useRef<HTMLElement>(null);

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#030712] selection:bg-blue-500/30 pb-24">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-grid z-0 opacity-40"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] bg-blue-600/20 blur-[120px] rounded-full z-0"></div>
      <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-float z-0"></div>
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 md:pt-32 md:pb-24">
          <div className="text-center space-y-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
              Join 10,000+ AI Learners
            </div>
            
            <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter leading-[1] max-w-5xl mx-auto">
              The future of learning is <span className="gradient-text">Personalized.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
              Turn any topic into a professional-grade course in seconds. 
              Structured units, curated video content, and AI-powered assessments.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
              <button 
                onClick={onStart}
                className="shimmer-btn group px-8 py-4 bg-white text-black font-bold rounded-2xl flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
              >
                Start Architecting
                <ICONS.ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={scrollToGallery}
                className="px-8 py-4 glass text-white font-bold rounded-2xl hover:bg-white/10 transition-all border-white/10"
              >
                View Samples
              </button>
              <button 
                onClick={scrollToPricing}
                className="px-8 py-4 text-gray-400 hover:text-white font-medium transition-colors"
              >
                Pricing
              </button>
            </div>

            {/* Mock Social Proof */}
            <div className="pt-16 space-y-6">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Architected with industry leading models</p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-30 grayscale contrast-125">
                 <div className="text-2xl font-black italic">GEMINI</div>
                 <div className="text-2xl font-black italic">STRIPE</div>
                 <div className="text-2xl font-black italic">VEO</div>
                 <div className="text-2xl font-black italic">NEXT.JS</div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 glass p-10 rounded-[2.5rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                 <ICONS.Brain className="w-48 h-48" />
              </div>
              <div className="relative z-10 max-w-md">
                <div className="bg-blue-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20">
                  <ICONS.Zap className="text-blue-400 w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Neural Curriculum Engine</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Our custom-tuned Gemini models don't just list topics; they build deep learning taxonomies that ensure you master concepts in the most logical order.
                </p>
              </div>
            </div>

            <div className="md:col-span-4 glass p-10 rounded-[2.5rem] border-purple-500/20 group">
              <div className="bg-purple-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20">
                <ICONS.Play className="text-purple-400 w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Video Synapse</h3>
              <p className="text-gray-400 leading-relaxed">
                Smart integration with the world's largest educational libraries to find visual explanations that click.
              </p>
            </div>

            <div className="md:col-span-4 glass p-10 rounded-[2.5rem] border-pink-500/20">
              <div className="bg-pink-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border border-pink-500/20">
                <ICONS.Check className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Quiz Architect</h3>
              <p className="text-gray-400 text-sm">Adaptive multiple-choice assessments generated from your unique course path.</p>
            </div>

            <div className="md:col-span-8 glass p-10 rounded-[2.5rem] bg-gradient-to-br from-blue-600/5 to-transparent flex flex-col md:flex-row items-center gap-10">
              <div className="flex-grow">
                <h3 className="text-2xl font-bold mb-4">Focus Mode Interface</h3>
                <p className="text-gray-400 leading-relaxed">
                  A distraction-free viewer designed for high-retention learning. Toggle between summaries, videos, and active practice.
                </p>
              </div>
              <div className="w-full md:w-64 h-40 bg-black/40 rounded-2xl border border-white/5 flex items-center justify-center shadow-inner">
                 <div className="flex gap-1">
                   <div className="w-1 h-8 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                   <div className="w-1 h-12 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                   <div className="w-1 h-6 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inspiration Gallery */}
        <section ref={galleryRef} className="max-w-7xl mx-auto px-6 py-24 scroll-mt-24">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tight">Inspiration <span className="text-blue-500">Gallery</span></h2>
              <p className="text-gray-400 max-w-xl text-lg">
                Explore real courses generated by our community and see the depth of architecture possible with Lumina.
              </p>
            </div>
            <button 
              onClick={onStart}
              className="text-sm font-bold text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors pb-2"
            >
              Generate your own <ICONS.ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {SAMPLE_COURSES.map(course => (
              <div 
                key={course.id}
                className="glass rounded-3xl overflow-hidden group cursor-pointer border-white/5 hover:border-blue-500/30 transition-all flex flex-col shadow-xl"
                onClick={() => onViewSample(course)}
              >
                <div className="h-64 relative overflow-hidden">
                  <img 
                    src={course.imageUrl} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="px-3 py-1 bg-blue-500 text-white text-[10px] font-black uppercase rounded-lg tracking-widest mb-3 inline-block shadow-lg">SAMPLE</span>
                    <h3 className="text-xl font-bold leading-tight">{course.title}</h3>
                  </div>
                </div>
                <div className="p-6 space-y-4 flex-grow flex flex-col">
                  <p className="text-gray-400 text-sm line-clamp-2">{course.description}</p>
                  <div className="pt-4 mt-auto border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <ICONS.Layout className="w-3 h-3" />
                      {course.units.length} Units
                    </div>
                    <button className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-1">
                      Preview Course <ICONS.ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section ref={pricingRef} className="max-w-7xl mx-auto px-6 py-24 scroll-mt-24">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Simple <span className="gradient-text">Pricing</span></h2>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">
              Start your learning journey today. No credit card required for free tier.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free */}
            <div className="glass p-10 rounded-[2.5rem] flex flex-col border-white/5 hover:border-white/10 transition-all">
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-1">Architect</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">$0</span>
                  <span className="text-gray-500 text-sm">/mo</span>
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-3 text-sm text-gray-400">
                  <ICONS.Check className="w-4 h-4 text-green-500" /> 1 Course generation / day
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-400">
                  <ICONS.Check className="w-4 h-4 text-green-500" /> Standard AI access
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-400">
                  <ICONS.Check className="w-4 h-4 text-green-500" /> Basic Practice Quizzes
                </li>
              </ul>
              <button onClick={onStart} className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold transition-all">
                {isPro ? 'Included' : 'Current Plan'}
              </button>
            </div>

            {/* Pro */}
            <div className="glass p-10 rounded-[2.5rem] flex flex-col border-blue-500/40 relative shadow-[0_0_50px_rgba(59,130,246,0.1)] scale-105 z-20">
              <div className="absolute top-0 right-10 -translate-y-1/2 bg-blue-600 text-white text-[10px] px-4 py-1.5 rounded-full font-black tracking-widest uppercase shadow-lg">RECOMMENDED</div>
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-1 text-blue-400">Pro Architect</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">$19</span>
                  <span className="text-gray-500 text-sm">/mo</span>
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-3 text-sm">
                  <ICONS.Check className="w-4 h-4 text-blue-500" /> Unlimited generations
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <ICONS.Check className="w-4 h-4 text-blue-500" /> Priority Gemini 3 Pro
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <ICONS.Check className="w-4 h-4 text-blue-500" /> HD Video Synapse
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <ICONS.Check className="w-4 h-4 text-blue-500" /> Export to PDF/Markdown
                </li>
              </ul>
              <button 
                onClick={onUpgrade} 
                disabled={isPro}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-900/40 transition-all hover:translate-y-[-2px]"
              >
                {isPro ? 'Active' : 'Upgrade to Pro'}
              </button>
            </div>

            {/* Enterprise */}
            <div className="glass p-10 rounded-[2.5rem] flex flex-col border-white/5 hover:border-white/10 transition-all">
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-1">Nexus (Team)</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">$49</span>
                  <span className="text-gray-500 text-sm">/mo</span>
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-3 text-sm text-gray-400">
                  <ICONS.Check className="w-4 h-4 text-purple-500" /> Up to 10 Seats
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-400">
                  <ICONS.Check className="w-4 h-4 text-purple-500" /> Shared Knowledge Base
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-400">
                  <ICONS.Check className="w-4 h-4 text-purple-500" /> Team Analytics
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-400">
                  <ICONS.Check className="w-4 h-4 text-purple-500" /> Custom branding
                </li>
              </ul>
              <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold transition-all">
                Book Team Demo
              </button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Common Questions</h2>
            <p className="text-gray-400">Everything you need to know about the Lumina platform.</p>
          </div>
          <div className="space-y-4">
            {FAQ_DATA.map((faq, idx) => (
              <div 
                key={idx}
                className="glass rounded-2xl overflow-hidden border-white/5 transition-all"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg font-semibold">{faq.question}</span>
                  <div className={`transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-96' : 'max-h-0'}`}
                >
                  <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 bg-white/5">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="glass p-12 md:p-24 rounded-[3rem] text-center space-y-8 relative overflow-hidden shadow-[0_0_80px_rgba(59,130,246,0.15)]">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-purple-600/10 pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Ready to start your <br/><span className="gradient-text">next learning journey?</span></h2>
              <p className="text-gray-400 max-w-xl mx-auto text-lg pt-4">
                Stop browsing and start mastering. Create your first course in under 30 seconds.
              </p>
              <div className="pt-10">
                <button 
                  onClick={onStart}
                  className="px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-[0_20px_40px_rgba(37,99,235,0.2)] hover:translate-y-[-4px]"
                >
                  Create My Free Course
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
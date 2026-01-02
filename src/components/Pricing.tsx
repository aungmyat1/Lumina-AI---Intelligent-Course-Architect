import React, { useState } from 'react';
import { ICONS } from '@/src/constants';

interface PricingProps {
  onUpgrade: () => void;
  isPro: boolean;
}

const Pricing: React.FC<PricingProps> = ({ onUpgrade, isPro }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const prices = {
    free: 0,
    pro: billingCycle === 'monthly' ? 19 : 12,
    team: billingCycle === 'monthly' ? 49 : 39
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 text-center animate-in fade-in duration-700">
      <div className="space-y-6 mb-16">
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter">
          Invest in your <span className="gradient-text">Future.</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
          Unlock the full potential of AI-driven education with our flexible plans.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 pt-8">
          <span className={`text-sm font-bold ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-500'}`}>Monthly</span>
          <button 
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="w-14 h-7 bg-gray-800 rounded-full p-1 relative transition-colors border border-white/5"
          >
            <div className={`w-5 h-5 bg-blue-500 rounded-full shadow-lg transition-all duration-300 ${billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-0'}`} />
          </button>
          <span className={`text-sm font-bold ${billingCycle === 'yearly' ? 'text-white' : 'text-gray-500'}`}>
            Yearly <span className="text-green-400 text-[10px] ml-1 uppercase bg-green-500/10 px-1.5 py-0.5 rounded-md">Save 30%</span>
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
        {/* Free Plan */}
        <div className="glass p-10 rounded-[2.5rem] border-white/5 flex flex-col text-left hover:border-white/10 transition-all group">
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-2">Architect</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black">${prices.free}</span>
              <span className="text-gray-500 text-sm">/mo</span>
            </div>
            <p className="text-gray-500 text-sm mt-4 leading-relaxed">For individuals starting their self-learning journey.</p>
          </div>
          
          <ul className="space-y-5 mb-12 flex-grow">
            <li className="flex items-start gap-3 text-sm text-gray-400">
              <ICONS.Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
              <span>1 AI Course generation per day</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-400">
              <ICONS.Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
              <span>Access to standard Gemini Flash</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-400">
              <ICONS.Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
              <span>Interactive multiple-choice quizzes</span>
            </li>
          </ul>

          <button 
            disabled 
            className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-gray-500 cursor-not-allowed"
          >
            {isPro ? 'Included in Pro' : 'Current Plan'}
          </button>
        </div>

        {/* Pro Plan */}
        <div className="glass p-10 rounded-[2.5rem] border-blue-500/40 flex flex-col text-left relative shadow-[0_40px_80px_rgba(59,130,246,0.1)] scale-105 z-10 bg-gradient-to-b from-blue-600/5 to-transparent">
          <div className="absolute top-0 right-10 -translate-y-1/2 bg-blue-600 text-white text-[10px] px-4 py-1.5 rounded-full font-black tracking-widest uppercase shadow-[0_10px_20px_rgba(37,99,235,0.3)]">
            RECOMMENDED
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-2 text-blue-400 flex items-center gap-2">
              Pro Architect <ICONS.Zap className="w-4 h-4 fill-blue-400" />
            </h3>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black">${prices.pro}</span>
              <span className="text-gray-500 text-sm">/mo</span>
            </div>
            <p className="text-gray-400 text-sm mt-4 leading-relaxed">For serious learners building a custom digital academy.</p>
          </div>
          
          <ul className="space-y-5 mb-12 flex-grow">
            <li className="flex items-start gap-3 text-sm">
              <ICONS.Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
              <span>Unlimited course generations</span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <ICONS.Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
              <span>Priority Gemini 3 Pro access</span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <ICONS.Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
              <span>Deep-search HD video curation</span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <ICONS.Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
              <span>Export to PDF & Markdown</span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <ICONS.Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
              <span>Priority 24/7 AI Support</span>
            </li>
          </ul>

          <button 
            onClick={onUpgrade}
            disabled={isPro}
            className={`w-full py-4 rounded-2xl font-bold transition-all shadow-xl ${
              isPro 
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
                : 'bg-blue-600 hover:bg-blue-700 text-white hover:translate-y-[-2px] hover:shadow-blue-600/25 active:scale-95'
            }`}
          >
            {isPro ? 'Active Membership' : 'Upgrade to Pro'}
          </button>
        </div>

        {/* Team Plan */}
        <div className="glass p-10 rounded-[2.5rem] border-white/5 flex flex-col text-left hover:border-white/10 transition-all">
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-2">Nexus (Teams)</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black">${prices.team}</span>
              <span className="text-gray-500 text-sm">/mo</span>
            </div>
            <p className="text-gray-500 text-sm mt-4 leading-relaxed">For organizations scaling their internal knowledge.</p>
          </div>
          
          <ul className="space-y-5 mb-12 flex-grow">
            <li className="flex items-start gap-3 text-sm text-gray-400">
              <ICONS.Check className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
              <span>Up to 10 team seats</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-400">
              <ICONS.Check className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
              <span>Collaborative Course Architecting</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-400">
              <ICONS.Check className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
              <span>Shared Asset & Video Library</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-400">
              <ICONS.Check className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
              <span>SCORM / LMS API Integration</span>
            </li>
          </ul>

          <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-white hover:bg-white/10 transition-all">
            Book Team Demo
          </button>
        </div>
      </div>
      
      <p className="mt-16 text-gray-500 text-sm flex items-center justify-center gap-2">
        <ICONS.Check className="w-3 h-3" /> Secure payments via Stripe. Cancel anytime with 1-click.
      </p>
    </div>
  );
};

export default Pricing;
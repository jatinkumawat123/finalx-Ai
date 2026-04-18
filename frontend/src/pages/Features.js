import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, BookOpen, Sparkles, Code2, Star, TrendingUp, Image, Wand2, Brain, Shield, Zap, ArrowRight, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const featureModules = [
  {
    id: 'chat',
    icon: MessageSquare,
    color: '0,240,255',
    title: 'AI Chat Assistant',
    subtitle: 'Your all-purpose AI companion',
    desc: 'A powerful ChatGPT-like interface that can answer any question, help with any task, and provide expert-level advice on any topic.',
    capabilities: ['Multi-turn conversations', 'Code explanation & debugging', 'Essay writing & editing', 'Language translation', 'Creative brainstorming', 'Research assistance'],
    demo: 'Ask me anything — "Explain quantum entanglement in simple terms" or "Write a cover letter for a software job"'
  },
  {
    id: 'study',
    icon: BookOpen,
    color: '124,58,237',
    title: 'Study Module',
    subtitle: 'AI-powered academic assistant',
    desc: 'Transform any topic into structured notes, Q&A pairs, and exam preparation materials. Perfect for students at every level.',
    capabilities: ['Instant notes generation', 'Q&A solver for any subject', 'Exam preparation tips', 'Concept simplification', 'Formula sheets', 'Previous year pattern analysis'],
    demo: 'Try: "Generate notes on the French Revolution" or "Create 10 MCQs on thermodynamics"'
  },
  {
    id: 'content',
    icon: Sparkles,
    color: '236,72,153',
    title: 'Content Generator',
    subtitle: 'Go viral with AI content',
    desc: 'Generate high-performing social media content for Instagram, YouTube, Facebook, and more — in seconds.',
    capabilities: ['Instagram captions & hashtags', 'YouTube titles & scripts', 'Facebook viral post ideas', 'LinkedIn professional posts', 'Twitter/X thread ideas', 'Blog intro & headlines'],
    demo: 'Try: "Write 5 Instagram captions for a fitness transformation post with hashtags"'
  },
  {
    id: 'code',
    icon: Code2,
    color: '34,197,94',
    title: 'AI Code Builder',
    subtitle: 'Build websites & apps with words',
    desc: 'Describe what you want to build and get clean, working HTML, CSS, JavaScript code instantly. No coding experience needed.',
    capabilities: ['Full HTML/CSS/JS websites', 'Interactive mini-games', 'Landing page templates', 'Form & UI components', 'API integration examples', 'Code bug fixing'],
    demo: 'Try: "Build a responsive landing page for a food delivery app" or "Create a snake game in JavaScript"'
  },
  {
    id: 'astrology',
    icon: Star,
    color: '245,158,11',
    title: 'Astrology & Wellness',
    subtitle: 'Daily guidance for mind, body & soul',
    desc: 'Get personalized Rashi predictions, health tips, yoga guidance, and psychology insights to improve your daily life.',
    capabilities: ['Daily Rashi horoscope', 'Career & relationship insights', 'Health & yoga recommendations', 'Meditation guidance', 'Psychology tips & mindset', 'Monthly predictions'],
    demo: 'Try: "What does today hold for Scorpio?" or "Give me morning yoga routine for stress relief"'
  },
  {
    id: 'business',
    icon: TrendingUp,
    color: '0,240,255',
    title: 'Business & Income',
    subtitle: 'Your AI business advisor',
    desc: 'Get practical income ideas, business strategies, stock market basics, and freelancing guidance to start your financial journey.',
    capabilities: ['Income ideas for Indians', 'Freelancing on Fiverr/Upwork', 'Stock market basics (educational)', 'YouTube monetization tips', 'Dropshipping guidance', 'Digital products strategy'],
    demo: 'Try: "Give me 10 online income ideas for a college student in India" or "How to start dropshipping with ₹5000?"'
  }
];

const FeatureDetail = ({ mod, reversed }) => {
  const [activeCapability, setActiveCapability] = useState(null);
  return (
    <div id={mod.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', marginBottom: 100, direction: reversed ? 'rtl' : 'ltr' }}>
      <div style={{ direction: 'ltr' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 16px', borderRadius: 100, background: `rgba(${mod.color},0.1)`, border: `1px solid rgba(${mod.color},0.2)`, marginBottom: 20 }}>
          <mod.icon size={16} style={{ color: `rgb(${mod.color})` }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: `rgb(${mod.color})` }}>{mod.subtitle}</span>
        </div>
        <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>{mod.title}</h2>
        <p style={{ color: '#8892a4', fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>{mod.desc}</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 32 }}>
          {mod.capabilities.map(cap => (
            <div key={cap} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: `rgba(${mod.color},0.15)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Check size={10} style={{ color: `rgb(${mod.color})` }} />
              </div>
              <span style={{ fontSize: 13, color: '#cbd5e1' }}>{cap}</span>
            </div>
          ))}
        </div>
        <Link to="/signup" className="btn btn-primary" style={{ display: 'inline-flex' }}>
          Try {mod.title} <ArrowRight size={16} />
        </Link>
      </div>
      <div style={{ direction: 'ltr' }}>
        <div style={{ background: 'var(--bg-card)', borderRadius: 20, border: `1px solid rgba(${mod.color},0.15)`, overflow: 'hidden', boxShadow: `0 20px 60px rgba(${mod.color},0.08)` }}>
          {/* Terminal header */}
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: `1px solid rgba(${mod.color},0.1)` }}>
            {['#ef4444','#f59e0b','#22c55e'].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            ))}
            <span style={{ marginLeft: 8, fontSize: 12, color: '#4a5568', fontFamily: 'JetBrains Mono, monospace' }}>FinalX.AI — {mod.title}</span>
          </div>
          <div style={{ padding: 24 }}>
            <div style={{ padding: '12px 16px', background: `rgba(${mod.color},0.05)`, borderRadius: 12, marginBottom: 16, border: `1px solid rgba(${mod.color},0.1)` }}>
              <span style={{ fontSize: 12, color: `rgb(${mod.color})`, fontWeight: 600 }}>You:</span>
              <p style={{ fontSize: 14, color: '#e2e8f0', marginTop: 6, lineHeight: 1.6 }}>{mod.demo}</p>
            </div>
            <div style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg, #00f0ff, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Zap size={12} fill="white" color="white" />
                </div>
                <span style={{ fontSize: 12, color: '#00f0ff', fontWeight: 600 }}>FinalX.AI:</span>
              </div>
              <p style={{ fontSize: 13, color: '#8892a4', lineHeight: 1.7 }}>✨ Generating your response... Connect your API key for live responses. This module is fully functional and ready to use!</p>
              <div style={{ display: 'flex', gap: 4, marginTop: 10 }}>
                {[1,2,3].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: `rgb(${mod.color})`, opacity: 0.5, animation: `pulse-glow 1.2s ease-in-out infinite`, animationDelay: `${i*0.2}s` }} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Features = () => (
  <div>
    <Navbar />
    {/* Hero */}
    <section style={{ padding: '120px 24px 60px', textAlign: 'center' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div className="badge badge-violet" style={{ marginBottom: 20 }}>Everything Included</div>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 800, marginBottom: 20 }}>
          All Features. <span className="gradient-text">One Platform.</span>
        </h1>
        <p style={{ color: '#8892a4', fontSize: 18, lineHeight: 1.8 }}>
          FinalX.AI combines 6 powerful AI modules into a single, affordable platform — built specifically for Indian students, creators, and entrepreneurs.
        </p>
      </div>
    </section>

    {/* Feature modules */}
    <section style={{ padding: '40px 24px 100px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {featureModules.map((mod, i) => (
          <FeatureDetail key={mod.id} mod={mod} reversed={i % 2 !== 0} />
        ))}
      </div>
    </section>

    {/* Extra features grid */}
    <section style={{ padding: '60px 24px', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12 }}>Plus <span className="gradient-text">Much More</span></h2>
        <p style={{ color: '#8892a4', marginBottom: 48 }}>Every account comes loaded with these extras</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          {[
            { icon: Shield, label: 'Bank-grade Security', desc: 'JWT auth + encrypted data' },
            { icon: Zap, label: 'Lightning Fast', desc: 'Responses in under 2 seconds' },
            { icon: Brain, label: 'Smart Memory', desc: 'Chat history across sessions' },
            { icon: Wand2, label: 'No Code Needed', desc: 'Natural language interface' },
            { icon: Image, label: 'Image Prompts', desc: 'Generate prompts for DALL·E' },
            { icon: Star, label: 'Daily Updates', desc: 'Fresh AI content every day' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="card" style={{ textAlign: 'center', padding: 24 }}>
              <Icon size={28} style={{ color: '#00f0ff', marginBottom: 12 }} />
              <div style={{ fontFamily: 'Syne', fontWeight: 700, marginBottom: 6 }}>{label}</div>
              <div style={{ color: '#8892a4', fontSize: 13 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section style={{ padding: '80px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16 }}>Ready to <span className="gradient-text">Get Started?</span></h2>
        <p style={{ color: '#8892a4', marginBottom: 32 }}>Join thousands of users. 3-day free trial, no credit card needed.</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/signup" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: 16 }}>Start Free Trial <ArrowRight size={18} /></Link>
          <Link to="/pricing" className="btn btn-outline" style={{ padding: '14px 32px', fontSize: 16 }}>View Pricing</Link>
        </div>
      </div>
    </section>

    <Footer />
    <style>{`@media(max-width:768px){ .feature-grid { grid-template-columns: 1fr !important; direction: ltr !important; } }`}</style>
  </div>
);

export default Features;

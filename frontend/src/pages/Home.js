import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Code2, Star, TrendingUp, ArrowRight, Sparkles, MessageSquare, BookOpen, Wand2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const StatCard = ({ value, label }) => (
  <div style={{ textAlign: 'center' }}>
    <div className="gradient-text" style={{ fontFamily: 'Syne', fontSize: 40, fontWeight: 800 }}>{value}</div>
    <div style={{ color: '#8892a4', fontSize: 14, marginTop: 4 }}>{label}</div>
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc, color, delay }) => (
  <div className="card fade-in-up" style={{ animationDelay: delay, cursor: 'default' }}>
    <div style={{ width: 48, height: 48, borderRadius: 12, background: `rgba(${color},0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, border: `1px solid rgba(${color},0.2)` }}>
      <Icon size={22} style={{ color: `rgb(${color})` }} />
    </div>
    <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{title}</h3>
    <p style={{ color: '#8892a4', fontSize: 14, lineHeight: 1.7 }}>{desc}</p>
  </div>
);

const Home = () => {
  const heroRef = useRef(null);

  const features = [
    { icon: MessageSquare, title: 'AI Chat Assistant', desc: 'ChatGPT-like multi-purpose AI for study, coding, advice, and everything in between.', color: '0,240,255', delay: '0.1s' },
    { icon: BookOpen, title: 'Study Module', desc: 'Generate notes, solve Q&A, get exam prep tips. Study smarter with AI assistance.', color: '124,58,237', delay: '0.2s' },
    { icon: Sparkles, title: 'Content Generator', desc: 'Instagram captions, YouTube scripts, viral Facebook posts — generated in seconds.', color: '236,72,153', delay: '0.3s' },
    { icon: Code2, title: 'AI Code Builder', desc: 'Generate HTML, CSS, JS code. Build websites and games with natural language.', color: '34,197,94', delay: '0.4s' },
    { icon: Star, title: 'Astrology & Wellness', desc: 'Daily Rashi predictions, health tips, yoga guidance, and psychology insights.', color: '245,158,11', delay: '0.5s' },
    { icon: TrendingUp, title: 'Business & Income', desc: 'Income ideas, stock market education, freelancing tips, and entrepreneurship guidance.', color: '0,240,255', delay: '0.6s' },
  ];

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="grid-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        {/* Glowing orbs */}
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,240,255,0.08), transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.08), transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div className="badge badge-cyan fade-in-up" style={{ marginBottom: 24, animationDelay: '0s' }}>
            <Zap size={12} style={{ marginRight: 6 }} /> The Ultimate AI Platform — Made in India
          </div>

          <h1 className="fade-in-up" style={{ animationDelay: '0.1s', fontSize: 'clamp(42px, 7vw, 80px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 24 }}>
            Ask Anything.<br />
            <span className="gradient-text">Build Everything.</span>
          </h1>

          <p className="fade-in-up" style={{ animationDelay: '0.2s', color: '#8892a4', fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.8, maxWidth: 640, margin: '0 auto 40px' }}>
            FinalX.AI is your all-in-one AI platform for study, coding, content creation, business growth, astrology, and much more. One tool. Infinite possibilities.
          </p>

          <div className="fade-in-up" style={{ animationDelay: '0.3s', display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 60 }}>
            <Link to="/signup" className="btn btn-primary" style={{ fontSize: 16, padding: '14px 32px' }}>
              Start Free Trial <ArrowRight size={18} />
            </Link>
            <Link to="/features" className="btn btn-outline" style={{ fontSize: 16, padding: '14px 32px' }}>
              Explore Features
            </Link>
          </div>

          {/* Stats */}
          <div className="fade-in-up" style={{ animationDelay: '0.4s', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, maxWidth: 600, margin: '0 auto', padding: '32px', background: 'rgba(255,255,255,0.02)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.06)' }}>
            <StatCard value="10K+" label="Users" />
            <StatCard value="50+" label="AI Tools" />
            <StatCard value="99%" label="Uptime" />
            <StatCard value="3 Days" label="Free Trial" />
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section style={{ padding: '32px 24px', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: '#4a5568', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>Trusted by students & entrepreneurs across India</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
            {['IIT Students', 'Startup Founders', 'Content Creators', 'Freelancers', 'Job Seekers'].map(label => (
              <span key={label} style={{ color: '#8892a4', fontSize: 15, fontWeight: 500 }}>{label}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="badge badge-violet" style={{ marginBottom: 16 }}>Everything You Need</div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, marginBottom: 16 }}>
              One Platform. <span className="gradient-text">All Powers.</span>
            </h2>
            <p style={{ color: '#8892a4', fontSize: 17, maxWidth: 560, margin: '0 auto' }}>
              From exam prep to earning money online, FinalX.AI covers every aspect of your life.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {features.map(f => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '100px 24px', background: 'rgba(255,255,255,0.01)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div className="badge badge-amber" style={{ marginBottom: 16 }}>Simple & Fast</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: 16 }}>
            Get Started in <span className="gradient-text">3 Steps</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginTop: 56 }}>
            {[
              { step: '01', title: 'Sign Up Free', desc: 'Create your account and get 3 days of full access — completely free.' },
              { step: '02', title: 'Choose Your Tool', desc: 'Pick from AI Chat, Study, Content, Code, Astrology, or Business modules.' },
              { step: '03', title: 'Ask & Create', desc: 'Type your question or prompt and get instant AI-powered results.' }
            ].map(({ step, title, desc }) => (
              <div key={step} style={{ textAlign: 'center' }}>
                <div className="gradient-text" style={{ fontFamily: 'Syne', fontSize: 52, fontWeight: 800, marginBottom: 16, opacity: 0.6 }}>{step}</div>
                <h3 style={{ fontFamily: 'Syne', fontWeight: 700, marginBottom: 8 }}>{title}</h3>
                <p style={{ color: '#8892a4', fontSize: 14, lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(0,240,255,0.05), rgba(124,58,237,0.05))', border: '1px solid rgba(0,240,255,0.1)', borderRadius: 28, padding: '64px 40px' }}>
            <div style={{ animation: 'float 3s ease-in-out infinite' }}>
              <Wand2 size={48} style={{ color: '#00f0ff', marginBottom: 24 }} />
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: 16 }}>
              Ready to Transform<br /><span className="gradient-text">Your Productivity?</span>
            </h2>
            <p style={{ color: '#8892a4', marginBottom: 32 }}>Join thousands using FinalX.AI every day. Start free, upgrade anytime.</p>
            <Link to="/signup" className="btn btn-primary" style={{ fontSize: 16, padding: '16px 40px' }}>
              Start Free Trial — No Credit Card <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

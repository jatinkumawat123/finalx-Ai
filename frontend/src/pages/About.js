import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Heart, Globe, ArrowRight, Linkedin, Twitter, Github } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => (
  <div>
    <Navbar />

    {/* Hero */}
    <section style={{ padding: '120px 24px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,240,255,0.05), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative' }}>
        <div className="badge badge-cyan" style={{ marginBottom: 24 }}>Our Story</div>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 800, marginBottom: 20, lineHeight: 1.15 }}>
          Building AI for <span className="gradient-text">Every Indian</span>
        </h1>
        <p style={{ color: '#8892a4', fontSize: 18, lineHeight: 1.8 }}>
          FinalX.AI was born from a simple idea: powerful AI shouldn't be reserved for the privileged few. We're making cutting-edge artificial intelligence accessible, affordable, and useful for every student, creator, and entrepreneur in India.
        </p>
      </div>
    </section>

    {/* Mission */}
    <section style={{ padding: '60px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        {[
          { icon: Target, color: '0,240,255', title: 'Our Mission', desc: 'To democratize AI by providing a comprehensive, affordable platform that empowers Indians to study smarter, create better, and earn more — with the power of artificial intelligence.' },
          { icon: Heart, color: '236,72,153', title: 'Our Values', desc: 'Accessibility, affordability, and impact. We believe every student in Bihar, every creator in Mumbai, and every entrepreneur in Jaipur deserves access to world-class AI tools.' },
          { icon: Globe, color: '124,58,237', title: 'Our Vision', desc: 'To become India\'s most trusted AI platform — the one tool that every Indian reaches for when they need to learn, create, build, or grow their income.' },
        ].map(({ icon: Icon, color, title, desc }) => (
          <div key={title} className="card">
            <div style={{ width: 48, height: 48, borderRadius: 14, background: `rgba(${color},0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, border: `1px solid rgba(${color},0.2)` }}>
              <Icon size={22} style={{ color: `rgb(${color})` }} />
            </div>
            <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 20, marginBottom: 12 }}>{title}</h3>
            <p style={{ color: '#8892a4', lineHeight: 1.8, fontSize: 15 }}>{desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Founder */}
    <section style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="badge badge-amber" style={{ marginBottom: 16 }}>The Creator</div>
          <h2 style={{ fontSize: 40, fontWeight: 800 }}>Meet the <span className="gradient-text">Builder</span></h2>
        </div>
        <div style={{ background: 'var(--bg-card)', borderRadius: 24, padding: '40px', border: '1px solid rgba(0,240,255,0.15)', display: 'flex', gap: 40, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flexShrink: 0 }}>
            <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'linear-gradient(135deg, #00f0ff, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, fontWeight: 800, fontFamily: 'Syne', boxShadow: '0 0 40px rgba(0,240,255,0.3)' }}>
              JK
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <h3 style={{ fontFamily: 'Syne', fontSize: 26, fontWeight: 800, marginBottom: 4 }}>Jatin Kumawat</h3>
            <div className="badge badge-cyan" style={{ marginBottom: 16 }}>Founder & Developer</div>
            <p style={{ color: '#8892a4', lineHeight: 1.8, marginBottom: 20 }}>
              A passionate developer and entrepreneur from Rajasthan, India. Jatin built FinalX.AI with the vision of creating a comprehensive AI platform that's genuinely useful and affordable for everyday Indians. With expertise in full-stack development and a deep passion for AI, he's committed to making cutting-edge technology accessible to all.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8892a4', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#00f0ff'; e.currentTarget.style.borderColor = 'rgba(0,240,255,0.3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#8892a4'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}>
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section style={{ padding: '60px 24px', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32, textAlign: 'center' }}>
        {[
          { value: '2024', label: 'Founded' },
          { value: '6+', label: 'AI Modules' },
          { value: '₹9/mo', label: 'Lowest Price' },
          { value: '🇮🇳', label: 'Made in India' },
        ].map(({ value, label }) => (
          <div key={label}>
            <div className="gradient-text" style={{ fontFamily: 'Syne', fontSize: 44, fontWeight: 800 }}>{value}</div>
            <div style={{ color: '#8892a4', marginTop: 4 }}>{label}</div>
          </div>
        ))}
      </div>
    </section>

    {/* Tech stack */}
    <section style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12 }}>Built with <span className="gradient-text">Modern Tech</span></h2>
        <p style={{ color: '#8892a4', marginBottom: 40 }}>Industry-standard stack for reliability and performance</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth', 'Razorpay', 'OpenAI API', 'Vercel', 'MongoDB Atlas', 'Render.com'].map(tech => (
            <div key={tech} style={{ padding: '8px 20px', borderRadius: 100, background: 'rgba(0,240,255,0.05)', border: '1px solid rgba(0,240,255,0.15)', color: '#00f0ff', fontSize: 14, fontFamily: 'JetBrains Mono, monospace' }}>
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section style={{ padding: '60px 24px 100px', textAlign: 'center' }}>
      <div style={{ maxWidth: 500, margin: '0 auto' }}>
        <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16 }}>Join the <span className="gradient-text">Movement</span></h2>
        <p style={{ color: '#8892a4', marginBottom: 32 }}>Be part of India's AI revolution. Start your free trial today.</p>
        <Link to="/signup" className="btn btn-primary" style={{ padding: '14px 36px', fontSize: 16 }}>
          Get Started Free <ArrowRight size={18} />
        </Link>
      </div>
    </section>

    <Footer />
  </div>
);

export default About;

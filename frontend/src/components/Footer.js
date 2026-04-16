import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Twitter, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => (
  <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(4,5,8,0.8)', padding: '60px 24px 32px' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 60 }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: 'linear-gradient(135deg, #00f0ff, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={18} fill="white" color="white" />
            </div>
            <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 18 }}>
              <span style={{ color: '#f0f4ff' }}>Final</span><span className="gradient-text">X.AI</span>
            </span>
          </div>
          <p style={{ color: '#8892a4', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
            Ask Anything. Build Everything.<br />
            Built by <strong style={{ color: '#00f0ff' }}>Jatin Kumawat</strong>
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
              <a key={i} href="#" style={{ width: 36, height: 36, borderRadius: 9, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8892a4', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#00f0ff'; e.currentTarget.style.borderColor = 'rgba(0,240,255,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#8892a4'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}>
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Product */}
        <div>
          <h4 style={{ fontFamily: 'Syne', fontWeight: 700, marginBottom: 16, fontSize: 15 }}>Product</h4>
          {[['Features', '/features'], ['Pricing', '/pricing'], ['Dashboard', '/dashboard'], ['About', '/about']].map(([label, to]) => (
            <Link key={label} to={to} style={{ display: 'block', color: '#8892a4', fontSize: 14, marginBottom: 10, transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#00f0ff'} onMouseLeave={e => e.target.style.color = '#8892a4'}>{label}</Link>
          ))}
        </div>

        {/* Legal */}
        <div>
          <h4 style={{ fontFamily: 'Syne', fontWeight: 700, marginBottom: 16, fontSize: 15 }}>Legal</h4>
          {[['Terms & Conditions', '/terms'], ['Privacy Policy', '/privacy'], ['Refund Policy', '/refund']].map(([label, to]) => (
            <Link key={label} to={to} style={{ display: 'block', color: '#8892a4', fontSize: 14, marginBottom: 10, transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#00f0ff'} onMouseLeave={e => e.target.style.color = '#8892a4'}>{label}</Link>
          ))}
        </div>

        {/* Support */}
        <div>
          <h4 style={{ fontFamily: 'Syne', fontWeight: 700, marginBottom: 16, fontSize: 15 }}>Support</h4>
          <p style={{ color: '#8892a4', fontSize: 14, marginBottom: 12 }}>support@finalx.ai</p>
          <div className="badge badge-cyan" style={{ marginBottom: 12 }}>🇮🇳 Made in India</div>
          <p style={{ color: '#4a5568', fontSize: 12 }}>© 2024 FinalX.AI. All rights reserved.</p>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <p style={{ color: '#4a5568', fontSize: 13 }}>© 2024 FinalX.AI — Created by Jatin Kumawat</p>
        <p style={{ color: '#4a5568', fontSize: 13 }}>Powered by AI • Built for Everyone</p>
      </div>
    </div>
  </footer>
);

export default Footer;

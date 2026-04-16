import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Smartphone, Globe, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LegalLayout = ({ title, subtitle, children }) => (
  <div>
    <Navbar />
    <section style={{ padding: '120px 24px 80px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#8892a4', fontSize: 14, marginBottom: 32, transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#00f0ff'} onMouseLeave={e => e.currentTarget.style.color = '#8892a4'}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <div className="badge badge-cyan" style={{ marginBottom: 16 }}>{subtitle}</div>
        <h1 style={{ fontFamily: 'Syne', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, marginBottom: 16 }}>{title}</h1>
        <p style={{ color: '#4a5568', fontSize: 14, marginBottom: 48 }}>Last updated: December 2024 • Effective for all FinalX.AI users</p>
        <div style={{ background: 'var(--bg-card)', borderRadius: 20, padding: '40px', border: '1px solid var(--border)' }}>
          {children}
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 36 }}>
    <h2 style={{ fontFamily: 'Syne', fontSize: 20, fontWeight: 700, marginBottom: 12, color: '#f0f4ff' }}>{title}</h2>
    <div style={{ color: '#8892a4', lineHeight: 1.9, fontSize: 15 }}>{children}</div>
  </div>
);

export const Terms = () => (
  <LegalLayout title="Terms & Conditions" subtitle="Legal">
    <Section title="1. Acceptance of Terms">
      By accessing or using FinalX.AI ("the Platform"), you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services. These terms apply to all users, including free trial and paid subscribers.
    </Section>
    <Section title="2. Use of Service">
      <p>FinalX.AI provides AI-powered tools for study, content creation, coding, business insights, and wellness guidance. You agree to:</p>
      <ul style={{ marginTop: 12, paddingLeft: 20 }}>
        <li style={{ marginBottom: 8 }}>Use the service for lawful purposes only</li>
        <li style={{ marginBottom: 8 }}>Not attempt to reverse-engineer or exploit the platform</li>
        <li style={{ marginBottom: 8 }}>Not share your account credentials with others</li>
        <li style={{ marginBottom: 8 }}>Not use the service to generate harmful, illegal, or misleading content</li>
        <li>Comply with all applicable Indian and international laws</li>
      </ul>
    </Section>
    <Section title="3. Free Trial & Subscriptions">
      New users receive a 3-day free trial with limited features. After the trial, continued access requires a paid subscription (₹2 for 2 days or ₹9/month). Subscriptions are non-transferable. We reserve the right to modify pricing with notice.
    </Section>
    <Section title="4. Payments & Refunds">
      All payments are processed securely through Razorpay. Payments are in Indian Rupees (INR). Due to the digital nature of our service, refunds are generally not provided once a subscription is activated. Contact support@finalx.ai for disputes.
    </Section>
    <Section title="5. AI Content Disclaimer">
      FinalX.AI uses artificial intelligence to generate content. AI responses are for informational and entertainment purposes only. The astrology and wellness features are for general guidance only. Financial and business content is educational — not professional financial advice. Always consult qualified professionals for medical, legal, or financial decisions.
    </Section>
    <Section title="6. Intellectual Property">
      All content, branding, code, and design of FinalX.AI is the intellectual property of Jatin Kumawat and FinalX.AI. You may not reproduce or distribute our platform without written permission. Content generated through our AI tools may be used for personal and commercial purposes by the user who created it.
    </Section>
    <Section title="7. Account Termination">
      We reserve the right to suspend or terminate accounts that violate these terms. Users may delete their accounts at any time through the Settings page.
    </Section>
    <Section title="8. Contact">
      For legal inquiries, contact: <a href="mailto:support@finalx.ai" style={{ color: '#00f0ff' }}>support@finalx.ai</a>
    </Section>
  </LegalLayout>
);

export const Privacy = () => (
  <LegalLayout title="Privacy Policy" subtitle="Your Privacy Matters">
    <Section title="1. Information We Collect">
      <p>We collect the following information when you use FinalX.AI:</p>
      <ul style={{ marginTop: 12, paddingLeft: 20 }}>
        <li style={{ marginBottom: 8 }}><strong style={{ color: '#f0f4ff' }}>Account data:</strong> Name, email address, encrypted password</li>
        <li style={{ marginBottom: 8 }}><strong style={{ color: '#f0f4ff' }}>Usage data:</strong> AI prompts, responses, feature usage patterns</li>
        <li style={{ marginBottom: 8 }}><strong style={{ color: '#f0f4ff' }}>Payment data:</strong> Transaction IDs (no card numbers stored — handled by Razorpay)</li>
        <li><strong style={{ color: '#f0f4ff' }}>Technical data:</strong> IP address, browser type, device information</li>
      </ul>
    </Section>
    <Section title="2. How We Use Your Data">
      Your data is used to: provide and improve our AI services, process payments, send important account notifications, and prevent fraud. We do not sell your personal data to third parties.
    </Section>
    <Section title="3. Data Security">
      We implement industry-standard security measures: passwords are hashed with bcrypt, all data is transmitted over HTTPS, JWT tokens are used for authentication, and MongoDB Atlas provides enterprise-grade database security.
    </Section>
    <Section title="4. Data Retention">
      Chat history is retained for 90 days and can be deleted by you at any time from Settings. Account data is retained while your account is active. Upon account deletion, all personal data is removed within 30 days.
    </Section>
    <Section title="5. Cookies">
      FinalX.AI uses minimal cookies for authentication (JWT tokens stored in localStorage). We do not use advertising or tracking cookies.
    </Section>
    <Section title="6. Third-Party Services">
      We use: MongoDB Atlas (database), Razorpay (payments), OpenAI API (AI responses), and Vercel/Render (hosting). Each has their own privacy policies.
    </Section>
    <Section title="7. Your Rights">
      You have the right to access, correct, or delete your personal data. Contact support@finalx.ai to exercise these rights. Indian users are protected under the IT Act, 2000.
    </Section>
    <Section title="8. Contact">
      Privacy inquiries: <a href="mailto:support@finalx.ai" style={{ color: '#00f0ff' }}>support@finalx.ai</a> — Created by Jatin Kumawat, Rajasthan, India.
    </Section>
  </LegalLayout>
);

export const DownloadPage = () => (
  <div>
    <Navbar />
    <section style={{ minHeight: '100vh', padding: '120px 24px 80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: 700, width: '100%', textAlign: 'center' }}>
        <div className="badge badge-violet" style={{ marginBottom: 24 }}>Access FinalX.AI</div>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, marginBottom: 16 }}>
          Use <span className="gradient-text">FinalX.AI</span> Anywhere
        </h1>
        <p style={{ color: '#8892a4', fontSize: 17, lineHeight: 1.8, marginBottom: 52 }}>
          FinalX.AI works seamlessly in your browser. No downloads required — access all AI tools instantly on any device.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 48 }}>
          {[
            { icon: Globe, title: 'Web App', desc: 'Full featured experience in any modern browser', cta: 'Open App', to: '/dashboard', color: '0,240,255' },
            { icon: Smartphone, title: 'Mobile Browser', desc: 'Fully responsive design for iOS & Android browsers', cta: 'Open on Mobile', to: '/dashboard', color: '124,58,237' },
            { icon: Zap, title: 'PWA Coming Soon', desc: 'Installable Progressive Web App — coming in 2025', cta: 'Notify Me', to: '/signup', color: '236,72,153' },
          ].map(({ icon: Icon, title, desc, cta, to, color }) => (
            <div key={title} className="card" style={{ textAlign: 'left' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `rgba(${color},0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, border: `1px solid rgba(${color},0.2)` }}>
                <Icon size={22} style={{ color: `rgb(${color})` }} />
              </div>
              <h3 style={{ fontFamily: 'Syne', fontWeight: 700, marginBottom: 8 }}>{title}</h3>
              <p style={{ color: '#8892a4', fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>{desc}</p>
              <Link to={to} className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: 13 }}>
                {cta}
              </Link>
            </div>
          ))}
        </div>

        <div style={{ padding: 24, background: 'rgba(0,240,255,0.04)', borderRadius: 16, border: '1px solid rgba(0,240,255,0.1)' }}>
          <p style={{ color: '#8892a4', fontSize: 14 }}>
            📱 <strong style={{ color: '#f0f4ff' }}>Tip:</strong> On mobile, tap your browser's "Add to Home Screen" option to install FinalX.AI as an app icon on your device!
          </p>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

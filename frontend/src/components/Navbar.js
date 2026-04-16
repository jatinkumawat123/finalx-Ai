import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Zap, LogOut, User, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Features', to: '/features' },
    { label: 'Learn', to: '/features#study' },
    { label: 'Business', to: '/features#business' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'Images', to: '/features#images' },
    { label: 'Download', to: '/download' },
  ];

  const handleLogout = () => { logout(); navigate('/'); };
  const isActive = (to) => location.pathname === to;

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(4,5,8,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,240,255,0.08)' : '1px solid transparent',
        transition: 'all 0.3s ease',
        padding: '0 24px',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70 }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: 'linear-gradient(135deg, #00f0ff, #7c3aed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px rgba(0,240,255,0.3)'
            }}>
              <Zap size={20} fill="white" color="white" />
            </div>
            <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 20 }}>
              <span style={{ color: '#f0f4ff' }}>Final</span>
              <span className="gradient-text">X.AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
            {navLinks.map(link => (
              <Link key={link.label} to={link.to} style={{
                padding: '8px 14px', borderRadius: 8,
                fontSize: 14, fontWeight: 500,
                color: isActive(link.to) ? '#00f0ff' : '#8892a4',
                background: isActive(link.to) ? 'rgba(0,240,255,0.08)' : 'transparent',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { if (!isActive(link.to)) e.target.style.color = '#f0f4ff'; }}
              onMouseLeave={e => { if (!isActive(link.to)) e.target.style.color = '#8892a4'; }}
              >{link.label}</Link>
            ))}
          </div>

          {/* Auth buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {user ? (
              <>
                <Link to="/dashboard" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: 14 }}>
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
                <button onClick={handleLogout} className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: 14 }}>
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" style={{ color: '#8892a4', fontSize: 14, fontWeight: 500, padding: '8px 16px', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#f0f4ff'}
                  onMouseLeave={e => e.target.style.color = '#8892a4'}>
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: 14 }}>
                  Get Started
                </Link>
              </>
            )}
            {/* Mobile toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="mobile-menu-btn"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: 8, color: '#f0f4ff', cursor: 'pointer', display: 'none' }}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: 70, left: 0, right: 0, zIndex: 999,
          background: 'rgba(8,11,18,0.98)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,240,255,0.08)',
          padding: '20px 24px', animation: 'fadeInUp 0.2s ease'
        }}>
          {navLinks.map(link => (
            <Link key={link.label} to={link.to} style={{
              display: 'block', padding: '12px 0', color: '#8892a4',
              borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 16
            }}>{link.label}</Link>
          ))}
          <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
            {user ? (
              <>
                <Link to="/dashboard" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Dashboard</Link>
                <button onClick={handleLogout} className="btn btn-ghost" style={{ flex: 1 }}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>Login</Link>
                <Link to="/signup" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;

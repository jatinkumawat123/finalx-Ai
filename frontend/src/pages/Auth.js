import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Zap, Eye, EyeOff, ArrowRight, Shield } from 'lucide-react';

const AuthLayout = ({ children, title, subtitle }) => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'radial-gradient(circle at 50% 0%, rgba(0,240,255,0.05), transparent 60%), radial-gradient(circle at 80% 80%, rgba(124,58,237,0.05), transparent 60%)' }} className="grid-bg">
    <div style={{ width: '100%', maxWidth: 440 }}>
      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginBottom: 40 }}>
        <div style={{ width: 42, height: 42, borderRadius: 12, background: 'linear-gradient(135deg, #00f0ff, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 24px rgba(0,240,255,0.3)' }}>
          <Zap size={22} fill="white" color="white" />
        </div>
        <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 22 }}>
          <span style={{ color: '#f0f4ff' }}>Final</span><span className="gradient-text">X.AI</span>
        </span>
      </Link>

      <div className="card" style={{ padding: 36 }}>
        <h1 style={{ fontFamily: 'Syne', fontSize: 26, fontWeight: 800, marginBottom: 8 }}>{title}</h1>
        <p style={{ color: '#8892a4', marginBottom: 32 }}>{subtitle}</p>
        {children}
      </div>
    </div>
  </div>
);

export const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back! 🚀');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back 👋" subtitle="Sign in to your FinalX.AI account">
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#8892a4' }}>Email</label>
          <input className="input-field" type="email" placeholder="you@example.com" value={form.email}
            onChange={e => setForm({...form, email: e.target.value})} required />
        </div>
        <div style={{ marginBottom: 24, position: 'relative' }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#8892a4' }}>Password</label>
          <input className="input-field" type={showPass ? 'text' : 'password'} placeholder="••••••••" value={form.password}
            onChange={e => setForm({...form, password: e.target.value})} required style={{ paddingRight: 48 }} />
          <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 14, bottom: 14, background: 'none', border: 'none', color: '#8892a4', cursor: 'pointer' }}>
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 15, marginBottom: 20 }}>
          {loading ? <><div className="spinner" /> Signing in...</> : <>Sign In <ArrowRight size={18} /></>}
        </button>
      </form>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', color: '#4a5568', fontSize: 13, marginBottom: 16 }}>
        <Shield size={14} /> Secure • Encrypted • Private
      </div>
      <p style={{ textAlign: 'center', color: '#8892a4', fontSize: 14 }}>
        Don't have an account? <Link to="/signup" style={{ color: '#00f0ff', fontWeight: 600 }}>Sign up free</Link>
      </p>
    </AuthLayout>
  );
};

export const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success('Account created! 3-day free trial started! 🎉');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create Account ✨" subtitle="Get 3 days free trial — no credit card needed">
      <div className="badge badge-green" style={{ marginBottom: 24, display: 'inline-flex' }}>🎁 3 Days Free Trial Included</div>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#8892a4' }}>Full Name</label>
          <input className="input-field" type="text" placeholder="Jatin Kumawat" value={form.name}
            onChange={e => setForm({...form, name: e.target.value})} required />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#8892a4' }}>Email</label>
          <input className="input-field" type="email" placeholder="you@example.com" value={form.email}
            onChange={e => setForm({...form, email: e.target.value})} required />
        </div>
        <div style={{ marginBottom: 24, position: 'relative' }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#8892a4' }}>Password</label>
          <input className="input-field" type={showPass ? 'text' : 'password'} placeholder="Min 6 characters" value={form.password}
            onChange={e => setForm({...form, password: e.target.value})} required style={{ paddingRight: 48 }} />
          <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 14, bottom: 14, background: 'none', border: 'none', color: '#8892a4', cursor: 'pointer' }}>
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 15, marginBottom: 16 }}>
          {loading ? <><div className="spinner" /> Creating account...</> : <>Create Account <ArrowRight size={18} /></>}
        </button>
      </form>
      <p style={{ color: '#4a5568', fontSize: 12, textAlign: 'center', marginBottom: 16 }}>
        By signing up, you agree to our <Link to="/terms" style={{ color: '#8892a4' }}>Terms</Link> and <Link to="/privacy" style={{ color: '#8892a4' }}>Privacy Policy</Link>
      </p>
      <p style={{ textAlign: 'center', color: '#8892a4', fontSize: 14 }}>
        Already have an account? <Link to="/login" style={{ color: '#00f0ff', fontWeight: 600 }}>Sign in</Link>
      </p>
    </AuthLayout>
  );
};

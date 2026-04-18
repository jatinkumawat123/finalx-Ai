import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, API } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { User, Lock, Crown, Trash2, Save, ArrowLeft, Shield } from 'lucide-react';

const Settings = () => {
  const { user, updateUser, logout } = useAuth();
  const [tab, setTab] = useState('profile');
  const [profile, setProfile] = useState({ name: user?.name || '' });
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [loading, setLoading] = useState(false);

  const saveProfile = async () => {
    if (!profile.name.trim()) return toast.error('Name cannot be empty');
    setLoading(true);
    try {
      const res = await API.put('/user/profile', { name: profile.name });
      updateUser({ name: res.data.user.name });
      toast.success('Profile updated! ✅');
    } catch { toast.error('Update failed'); }
    finally { setLoading(false); }
  };

  const changePassword = async () => {
    if (passwords.newPass !== passwords.confirm) return toast.error('Passwords do not match');
    if (passwords.newPass.length < 6) return toast.error('Password must be at least 6 characters');
    setLoading(true);
    try {
      await API.put('/user/password', { currentPassword: passwords.current, newPassword: passwords.newPass });
      toast.success('Password changed! 🔐');
      setPasswords({ current: '', newPass: '', confirm: '' });
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    finally { setLoading(false); }
  };

  const clearHistory = async () => {
    if (!window.confirm('Clear all chat history? This cannot be undone.')) return;
    try {
      await API.delete('/user/history');
      toast.success('History cleared');
    } catch { toast.error('Failed'); }
  };

  const subPlan = user?.subscription?.plan;
  const subEnd = user?.subscription?.endDate ? new Date(user.subscription.endDate).toLocaleDateString('en-IN') : 'N/A';
  const isActive = user?.subscription?.isActive;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'subscription', label: 'Subscription', icon: Crown },
    { id: 'data', label: 'Data & Privacy', icon: Shield },
  ];

  const inputStyle = { width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '12px 16px', color: '#f0f4ff', fontFamily: 'DM Sans', fontSize: 15, outline: 'none', transition: 'border 0.2s' };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: '32px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
          <Link to="/dashboard" style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8892a4' }}>
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 style={{ fontFamily: 'Syne', fontSize: 26, fontWeight: 800 }}>Settings</h1>
            <p style={{ color: '#8892a4', fontSize: 14 }}>Manage your account preferences</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24, alignItems: 'start' }}>
          {/* Sidebar tabs */}
          <div style={{ background: 'var(--bg-card)', borderRadius: 16, padding: 12, border: '1px solid var(--border)' }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, border: 'none', cursor: 'pointer', marginBottom: 4, background: tab === t.id ? 'rgba(0,240,255,0.1)' : 'transparent', color: tab === t.id ? '#00f0ff' : '#8892a4', fontFamily: 'DM Sans', fontSize: 14, fontWeight: tab === t.id ? 600 : 400, transition: 'all 0.2s' }}>
                <t.icon size={17} />
                {t.label}
              </button>
            ))}
            <div style={{ borderTop: '1px solid var(--border)', marginTop: 8, paddingTop: 8 }}>
              <button onClick={() => { logout(); window.location.href = '/'; }}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, border: 'none', background: 'rgba(239,68,68,0.08)', color: '#ef4444', cursor: 'pointer', fontFamily: 'DM Sans', fontSize: 14 }}>
                Sign Out
              </button>
            </div>
          </div>

          {/* Content */}
          <div>
            {tab === 'profile' && (
              <div style={{ background: 'var(--bg-card)', borderRadius: 20, padding: 32, border: '1px solid var(--border)' }}>
                <h2 style={{ fontFamily: 'Syne', fontWeight: 700, marginBottom: 8 }}>Profile Information</h2>
                <p style={{ color: '#8892a4', fontSize: 14, marginBottom: 28 }}>Update your account details</p>

                {/* Avatar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28, padding: 20, background: 'rgba(255,255,255,0.02)', borderRadius: 14, border: '1px solid var(--border)' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #00f0ff, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontFamily: 'Syne', fontWeight: 800 }}>
                    {user?.name?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 17 }}>{user?.name}</div>
                    <div style={{ color: '#8892a4', fontSize: 14 }}>{user?.email}</div>
                    <div className="badge badge-cyan" style={{ marginTop: 6, fontSize: 11 }}>{subPlan?.toUpperCase() || 'FREE'}</div>
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#8892a4', marginBottom: 8 }}>Full Name</label>
                  <input style={inputStyle} value={profile.name} onChange={e => setProfile({ name: e.target.value })}
                    onFocus={e => e.target.style.borderColor = 'rgba(0,240,255,0.4)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                </div>
                <div style={{ marginBottom: 28 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#8892a4', marginBottom: 8 }}>Email Address</label>
                  <input style={{ ...inputStyle, opacity: 0.5, cursor: 'not-allowed' }} value={user?.email} disabled />
                  <p style={{ color: '#4a5568', fontSize: 12, marginTop: 6 }}>Email cannot be changed</p>
                </div>
                <button onClick={saveProfile} className="btn btn-primary" disabled={loading}>
                  {loading ? <><div className="spinner" /> Saving...</> : <><Save size={16} /> Save Changes</>}
                </button>
              </div>
            )}

            {tab === 'security' && (
              <div style={{ background: 'var(--bg-card)', borderRadius: 20, padding: 32, border: '1px solid var(--border)' }}>
                <h2 style={{ fontFamily: 'Syne', fontWeight: 700, marginBottom: 8 }}>Change Password</h2>
                <p style={{ color: '#8892a4', fontSize: 14, marginBottom: 28 }}>Keep your account secure with a strong password</p>
                {['Current Password', 'New Password', 'Confirm New Password'].map((label, i) => {
                  const keys = ['current', 'newPass', 'confirm'];
                  return (
                    <div key={label} style={{ marginBottom: 16 }}>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#8892a4', marginBottom: 8 }}>{label}</label>
                      <input type="password" style={inputStyle} placeholder="••••••••"
                        value={passwords[keys[i]]}
                        onChange={e => setPasswords({ ...passwords, [keys[i]]: e.target.value })}
                        onFocus={ev => ev.target.style.borderColor = 'rgba(0,240,255,0.4)'}
                        onBlur={ev => ev.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                    </div>
                  );
                })}
                <div style={{ height: 8 }} />
                <button onClick={changePassword} className="btn btn-primary" disabled={loading}>
                  {loading ? <><div className="spinner" /> Updating...</> : <><Lock size={16} /> Change Password</>}
                </button>
                <div style={{ marginTop: 24, padding: 16, background: 'rgba(0,240,255,0.04)', borderRadius: 12, border: '1px solid rgba(0,240,255,0.1)' }}>
                  <p style={{ color: '#8892a4', fontSize: 13 }}>🔐 Your password is encrypted with bcrypt. FinalX.AI never stores plain text passwords.</p>
                </div>
              </div>
            )}

            {tab === 'subscription' && (
              <div style={{ background: 'var(--bg-card)', borderRadius: 20, padding: 32, border: '1px solid var(--border)' }}>
                <h2 style={{ fontFamily: 'Syne', fontWeight: 700, marginBottom: 28 }}>Subscription Status</h2>
                <div style={{ padding: 24, background: isActive ? 'rgba(0,240,255,0.05)' : 'rgba(245,158,11,0.05)', borderRadius: 16, border: `1px solid ${isActive ? 'rgba(0,240,255,0.15)' : 'rgba(245,158,11,0.15)'}`, marginBottom: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                    <div>
                      <div style={{ fontSize: 13, color: '#8892a4', marginBottom: 4 }}>Current Plan</div>
                      <div style={{ fontFamily: 'Syne', fontSize: 22, fontWeight: 800, color: isActive ? '#00f0ff' : '#f59e0b', textTransform: 'uppercase' }}>{subPlan || 'Free'}</div>
                      <div style={{ fontSize: 13, color: '#8892a4', marginTop: 4 }}>
                        {isActive ? `Active until ${subEnd}` : 'No active subscription'}
                      </div>
                    </div>
                    <div className={`badge ${isActive ? 'badge-green' : 'badge-amber'}`} style={{ fontSize: 13 }}>
                      {isActive ? '● Active' : '● Inactive'}
                    </div>
                  </div>
                </div>
                {!isActive || subPlan === 'trial' ? (
                  <div>
                    <p style={{ color: '#8892a4', marginBottom: 16 }}>Upgrade to unlock unlimited AI requests and premium features.</p>
                    <Link to="/pricing" className="btn btn-primary" style={{ display: 'inline-flex' }}>
                      <Crown size={16} /> Upgrade Plan
                    </Link>
                  </div>
                ) : (
                  <div style={{ padding: 16, background: 'rgba(34,197,94,0.05)', borderRadius: 12, border: '1px solid rgba(34,197,94,0.15)' }}>
                    <p style={{ color: '#22c55e', fontSize: 14 }}>✅ You have full access to all FinalX.AI features!</p>
                  </div>
                )}
              </div>
            )}

            {tab === 'data' && (
              <div style={{ background: 'var(--bg-card)', borderRadius: 20, padding: 32, border: '1px solid var(--border)' }}>
                <h2 style={{ fontFamily: 'Syne', fontWeight: 700, marginBottom: 8 }}>Data & Privacy</h2>
                <p style={{ color: '#8892a4', fontSize: 14, marginBottom: 28 }}>Manage your personal data</p>

                <div style={{ padding: 20, background: 'rgba(239,68,68,0.05)', borderRadius: 14, border: '1px solid rgba(239,68,68,0.15)', marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ fontFamily: 'Syne', fontWeight: 600, marginBottom: 4 }}>Clear Chat History</div>
                      <p style={{ color: '#8892a4', fontSize: 13 }}>Permanently delete all your AI conversation history</p>
                    </div>
                    <button onClick={clearHistory} className="btn btn-danger" style={{ flexShrink: 0 }}>
                      <Trash2 size={15} /> Clear History
                    </button>
                  </div>
                </div>

                <div style={{ padding: 16, background: 'rgba(0,240,255,0.04)', borderRadius: 12, border: '1px solid rgba(0,240,255,0.08)' }}>
                  <p style={{ color: '#8892a4', fontSize: 13, lineHeight: 1.8 }}>
                    🔒 <strong style={{ color: '#f0f4ff' }}>Your data is safe.</strong> FinalX.AI uses JWT authentication, bcrypt password hashing, and never shares your data with third parties. Read our <Link to="/privacy" style={{ color: '#00f0ff' }}>Privacy Policy</Link>.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

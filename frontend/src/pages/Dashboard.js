import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, API } from '../context/AuthContext';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';
import { Zap, MessageSquare, BookOpen, Sparkles, Code2, Star, TrendingUp, Send, LogOut, Settings, Crown, History, Trash2, Menu, X, User } from 'lucide-react';

const modules = [
  { id: 'chat', label: 'AI Chat', icon: MessageSquare, color: '#00f0ff', placeholder: 'Ask me anything...' },
  { id: 'study', label: 'Study Helper', icon: BookOpen, color: '#7c3aed', placeholder: 'Ask a study question or topic...' },
  { id: 'content', label: 'Content Creator', icon: Sparkles, color: '#ec4899', placeholder: 'Describe what content you need...' },
  { id: 'code', label: 'Code Builder', icon: Code2, color: '#22c55e', placeholder: 'Describe the code you want to build...' },
  { id: 'astrology', label: 'Astrology', icon: Star, color: '#f59e0b', placeholder: 'Enter your Rashi or ask about today...' },
  { id: 'business', label: 'Business & Income', icon: TrendingUp, color: '#00f0ff', placeholder: 'Ask about business or earning ideas...' },
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState(modules[0]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadHistory = async () => {
    try {
      const res = await API.get('/ai/history');
      setHistory(res.data.history);
    } catch {}
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input.trim(), time: new Date().toLocaleTimeString() };
    setMessages(prev => [...prev, userMsg]);
    const promptText = input.trim();
    setInput('');
    setLoading(true);
    try {
      const res = await API.post('/ai/chat', { prompt: promptText, module: activeModule.id });
      setMessages(prev => [...prev, { role: 'ai', content: res.data.response, time: new Date().toLocaleTimeString() }]);
    } catch (err) {
      const code = err.response?.data?.code;
      if (code === 'SUBSCRIPTION_REQUIRED' || code === 'USAGE_LIMIT') {
        toast.error('Free limit reached! Please upgrade to continue.');
        setMessages(prev => [...prev, { role: 'ai', content: '⚠️ **Free usage limit reached.** Please [upgrade your plan](/pricing) to continue using FinalX.AI.', time: new Date().toLocaleTimeString(), isError: true }]);
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

  const clearChat = () => { setMessages([]); toast.success('Chat cleared'); };

  const handleLogout = () => { logout(); navigate('/'); };

  const isTrialActive = user?.subscription?.plan === 'trial' && user?.subscription?.isActive;
  const isPremium = ['basic', 'premium'].includes(user?.subscription?.plan) && user?.subscription?.isActive;

  const subLabel = isPremium ? 'Premium' : isTrialActive ? 'Free Trial' : 'Free';
  const subColor = isPremium ? '#22c55e' : isTrialActive ? '#00f0ff' : '#f59e0b';

  return (
    <div style={{ height: '100vh', display: 'flex', overflow: 'hidden', background: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? 260 : 0, minWidth: sidebarOpen ? 260 : 0,
        background: 'var(--bg-secondary)', borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        transition: 'all 0.3s ease', flexShrink: 0
      }}>
        {/* Logo */}
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid var(--border)' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #00f0ff, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={16} fill="white" color="white" />
            </div>
            <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 16 }}>
              <span>Final</span><span className="gradient-text">X.AI</span>
            </span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid var(--border)' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #00f0ff, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <User size={16} color="white" />
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: 13, fontWeight: 600, fontFamily: 'Syne', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
              <div style={{ fontSize: 11, color: subColor, fontWeight: 600 }}>{subLabel}</div>
            </div>
          </div>
        </div>

        {/* Modules */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 12px' }}>
          <p style={{ fontSize: 11, color: '#4a5568', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, padding: '0 8px' }}>AI Modules</p>
          {modules.map(mod => (
            <button key={mod.id} onClick={() => { setActiveModule(mod); setMessages([]); }}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                borderRadius: 10, border: 'none', cursor: 'pointer', marginBottom: 4,
                background: activeModule.id === mod.id ? `rgba(${mod.color === '#00f0ff' ? '0,240,255' : mod.color === '#7c3aed' ? '124,58,237' : mod.color === '#ec4899' ? '236,72,153' : mod.color === '#22c55e' ? '34,197,94' : mod.color === '#f59e0b' ? '245,158,11' : '0,240,255'},0.1)` : 'transparent',
                color: activeModule.id === mod.id ? mod.color : '#8892a4',
                transition: 'all 0.2s',
                fontFamily: 'DM Sans', fontSize: 14, fontWeight: activeModule.id === mod.id ? 600 : 400
              }}>
              <mod.icon size={17} />
              {mod.label}
            </button>
          ))}

          <div style={{ marginTop: 16 }}>
            <p style={{ fontSize: 11, color: '#4a5568', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, padding: '0 8px' }}>Actions</p>
            <button onClick={() => { loadHistory(); setShowHistory(true); }}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, border: 'none', background: 'transparent', color: '#8892a4', cursor: 'pointer', fontFamily: 'DM Sans', fontSize: 14 }}>
              <History size={17} /> Chat History
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ padding: '12px', borderTop: '1px solid var(--border)' }}>
          {!isPremium && (
            <Link to="/pricing" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: 'linear-gradient(135deg, rgba(0,240,255,0.1), rgba(124,58,237,0.1))', borderRadius: 10, marginBottom: 8, border: '1px solid rgba(0,240,255,0.15)', color: '#00f0ff', fontSize: 13, fontWeight: 600 }}>
              <Crown size={16} /> Upgrade to Premium
            </Link>
          )}
          <div style={{ display: 'flex', gap: 8 }}>
            <Link to="/settings" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: '#8892a4', fontSize: 13 }}>
              <Settings size={15} /> Settings
            </Link>
            <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', borderRadius: 8, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', cursor: 'pointer', fontSize: 13 }}>
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-secondary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px', color: '#8892a4', cursor: 'pointer', display: 'flex' }}>
              <Menu size={18} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `rgba(${activeModule.color === '#00f0ff' ? '0,240,255' : '124,58,237'},0.15)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <activeModule.icon size={17} style={{ color: activeModule.color }} />
              </div>
              <div>
                <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 15 }}>{activeModule.label}</div>
                <div style={{ fontSize: 12, color: '#4a5568' }}>FinalX.AI • {messages.length} messages</div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={clearChat} className="btn btn-ghost" style={{ padding: '7px 14px', fontSize: 13 }}>
              <Trash2 size={15} /> Clear
            </button>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px' }}>
          {messages.length === 0 && (
            <div style={{ textAlign: 'center', paddingTop: 60 }}>
              <div style={{ animation: 'float 3s ease-in-out infinite', marginBottom: 20 }}>
                <activeModule.icon size={52} style={{ color: activeModule.color, opacity: 0.5 }} />
              </div>
              <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 22, marginBottom: 8 }}>{activeModule.label}</h3>
              <p style={{ color: '#8892a4', marginBottom: 32 }}>{activeModule.placeholder}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
                {activeModule.id === 'chat' && ['What is quantum computing?', 'Write a Python function', 'How to improve focus?'].map(s => (
                  <button key={s} onClick={() => setInput(s)} style={{ padding: '8px 16px', borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', color: '#8892a4', cursor: 'pointer', fontSize: 13 }}>{s}</button>
                ))}
                {activeModule.id === 'study' && ['Explain photosynthesis', 'Newton\'s laws of motion', 'What is trigonometry?'].map(s => (
                  <button key={s} onClick={() => setInput(s)} style={{ padding: '8px 16px', borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', color: '#8892a4', cursor: 'pointer', fontSize: 13 }}>{s}</button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} style={{ marginBottom: 20, display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              {msg.role === 'ai' && (
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #00f0ff, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginRight: 10, marginTop: 4 }}>
                  <Zap size={16} fill="white" color="white" />
                </div>
              )}
              <div style={{
                maxWidth: '75%',
                padding: '12px 16px', borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                background: msg.role === 'user' ? 'linear-gradient(135deg, rgba(0,240,255,0.15), rgba(124,58,237,0.15))' : 'var(--bg-card)',
                border: '1px solid',
                borderColor: msg.role === 'user' ? 'rgba(0,240,255,0.2)' : 'var(--border)',
                fontSize: 14, lineHeight: 1.7,
              }}>
                {msg.role === 'ai' ? (
                  <div style={{ color: '#e2e8f0' }}>
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  <span style={{ color: '#f0f4ff' }}>{msg.content}</span>
                )}
                <div style={{ fontSize: 11, color: '#4a5568', marginTop: 6, textAlign: 'right' }}>{msg.time}</div>
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #00f0ff, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={16} fill="white" color="white" />
              </div>
              <div style={{ padding: '12px 16px', background: 'var(--bg-card)', borderRadius: '16px 16px 16px 4px', border: '1px solid var(--border)', display: 'flex', gap: 6 }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#00f0ff', animation: 'pulse-glow 1.2s ease-in-out infinite', animationDelay: `${i * 0.2}s`, opacity: 0.7 }} />
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', background: 'var(--bg-card)', borderRadius: 14, border: '1px solid rgba(0,240,255,0.15)', padding: '12px 14px' }}>
            <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
              placeholder={activeModule.placeholder} rows={1}
              style={{ flex: 1, background: 'none', border: 'none', color: '#f0f4ff', fontFamily: 'DM Sans', fontSize: 15, resize: 'none', outline: 'none', lineHeight: 1.6, maxHeight: 120, overflowY: 'auto' }}
              onInput={e => { e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'; }}
            />
            <button onClick={sendMessage} disabled={!input.trim() || loading}
              style={{ width: 40, height: 40, borderRadius: 10, background: input.trim() && !loading ? 'linear-gradient(135deg, #00f0ff, #7c3aed)' : 'rgba(255,255,255,0.05)', border: 'none', cursor: input.trim() && !loading ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
              {loading ? <div className="spinner" style={{ width: 16, height: 16 }} /> : <Send size={17} color={input.trim() ? 'white' : '#4a5568'} />}
            </button>
          </div>
          <p style={{ textAlign: 'center', color: '#4a5568', fontSize: 11, marginTop: 8 }}>
            Press Enter to send • Shift+Enter for newline • Powered by FinalX.AI
          </p>
        </div>
      </main>

      {/* History Modal */}
      {showHistory && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }} onClick={() => setShowHistory(false)}>
          <div style={{ background: 'var(--bg-card)', borderRadius: 20, padding: 24, width: '100%', maxWidth: 560, maxHeight: '70vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid var(--border)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'Syne', fontWeight: 700 }}>Chat History</h3>
              <button onClick={() => setShowHistory(false)} style={{ background: 'none', border: 'none', color: '#8892a4', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div style={{ overflowY: 'auto', flex: 1 }}>
              {history.length === 0 ? <p style={{ color: '#8892a4', textAlign: 'center', padding: 32 }}>No history yet</p> : (
                history.map((item, i) => (
                  <div key={i} style={{ padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 12, color: '#00f0ff', marginBottom: 4, textTransform: 'capitalize' }}>{item.module} • {new Date(item.timestamp).toLocaleDateString()}</div>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{item.prompt.substring(0, 80)}...</div>
                    <div style={{ color: '#8892a4', fontSize: 13 }}>{item.response.substring(0, 100)}...</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

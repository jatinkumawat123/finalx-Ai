import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, API } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Check, Zap, Crown, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const plans = [
  {
    id: 'trial',
    name: '3-Day Free Trial',
    price: '₹0',
    period: 'free',
    color: '#00f0ff',
    icon: Zap,
    badge: 'Start Here',
    features: ['Access to all AI modules', '5 requests/session', 'AI Chat, Study, Content', 'Code Generator', 'Astrology module', 'Business ideas'],
    cta: 'Start Free Trial',
    link: '/signup'
  },
  {
    id: 'basic',
    name: '2-Day Plan',
    price: '₹2',
    period: '2 days',
    color: '#ec4899',
    icon: Star,
    badge: 'Quick Access',
    features: ['Everything in Free Trial', 'Unlimited AI requests', 'Priority responses', 'All 6 AI modules', 'Chat history (30 days)', 'Email support'],
    cta: 'Get 2-Day Access',
    planKey: 'basic'
  },
  {
    id: 'premium',
    name: 'Monthly Premium',
    price: '₹9',
    period: 'per month',
    color: '#7c3aed',
    icon: Crown,
    badge: '🔥 Best Value',
    popular: true,
    features: ['Everything in 2-Day Plan', 'Unlimited requests', 'OpenAI-powered responses', 'Full chat history', 'Export conversations', 'Priority support', 'Early feature access', 'Custom AI persona'],
    cta: 'Go Premium',
    planKey: 'premium'
  }
];

const Pricing = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(null);

  const handlePayment = async (plan) => {
    if (!user) { window.location.href = '/signup'; return; }
    setLoading(plan.planKey);
    try {
      const res = await API.post('/payment/create-order', { plan: plan.planKey });
      
      if (res.data.demo) {
        // Demo mode - simulate payment
        await API.post('/payment/verify', {
          razorpay_order_id: res.data.orderId,
          razorpay_payment_id: 'demo_payment_' + Date.now(),
          razorpay_signature: 'demo_sig',
          plan: plan.planKey
        });
        toast.success(`${plan.name} activated! 🎉`);
        setTimeout(() => window.location.href = '/dashboard', 1500);
        return;
      }

      // Real Razorpay
      const options = {
        key: res.data.key,
        amount: res.data.amount * 100,
        currency: res.data.currency,
        name: 'FinalX.AI',
        description: plan.name,
        order_id: res.data.orderId,
        theme: { color: '#00f0ff' },
        handler: async (response) => {
          try {
            await API.post('/payment/verify', { ...response, plan: plan.planKey });
            toast.success('Payment successful! 🎉');
            setTimeout(() => window.location.href = '/dashboard', 1500);
          } catch { toast.error('Payment verification failed'); }
        }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error('Payment failed. Try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div>
      <Navbar />
      <section style={{ minHeight: '100vh', padding: '120px 24px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="badge badge-cyan" style={{ marginBottom: 16 }}>Affordable & Powerful</div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, marginBottom: 16 }}>
              Simple <span className="gradient-text">Pricing</span>
            </h1>
            <p style={{ color: '#8892a4', fontSize: 18, maxWidth: 500, margin: '0 auto' }}>
              Start free, scale as you grow. Made affordable for Indian students and entrepreneurs.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {plans.map(plan => (
              <div key={plan.id} style={{
                background: 'var(--bg-card)', borderRadius: 24, padding: 32, border: '1px solid',
                borderColor: plan.popular ? `rgba(${plan.color === '#7c3aed' ? '124,58,237' : '0,240,255'},0.3)` : 'var(--border)',
                position: 'relative', transition: 'all 0.3s',
                boxShadow: plan.popular ? `0 0 40px rgba(124,58,237,0.15)` : 'none'
              }}>
                {plan.popular && (
                  <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', padding: '4px 20px', borderRadius: 100, fontSize: 12, fontWeight: 700, fontFamily: 'Syne', whiteSpace: 'nowrap' }}>
                    {plan.badge}
                  </div>
                )}
                {!plan.popular && (
                  <div className={`badge badge-${plan.color === '#00f0ff' ? 'cyan' : 'amber'}`} style={{ marginBottom: 16 }}>{plan.badge}</div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `rgba(${plan.color === '#00f0ff' ? '0,240,255' : plan.color === '#7c3aed' ? '124,58,237' : '236,72,153'},0.12)`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid rgba(${plan.color === '#00f0ff' ? '0,240,255' : plan.color === '#7c3aed' ? '124,58,237' : '236,72,153'},0.2)` }}>
                    <plan.icon size={22} style={{ color: plan.color }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 15 }}>{plan.name}</div>
                    <div style={{ fontSize: 12, color: '#8892a4' }}>{plan.period}</div>
                  </div>
                </div>

                <div style={{ marginBottom: 28 }}>
                  <span style={{ fontFamily: 'Syne', fontSize: 52, fontWeight: 800, color: plan.color }}>{plan.price}</span>
                  <span style={{ color: '#8892a4', fontSize: 14, marginLeft: 6 }}>/ {plan.period}</span>
                </div>

                <div style={{ marginBottom: 28 }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: `rgba(${plan.color === '#00f0ff' ? '0,240,255' : plan.color === '#7c3aed' ? '124,58,237' : '236,72,153'},0.15)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={11} style={{ color: plan.color }} />
                      </div>
                      <span style={{ fontSize: 14, color: '#cbd5e1' }}>{f}</span>
                    </div>
                  ))}
                </div>

                {plan.link ? (
                  <Link to={plan.link} className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', borderColor: `rgba(${plan.color === '#00f0ff' ? '0,240,255' : '0,240,255'},0.3)`, color: plan.color }}>
                    {plan.cta}
                  </Link>
                ) : (
                  <button onClick={() => handlePayment(plan)} disabled={loading === plan.planKey} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', background: plan.popular ? `linear-gradient(135deg, ${plan.color}, #ec4899)` : `linear-gradient(135deg, ${plan.color}, #0a8a97)` }}>
                    {loading === plan.planKey ? <><div className="spinner" /> Processing...</> : plan.cta}
                  </button>
                )}
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 48, padding: 24, background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid var(--border)' }}>
            <p style={{ color: '#8892a4', fontSize: 14 }}>
              🔒 Secure payments via Razorpay • 🇮🇳 UPI, Cards, Net Banking accepted • 💯 No hidden charges
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Pricing;

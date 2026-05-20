import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import {
  ArrowRight, MessageSquare, Bot, BarChart3, TrendingUp, Zap, Database,
  ChevronLeft, ChevronRight, Star, Play, CheckCircle2,
} from 'lucide-react';
import { SectionReveal } from '../components/SectionReveal';
import { ParticleBackground } from '../components/ParticleBackground';

/* ─────────────── DATA ─────────────── */

const TRUSTED_COMPANIES = [
  'Birlasoft', 'Ford Credit', 'THK Manufacturing', 'Bayer', 'Rainforest Alliance',
  'Shortlist', 'Reliance Industries', 'Adobe Systems', 'Cisco Networks', 'SAP Partners',
  'Oracle Enterprise', 'Infosys', 'Birlasoft', 'Ford Credit', 'THK Manufacturing', 'Bayer',
];

const CAPABILITIES = [
  { icon: <MessageSquare size={28} />, title: 'Conversational Analytics', desc: 'Ask data questions using natural language. Get instant visual insights without writing a single query.' },
  { icon: <Bot size={28} />, title: 'AI Agents', desc: 'Autonomous AI agents that proactively surface insights, detect anomalies, and trigger automated workflows.' },
  { icon: <BarChart3 size={28} />, title: 'Embedded Analytics', desc: 'Bring powerful BI directly into your products and portals for a seamless, white-label user experience.' },
  { icon: <TrendingUp size={28} />, title: 'Predictive Analytics', desc: 'Forecast future trends and patterns with ML models trained on your historical enterprise data.' },
  { icon: <Zap size={28} />, title: 'Real-Time Data Sync', desc: 'Integrate and synchronize 200+ data sources with real-time streaming and automated refresh.' },
  { icon: <Database size={28} />, title: 'Data Integration', desc: 'Build a unified enterprise data ecosystem — ETL, ELT, and reverse ETL in one connected platform.' },
];

const SUCCESS_STORIES = [
  { industry: 'Healthcare', title: 'Behavioral Health Analytics', metric: '42% faster insights', desc: 'A leading behavioral health network unified patient data across 40 facilities, enabling real-time population health monitoring and reducing report generation time by 80%.', tags: ['Healthcare', 'Real-Time', 'Compliance'] },
  { industry: 'Manufacturing', title: 'Production Optimization', metric: '$2.3M cost savings', desc: 'A global automotive manufacturer used predictive analytics to reduce machine downtime by 35%, optimize inventory, and improve overall equipment effectiveness dramatically.', tags: ['Manufacturing', 'Predictive', 'IoT'] },
  { industry: 'Marketing', title: 'Campaign Intelligence', metric: '3.8× ROI improvement', desc: 'A digital media company used Lumenore Ask Me for campaign performance analysis, reducing analytics query time from hours to seconds across 50+ global markets.', tags: ['Marketing', 'Attribution', 'AI'] },
];

const TESTIMONIALS = [
  { name: 'Rajiv Mehta', role: 'VP of Analytics, Birlasoft', text: 'Lumenore has completely transformed how our teams access and use data. The conversational analytics feature is a game-changer for non-technical business users.' },
  { name: 'Jennifer Walsh', role: 'Director of Data, Ford Credit', text: 'Implementation was smooth and ROI was visible within the first quarter. The AI agents surface insights we would never have found through manual analysis.' },
  { name: 'Hans Mueller', role: 'Head of Business Intelligence, Bayer', text: 'Our analytics capability went from monthly reports to real-time decision making. Embedded analytics integrates perfectly with our existing enterprise stack.' },
  { name: 'Tanya Krishnan', role: 'Analytics Lead, THK Manufacturing', text: 'Predictive maintenance powered by Lumenore saved us millions in prevented downtime. Data integration across 20 global plants is completely seamless.' },
  { name: 'David Park', role: 'Data Manager, Rainforest Alliance', text: 'The NLQ engine is incredibly accurate. Our field teams now query complex sustainability data without any technical knowledge — just plain English.' },
];

const INNOVATIONS = [
  { date: 'May 2026', title: 'Guided RCA Integration', desc: 'AI-powered Root Cause Analysis that walks users through systematic investigation workflows, suggesting potential causes and cross-metric correlations.', badge: 'NEW' },
  { date: 'Apr 2026', title: 'AI Agents Enhancement', desc: 'Next-gen autonomous AI agents that monitor KPIs, detect anomalies, and trigger automated remediation workflows without human intervention.', badge: 'UPDATED' },
  { date: 'Mar 2026', title: 'AI Dashboard Creation', desc: 'Describe your analytics needs in plain English and watch Lumenore generate a complete, interactive dashboard with the right charts automatically.', badge: 'FEATURED' },
  { date: 'Feb 2026', title: 'NLQ Engine v3.0', desc: 'Massive upgrade to our natural language query engine with 95%+ accuracy across 15 languages and support for complex multi-step analytical questions.', badge: 'MAJOR' },
];

/* ─────────────── DASHBOARD MOCKUP ─────────────── */

function DashboardMockup() {
  const bars = [35, 55, 40, 70, 45, 85, 60, 90, 65, 95, 72, 88];
  return (
    <div style={{ background: 'rgba(12, 17, 29, 0.97)', borderRadius: '18px', border: '1px solid rgba(48,174,180,0.3)', padding: '1.25rem', boxShadow: '0 0 80px rgba(48,174,180,0.18), 0 40px 100px rgba(0,0,0,0.7)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #30AEB4, #7DD3DA, #30AEB4, transparent)' }} />

      {/* Window bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['#ff5f57', '#ffbd2e', '#28c940'].map(c => <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#30AEB4', boxShadow: '0 0 5px #30AEB4' }} />
          <span style={{ color: 'rgba(255,255,255,0.22)', fontSize: '0.58rem', letterSpacing: '0.08em' }}>LUMENORE ANALYTICS PLATFORM</span>
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {[1, 2, 3].map(i => <div key={i} style={{ width: '18px', height: '5px', borderRadius: '2px', background: i === 1 ? 'rgba(48,174,180,0.5)' : 'rgba(255,255,255,0.07)' }} />)}
        </div>
      </div>

      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.45rem', marginBottom: '0.65rem' }}>
        {[
          { l: 'Revenue', v: '$4.2M', c: '↑ 12.5%', up: true },
          { l: 'Active Users', v: '20.4K', c: '↑ 8.3%', up: true },
          { l: 'Conversion', v: '3.6%', c: '↑ 2.1%', up: true },
          { l: 'Churn', v: '1.2%', c: '↓ 0.4%', up: false },
        ].map(k => (
          <div key={k.l} style={{ background: 'rgba(48,174,180,0.07)', border: '1px solid rgba(48,174,180,0.13)', borderRadius: '7px', padding: '0.45rem 0.5rem' }}>
            <div style={{ fontSize: '0.49rem', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{k.l}</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fff', margin: '0.1rem 0' }}>{k.v}</div>
            <div style={{ fontSize: '0.49rem', color: k.up ? '#30AEB4' : '#ef4444' }}>{k.c}</div>
          </div>
        ))}
      </div>

      {/* Chart row */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.015)', borderRadius: '7px', border: '1px solid rgba(48,174,180,0.09)', padding: '0.55rem', height: '105px' }}>
          <div style={{ fontSize: '0.48rem', color: 'rgba(255,255,255,0.25)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Revenue Trend</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2.5px', height: '64px' }}>
            {bars.map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, background: i === bars.length - 1 ? '#30AEB4' : `rgba(48,174,180,${0.2 + i * 0.035})`, borderRadius: '2px 2px 0 0' }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.3rem' }}>
            {['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'].map(m => <span key={m} style={{ fontSize: '0.41rem', color: 'rgba(255,255,255,0.16)' }}>{m}</span>)}
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.015)', borderRadius: '7px', border: '1px solid rgba(48,174,180,0.09)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '105px', padding: '0.55rem' }}>
          <div style={{ fontSize: '0.48rem', color: 'rgba(255,255,255,0.25)', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'center' }}>Goal</div>
          <svg width="54" height="54" viewBox="0 0 54 54">
            <circle cx="27" cy="27" r="22" fill="none" stroke="rgba(48,174,180,0.12)" strokeWidth="4.5" />
            <circle cx="27" cy="27" r="22" fill="none" stroke="#30AEB4" strokeWidth="4.5" strokeDasharray="109 29" strokeDashoffset="27" strokeLinecap="round" transform="rotate(-90 27 27)" />
            <text x="27" y="31" textAnchor="middle" fill="#fff" fontSize="8.5" fontWeight="bold">79%</text>
          </svg>
        </div>
      </div>

      {/* AI insight bar */}
      <div style={{ background: 'rgba(48,174,180,0.08)', border: '1px solid rgba(48,174,180,0.2)', borderRadius: '7px', padding: '0.45rem 0.65rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
        <div style={{ width: '14px', height: '14px', borderRadius: '3px', background: 'rgba(48,174,180,0.2)', border: '1px solid rgba(48,174,180,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#30AEB4', boxShadow: '0 0 4px #30AEB4' }} />
        </div>
        <span style={{ fontSize: '0.53rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>
          <span style={{ color: '#30AEB4', fontWeight: 700 }}>AI Insight: </span>
          Revenue up 12.5% this quarter. Consider expanding Southeast Asia growth channels for Q3 targets.
        </span>
      </div>
    </div>
  );
}

/* ─────────────── PRODUCT MOCKUPS ─────────────── */

function InsightsMockup() {
  const bars = [65, 40, 75, 55, 90, 45, 70, 80];
  return (
    <div style={{ background: 'rgba(12,17,29,0.96)', borderRadius: '12px', border: '1px solid rgba(48,174,180,0.2)', padding: '1rem', position: 'relative', overflow: 'hidden', height: '190px' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #30AEB4, transparent)' }} />
      <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.28)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Sales Performance Dashboard</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', marginBottom: '0.55rem' }}>
        {[{ v: '+24%', l: 'Growth' }, { v: '$1.8M', l: 'Pipeline' }].map(d => (
          <div key={d.l} style={{ background: 'rgba(48,174,180,0.08)', borderRadius: '6px', padding: '0.4rem 0.5rem', border: '1px solid rgba(48,174,180,0.12)' }}>
            <div style={{ color: '#30AEB4', fontSize: '0.9rem', fontWeight: 800 }}>{d.v}</div>
            <div style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.5rem' }}>{d.l}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '72px' }}>
        {bars.map((h, i) => <div key={i} style={{ flex: 1, height: `${h}%`, background: `rgba(48,174,180,${0.28 + i * 0.07})`, borderRadius: '2px 2px 0 0' }} />)}
      </div>
    </div>
  );
}

function AskMeMockup() {
  const messages = [
    { from: 'user', text: 'Show Q2 revenue by region' },
    { from: 'ai', text: 'North America leads: $2.4M (+18%). Asia Pacific at $1.1M (+32%).' },
    { from: 'user', text: 'Which region has highest growth?' },
  ];
  return (
    <div style={{ background: 'rgba(12,17,29,0.96)', borderRadius: '12px', border: '1px solid rgba(125,211,218,0.2)', padding: '1rem', height: '190px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #7DD3DA, transparent)' }} />
      <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.28)', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Ask Me Anything</div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.35rem', overflow: 'hidden' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ background: m.from === 'user' ? 'rgba(48,174,180,0.2)' : 'rgba(255,255,255,0.04)', border: `1px solid ${m.from === 'user' ? 'rgba(48,174,180,0.3)' : 'rgba(255,255,255,0.07)'}`, borderRadius: '8px', padding: '0.3rem 0.5rem', fontSize: '0.51rem', color: m.from === 'user' ? '#30AEB4' : 'rgba(255,255,255,0.55)', maxWidth: '85%', lineHeight: 1.4 }}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.5rem' }}>
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(125,211,218,0.2)', borderRadius: '6px', padding: '0.3rem 0.5rem', fontSize: '0.49rem', color: 'rgba(255,255,255,0.2)' }}>Ask a question...</div>
        <div style={{ width: '26px', height: '26px', borderRadius: '6px', background: 'linear-gradient(135deg, #30AEB4, #1A8E94)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <div style={{ width: 0, height: 0, borderLeft: '6px solid white', borderTop: '4px solid transparent', borderBottom: '4px solid transparent', marginLeft: '1px' }} />
        </div>
      </div>
    </div>
  );
}

function DataMagnetMockup() {
  const sources = ['Salesforce', 'SAP', 'MySQL', 'REST API', 'Excel', 'BigQuery'];
  return (
    <div style={{ background: 'rgba(12,17,29,0.96)', borderRadius: '12px', border: '1px solid rgba(48,174,180,0.2)', padding: '1rem', height: '190px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #30AEB4, transparent)' }} />
      <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.28)', marginBottom: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Connected Data Sources</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem', marginBottom: '0.5rem' }}>
        {sources.map((s, i) => (
          <div key={s} style={{ background: 'rgba(48,174,180,0.07)', border: '1px solid rgba(48,174,180,0.15)', borderRadius: '6px', padding: '0.35rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}>
            <div style={{ width: '18px', height: '18px', borderRadius: '4px', background: 'rgba(48,174,180,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: `${6 + (i % 3)}px`, height: `${6 + (i % 3)}px`, borderRadius: '50%', background: '#30AEB4', opacity: 0.7 + i * 0.05 }} />
            </div>
            <span style={{ fontSize: '0.44rem', color: 'rgba(255,255,255,0.45)', textAlign: 'center', lineHeight: 1.2 }}>{s}</span>
          </div>
        ))}
      </div>
      <div style={{ background: 'rgba(48,174,180,0.08)', borderRadius: '6px', padding: '0.3rem 0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#28c940', boxShadow: '0 0 5px #28c940', flexShrink: 0 }} />
        <span style={{ fontSize: '0.49rem', color: 'rgba(255,255,255,0.38)' }}>6 sources synced · Last updated 2 min ago</span>
      </div>
    </div>
  );
}

/* ─────────────── TESTIMONIAL CAROUSEL ─────────────── */

function LumenoreTestimonials() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setIdx(i => (i + 1) % TESTIMONIALS.length);

  const visible = [
    TESTIMONIALS[idx],
    TESTIMONIALS[(idx + 1) % TESTIMONIALS.length],
    TESTIMONIALS[(idx + 2) % TESTIMONIALS.length],
  ];

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
        {visible.map((t, i) => (
          <div
            key={`${idx}-${i}`}
            style={{
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(48,174,180,0.15)',
              borderRadius: '16px',
              padding: '1.75rem',
              transition: 'all 0.5s ease',
              opacity: i === 0 ? 1 : i === 1 ? 0.85 : 0.65,
            }}
          >
            <div style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}>
              {[...Array(5)].map((_, si) => <Star key={si} size={14} style={{ fill: '#30AEB4', color: '#30AEB4' }} />)}
            </div>
            <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.25rem', fontStyle: 'italic' }}>
              "{t.text}"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #30AEB4, #1A8E94)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>
                {t.name.charAt(0)}
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fff' }}>{t.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#30AEB4' }}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
        <button onClick={prev} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(48,174,180,0.1)', border: '1px solid rgba(48,174,180,0.3)', color: '#30AEB4', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(48,174,180,0.25)'; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(48,174,180,0.1)'; }}>
          <ChevronLeft size={18} />
        </button>
        <div style={{ display: 'flex', gap: '6px' }}>
          {TESTIMONIALS.map((_, i) => (
            <div key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? '20px' : '6px', height: '6px', borderRadius: '3px', background: i === idx ? '#30AEB4' : 'rgba(48,174,180,0.3)', transition: 'all 0.3s ease', cursor: 'pointer' }} />
          ))}
        </div>
        <button onClick={next} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(48,174,180,0.1)', border: '1px solid rgba(48,174,180,0.3)', color: '#30AEB4', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(48,174,180,0.25)'; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(48,174,180,0.1)'; }}>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

/* ─────────────── MAIN PAGE ─────────────── */

export function Lumenore() {
  const [hoveredStory, setHoveredStory] = useState<number | null>(null);

  return (
    <div style={{ background: '#0B0F19' }}>

      {/* ===== HERO ===== */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(48,174,180,0.09) 0%, #0B0F19 70%)' }}>
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
        <div style={{ position: 'absolute', inset: 0 }}>
          <ParticleBackground count={60} />
        </div>
        <div style={{ position: 'absolute', top: '15%', left: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(48,174,180,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(125,211,218,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '8rem 2rem 4rem', position: 'relative', zIndex: 2, width: '100%' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem', justifyContent: 'space-between' }}>

            {/* Left: Hero text */}
            <div style={{ flex: '1 1 380px', maxWidth: '580px', animation: 'slide-in-up 0.8s ease 0.2s both' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(48,174,180,0.1)', border: '1px solid rgba(48,174,180,0.3)', borderRadius: '100px', padding: '0.375rem 1rem', marginBottom: '1.5rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#30AEB4', boxShadow: '0 0 8px #30AEB4', animation: 'glow-pulse 1.5s ease infinite' }} />
                <span style={{ color: '#30AEB4', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.05em' }}>AI-DRIVEN ANALYTICS PLATFORM</span>
              </div>

              <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', fontFamily: "'Sora', sans-serif" }}>
                Lumenore –{' '}
                <span className="animated-gradient-text">AI-Driven Analytics</span>
                {' '}& Business Intelligence
              </h1>

              <p style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', color: 'rgba(255,255,255,0.62)', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '500px' }}>
                Turn enterprise data into actionable insights using AI-powered analytics, conversational intelligence, real-time dashboards, and predictive insights — all in one unified platform.
              </p>

              {/* Trust badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', padding: '0.75rem 1.25rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(48,174,180,0.15)', borderRadius: '12px', width: 'fit-content' }}>
                <div style={{ display: 'flex' }}>
                  {['#30AEB4', '#7DD3DA', '#1A8E94', '#4BC3C9'].map((c, i) => (
                    <div key={i} style={{ width: '28px', height: '28px', borderRadius: '50%', background: `linear-gradient(135deg, ${c}, ${c}88)`, border: '2px solid rgba(11,15,25,0.8)', marginLeft: i === 0 ? 0 : '-8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 700, color: '#fff' }}>
                      {['B', 'F', 'T', '+'].at(i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>Trusted by 20,000+ Users</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>Across enterprise teams worldwide</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #30AEB4, #1A8E94)', color: '#fff', padding: '0.875rem 2rem', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem', boxShadow: '0 0 30px rgba(48,174,180,0.4)', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 0 50px rgba(48,174,180,0.65)'; el.style.transform = 'translateY(-2px)'; }} onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 0 30px rgba(48,174,180,0.4)'; el.style.transform = 'translateY(0)'; }}>
                  Request Demo <ArrowRight size={18} />
                </Link>
                <button style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', color: '#fff', padding: '0.875rem 2rem', borderRadius: '10px', fontWeight: 600, fontSize: '0.95rem', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#30AEB4'; el.style.color = '#30AEB4'; }} onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.15)'; el.style.color = '#fff'; }}>
                  <Play size={16} /> Explore Platform
                </button>
              </div>
            </div>

            {/* Right: Dashboard mockup */}
            <div style={{ flex: '0 1 520px', minWidth: '280px', animation: 'slide-in-up 0.8s ease 0.5s both' }}>
              <DashboardMockup />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', letterSpacing: '0.1em', zIndex: 2 }}>
          <span>SCROLL</span>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, rgba(48,174,180,0.6), transparent)', animation: 'float-up-down 2s ease infinite' }} />
        </div>
      </section>

      {/* ===== TRUSTED BY ===== */}
      <section style={{ padding: '5rem 0', borderTop: '1px solid rgba(48,174,180,0.08)', borderBottom: '1px solid rgba(48,174,180,0.08)', overflow: 'hidden', background: 'rgba(17,24,39,0.4)' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem', padding: '0 2rem' }}>
          <SectionReveal>
            <span style={{ color: '#30AEB4', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>TRUSTED BY LEADING ENTERPRISES</span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, marginTop: '0.5rem', fontFamily: "'Sora', sans-serif" }}>
              Trusted by <span className="gradient-text">20,000+ Users</span> Across Enterprise Teams
            </h2>
          </SectionReveal>
        </div>
        <style>{`
          @keyframes marquee-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          .lumenore-marquee { animation: marquee-scroll 30s linear infinite; }
          .lumenore-marquee:hover { animation-play-state: paused; }
        `}</style>
        <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}>
          <div className="lumenore-marquee" style={{ display: 'flex', width: 'max-content', gap: '2rem' }}>
            {[...TRUSTED_COMPANIES, ...TRUSTED_COMPANIES].map((company, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(48,174,180,0.15)', borderRadius: '100px', padding: '0.6rem 1.4rem', whiteSpace: 'nowrap', transition: 'all 0.3s ease', cursor: 'default' }} onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(48,174,180,0.4)'; el.style.background = 'rgba(48,174,180,0.06)'; }} onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(48,174,180,0.15)'; el.style.background = 'rgba(255,255,255,0.03)'; }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#30AEB4', flexShrink: 0 }} />
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', fontWeight: 600 }}>{company}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PLATFORM CAPABILITIES ===== */}
      <section style={{ padding: '7rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(48,174,180,0.04) 0%, transparent 70%)' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
          <SectionReveal>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{ color: '#30AEB4', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>PLATFORM CAPABILITIES</span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 800, marginTop: '0.5rem', fontFamily: "'Sora', sans-serif" }}>
                Everything You Need to <span className="gradient-text">Unlock Your Data</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '1rem', maxWidth: '560px', margin: '1rem auto 0', lineHeight: 1.7 }}>
                A complete analytics platform built for modern enterprises — from ingestion to insight.
              </p>
            </div>
          </SectionReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {CAPABILITIES.map((cap, i) => (
              <SectionReveal key={cap.title} delay={i * 100}>
                <div
                  style={{ background: 'rgba(255,255,255,0.025)', backdropFilter: 'blur(16px)', border: '1px solid rgba(48,174,180,0.14)', borderRadius: '16px', padding: '1.75rem', transition: 'all 0.35s ease', cursor: 'default', height: '100%' }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(48,174,180,0.45)'; el.style.boxShadow = '0 0 30px rgba(48,174,180,0.12)'; el.style.transform = 'translateY(-4px)'; el.style.background = 'rgba(48,174,180,0.04)'; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(48,174,180,0.14)'; el.style.boxShadow = 'none'; el.style.transform = 'translateY(0)'; el.style.background = 'rgba(255,255,255,0.025)'; }}
                >
                  <div style={{ width: '58px', height: '58px', borderRadius: '14px', background: 'rgba(48,174,180,0.1)', border: '1px solid rgba(48,174,180,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#30AEB4', marginBottom: '1.25rem', boxShadow: '0 0 20px rgba(48,174,180,0.12)' }}>
                    {cap.icon}
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '0.65rem', fontFamily: "'Sora', sans-serif" }}>{cap.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 1.7 }}>{cap.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCT HIGHLIGHTS ===== */}
      <section style={{ padding: '7rem 2rem', background: 'rgba(17,24,39,0.5)', borderTop: '1px solid rgba(48,174,180,0.08)', borderBottom: '1px solid rgba(48,174,180,0.08)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(48,174,180,0.04) 0%, transparent 60%)' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
          <SectionReveal>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{ color: '#30AEB4', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>PRODUCT SUITE</span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 800, marginTop: '0.5rem', fontFamily: "'Sora', sans-serif" }}>
                Three Products, <span className="gradient-text">One Platform</span>
              </h2>
            </div>
          </SectionReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { name: 'Lumenore Insights', tagline: 'AI-Powered Dashboards', desc: 'Interactive dashboards that update in real-time with AI-generated annotations, auto-alerts, and drill-down capabilities.', mockup: <InsightsMockup /> },
              { name: 'Lumenore Ask Me', tagline: 'Conversational BI', desc: 'Ask your data anything in plain English. Get instant visual answers powered by our proprietary NLQ engine.', mockup: <AskMeMockup /> },
              { name: 'Lumenore Data Magnet', tagline: 'Data Integration Hub', desc: 'Connect 200+ data sources. ETL, ELT, and real-time streaming pipelines — all configured without code.', mockup: <DataMagnetMockup /> },
            ].map((prod, i) => (
              <SectionReveal key={prod.name} delay={i * 120}>
                <div
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(48,174,180,0.15)', borderRadius: '20px', padding: '1.75rem', transition: 'all 0.35s ease', cursor: 'default' }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(48,174,180,0.4)'; el.style.boxShadow = '0 0 40px rgba(48,174,180,0.1)'; el.style.transform = 'translateY(-5px)'; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(48,174,180,0.15)'; el.style.boxShadow = 'none'; el.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ marginBottom: '1.25rem' }}>{prod.mockup}</div>
                  <span style={{ display: 'inline-block', background: 'rgba(48,174,180,0.12)', border: '1px solid rgba(48,174,180,0.25)', borderRadius: '6px', padding: '0.2rem 0.6rem', fontSize: '0.7rem', color: '#30AEB4', fontWeight: 600, marginBottom: '0.65rem' }}>{prod.tagline}</span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', marginBottom: '0.65rem', fontFamily: "'Sora', sans-serif" }}>{prod.name}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 1.7 }}>{prod.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SUCCESS STORIES ===== */}
      <section style={{ padding: '7rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 60% at 70% 50%, rgba(48,174,180,0.04) 0%, transparent 60%)' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
          <SectionReveal>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{ color: '#30AEB4', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>SUCCESS STORIES</span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 800, marginTop: '0.5rem', fontFamily: "'Sora', sans-serif" }}>
                Real Results. <span className="gradient-text">Real Impact.</span>
              </h2>
            </div>
          </SectionReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.5rem' }}>
            {SUCCESS_STORIES.map((story, i) => (
              <SectionReveal key={story.title} delay={i * 120}>
                <div
                  style={{
                    background: hoveredStory === i ? 'rgba(48,174,180,0.06)' : 'rgba(255,255,255,0.025)',
                    border: `1px solid ${hoveredStory === i ? 'rgba(48,174,180,0.45)' : 'rgba(48,174,180,0.14)'}`,
                    borderRadius: '18px', padding: '1.75rem', transition: 'all 0.35s ease', cursor: 'default',
                    boxShadow: hoveredStory === i ? '0 0 40px rgba(48,174,180,0.12)' : 'none',
                    transform: hoveredStory === i ? 'translateY(-5px)' : 'translateY(0)',
                  }}
                  onMouseEnter={() => setHoveredStory(i)}
                  onMouseLeave={() => setHoveredStory(null)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ background: 'rgba(48,174,180,0.1)', border: '1px solid rgba(48,174,180,0.2)', borderRadius: '6px', padding: '0.2rem 0.65rem', fontSize: '0.7rem', color: '#30AEB4', fontWeight: 600 }}>{story.industry}</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#30AEB4', fontFamily: "'Sora', sans-serif" }}>{story.metric}</span>
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem', fontFamily: "'Sora', sans-serif" }}>{story.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1rem', maxHeight: hoveredStory === i ? '200px' : '80px', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>{story.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {story.tags.map(tag => (
                      <span key={tag} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '0.2rem 0.55rem', fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section style={{ padding: '7rem 2rem', background: 'rgba(17,24,39,0.4)', borderTop: '1px solid rgba(48,174,180,0.08)', borderBottom: '1px solid rgba(48,174,180,0.08)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <SectionReveal>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{ color: '#30AEB4', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>CUSTOMER VOICES</span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 800, marginTop: '0.5rem', fontFamily: "'Sora', sans-serif" }}>
                What Our <span className="gradient-text">Customers Say</span>
              </h2>
            </div>
          </SectionReveal>
          <LumenoreTestimonials />
        </div>
      </section>

      {/* ===== RECENT INNOVATIONS ===== */}
      <section style={{ padding: '7rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 60% at 20% 50%, rgba(48,174,180,0.04) 0%, transparent 60%)' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
          <SectionReveal>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{ color: '#30AEB4', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>PRODUCT UPDATES</span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 800, marginTop: '0.5rem', fontFamily: "'Sora', sans-serif" }}>
                Recent <span className="gradient-text">Innovations</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '1rem', maxWidth: '520px', margin: '1rem auto 0', lineHeight: 1.7 }}>
                Constantly evolving — new features ship every month to keep you at the forefront of analytics.
              </p>
            </div>
          </SectionReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {INNOVATIONS.map((item, i) => (
              <SectionReveal key={item.title} delay={i * 100}>
                <div
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(48,174,180,0.14)', borderRadius: '16px', padding: '1.75rem', transition: 'all 0.35s ease', cursor: 'default', position: 'relative', overflow: 'hidden' }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(48,174,180,0.4)'; el.style.boxShadow = '0 0 25px rgba(48,174,180,0.1)'; el.style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(48,174,180,0.14)'; el.style.boxShadow = 'none'; el.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>{item.date}</span>
                    <span style={{ background: 'rgba(48,174,180,0.15)', border: '1px solid rgba(48,174,180,0.3)', borderRadius: '6px', padding: '0.15rem 0.55rem', fontSize: '0.62rem', color: '#30AEB4', fontWeight: 700, letterSpacing: '0.06em' }}>{item.badge}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(48,174,180,0.1)', border: '1px solid rgba(48,174,180,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CheckCircle2 size={18} style={{ color: '#30AEB4' }} />
                    </div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', fontFamily: "'Sora', sans-serif", lineHeight: 1.3 }}>{item.title}</h3>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ padding: '6rem 2rem', background: 'linear-gradient(135deg, rgba(48,174,180,0.1) 0%, rgba(11,15,25,0.6) 50%, rgba(48,174,180,0.06) 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(48,174,180,0.12) 0%, transparent 60%)' }} />
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <SectionReveal>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1rem', fontFamily: "'Sora', sans-serif", lineHeight: 1.2 }}>
              Start Your <span className="gradient-text">Analytics Journey</span> Today
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Join 20,000+ enterprise users who trust Lumenore to power their data-driven decisions.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #30AEB4, #1A8E94)', color: '#fff', padding: '1rem 2.25rem', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '1rem', boxShadow: '0 0 40px rgba(48,174,180,0.4)', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 0 60px rgba(48,174,180,0.65)'; el.style.transform = 'translateY(-2px)'; }} onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 0 40px rgba(48,174,180,0.4)'; el.style.transform = 'translateY(0)'; }}>
                Request Demo <ArrowRight size={20} />
              </Link>
              <Link to="/case-studies" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.06)', color: '#fff', padding: '1rem 2.25rem', borderRadius: '10px', textDecoration: 'none', fontWeight: 600, fontSize: '1rem', border: '1px solid rgba(255,255,255,0.12)', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(48,174,180,0.4)'; el.style.color = '#30AEB4'; }} onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.12)'; el.style.color = '#fff'; }}>
                View Case Studies
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}

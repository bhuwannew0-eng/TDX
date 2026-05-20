import { Link } from 'react-router';
import { SectionReveal } from './SectionReveal';
import { ArrowRight, Zap, Shield, BarChart2 } from 'lucide-react';

const techPillars = [
  {
    icon: Zap,
    title: '10× Faster Delivery',
    desc: 'OutSystems low-code platform enables enterprise-grade apps in record time.',
    accentColor: '#30AEB4',
  },
  {
    icon: Shield,
    title: '150+ Certified Experts',
    desc: 'Our certified team covers all OutSystems levels — Associate, Professional & Specialist.',
    accentColor: '#A78BFA',
  },
  {
    icon: BarChart2,
    title: 'Full-Stack Ecosystem',
    desc: 'From React & Node.js to AI/ML and mobile — we cover your complete technology landscape.',
    accentColor: '#F59E0B',
  },
];

const techBadges = [
  'OutSystems', 'React.js', 'Angular', 'Node.js',
  'Python', '.NET', 'MongoDB', 'Flutter', 'AI & ML', 'DevOps',
];

export function TechHighlights() {
  return (
    <section
      style={{
        padding: '6rem 2rem',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, rgba(11,15,25,0.95) 0%, rgba(17,24,39,0.5) 100%)',
        borderTop: '1px solid rgba(48,174,180,0.08)',
      }}
    >
      {/* Background radial */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(48,174,180,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <SectionReveal>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ color: '#30AEB4', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              TECHNOLOGY FOUNDATION
            </span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, marginTop: '0.5rem', fontFamily: "'Sora', sans-serif" }}>
              Powered by <span className="gradient-text">OutSystems</span> &amp; Beyond
            </h2>
          </div>
        </SectionReveal>

        {/* Pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
            marginBottom: '3rem',
          }}
        >
          {techPillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <SectionReveal key={p.title} delay={i * 120}>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(48,174,180,0.15)',
                    borderRadius: '16px',
                    padding: '1.75rem',
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start',
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = `${p.accentColor}40`;
                    el.style.background = `${p.accentColor}06`;
                    el.style.transform = 'translateY(-4px)';
                    el.style.boxShadow = `0 0 24px ${p.accentColor}12`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(48,174,180,0.15)';
                    el.style.background = 'rgba(255,255,255,0.025)';
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = 'none';
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: `${p.accentColor}12`,
                      border: `1px solid ${p.accentColor}28`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: p.accentColor,
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.4rem', fontFamily: "'Sora', sans-serif" }}>
                      {p.title}
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', lineHeight: 1.65 }}>
                      {p.desc}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>

        {/* Tech Badges Row */}
        <SectionReveal delay={200}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Our Technology Ecosystem
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', justifyContent: 'center', marginBottom: '2rem' }}>
              {techBadges.map((badge, i) => (
                <span
                  key={badge}
                  style={{
                    background: i === 0
                      ? 'rgba(48,174,180,0.12)'
                      : 'rgba(255,255,255,0.04)',
                    border: i === 0
                      ? '1px solid rgba(48,174,180,0.35)'
                      : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '100px',
                    padding: '0.35rem 0.875rem',
                    color: i === 0 ? '#30AEB4' : 'rgba(255,255,255,0.55)',
                    fontSize: '0.75rem',
                    fontWeight: i === 0 ? 700 : 500,
                    letterSpacing: '0.03em',
                    transition: 'all 0.25s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(48,174,180,0.4)';
                    el.style.color = '#30AEB4';
                    el.style.background = 'rgba(48,174,180,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = i === 0 ? 'rgba(48,174,180,0.35)' : 'rgba(255,255,255,0.1)';
                    el.style.color = i === 0 ? '#30AEB4' : 'rgba(255,255,255,0.55)';
                    el.style.background = i === 0 ? 'rgba(48,174,180,0.12)' : 'rgba(255,255,255,0.04)';
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>

            <Link
              to="/technology"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#30AEB4',
                fontSize: '0.85rem',
                fontWeight: 600,
                textDecoration: 'none',
                border: '1px solid rgba(48,174,180,0.28)',
                borderRadius: '10px',
                padding: '0.7rem 1.5rem',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(48,174,180,0.1)';
                el.style.boxShadow = '0 0 18px rgba(48,174,180,0.18)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'transparent';
                el.style.boxShadow = 'none';
              }}
            >
              Explore Full Technology Stack <ArrowRight size={15} />
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

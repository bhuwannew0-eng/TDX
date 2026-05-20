import { useRef, useState } from 'react';
import { SectionReveal } from './SectionReveal';
import { AnimatedCounter } from './AnimatedCounter';
import { Award, Star, Smartphone } from 'lucide-react';

const certifications = [
  {
    id: 1,
    level: 'Associate',
    badge: 'Foundation',
    fullTitle: 'Associate / Foundation Certification',
    desc: 'Foundational OutSystems expertise covering core platform capabilities, application lifecycle, and best practices.',
    count: 11,
    accentColor: '#30AEB4',
    glowColor: 'rgba(48,174,180,0.35)',
    icon: <Award size={32} />,
    rings: ['rgba(48,174,180,0.3)', 'rgba(48,174,180,0.15)', 'rgba(48,174,180,0.06)'],
    badgeGradient: 'linear-gradient(135deg, #0d3d40 0%, #0B1E2A 60%, #0B0F19 100%)',
    emblemGradient: 'linear-gradient(135deg, #30AEB4 0%, #1A8E94 50%, #0E6B70 100%)',
    tier: 'FOUNDATION',
    tierColor: '#30AEB4',
  },
  {
    id: 2,
    level: 'Professional',
    badge: 'Professional',
    fullTitle: 'Professional Certification',
    desc: 'Advanced platform mastery including architecture design, performance tuning, and complex enterprise integrations.',
    count: 11,
    accentColor: '#A78BFA',
    glowColor: 'rgba(167,139,250,0.35)',
    icon: <Star size={32} />,
    rings: ['rgba(167,139,250,0.3)', 'rgba(167,139,250,0.15)', 'rgba(167,139,250,0.06)'],
    badgeGradient: 'linear-gradient(135deg, #1E1040 0%, #110B2A 60%, #0B0F19 100%)',
    emblemGradient: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 50%, #5B21B6 100%)',
    tier: 'PROFESSIONAL',
    tierColor: '#A78BFA',
  },
  {
    id: 3,
    level: 'Specialist',
    badge: 'Mobile',
    fullTitle: 'Mobile Developer Specialist',
    desc: 'Expert-level mobile development using OutSystems — reactive apps, native plugins, and cross-platform UX delivery.',
    count: 11,
    accentColor: '#F59E0B',
    glowColor: 'rgba(245,158,11,0.35)',
    icon: <Smartphone size={32} />,
    rings: ['rgba(245,158,11,0.3)', 'rgba(245,158,11,0.15)', 'rgba(245,158,11,0.06)'],
    badgeGradient: 'linear-gradient(135deg, #2A1A00 0%, #1A1005 60%, #0B0F19 100%)',
    emblemGradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)',
    tier: 'SPECIALIST',
    tierColor: '#F59E0B',
  },
];

function CertBadge({ cert }: { cert: typeof certifications[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateY(-8px) scale(1.02)`;

    // Shine effect
    const shine = shineRef.current;
    if (shine) {
      const shineX = ((e.clientX - rect.left) / rect.width) * 100;
      const shineY = ((e.clientY - rect.top) / rect.height) * 100;
      shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.12) 0%, transparent 60%)`;
      shine.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (el) el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    const shine = shineRef.current;
    if (shine) shine.style.opacity = '0';
    setHovered(false);
  };

  const handleMouseEnter = () => setHovered(true);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transition: 'transform 0.35s ease, box-shadow 0.35s ease',
        cursor: 'default',
        position: 'relative',
        borderRadius: '24px',
      }}
    >
      {/* Outer glow halo */}
      <div
        style={{
          position: 'absolute',
          inset: '-2px',
          borderRadius: '26px',
          background: `conic-gradient(from 0deg, ${cert.accentColor}60, transparent 40%, ${cert.accentColor}40, transparent 80%, ${cert.accentColor}60)`,
          opacity: hovered ? 1 : 0.4,
          transition: 'opacity 0.4s ease',
          zIndex: 0,
          animation: 'ring-rotate 6s linear infinite',
        }}
      />

      {/* Spotlight behind card */}
      <div
        style={{
          position: 'absolute',
          bottom: '-40px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '200px',
          height: '120px',
          background: `radial-gradient(ellipse, ${cert.accentColor}35 0%, transparent 70%)`,
          filter: 'blur(20px)',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: hovered ? 1 : 0.5,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Card body */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          background: cert.badgeGradient,
          border: `1px solid ${cert.accentColor}45`,
          borderRadius: '24px',
          padding: '2.5rem 2rem 2rem',
          textAlign: 'center',
          boxShadow: hovered
            ? `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${cert.glowColor}, inset 0 1px 0 rgba(255,255,255,0.08)`
            : `0 8px 32px rgba(0,0,0,0.5), 0 0 20px ${cert.accentColor}15, inset 0 1px 0 rgba(255,255,255,0.05)`,
          transition: 'box-shadow 0.35s ease',
          overflow: 'hidden',
          minHeight: '380px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
        }}
      >
        {/* Shine overlay */}
        <div
          ref={shineRef}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '24px',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        {/* Grid lines overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(${cert.accentColor}06 1px, transparent 1px), linear-gradient(90deg, ${cert.accentColor}06 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
            borderRadius: '24px',
            pointerEvents: 'none',
          }}
        />

        {/* Top tier label */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: `${cert.accentColor}18`,
            border: `1px solid ${cert.accentColor}40`,
            borderRadius: '100px',
            padding: '0.3rem 0.875rem',
            position: 'relative',
            zIndex: 3,
          }}
        >
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: cert.accentColor, boxShadow: `0 0 6px ${cert.accentColor}` }} />
          <span style={{ color: cert.tierColor, fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.12em' }}>
            {cert.tier}
          </span>
        </div>

        {/* Badge Emblem */}
        <div style={{ position: 'relative', zIndex: 3 }}>
          {/* Outer pulse rings */}
          {cert.rings.map((ring, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: `${110 + i * 28}px`,
                height: `${110 + i * 28}px`,
                transform: 'translate(-50%, -50%)',
                borderRadius: '50%',
                border: `1px solid ${ring}`,
                opacity: hovered ? 1 : 0.5,
                transition: 'opacity 0.4s ease',
              }}
            />
          ))}

          {/* Shield / Hexagon shape */}
          <div
            style={{
              width: '110px',
              height: '110px',
              borderRadius: '50%',
              background: cert.emblemGradient,
              border: `2px solid ${cert.accentColor}80`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 30px ${cert.glowColor}, 0 0 60px ${cert.accentColor}20, inset 0 2px 0 rgba(255,255,255,0.15)`,
              position: 'relative',
              gap: '0.25rem',
            }}
          >
            {/* Icon */}
            <div style={{ color: '#fff', opacity: 0.9, display: 'flex' }}>
              {cert.icon}
            </div>
            {/* OutSystems text */}
            <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.5rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              OutSystems
            </span>
          </div>
        </div>

        {/* Count */}
        <div style={{ position: 'relative', zIndex: 3 }}>
          <div
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 900,
              color: cert.accentColor,
              fontFamily: "'Sora', sans-serif",
              lineHeight: 1,
              textShadow: `0 0 20px ${cert.glowColor}, 0 0 40px ${cert.accentColor}30`,
              letterSpacing: '-0.02em',
            }}
          >
            {cert.count}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', marginTop: '0.25rem', textTransform: 'uppercase' }}>
            Certified
          </div>
        </div>

        {/* Title & desc */}
        <div style={{ position: 'relative', zIndex: 3 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', fontFamily: "'Sora', sans-serif", marginBottom: '0.5rem', lineHeight: 1.3 }}>
            {cert.fullTitle}
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', lineHeight: 1.65 }}>
            {cert.desc}
          </p>
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            width: '100%',
            height: '3px',
            background: `linear-gradient(90deg, transparent, ${cert.accentColor}, transparent)`,
            borderRadius: '2px',
            position: 'relative',
            zIndex: 3,
            opacity: hovered ? 1 : 0.5,
            transition: 'opacity 0.3s ease',
          }}
        />
      </div>
    </div>
  );
}

export function OutSystemsCerts() {
  return (
    <section
      style={{
        padding: '7rem 2rem',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #0B0F19 0%, rgba(11,20,30,0.98) 100%)',
        borderTop: '1px solid rgba(48,174,180,0.1)',
      }}
    >
      {/* Background radial glows */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '20%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(48,174,180,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '20%',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        {/* Section Header */}
        <SectionReveal>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(48,174,180,0.08)',
                border: '1px solid rgba(48,174,180,0.25)',
                borderRadius: '100px',
                padding: '0.375rem 1rem',
                marginBottom: '1.25rem',
              }}
            >
              <Award size={14} style={{ color: '#30AEB4' }} />
              <span style={{ color: '#30AEB4', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                CERTIFIED EXPERTISE
              </span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                fontWeight: 800,
                fontFamily: "'Sora', sans-serif",
                marginBottom: '1rem',
                lineHeight: 1.2,
              }}
            >
              OutSystems Experience &{' '}
              <span className="gradient-text">Certifications</span>
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,0.55)',
                fontSize: '1rem',
                lineHeight: 1.75,
                maxWidth: '680px',
                margin: '0 auto 2.5rem',
              }}
            >
              We have a highly experienced team specializing in the OutSystems low-code platform. We support our customers with resource and service requirements, ensuring seamless delivery and success.
            </p>
          </div>
        </SectionReveal>

        {/* Main Counter */}
        <SectionReveal delay={100}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4rem' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(48,174,180,0.06)',
                border: '1px solid rgba(48,174,180,0.2)',
                borderRadius: '20px',
                padding: '2rem 3.5rem',
                boxShadow: '0 0 40px rgba(48,174,180,0.1), 0 0 80px rgba(48,174,180,0.05)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Subtle grid bg */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'linear-gradient(rgba(48,174,180,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(48,174,180,0.05) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <AnimatedCounter
                  target={150}
                  suffix="+"
                  label="Certified Professionals"
                  sublabel="Across all OutSystems levels"
                  duration={2000}
                />
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Certification Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            justifyContent: 'center',
          }}
        >
          {certifications.map((cert, i) => (
            <SectionReveal key={cert.id} delay={i * 150}>
              <CertBadge cert={cert} />
            </SectionReveal>
          ))}
        </div>

        {/* Footer note */}
        <SectionReveal delay={400}>
          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '0.875rem 1.5rem',
              }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#30AEB4', boxShadow: '0 0 8px #30AEB4', animation: 'glow-pulse 2s infinite' }} />
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem' }}>
                All certifications are officially awarded by{' '}
                <span style={{ color: '#30AEB4', fontWeight: 600 }}>OutSystems</span>{' '}
                — the world's leading enterprise low-code platform.
              </p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

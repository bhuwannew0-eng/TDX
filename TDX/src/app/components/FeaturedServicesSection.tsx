import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { SectionReveal } from './SectionReveal';
import { Code2, Shield, Database, Globe, Cpu, ArrowRight } from 'lucide-react';
import type { CSSProperties } from 'react';

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
}

const services = [
  {
    Icon: Code2,
    title: 'Accelerated App Development',
    desc: 'Rapid delivery of high-performance OutSystems solutions end-to-end.',
    tag: 'OutSystems',
  },
  {
    Icon: Shield,
    title: 'Platform Health Management',
    desc: 'Secure, high-availability, optimized environments for enterprise platforms.',
    tag: 'Infrastructure',
  },
  {
    Icon: Database,
    title: 'Data Migration Excellence',
    desc: 'Advanced migration & synchronization with zero data loss.',
    tag: 'Data',
  },
  {
    Icon: Globe,
    title: 'Co-Delivery & Capability',
    desc: 'Structured engagement models that ignite and accelerate innovation.',
    tag: 'Engagement',
  },
  {
    Icon: Cpu,
    title: 'AO Optimization',
    desc: 'Maximize license ROI by streamlining app objects and platform health.',
    tag: 'Optimization',
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const { Icon } = service;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) translateY(-7px) scale(1.01)`;

    // Shine effect follow cursor
    const shine = shineRef.current;
    if (shine) {
      const sx = ((e.clientX - rect.left) / rect.width) * 100;
      const sy = ((e.clientY - rect.top) / rect.height) * 100;
      shine.style.background = `radial-gradient(circle at ${sx}% ${sy}%, rgba(255,255,255,0.07) 0%, transparent 60%)`;
    }
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (el) el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    const shine = shineRef.current;
    if (shine) shine.style.background = 'none';
    setHovered(false);
  };

  // Stagger accent colors
  const accentOpacity = 0.12 + (index % 2) * 0.04;
  const borderOpacity = hovered ? 0.5 : 0.18;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      style={{
        position: 'relative',
        background: `rgba(255,255,255,${accentOpacity / 8})`,
        backdropFilter: 'blur(18px)',
        border: `1px solid rgba(48,174,180,${borderOpacity})`,
        borderRadius: '20px',
        padding: '1.75rem 1.5rem',
        cursor: 'default',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        transition: 'border-color 0.35s ease, box-shadow 0.35s ease, transform 0.3s ease',
        boxShadow: hovered
          ? '0 0 35px rgba(48,174,180,0.2), 0 20px 50px rgba(0,0,0,0.45)'
          : '0 4px 24px rgba(0,0,0,0.3)',
        overflow: 'hidden',
      }}
    >
      {/* Corner orb glow */}
      <div
        style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(48,174,180,0.18) 0%, transparent 65%)',
          opacity: hovered ? 1 : 0.45,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Bottom corner orb */}
      <div
        style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(48,174,180,0.1) 0%, transparent 70%)',
          opacity: hovered ? 0.8 : 0.25,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Shine overlay */}
      <div
        ref={shineRef}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '20px',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Top accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: hovered ? '60%' : '0%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #30AEB4, transparent)',
          transition: 'width 0.4s ease',
          borderRadius: '1px',
        }}
      />

      {/* Tag */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          background: 'rgba(48,174,180,0.1)',
          border: '1px solid rgba(48,174,180,0.2)',
          borderRadius: '100px',
          padding: '0.2rem 0.6rem',
          width: 'fit-content',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <span style={{ color: '#30AEB4', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.08em' }}>
          {service.tag}
        </span>
      </div>

      {/* Icon box */}
      <div
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '14px',
          background: hovered ? 'rgba(48,174,180,0.18)' : 'rgba(48,174,180,0.08)',
          border: '1px solid rgba(48,174,180,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#30AEB4',
          flexShrink: 0,
          boxShadow: hovered ? '0 0 24px rgba(48,174,180,0.35)' : '0 0 10px rgba(48,174,180,0.1)',
          transition: 'all 0.35s ease',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Icon size={24} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative', zIndex: 2 }}>
        <h3
          style={{
            fontSize: '0.95rem',
            fontWeight: 700,
            color: '#fff',
            fontFamily: "'Sora', sans-serif",
            lineHeight: 1.35,
          }}
        >
          {service.title}
        </h3>
        <p
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.8rem',
            lineHeight: 1.7,
            flex: 1,
          }}
        >
          {service.desc}
        </p>
      </div>

      {/* Learn More CTA */}
      <Link
        to="/services"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.375rem',
          color: hovered ? '#30AEB4' : 'rgba(255,255,255,0.35)',
          fontSize: '0.78rem',
          fontWeight: 600,
          textDecoration: 'none',
          transition: 'color 0.25s ease, gap 0.25s ease',
          width: 'fit-content',
          position: 'relative',
          zIndex: 2,
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.gap = '0.6rem'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.gap = '0.375rem'; }}
      >
        Learn More <ArrowRight size={13} />
      </Link>
    </div>
  );
}

export function FeaturedServicesSection() {
  const width = useWindowWidth();
  const isDesktop = width >= 1100;
  const isTablet = width >= 640 && width < 1100;

  const gridStyle: CSSProperties = isDesktop
    ? { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.25rem' }
    : isTablet
    ? { display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1.125rem' }
    : { display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' };

  const getItemStyle = (index: number): CSSProperties => {
    if (!isTablet) return {};
    if (index < 3) return { gridColumn: 'span 2' };
    if (index === 3) return { gridColumn: '2 / span 2' };
    return { gridColumn: '4 / span 2' };
  };

  return (
    <section
      style={{
        padding: '7rem 2rem',
        background: 'rgba(11,15,25,0.85)',
        borderTop: '1px solid rgba(48,174,180,0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(48,174,180,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1380px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <SectionReveal>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(48,174,180,0.08)',
                border: '1px solid rgba(48,174,180,0.2)',
                borderRadius: '100px',
                padding: '0.35rem 1rem',
                marginBottom: '1.25rem',
              }}
            >
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#30AEB4', boxShadow: '0 0 6px #30AEB4' }} />
              <span style={{ color: '#30AEB4', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                WHAT WE OFFER
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 800, fontFamily: "'Sora', sans-serif", marginBottom: '1rem' }}>
              Featured <span className="gradient-text">Services</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.75, fontSize: '0.95rem' }}>
              Comprehensive technology services designed to accelerate your digital transformation journey.
            </p>
          </div>
        </SectionReveal>

        {/* Cards Grid */}
        <div style={gridStyle}>
          {services.map((service, i) => (
            <div key={service.title} style={{ ...getItemStyle(i), minHeight: '280px' }}>
              <SectionReveal delay={i * 80}>
                <div style={{ height: '100%' }}>
                  <ServiceCard service={service} index={i} />
                </div>
              </SectionReveal>
            </div>
          ))}
        </div>

        {/* View all CTA */}
        <SectionReveal delay={350}>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link
              to="/services"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'transparent',
                color: '#30AEB4',
                padding: '0.875rem 2rem',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                border: '1px solid rgba(48,174,180,0.3)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(48,174,180,0.1)';
                el.style.boxShadow = '0 0 24px rgba(48,174,180,0.2)';
                el.style.borderColor = 'rgba(48,174,180,0.6)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'transparent';
                el.style.boxShadow = 'none';
                el.style.borderColor = 'rgba(48,174,180,0.3)';
              }}
            >
              View All Services <ArrowRight size={16} />
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

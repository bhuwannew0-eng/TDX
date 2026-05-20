import { useRef } from 'react';
import { SectionReveal } from './SectionReveal';

const clientsRow1 = [
  'NeoGrowth',
  'Edelweiss',
  'HDFC',
  'Powerhouse',
  'Freedom',
  'NSS',
  'Dev Ripples',
  'Magenta',
];

const clientsRow2 = [
  'Nido Home Finance',
  'TDMI',
  'Naveo',
  'PHFM',
  'KMI',
  'Netlink',
  'THK',
  'MSX International',
];

function LogoCard({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(48,174,180,0.15)',
        borderRadius: '14px',
        padding: '0.75rem 1.5rem',
        minWidth: '160px',
        whiteSpace: 'nowrap',
        cursor: 'default',
        transition: 'all 0.35s ease',
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = '#30AEB4';
        el.style.boxShadow = '0 0 20px rgba(48,174,180,0.25), 0 4px 20px rgba(0,0,0,0.3)';
        el.style.background = 'rgba(48,174,180,0.06)';
        el.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(48,174,180,0.15)';
        el.style.boxShadow = 'none';
        el.style.background = 'rgba(255,255,255,0.03)';
        el.style.transform = 'scale(1)';
      }}
    >
      {/* Monogram badge */}
      <div
        style={{
          width: '34px',
          height: '34px',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, rgba(48,174,180,0.2), rgba(48,174,180,0.08))',
          border: '1px solid rgba(48,174,180,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#30AEB4',
          fontSize: '0.72rem',
          fontWeight: 800,
          letterSpacing: '0.03em',
          flexShrink: 0,
          fontFamily: "'Sora', sans-serif",
        }}
      >
        {initials}
      </div>
      <span
        style={{
          color: 'rgba(255,255,255,0.75)',
          fontSize: '0.82rem',
          fontWeight: 600,
          letterSpacing: '0.02em',
        }}
      >
        {name}
      </span>
    </div>
  );
}

export function ClientMarquee() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Duplicate arrays for seamless loop
  const row1 = [...clientsRow1, ...clientsRow1];
  const row2 = [...clientsRow2, ...clientsRow2];

  return (
    <section
      id="clients"
      style={{
        padding: '6rem 0',
        background: 'rgba(11,15,25,0.85)',
        borderTop: '1px solid rgba(48,174,180,0.08)',
        borderBottom: '1px solid rgba(48,174,180,0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(48,174,180,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Section Title */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 2 }}>
        <SectionReveal>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span
              style={{
                color: '#30AEB4',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              OUR PARTNERS
            </span>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 800,
                marginTop: '0.5rem',
                fontFamily: "'Sora', sans-serif",
              }}
            >
              Trusted By{' '}
              <span className="gradient-text">Leading Brands</span>
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,0.45)',
                marginTop: '0.75rem',
                fontSize: '0.9rem',
                lineHeight: 1.7,
              }}
            >
              Industry leaders who trust Technoduxx to power their digital transformation
            </p>
          </div>
        </SectionReveal>
      </div>

      {/* Marquee Rows */}
      <div
        ref={wrapperRef}
        className="marquee-wrapper"
        style={{ position: 'relative', zIndex: 2 }}
      >
        {/* Fade edges */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, #0B0F19 0%, transparent 8%, transparent 92%, #0B0F19 100%)',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />

        {/* Row 1 — left scroll */}
        <div style={{ overflow: 'hidden', marginBottom: '1.25rem' }}>
          <div className="marquee-track">
            {row1.map((name, i) => (
              <LogoCard key={`r1-${i}`} name={name} />
            ))}
          </div>
        </div>

        {/* Row 2 — right scroll */}
        <div style={{ overflow: 'hidden' }}>
          <div className="marquee-track-reverse">
            {row2.map((name, i) => (
              <LogoCard key={`r2-${i}`} name={name} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { ParticleBackground } from '../components/ParticleBackground';
import { SectionReveal } from '../components/SectionReveal';
import { Link } from 'react-router';
import { ArrowRight, Users, Zap, Shield, TrendingUp, Database, BarChart2, CheckCircle } from 'lucide-react';

const services = [
  {
    id: 1,
    icon: <Users size={42} />,
    title: 'Co-Delivery & Capability Building',
    shortDesc: 'Structured engagement model for innovation.',
    fullDesc: 'Ignite and accelerate your innovation journey with our structured co-delivery engagement model. We embed our experts within your teams to transfer knowledge, build internal capability, and deliver high-quality outcomes — together.',
    benefits: ['Embedded expertise', 'Knowledge transfer', 'Team upskilling', 'Shared ownership'],
    color: '#30AEB4',
    gradient: 'linear-gradient(135deg, rgba(48,174,180,0.15) 0%, rgba(11,15,25,0.95) 100%)',
  },
  {
    id: 2,
    icon: <Zap size={42} />,
    title: 'Accelerated Application Development',
    shortDesc: 'Rapid delivery of high-performance OutSystems solutions.',
    fullDesc: 'Deliver high-performance, end-to-end OutSystems applications at unprecedented speed. Our agile methodology combined with OutSystems low-code capabilities enables rapid prototyping, development, and deployment.',
    benefits: ['OutSystems expertise', 'Rapid prototyping', 'End-to-end delivery', 'Agile methodology'],
    color: '#4ECDC4',
    gradient: 'linear-gradient(135deg, rgba(78,205,196,0.15) 0%, rgba(11,15,25,0.95) 100%)',
  },
  {
    id: 3,
    icon: <Shield size={42} />,
    title: 'Platform Health & Performance',
    shortDesc: 'Secure, high-availability, optimized environments.',
    fullDesc: 'Keep your enterprise platforms running at peak performance. We provide comprehensive platform health management, performance optimization, security hardening, and 24/7 monitoring to ensure business continuity.',
    benefits: ['Performance tuning', 'Security hardening', '24/7 monitoring', 'High availability'],
    color: '#30AEB4',
    gradient: 'linear-gradient(135deg, rgba(48,174,180,0.15) 0%, rgba(11,15,25,0.95) 100%)',
  },
  {
    id: 4,
    icon: <TrendingUp size={42} />,
    title: 'AO Optimization',
    shortDesc: 'Maximize license ROI and platform health.',
    fullDesc: 'Maximize your OutSystems license return on investment by streamlining application objects, reducing technical debt, and optimizing your platform health. Our AO optimization strategies deliver measurable efficiency gains.',
    benefits: ['License ROI maximization', 'Technical debt reduction', 'AO rationalization', 'Cost optimization'],
    color: '#4ECDC4',
    gradient: 'linear-gradient(135deg, rgba(78,205,196,0.15) 0%, rgba(11,15,25,0.95) 100%)',
  },
  {
    id: 5,
    icon: <Database size={42} />,
    title: 'Data Migration Excellence',
    shortDesc: 'Advanced migration & environment synchronization.',
    fullDesc: 'Execute complex data migrations with precision, speed, and zero data loss. Our proven migration framework handles environment synchronization, data validation, rollback planning, and post-migration verification.',
    benefits: ['Zero data loss', 'Environment sync', 'Validation framework', 'Rollback planning'],
    color: '#30AEB4',
    gradient: 'linear-gradient(135deg, rgba(48,174,180,0.15) 0%, rgba(11,15,25,0.95) 100%)',
  },
  {
    id: 6,
    icon: <BarChart2 size={42} />,
    title: 'Digital Transformation Strategy',
    shortDesc: 'End-to-end transformation roadmaps and execution.',
    fullDesc: 'Define and execute your digital transformation journey with a holistic strategy that aligns technology investments with business outcomes. From assessment to implementation, we guide every step of your transformation.',
    benefits: ['Roadmap creation', 'Stakeholder alignment', 'Change management', 'ROI measurement'],
    color: '#4ECDC4',
    gradient: 'linear-gradient(135deg, rgba(78,205,196,0.15) 0%, rgba(11,15,25,0.95) 100%)',
  },
];

function ServiceFlipCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <SectionReveal delay={index * 100}>
      <div
        className="flip-card-container"
        style={{ height: '340px', cursor: 'pointer' }}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
      >
        <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`} style={{ height: '100%', position: 'relative' }}>
          {/* Front Face */}
          <div
            className="flip-card-face"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(255,255,255,0.025)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(48,174,180,0.15)',
              borderRadius: '18px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              overflow: 'hidden',
            }}
          >
            {/* Corner glow */}
            <div style={{ position: 'absolute', top: 0, right: 0, width: '120px', height: '120px', background: `radial-gradient(circle, rgba(48,174,180,0.1) 0%, transparent 70%)`, pointerEvents: 'none' }} />

            <div
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '16px',
                background: `rgba(48,174,180,0.1)`,
                border: '1px solid rgba(48,174,180,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: service.color,
                boxShadow: `0 0 20px rgba(48,174,180,0.2)`,
              }}
            >
              {service.icon}
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', fontFamily: "'Sora', sans-serif", lineHeight: 1.3 }}>
              {service.title}
            </h3>

            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 1.6, flex: 1 }}>
              {service.shortDesc}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: service.color, fontSize: '0.8rem', fontWeight: 600 }}>
              Hover to learn more <ArrowRight size={14} />
            </div>

            {/* Bottom line */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${service.color}, transparent)`, opacity: 0.4 }} />
          </div>

          {/* Back Face */}
          <div
            className="flip-card-face flip-card-back"
            style={{
              position: 'absolute',
              inset: 0,
              background: service.gradient,
              border: `1px solid rgba(48,174,180,0.4)`,
              borderRadius: '18px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.875rem',
              boxShadow: '0 0 40px rgba(48,174,180,0.2)',
            }}
          >
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: service.color, fontFamily: "'Sora', sans-serif", lineHeight: 1.3 }}>
              {service.title}
            </h3>

            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', lineHeight: 1.7, flex: 1 }}>
              {service.fullDesc}
            </p>

            <div>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.625rem' }}>
                Key Benefits
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                {service.benefits.map((b) => (
                  <div
                    key={b}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      background: 'rgba(48,174,180,0.12)',
                      border: '1px solid rgba(48,174,180,0.25)',
                      borderRadius: '100px',
                      padding: '0.25rem 0.625rem',
                      fontSize: '0.72rem',
                      color: 'rgba(255,255,255,0.8)',
                      fontWeight: 500,
                    }}
                  >
                    <CheckCircle size={10} style={{ color: '#30AEB4' }} />
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

export function Services() {
  return (
    <div style={{ background: '#0B0F19' }}>
      {/* ===== HERO ===== */}
      <section
        style={{
          position: 'relative',
          padding: '10rem 2rem 7rem',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(48,174,180,0.07) 0%, #0B0F19 70%)',
          textAlign: 'center',
        }}
      >
        <div style={{ position: 'absolute', inset: 0 }}>
          <ParticleBackground count={40} />
        </div>
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto' }}>
          <SectionReveal>
            <span style={{ color: '#30AEB4', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              WHAT WE DO
            </span>
            <h1
              className="animated-gradient-text"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 800,
                marginTop: '0.75rem',
                fontFamily: "'Sora', sans-serif",
                lineHeight: 1.1,
                marginBottom: '1.5rem',
              }}
            >
              Our Services
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.1rem', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto' }}>
              Comprehensive technology services designed to accelerate your digital transformation, optimize performance, and drive measurable business outcomes.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ===== SERVICE CARDS ===== */}
      <section style={{ padding: '4rem 2rem 7rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {services.map((service, i) => (
              <ServiceFlipCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE TECHNODUXX ===== */}
      <section style={{ padding: '6rem 2rem', borderTop: '1px solid rgba(48,174,180,0.08)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(48,174,180,0.05) 0%, transparent 60%)' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} className="grid-cols-1 lg:grid-cols-2">
            <SectionReveal direction="left">
              <span style={{ color: '#30AEB4', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                OUR APPROACH
              </span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, marginTop: '0.75rem', fontFamily: "'Sora', sans-serif" }}>
                Why Our Services{' '}
                <span className="gradient-text">Stand Out</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginTop: '1.25rem', fontSize: '0.95rem' }}>
                We don't just deliver technology — we deliver outcomes. Our approach combines deep technical expertise with a thorough understanding of business needs to create solutions that truly make a difference.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
                {[
                  { label: 'Outcome-focused delivery model', pct: 96 },
                  { label: 'OutSystems platform expertise', pct: 98 },
                  { label: 'Client satisfaction rate', pct: 100 },
                  { label: 'On-time project delivery', pct: 94 },
                ].map((item) => (
                  <div key={item.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                      <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>{item.label}</span>
                      <span style={{ color: '#30AEB4', fontSize: '0.875rem', fontWeight: 700 }}>{item.pct}%</span>
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${item.pct}%`,
                          background: 'linear-gradient(90deg, #30AEB4, #7DD3DA)',
                          borderRadius: '2px',
                          boxShadow: '0 0 10px rgba(48,174,180,0.4)',
                          transition: 'width 1.5s ease',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal direction="right">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { num: '01', title: 'Discovery & Assessment', desc: 'Deep dive into your current state, challenges, and objectives.' },
                  { num: '02', title: 'Strategy & Design', desc: 'Craft a tailored solution architecture aligned with your goals.' },
                  { num: '03', title: 'Build & Deliver', desc: 'Agile delivery with continuous feedback and quality gates.' },
                  { num: '04', title: 'Optimize & Scale', desc: 'Post-delivery support, optimization, and growth enablement.' },
                ].map((step) => (
                  <div
                    key={step.num}
                    style={{
                      display: 'flex',
                      gap: '1.25rem',
                      alignItems: 'flex-start',
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(48,174,180,0.12)',
                      borderRadius: '12px',
                      padding: '1.25rem',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = 'rgba(48,174,180,0.35)';
                      el.style.background = 'rgba(48,174,180,0.05)';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = 'rgba(48,174,180,0.12)';
                      el.style.background = 'rgba(255,255,255,0.025)';
                    }}
                  >
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#30AEB4', fontFamily: "'Sora', sans-serif", lineHeight: 1, minWidth: '36px', textShadow: '0 0 10px rgba(48,174,180,0.5)' }}>
                      {step.num}
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 700, color: '#fff', marginBottom: '0.25rem', fontSize: '0.95rem' }}>{step.title}</h4>
                      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', lineHeight: 1.5 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ padding: '5rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <SectionReveal>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, fontFamily: "'Sora', sans-serif", marginBottom: '1rem' }}>
              Ready to Get <span className="gradient-text">Started?</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '2rem' }}>
              Talk to our experts and discover how Technoduxx can transform your technology landscape.
            </p>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'linear-gradient(135deg, #30AEB4, #1A8E94)',
                color: '#fff',
                padding: '0.875rem 2rem',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: 700,
                boxShadow: '0 0 30px rgba(48,174,180,0.4)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = '0 0 50px rgba(48,174,180,0.6)';
                el.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = '0 0 30px rgba(48,174,180,0.4)';
                el.style.transform = 'translateY(0)';
              }}
            >
              Contact Our Team <ArrowRight size={18} />
            </Link>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}

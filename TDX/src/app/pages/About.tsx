import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { ParticleBackground } from '../components/ParticleBackground';
import { SectionReveal } from '../components/SectionReveal';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Target, Eye, Heart, CheckCircle2, Users, Award, Globe, TrendingUp } from 'lucide-react';

const missionCards = [
  {
    icon: <Target size={40} />,
    front: { title: 'Our Mission', subtitle: 'Purpose-Driven Technology', tagline: 'Click to discover →' },
    back: {
      title: 'Our Mission',
      content: 'To empower enterprises with cutting-edge technology solutions that simplify complexity, accelerate growth, and create lasting digital value. We are committed to being the most trusted technology partner for our clients.',
    },
  },
  {
    icon: <Eye size={40} />,
    front: { title: 'Our Vision', subtitle: 'The Future We Build', tagline: 'Click to discover →' },
    back: {
      title: 'Our Vision',
      content: 'A world where every business, regardless of size, can harness the power of enterprise-grade technology to compete, innovate, and thrive in the digital economy.',
    },
  },
  {
    icon: <Heart size={40} />,
    front: { title: 'Our Values', subtitle: 'What We Stand For', tagline: 'Click to discover →' },
    back: {
      title: 'Our Values',
      content: 'Innovation · Reliability · Customer Success · Future-Ready Technology · Transparency · Agility · Excellence in Delivery · Collaborative Spirit',
    },
  },
];

const timeline = [
  { year: '2019', title: 'Foundation', desc: 'Technoduxx was established with a vision to deliver future-ready digital solutions and enterprise consulting services.' },
  { year: '2020', title: 'First Client Success', desc: 'Successfully delivered early transformation projects and built long-term client relationships.' },
  { year: '2021', title: 'Team Expansion', desc: 'Expanded internal capabilities with growing teams across design, development, and consulting.' },
  { year: '2022', title: 'Multi-Technology Delivery', desc: 'Strengthened expertise across OutSystems, .NET, Angular, React, Python, Node.js, and cloud solutions.' },
  { year: '2023', title: 'Enterprise Scale Projects', desc: 'Delivered larger enterprise modernization, workflow automation, and platform optimization programs.' },
  { year: '2024', title: 'Trusted Industry Partner', desc: 'Recognized by multiple clients for reliable delivery, scalable architecture, and innovation-led execution.' },
  { year: '2025', title: 'Growth & Innovation', desc: 'Focused on AI integrations, automation, UX excellence, and next-generation business transformation.' },
];

const coreValues = [
  { icon: <CheckCircle2 size={20} />, text: 'Customer-First Approach' },
  { icon: <CheckCircle2 size={20} />, text: 'Continuous Innovation' },
  { icon: <CheckCircle2 size={20} />, text: 'Transparent Communication' },
  { icon: <CheckCircle2 size={20} />, text: 'Agile Mindset' },
  { icon: <CheckCircle2 size={20} />, text: 'Quality & Excellence' },
  { icon: <CheckCircle2 size={20} />, text: 'Data-Driven Decisions' },
];

const galleryItems = [
  { src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80', caption: 'Team Collaboration', height: '260px' },
  { src: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=700&q=80', caption: 'Innovation Workshop', height: '200px' },
  { src: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=700&q=80', caption: 'Office Workspace', height: '230px' },
  { src: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=700&q=80', caption: 'Strategy Meeting', height: '210px' },
  { src: 'https://images.unsplash.com/photo-1560264280-88b68371db39?w=700&q=80', caption: 'Executive Discussions', height: '180px' },
  { src: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=700&q=80', caption: 'Tech Deep Dive', height: '240px' },
  { src: 'https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=700&q=80', caption: 'Product Workshop', height: '200px' },
  { src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=700&q=80', caption: 'Cross-Team Sprint', height: '220px' },
];

function FlipCard({ card }: { card: typeof missionCards[0] }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="flip-card-container" style={{ height: '280px', cursor: 'pointer' }} onClick={() => setFlipped(!flipped)}>
      <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`} style={{ height: '100%', position: 'relative' }}>
        <div
          className="flip-card-face"
          style={{
            position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(48,174,180,0.2)', borderRadius: '16px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: '1rem', padding: '2rem', textAlign: 'center',
          }}
        >
          <div style={{ color: '#30AEB4', background: 'rgba(48,174,180,0.1)', borderRadius: '14px', padding: '1rem', boxShadow: '0 0 20px rgba(48,174,180,0.2)' }}>
            {card.icon}
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: "'Sora', sans-serif", color: '#fff' }}>{card.front.title}</h3>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>{card.front.subtitle}</p>
          <span style={{ color: '#30AEB4', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em' }}>{card.front.tagline}</span>
        </div>
        <div
          className="flip-card-face flip-card-back"
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(48,174,180,0.15) 0%, rgba(11,15,25,0.95) 100%)',
            border: '1px solid rgba(48,174,180,0.4)', borderRadius: '16px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: '1rem', padding: '2rem', textAlign: 'center', boxShadow: '0 0 30px rgba(48,174,180,0.2)',
          }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#30AEB4', fontFamily: "'Sora', sans-serif" }}>{card.back.title}</h3>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', lineHeight: 1.7 }}>{card.back.content}</p>
        </div>
      </div>
    </div>
  );
}

export function About() {
  return (
    <div style={{ background: '#0B0F19' }}>
      {/* ===== HERO ===== */}
      <section style={{ position: 'relative', padding: '10rem 2rem 7rem', overflow: 'hidden', background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(48,174,180,0.07) 0%, #0B0F19 70%)' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <ParticleBackground count={50} connectionDistance={100} />
        </div>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{ position: 'absolute', width: `${8 + i * 3}px`, height: `${8 + i * 3}px`, borderRadius: '50%', background: 'rgba(48,174,180,0.4)', left: `${10 + i * 12}%`, top: `${20 + (i % 3) * 25}%`, animation: `node-pulse ${2 + i * 0.4}s ease-in-out infinite`, animationDelay: `${i * 0.3}s`, boxShadow: '0 0 10px rgba(48,174,180,0.5)' }} />
          ))}
        </div>
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <SectionReveal>
            <span style={{ color: '#30AEB4', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>WHO WE ARE</span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, marginTop: '1rem', fontFamily: "'Sora', sans-serif", lineHeight: 1.1 }}>
              About <span className="gradient-text">Technoduxx</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', lineHeight: 1.8, maxWidth: '700px', margin: '1.5rem auto 0' }}>
              A modern technology consulting company focused on digital transformation, low-code innovation, software modernization, and scalable enterprise solutions.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ===== COMPANY STORY ===== */}
      <section style={{ padding: '7rem 2rem', position: 'relative' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="grid-cols-1 lg:grid-cols-2">
            <SectionReveal direction="left">
              <div>
                <span style={{ color: '#30AEB4', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>OUR STORY</span>
                <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, marginTop: '0.75rem', fontFamily: "'Sora', sans-serif" }}>Built for the Digital Age</h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginTop: '1.25rem', fontSize: '0.95rem' }}>
                  Technoduxx was founded with a clear purpose: to bridge the gap between complex enterprise technology needs and practical, impactful solutions. We specialize in OutSystems low-code development, digital transformation strategies, and platform modernization.
                </p>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginTop: '1rem', fontSize: '0.95rem' }}>
                  Our team of certified experts brings together decades of combined experience across industries including finance, healthcare, logistics, and retail — delivering solutions that not only solve today's challenges but also prepare businesses for tomorrow.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '2rem' }}>
                  {coreValues.map((v) => (
                    <div key={v.text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
                      <span style={{ color: '#30AEB4', flexShrink: 0 }}>{v.icon}</span>
                      {v.text}
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
            <SectionReveal direction="right">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { icon: <Users size={28} />, value: '90+', label: 'Team Members' },
                  { icon: <Globe size={28} />, value: '15+', label: 'Global Clients' },
                  { icon: <Award size={28} />, value: '40+', label: 'Projects Done' },
                  { icon: <TrendingUp size={28} />, value: '5+', label: 'Years Active' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(48,174,180,0.15)', borderRadius: '14px', padding: '1.75rem', textAlign: 'center', transition: 'all 0.3s ease' }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(48,174,180,0.4)'; el.style.boxShadow = '0 0 20px rgba(48,174,180,0.15)'; el.style.transform = 'translateY(-3px)'; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(48,174,180,0.15)'; el.style.boxShadow = 'none'; el.style.transform = 'translateY(0)'; }}
                  >
                    <div style={{ color: '#30AEB4', marginBottom: '0.75rem' }}>{stat.icon}</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: '#30AEB4', fontFamily: "'Sora', sans-serif", textShadow: '0 0 15px rgba(48,174,180,0.5)' }}>{stat.value}</div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ===== MISSION / VISION / VALUES FLIP CARDS ===== */}
      <section style={{ padding: '7rem 2rem', background: 'rgba(17,24,39,0.4)', borderTop: '1px solid rgba(48,174,180,0.08)', borderBottom: '1px solid rgba(48,174,180,0.08)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <SectionReveal>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{ color: '#30AEB4', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>OUR FOUNDATION</span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, marginTop: '0.5rem', fontFamily: "'Sora', sans-serif" }}>Mission, Vision & Values</h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '0.75rem', fontSize: '0.875rem' }}>Click each card to explore</p>
            </div>
          </SectionReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {missionCards.map((card, i) => (
              <SectionReveal key={card.front.title} delay={i * 150}>
                <FlipCard card={card} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section style={{ padding: '7rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 40% 60% at 10% 50%, rgba(48,174,180,0.04) 0%, transparent 60%)' }} />
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
          <SectionReveal>
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <span style={{ color: '#30AEB4', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>OUR JOURNEY</span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, marginTop: '0.5rem', fontFamily: "'Sora', sans-serif" }}>Growth Timeline</h2>
            </div>
          </SectionReveal>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, #30AEB4, rgba(48,174,180,0.1))', transform: 'translateX(-50%)', boxShadow: '0 0 10px rgba(48,174,180,0.4)' }} className="hidden md:block" />
            {timeline.map((item, i) => (
              <SectionReveal key={item.year} delay={i * 120}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse' }} className={i % 2 === 0 ? 'flex-row' : 'md:flex-row-reverse'}>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(48,174,180,0.18)', borderRadius: '14px', padding: '1.5rem', transition: 'all 0.3s ease' }}
                      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(48,174,180,0.4)'; el.style.boxShadow = '0 0 20px rgba(48,174,180,0.12)'; }}
                      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(48,174,180,0.18)'; el.style.boxShadow = 'none'; }}
                    >
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', fontFamily: "'Sora', sans-serif" }}>{item.title}</h3>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 1.6, marginTop: '0.5rem' }}>{item.desc}</p>
                    </div>
                  </div>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(48,174,180,0.12)', border: '2px solid #30AEB4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 0 20px rgba(48,174,180,0.4)', zIndex: 2, position: 'relative' }}>
                    <span style={{ color: '#30AEB4', fontSize: '0.8rem', fontWeight: 800 }}>{item.year}</span>
                  </div>
                  <div style={{ flex: 1 }} className="hidden md:block" />
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LIFE AT TECHNODUXX GALLERY ===== */}
      <section style={{ padding: '7rem 2rem', position: 'relative', overflow: 'hidden', background: 'rgba(17,24,39,0.3)', borderTop: '1px solid rgba(48,174,180,0.08)' }}>
        <style>{`
          .gallery-masonry { column-count: 1; column-gap: 1rem; }
          @media (min-width: 640px) { .gallery-masonry { column-count: 2; } }
          @media (min-width: 1024px) { .gallery-masonry { column-count: 3; } }
          .gallery-item { break-inside: avoid; margin-bottom: 1rem; position: relative; border-radius: 14px; overflow: hidden; border: 1px solid rgba(48,174,180,0.12); cursor: pointer; }
          .gallery-item img { transition: transform 0.5s cubic-bezier(0.4,0,0.2,1), filter 0.5s ease; display: block; width: 100%; object-fit: cover; }
          .gallery-item:hover img { transform: scale(1.06); filter: brightness(1.05); }
          .gallery-caption { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(11,15,25,0.9) 0%, transparent 100%); padding: 1.5rem 1rem 1rem; opacity: 0; transition: opacity 0.35s ease; }
          .gallery-item:hover .gallery-caption { opacity: 1; }
        `}</style>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 60% at 80% 40%, rgba(48,174,180,0.04) 0%, transparent 60%)' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
          <SectionReveal>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{ color: '#30AEB4', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>OUR CULTURE</span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, marginTop: '0.5rem', fontFamily: "'Sora', sans-serif" }}>
                Life at <span className="gradient-text">Technoduxx</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '1rem', maxWidth: '520px', margin: '1rem auto 0', lineHeight: 1.7, fontSize: '0.95rem' }}>
                Innovation grows through collaboration, culture, and shared experiences.
              </p>
            </div>
          </SectionReveal>

          {/* Desktop / Tablet masonry grid */}
          <div className="gallery-masonry hidden sm:block">
            {galleryItems.map((item, i) => (
              <SectionReveal key={i} delay={i * 70}>
                <div className="gallery-item">
                  <ImageWithFallback
                    src={item.src}
                    alt={item.caption}
                    style={{ height: item.height }}
                  />
                  <div className="gallery-caption">
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                      background: 'rgba(48,174,180,0.18)', backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(48,174,180,0.35)', borderRadius: '100px',
                      padding: '0.25rem 0.75rem', fontSize: '0.72rem', color: '#30AEB4', fontWeight: 600,
                    }}>
                      {item.caption}
                    </span>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Mobile horizontal swipe gallery */}
          <div
            className="sm:hidden"
            style={{
              display: 'flex', overflowX: 'auto', gap: '0.75rem',
              scrollSnapType: 'x mandatory', paddingBottom: '1rem',
              WebkitOverflowScrolling: 'touch' as 'touch',
            }}
          >
            {galleryItems.map((item, i) => (
              <div key={i} style={{ flexShrink: 0, width: '82vw', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(48,174,180,0.15)', scrollSnapAlign: 'start', position: 'relative' }}>
                <ImageWithFallback
                  src={item.src}
                  alt={item.caption}
                  style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(11,15,25,0.9), transparent)', padding: '1rem 0.75rem 0.75rem' }}>
                  <span style={{ color: '#30AEB4', fontSize: '0.72rem', fontWeight: 600 }}>{item.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAM STATS ===== */}
      <section style={{ padding: '6rem 2rem', borderTop: '1px solid rgba(48,174,180,0.08)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <SectionReveal>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{ color: '#30AEB4', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>BY THE NUMBERS</span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, marginTop: '0.5rem', fontFamily: "'Sora', sans-serif" }}>Our Impact in Numbers</h2>
            </div>
          </SectionReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '3rem', justifyItems: 'center' }}>
            <AnimatedCounter target={5} suffix="+" label="Years in Business" sublabel="Since 2019" />
            <AnimatedCounter target={15} suffix="+" label="Global Clients" sublabel="Enterprise customers" />
            <AnimatedCounter target={40} suffix="+" label="Successful Projects" sublabel="100% satisfaction" />
            <AnimatedCounter target={90} suffix="+" label="Team Experts" sublabel="Certified professionals" />
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ padding: '6rem 2rem', background: 'linear-gradient(135deg, rgba(48,174,180,0.08) 0%, rgba(11,15,25,0.5) 50%, rgba(48,174,180,0.05) 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(48,174,180,0.1) 0%, transparent 60%)' }} />
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <SectionReveal>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1rem', fontFamily: "'Sora', sans-serif", lineHeight: 1.2 }}>
              Ready to Be Part of <span className="gradient-text">Our Story?</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Join Technoduxx and help us shape the future of enterprise technology. Let's build something extraordinary together.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to="/contact"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #30AEB4, #1A8E94)', color: '#fff', padding: '1rem 2.25rem', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '1rem', boxShadow: '0 0 40px rgba(48,174,180,0.4)', transition: 'all 0.3s ease' }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 0 60px rgba(48,174,180,0.6)'; el.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 0 40px rgba(48,174,180,0.4)'; el.style.transform = 'translateY(0)'; }}
              >
                Get in Touch <ArrowRight size={20} />
              </Link>
              <Link
                to="/services"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.06)', color: '#fff', padding: '1rem 2.25rem', borderRadius: '10px', textDecoration: 'none', fontWeight: 600, fontSize: '1rem', border: '1px solid rgba(255,255,255,0.12)', transition: 'all 0.3s ease' }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(48,174,180,0.4)'; el.style.color = '#30AEB4'; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.12)'; el.style.color = '#fff'; }}
              >
                Our Services
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}

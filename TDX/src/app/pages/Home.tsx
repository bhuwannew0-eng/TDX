import { useState, useEffect, useRef, type ReactNode, type CSSProperties } from 'react';
import { Link } from 'react-router';
import { ArrowRight, ChevronRight, Zap, Shield, Rocket, BarChart3 } from 'lucide-react';
import { ParticleBackground } from '../components/ParticleBackground';
import { SectionReveal } from '../components/SectionReveal';
import { ClientMarquee } from '../components/ClientMarquee';
import { TestimonialsCarousel } from '../components/TestimonialsCarousel';
import { FeaturedServicesSection } from '../components/FeaturedServicesSection';

const whyCards = [
  {
    icon: <Zap size={32} />,
    title: 'Innovation Driven',
    desc: 'We continuously explore emerging technologies to deliver cutting-edge solutions that keep your business ahead of the curve.',
  },
  {
    icon: <Shield size={32} />,
    title: 'Enterprise Expertise',
    desc: 'Deep domain knowledge across industries, ensuring solutions that meet enterprise-grade standards and compliance requirements.',
  },
  {
    icon: <Rocket size={32} />,
    title: 'Agile Delivery',
    desc: 'Iterative, sprint-based delivery methodology that ensures rapid time-to-market without compromising quality or stability.',
  },
  {
    icon: <BarChart3 size={32} />,
    title: 'Scalable Solutions',
    desc: 'Architecture designed to grow with your business, from startup scale to enterprise-level global operations.',
  },
];

const TECH_PILLS_ROW1 = ['OutSystems', '.NET', 'Angular', 'React', 'Python'];
const TECH_PILLS_ROW2 = ['Node.js', 'MongoDB', 'Flutter', 'UI/UX', 'AI'];

const ORBIT_STYLES = `
@keyframes orbit-rotate-cw {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes orbit-rotate-ccw {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}
@keyframes orbit-counter-cw {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}
@keyframes orbit-counter-ccw {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes node-glow-pulse {
  0%, 100% { box-shadow: 0 0 12px rgba(48,174,180,0.5), 0 0 24px rgba(48,174,180,0.2); }
  50% { box-shadow: 0 0 20px rgba(48,174,180,0.8), 0 0 40px rgba(48,174,180,0.35); }
}
@keyframes center-pulse {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.08); opacity: 1; }
}
@keyframes comet-trail {
  0% { opacity: 0; width: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; width: 60px; }
}
`;

function AchievementNode({ label, value, angle, radius }: { label: string; value: string; angle: number; radius: number }) {
  const rad = (angle * Math.PI) / 180;
  const x = 50 + radius * Math.cos(rad);
  const y = 50 + radius * Math.sin(rad);

  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.2rem',
        zIndex: 10,
      }}
    >
      <div
        style={{
          background: 'rgba(11,15,25,0.95)',
          border: '1.5px solid rgba(48,174,180,0.6)',
          borderRadius: '14px',
          padding: '0.6rem 1rem',
          textAlign: 'center',
          backdropFilter: 'blur(12px)',
          animation: 'node-glow-pulse 3s ease-in-out infinite',
          minWidth: '80px',
        }}
      >
        <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#30AEB4', lineHeight: 1, fontFamily: "'Sora', sans-serif" }}>
          {value}
        </div>
        <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.55)', marginTop: '0.2rem', whiteSpace: 'nowrap', letterSpacing: '0.03em' }}>
          {label}
        </div>
      </div>
    </div>
  );
}

function AchievementOrbit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;

    interface Particle { x: number; y: number; vx: number; vy: number; size: number; alpha: number; life: number; maxLife: number; }
    interface Comet { angle: number; speed: number; radius: number; trail: { x: number; y: number }[]; }

    const particles: Particle[] = [];
    const comets: Comet[] = [
      { angle: 0, speed: 0.008, radius: 0, trail: [] },
      { angle: Math.PI, speed: -0.006, radius: 0, trail: [] },
      { angle: Math.PI / 2, speed: 0.007, radius: 0, trail: [] },
    ];

    const resize = () => {
      W = container.clientWidth;
      H = container.clientHeight;
      canvas.width = W;
      canvas.height = H;
      const r = Math.min(W, H);
      comets[0].radius = r * 0.32;
      comets[1].radius = r * 0.44;
      comets[2].radius = r * 0.38;
    };

    const spawnParticle = () => {
      const cx = W / 2, cy = H / 2;
      const angle = Math.random() * Math.PI * 2;
      const dist = 20 + Math.random() * Math.min(W, H) * 0.48;
      particles.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 0.5 + Math.random() * 1.5,
        alpha: 0,
        life: 0,
        maxLife: 120 + Math.random() * 180,
      });
    };

    const drawRing = (cx: number, cy: number, r: number, opacity: number, dashed = false) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(48,174,180,${opacity})`;
      ctx.lineWidth = 1;
      if (dashed) ctx.setLineDash([6, 10]);
      else ctx.setLineDash([]);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const drawComet = (c: Comet, cx: number, cy: number) => {
      c.angle += c.speed;
      const x = cx + Math.cos(c.angle) * c.radius;
      const y = cy + Math.sin(c.angle) * c.radius;
      c.trail.push({ x, y });
      if (c.trail.length > 28) c.trail.shift();

      for (let i = 1; i < c.trail.length; i++) {
        const t = i / c.trail.length;
        ctx.beginPath();
        ctx.moveTo(c.trail[i - 1].x, c.trail[i - 1].y);
        ctx.lineTo(c.trail[i].x, c.trail[i].y);
        ctx.strokeStyle = `rgba(48,174,180,${t * 0.7})`;
        ctx.lineWidth = t * 2.5;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#7DD3DA';
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#30AEB4';
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2;
      const minR = Math.min(W, H);

      // Center glow
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, minR * 0.25);
      grad.addColorStop(0, 'rgba(48,174,180,0.15)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, minR * 0.25, 0, Math.PI * 2);
      ctx.fill();

      // Rings
      drawRing(cx, cy, minR * 0.22, 0.12);
      drawRing(cx, cy, minR * 0.32, 0.18);
      drawRing(cx, cy, minR * 0.44, 0.14, true);
      drawRing(cx, cy, minR * 0.38, 0.10);

      // Particles
      if (Math.random() < 0.15 && particles.length < 60) spawnParticle();
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy; p.life++;
        const t = p.life / p.maxLife;
        p.alpha = t < 0.2 ? t / 0.2 : t > 0.8 ? (1 - t) / 0.2 : 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(48,174,180,${p.alpha * 0.6})`;
        ctx.fill();
        if (p.life >= p.maxLife) particles.splice(i, 1);
      }

      // Comets
      comets.forEach(c => drawComet(c, cx, cy));

      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

      {/* Center core */}
      <div
        style={{
          position: 'absolute',
          left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '72px', height: '72px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(48,174,180,0.35) 0%, rgba(48,174,180,0.08) 100%)',
          border: '2px solid rgba(48,174,180,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'center-pulse 3s ease-in-out infinite',
          zIndex: 10,
          boxShadow: '0 0 30px rgba(48,174,180,0.4)',
        }}
      >
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%',
          background: 'rgba(48,174,180,0.5)',
          boxShadow: '0 0 16px rgba(48,174,180,0.8)',
        }} />
      </div>

      {/* Achievement nodes — top, left, bottom, right */}
      <AchievementNode value="5+" label="Years Experience" angle={-90} radius={44} />
      <AchievementNode value="15+" label="Global Clients" angle={180} radius={44} />
      <AchievementNode value="40+" label="Projects Delivered" angle={90} radius={44} />
      <AchievementNode value="90+" label="Team Members" angle={0} radius={44} />
    </div>
  );
}

function WaveBackground() {
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', overflow: 'hidden', pointerEvents: 'none' }}>
      <div style={{ position: 'relative', width: '200%', height: '100%', animation: 'wave-flow 12s linear infinite' }}>
        <svg viewBox="0 0 1440 200" style={{ width: '50%', height: '100%', display: 'inline-block' }} preserveAspectRatio="none">
          <path d="M0,100 C360,170 720,30 1080,100 C1260,135 1350,60 1440,100 L1440,200 L0,200 Z" fill="rgba(48,174,180,0.04)" />
          <path d="M0,130 C240,80 480,160 720,120 C960,80 1200,160 1440,130 L1440,200 L0,200 Z" fill="rgba(48,174,180,0.03)" />
        </svg>
        <svg viewBox="0 0 1440 200" style={{ width: '50%', height: '100%', display: 'inline-block' }} preserveAspectRatio="none">
          <path d="M0,100 C360,170 720,30 1080,100 C1260,135 1350,60 1440,100 L1440,200 L0,200 Z" fill="rgba(48,174,180,0.04)" />
          <path d="M0,130 C240,80 480,160 720,120 C960,80 1200,160 1440,130 L1440,200 L0,200 Z" fill="rgba(48,174,180,0.03)" />
        </svg>
      </div>
    </div>
  );
}

function TiltCard({ children, className = '', style = {} }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: { clientX: number; clientY: number }) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(600px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ transition: 'transform 0.3s ease', ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

export function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div style={{ background: '#0B0F19' }}>
      <style>{ORBIT_STYLES}</style>

      {/* ===== HERO SECTION ===== */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(48, 174, 180, 0.08) 0%, #0B0F19 70%)',
        }}
      >
        {/* Grid background */}
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />

        {/* Particles */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <ParticleBackground count={80} />
        </div>

        {/* Glow orbs */}
        <div
          style={{
            position: 'absolute', top: '20%', left: '15%', width: '400px', height: '400px',
            background: 'radial-gradient(circle, rgba(48, 174, 180, 0.12) 0%, transparent 70%)',
            transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
            transition: 'transform 0.5s ease', pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute', bottom: '20%', right: '15%', width: '350px', height: '350px',
            background: 'radial-gradient(circle, rgba(48, 174, 180, 0.08) 0%, transparent 70%)',
            transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
            transition: 'transform 0.6s ease', pointerEvents: 'none',
          }}
        />

        <WaveBackground />

        {/* Hero Content — two column */}
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '8rem 2rem 4rem',
            position: 'relative',
            zIndex: 2,
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center',
          }}
          className="hero-two-col"
        >
          {/* Left — text */}
          <div>
            {/* Badge */}
            <div
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'rgba(48, 174, 180, 0.1)', border: '1px solid rgba(48, 174, 180, 0.3)',
                borderRadius: '100px', padding: '0.375rem 1rem', marginBottom: '1.5rem',
                animation: 'slide-in-up 0.8s ease 0.2s both',
              }}
            >
              <span
                style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: '#30AEB4', boxShadow: '0 0 8px #30AEB4',
                  animation: 'glow-pulse 1.5s ease infinite',
                }}
              />
              <span style={{ color: '#30AEB4', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em' }}>
                TECHNOLOGY INNOVATION PARTNER
              </span>
            </div>

            {/* Headline */}
            <h1
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 4rem)', fontWeight: 800, lineHeight: 1.1,
                marginBottom: '1.5rem', animation: 'slide-in-up 0.8s ease 0.4s both',
                fontFamily: "'Sora', sans-serif",
              }}
            >
              Your Partner for{' '}
              <span className="animated-gradient-text">Technology Innovation</span>
            </h1>

            {/* Subtext */}
            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)', color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.8, marginBottom: '2.5rem', animation: 'slide-in-up 0.8s ease 0.6s both',
              }}
            >
              We help maintain and modernize your digital transformation journey while solving complex business challenges with cutting-edge enterprise solutions.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', animation: 'slide-in-up 0.8s ease 0.8s both' }}>
              <Link
                to="/services"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  background: 'linear-gradient(135deg, #30AEB4, #1A8E94)', color: '#fff',
                  padding: '0.875rem 2rem', borderRadius: '10px', textDecoration: 'none',
                  fontWeight: 700, fontSize: '0.95rem',
                  boxShadow: '0 0 30px rgba(48, 174, 180, 0.4), 0 8px 32px rgba(0,0,0,0.3)',
                  transition: 'all 0.3s ease', letterSpacing: '0.02em',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = '0 0 50px rgba(48, 174, 180, 0.6), 0 8px 32px rgba(0,0,0,0.3)';
                  el.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = '0 0 30px rgba(48, 174, 180, 0.4), 0 8px 32px rgba(0,0,0,0.3)';
                  el.style.transform = 'translateY(0)';
                }}
              >
                Explore Services <ArrowRight size={18} />
              </Link>
              <Link
                to="/contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  background: 'transparent', color: '#fff', padding: '0.875rem 2rem',
                  borderRadius: '10px', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem',
                  border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = '#30AEB4';
                  el.style.color = '#30AEB4';
                  el.style.boxShadow = '0 0 20px rgba(48,174,180,0.2)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(255,255,255,0.15)';
                  el.style.color = '#fff';
                  el.style.boxShadow = 'none';
                }}
              >
                Contact Us <ChevronRight size={18} />
              </Link>
            </div>
          </div>

          {/* Right — orbit visualization */}
          <div
            className="hero-orbit-col"
            style={{
              position: 'relative',
              height: '480px',
              animation: 'slide-in-up 0.8s ease 0.6s both',
            }}
          >
            <AchievementOrbit />
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
            color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', letterSpacing: '0.1em', zIndex: 2,
          }}
        >
          <span>SCROLL</span>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, rgba(48,174,180,0.6), transparent)', animation: 'float-up-down 2s ease infinite' }} />
        </div>
      </section>

      {/* ===== TECH PILLS ===== */}
      <section
        style={{
          padding: '3rem 2rem',
          background: 'rgba(17,24,39,0.5)',
          borderTop: '1px solid rgba(48,174,180,0.08)',
          borderBottom: '1px solid rgba(48,174,180,0.08)',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.25rem', fontWeight: 600 }}>
            Technologies We Work With
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
            {[TECH_PILLS_ROW1, TECH_PILLS_ROW2].map((row, ri) => (
              <div key={ri} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center' }}>
                {row.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                      background: 'rgba(48,174,180,0.07)', border: '1px solid rgba(48,174,180,0.2)',
                      borderRadius: '100px', padding: '0.4rem 1rem',
                      color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', fontWeight: 500,
                      letterSpacing: '0.02em',
                      transition: 'all 0.25s ease', cursor: 'default',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = 'rgba(48,174,180,0.15)';
                      el.style.borderColor = 'rgba(48,174,180,0.5)';
                      el.style.color = '#fff';
                      el.style.boxShadow = '0 0 12px rgba(48,174,180,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = 'rgba(48,174,180,0.07)';
                      el.style.borderColor = 'rgba(48,174,180,0.2)';
                      el.style.color = 'rgba(255,255,255,0.7)';
                      el.style.boxShadow = 'none';
                    }}
                  >
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#30AEB4', flexShrink: 0 }} />
                    {tech}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CLIENT MARQUEE ===== */}
      <ClientMarquee />

      {/* ===== WHY TECHNODUXX ===== */}
      <section style={{ padding: '7rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 60% at 20% 50%, rgba(48,174,180,0.05) 0%, transparent 60%)' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
          <SectionReveal>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <span style={{ color: '#30AEB4', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                WHY CHOOSE US
              </span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 800, marginTop: '0.5rem', fontFamily: "'Sora', sans-serif" }}>
                Why <span className="gradient-text">Technoduxx</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '1rem', maxWidth: '520px', margin: '1rem auto 0', lineHeight: 1.7 }}>
                We combine technical excellence with deep business understanding to deliver solutions that truly matter.
              </p>
            </div>
          </SectionReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
              marginTop: '4rem',
            }}
          >
            {whyCards.map((card, i) => (
              <SectionReveal key={card.title} delay={i * 120}>
                <TiltCard
                  style={{
                    background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(48,174,180,0.15)', borderRadius: '16px',
                    padding: '2rem', height: '100%', cursor: 'default',
                  }}
                >
                  <div
                    style={{
                      width: '60px', height: '60px', borderRadius: '14px',
                      background: 'rgba(48,174,180,0.12)', border: '1px solid rgba(48,174,180,0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#30AEB4', marginBottom: '1.25rem',
                      boxShadow: '0 0 20px rgba(48,174,180,0.15)', transition: 'all 0.3s ease',
                    }}
                  >
                    {card.icon}
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#fff', fontFamily: "'Sora', sans-serif" }}>
                    {card.title}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                    {card.desc}
                  </p>
                </TiltCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED SERVICES ===== */}
      <FeaturedServicesSection />

      {/* ===== TESTIMONIALS ===== */}
      <TestimonialsCarousel />

      {/* ===== CTA BANNER ===== */}
      <section
        style={{
          padding: '6rem 2rem', position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(48,174,180,0.08) 0%, rgba(11,15,25,0.5) 50%, rgba(48,174,180,0.05) 100%)',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(48,174,180,0.1) 0%, transparent 60%)' }} />
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <SectionReveal>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1rem', fontFamily: "'Sora', sans-serif", lineHeight: 1.2 }}>
              Ready to Transform Your{' '}
              <span className="gradient-text">Digital Future?</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Partner with Technoduxx and leverage the power of modern technology to drive growth, efficiency, and innovation.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to="/contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  background: 'linear-gradient(135deg, #30AEB4, #1A8E94)', color: '#fff',
                  padding: '1rem 2.25rem', borderRadius: '10px', textDecoration: 'none',
                  fontWeight: 700, fontSize: '1rem', boxShadow: '0 0 40px rgba(48,174,180,0.4)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = '0 0 60px rgba(48,174,180,0.6)';
                  el.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = '0 0 40px rgba(48,174,180,0.4)';
                  el.style.transform = 'translateY(0)';
                }}
              >
                Let's Build Together <ArrowRight size={20} />
              </Link>
              <Link
                to="/case-studies"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  background: 'rgba(255,255,255,0.06)', color: '#fff',
                  padding: '1rem 2.25rem', borderRadius: '10px', textDecoration: 'none',
                  fontWeight: 600, fontSize: '1rem', border: '1px solid rgba(255,255,255,0.12)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(48,174,180,0.4)';
                  el.style.color = '#30AEB4';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(255,255,255,0.12)';
                  el.style.color = '#fff';
                }}
              >
                View Case Studies
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}

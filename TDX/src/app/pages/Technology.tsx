import { useEffect, useRef } from 'react';
import { SectionReveal } from '../components/SectionReveal';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { OutSystemsCerts } from '../components/OutSystemsCerts';

const innerOrbitTechs = [
  { label: '.NET', angle: 0 },
  { label: 'Angular', angle: 90 },
  { label: 'Python', angle: 180 },
  { label: 'Node.js', angle: 270 },
];

const outerOrbitTechs = [
  { label: 'React.js', angle: 0 },
  { label: 'MongoDB', angle: 60 },
  { label: 'Flutter', angle: 120 },
  { label: 'Rails', angle: 180 },
  { label: 'UI/UX', angle: 240 },
  { label: 'AI & ML', angle: 300 },
];

const techStack = [
  { name: 'OutSystems', category: 'Low-Code', desc: 'Industry-leading low-code platform for rapid enterprise application development.' },
  { name: 'React.js', category: 'Frontend', desc: 'Modern UI library for building fast, interactive web applications.' },
  { name: 'Angular', category: 'Frontend', desc: 'Enterprise-grade TypeScript framework for scalable frontend development.' },
  { name: 'Node.js', category: 'Backend', desc: 'High-performance JavaScript runtime for building scalable backend services.' },
  { name: 'Python', category: 'AI & Data', desc: 'Versatile language powering AI, ML, and data analytics solutions.' },
  { name: '.NET', category: 'Backend', desc: 'Microsoft\'s powerful framework for enterprise-grade applications.' },
  { name: 'MongoDB', category: 'Database', desc: 'Flexible NoSQL database for modern, document-oriented applications.' },
  { name: 'Flutter', category: 'Mobile', desc: 'Google\'s UI toolkit for building natively compiled mobile applications.' },
  { name: 'AI & ML', category: 'Intelligence', desc: 'Artificial intelligence and machine learning for intelligent automation.' },
  { name: 'UI/UX', category: 'Design', desc: 'Human-centered design principles for exceptional user experiences.' },
  { name: 'Rails', category: 'Backend', desc: 'Convention-over-configuration framework for rapid backend development.' },
  { name: 'DevOps', category: 'Operations', desc: 'CI/CD pipelines and cloud infrastructure for continuous delivery.' },
];

function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const nodes: { x: number; y: number; connections: number[] }[] = [];
    const nodeCount = 20;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        connections: [],
      });
    }

    // Create connections
    nodes.forEach((node, i) => {
      const nearest = nodes
        .map((n, j) => ({ j, dist: Math.hypot(n.x - node.x, n.y - node.y) }))
        .sort((a, b) => a.dist - b.dist)
        .slice(1, 3)
        .map((n) => n.j);
      node.connections = nearest;
    });

    let progress = 0;
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      progress = (progress + 0.003) % 1;

      // Draw connections
      nodes.forEach((node) => {
        node.connections.forEach((j) => {
          const target = nodes[j];
          const grad = ctx.createLinearGradient(node.x, node.y, target.x, target.y);
          grad.addColorStop(0, 'rgba(48, 174, 180, 0.05)');
          grad.addColorStop(0.5, 'rgba(48, 174, 180, 0.15)');
          grad.addColorStop(1, 'rgba(48, 174, 180, 0.05)');
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      });

      // Draw nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(48, 174, 180, 0.6)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(48, 174, 180, 0.1)';
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}

function OrbitSystem() {
  return (
    <div style={{ position: 'relative', width: '520px', height: '520px', flexShrink: 0 }}>
      {/* Center OutSystems circle */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(48,174,180,0.25) 0%, rgba(48,174,180,0.08) 60%, transparent 100%)',
          border: '2px solid rgba(48,174,180,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 40px rgba(48,174,180,0.5), 0 0 80px rgba(48,174,180,0.2), inset 0 0 30px rgba(48,174,180,0.1)',
          animation: 'glow-pulse 2.5s ease-in-out infinite',
          zIndex: 10,
          cursor: 'default',
        }}
      >
        <span style={{ color: '#30AEB4', fontWeight: 800, fontSize: '0.85rem', textAlign: 'center', textShadow: '0 0 15px rgba(48,174,180,0.8)', fontFamily: "'Sora', sans-serif", letterSpacing: '0.02em' }}>
          Out<br />Systems
        </span>
      </div>

      {/* Inner orbit path */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          border: '1px dashed rgba(48,174,180,0.2)',
          animation: 'orbit-spin 25s linear infinite',
        }}
      >
        {innerOrbitTechs.map((tech) => {
          const rad = (tech.angle - 90) * (Math.PI / 180);
          const r = 120;
          const x = r * Math.cos(rad);
          const y = r * Math.sin(rad);
          return (
            <div
              key={tech.label}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                animation: 'counter-orbit-spin 25s linear infinite',
              }}
            >
              <div
                style={{
                  background: 'rgba(11,15,25,0.95)',
                  border: '1px solid rgba(48,174,180,0.4)',
                  borderRadius: '10px',
                  padding: '0.4rem 0.75rem',
                  color: '#30AEB4',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  boxShadow: '0 0 15px rgba(48,174,180,0.25)',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = '0 0 25px rgba(48,174,180,0.5)';
                  el.style.borderColor = '#30AEB4';
                  el.style.background = 'rgba(48,174,180,0.15)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = '0 0 15px rgba(48,174,180,0.25)';
                  el.style.borderColor = 'rgba(48,174,180,0.4)';
                  el.style.background = 'rgba(11,15,25,0.95)';
                }}
              >
                {tech.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Outer orbit path */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          border: '1px dashed rgba(48,174,180,0.12)',
          animation: 'counter-orbit-spin 40s linear infinite',
        }}
      >
        {outerOrbitTechs.map((tech) => {
          const rad = (tech.angle - 90) * (Math.PI / 180);
          const r = 210;
          const x = r * Math.cos(rad);
          const y = r * Math.sin(rad);
          return (
            <div
              key={tech.label}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                animation: 'orbit-spin 40s linear infinite',
              }}
            >
              <div
                style={{
                  background: 'rgba(11,15,25,0.95)',
                  border: '1px solid rgba(48,174,180,0.25)',
                  borderRadius: '10px',
                  padding: '0.4rem 0.75rem',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  boxShadow: '0 0 10px rgba(48,174,180,0.15)',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = '#30AEB4';
                  el.style.borderColor = 'rgba(48,174,180,0.5)';
                  el.style.boxShadow = '0 0 20px rgba(48,174,180,0.3)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = 'rgba(255,255,255,0.7)';
                  el.style.borderColor = 'rgba(48,174,180,0.25)';
                  el.style.boxShadow = '0 0 10px rgba(48,174,180,0.15)';
                }}
              >
                {tech.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Glow center overlay */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(48,174,180,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

export function Technology() {
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
          <CircuitBackground />
        </div>
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto' }}>
          <SectionReveal>
            <span style={{ color: '#30AEB4', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              OUR TECH FOUNDATION
            </span>
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 800,
                marginTop: '0.75rem',
                fontFamily: "'Sora', sans-serif",
                lineHeight: 1.1,
                marginBottom: '1.5rem',
              }}
            >
              <span className="animated-gradient-text">Technology</span>{' '}
              <span style={{ color: '#fff' }}>Stack</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.1rem', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto' }}>
              Powered by OutSystems at our core, backed by a comprehensive technology ecosystem to deliver cutting-edge enterprise solutions.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ===== ORBIT SECTION ===== */}
      <section style={{ padding: '5rem 2rem 7rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 30% 50%, rgba(48,174,180,0.04) 0%, transparent 60%)' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {/* Orbit Diagram */}
            <SectionReveal direction="left">
              <OrbitSystem />
            </SectionReveal>

            {/* Right Content */}
            <SectionReveal direction="right">
              <div style={{ maxWidth: '440px' }}>
                <span style={{ color: '#30AEB4', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  CORE TECHNOLOGY
                </span>
                <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, marginTop: '0.75rem', fontFamily: "'Sora', sans-serif" }}>
                  OutSystems at the{' '}
                  <span className="gradient-text">Core</span>
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginTop: '1.25rem', fontSize: '0.95rem' }}>
                  Our core focus lies in leveraging low-code with OutSystems to deliver innovative and efficient solutions, while supporting a wide range of technologies to meet diverse business needs.
                </p>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginTop: '1rem', fontSize: '0.95rem' }}>
                  This technology ecosystem allows us to build enterprise-grade applications rapidly, integrate seamlessly with existing systems, and scale effortlessly as your business grows.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginTop: '2rem' }}>
                  {[
                    { title: 'Rapid Development', desc: '10x faster delivery with OutSystems low-code platform' },
                    { title: 'Full-Stack Expertise', desc: 'End-to-end coverage from frontend to AI/ML capabilities' },
                    { title: 'Enterprise Integration', desc: 'Seamless connectivity with any existing technology stack' },
                  ].map((item) => (
                    <div
                      key={item.title}
                      style={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'flex-start',
                        padding: '1rem',
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(48,174,180,0.12)',
                        borderRadius: '10px',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = 'rgba(48,174,180,0.3)';
                        el.style.background = 'rgba(48,174,180,0.04)';
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = 'rgba(48,174,180,0.12)';
                        el.style.background = 'rgba(255,255,255,0.02)';
                      }}
                    >
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#30AEB4', boxShadow: '0 0 8px #30AEB4', flexShrink: 0, marginTop: '6px' }} />
                      <div>
                        <h4 style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{item.title}</h4>
                        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem' }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ===== OUTSYSTEMS CERTIFICATIONS ===== */}
      <OutSystemsCerts />

      {/* ===== TECH STACK GRID ===== */}
      <section
        style={{
          padding: '6rem 2rem',
          borderTop: '1px solid rgba(48,174,180,0.08)',
          background: 'rgba(17,24,39,0.3)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.25 }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
          <SectionReveal>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{ color: '#30AEB4', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                FULL ECOSYSTEM
              </span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, marginTop: '0.5rem', fontFamily: "'Sora', sans-serif" }}>
                Complete Technology Stack
              </h2>
            </div>
          </SectionReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {techStack.map((tech, i) => (
              <SectionReveal key={tech.name} delay={i * 60}>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(48,174,180,0.12)',
                    borderRadius: '12px',
                    padding: '1.375rem',
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                    height: '100%',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(48,174,180,0.4)';
                    el.style.background = 'rgba(48,174,180,0.05)';
                    el.style.boxShadow = '0 0 25px rgba(48,174,180,0.15)';
                    el.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(48,174,180,0.12)';
                    el.style.background = 'rgba(255,255,255,0.025)';
                    el.style.boxShadow = 'none';
                    el.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
                    <h4 style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem', fontFamily: "'Sora', sans-serif" }}>{tech.name}</h4>
                    <span
                      style={{
                        background: 'rgba(48,174,180,0.1)',
                        border: '1px solid rgba(48,174,180,0.2)',
                        color: '#30AEB4',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '100px',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {tech.category}
                    </span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', lineHeight: 1.6 }}>{tech.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ padding: '5rem 2rem', textAlign: 'center' }}>
        <SectionReveal>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800, fontFamily: "'Sora', sans-serif", marginBottom: '1rem' }}>
            Need a Specific Technology Solution?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '2rem', lineHeight: 1.7 }}>
            Our team has expertise across a wide range of technologies. Let's discuss your requirements.
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
              el.style.transform = 'translateY(-2px)';
              el.style.boxShadow = '0 0 50px rgba(48,174,180,0.6)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'translateY(0)';
              el.style.boxShadow = '0 0 30px rgba(48,174,180,0.4)';
            }}
          >
            Talk to Our Experts <ArrowRight size={18} />
          </Link>
        </SectionReveal>
      </section>
    </div>
  );
}
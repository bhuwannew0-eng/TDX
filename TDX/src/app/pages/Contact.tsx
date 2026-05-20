import { useState, useRef, useEffect, type CSSProperties, type FormEvent } from 'react';
import { SectionReveal } from '../components/SectionReveal';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

function GlobalNetworkViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // City nodes (approximate global positions on a flat map)
    const cities = [
      { name: 'New York', x: 0.22, y: 0.38 },
      { name: 'London', x: 0.45, y: 0.28 },
      { name: 'Dubai', x: 0.6, y: 0.42 },
      { name: 'Singapore', x: 0.76, y: 0.52 },
      { name: 'Sydney', x: 0.82, y: 0.72 },
      { name: 'Tokyo', x: 0.84, y: 0.35 },
      { name: 'Mumbai', x: 0.67, y: 0.46 },
      { name: 'Paris', x: 0.47, y: 0.30 },
      { name: 'Toronto', x: 0.2, y: 0.33 },
      { name: 'São Paulo', x: 0.28, y: 0.65 },
    ];

    const nodes = cities.map((c) => ({
      ...c,
      px: c.x * canvas.width,
      py: c.y * canvas.height,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.03 + Math.random() * 0.02,
    }));

    const packets: { from: number; to: number; progress: number; speed: number }[] = [];

    // Create packet connections
    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 4], [3, 5],
      [2, 6], [0, 8], [0, 9], [1, 7], [5, 3],
    ];

    const createPacket = () => {
      const conn = connections[Math.floor(Math.random() * connections.length)];
      packets.push({
        from: conn[0],
        to: conn[1],
        progress: 0,
        speed: 0.004 + Math.random() * 0.006,
      });
    };

    // Initialize some packets
    for (let i = 0; i < 5; i++) {
      setTimeout(createPacket, i * 600);
    }

    let animId: number;
    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      // Occasionally spawn new packets
      if (frame % 90 === 0 && packets.length < 12) {
        createPacket();
      }

      // Draw connections
      connections.forEach(([fromIdx, toIdx]) => {
        const from = nodes[fromIdx];
        const to = nodes[toIdx];
        const grad = ctx.createLinearGradient(from.px, from.py, to.px, to.py);
        grad.addColorStop(0, 'rgba(48, 174, 180, 0.08)');
        grad.addColorStop(0.5, 'rgba(48, 174, 180, 0.15)');
        grad.addColorStop(1, 'rgba(48, 174, 180, 0.08)');
        ctx.beginPath();
        ctx.moveTo(from.px, from.py);
        ctx.lineTo(to.px, to.py);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Update and draw packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.progress += p.speed;
        if (p.progress >= 1) {
          packets.splice(i, 1);
          continue;
        }
        const from = nodes[p.from];
        const to = nodes[p.to];
        const x = from.px + (to.px - from.px) * p.progress;
        const y = from.py + (to.py - from.py) * p.progress;

        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(48, 174, 180, 0.9)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(48, 174, 180, 0.2)';
        ctx.fill();
      }

      // Draw city nodes
      nodes.forEach((node) => {
        node.pulse += node.pulseSpeed;
        const pulseFactor = 0.7 + Math.sin(node.pulse) * 0.3;

        // Outer glow
        const outerR = 12 * pulseFactor;
        const grd = ctx.createRadialGradient(node.px, node.py, 0, node.px, node.py, outerR);
        grd.addColorStop(0, `rgba(48, 174, 180, ${0.3 * pulseFactor})`);
        grd.addColorStop(1, 'rgba(48, 174, 180, 0)');
        ctx.beginPath();
        ctx.arc(node.px, node.py, outerR, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(node.px, node.py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#30AEB4';
        ctx.fill();

        // City label
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.font = '10px Sora, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, node.px, node.py + 16);
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '300px' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '16px',
          background: 'rgba(48,174,180,0.02)',
          border: '1px solid rgba(48,174,180,0.1)',
          overflow: 'hidden',
        }}
      >
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          <div style={{ color: '#30AEB4', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', opacity: 0.6 }}>
            GLOBAL NETWORK
          </div>
        </div>
      </div>
    </div>
  );
}

const contactInfo = [
  { icon: <Mail size={20} />, label: 'Email Us', value: 'hello@technoduxx.com', sub: 'We reply within 24 hours' },
  { icon: <Phone size={20} />, label: 'Call Us', value: '+1 (800) 123-4567', sub: 'Mon – Fri, 9am to 6pm' },
  { icon: <MapPin size={20} />, label: 'Global Offices', value: 'USA · Europe · APAC', sub: 'Distributed remote team' },
  { icon: <Clock size={20} />, label: 'Response Time', value: '< 24 Hours', sub: 'Guaranteed response SLA' },
];

export function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', company: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = 'Name is required';
    if (!formState.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formState.email)) newErrors.email = 'Invalid email address';
    if (!formState.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1800);
  };

  const handleChange = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const inputStyle = (hasError?: boolean): CSSProperties => ({
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${hasError ? '#FF6B6B' : 'rgba(48,174,180,0.2)'}`,
    borderRadius: '10px',
    padding: '0.875rem 1rem',
    color: '#fff',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'all 0.3s ease',
    fontFamily: "'Sora', 'Inter', sans-serif",
  });

  return (
    <div style={{ background: '#0B0F19' }}>
      {/* ===== HERO ===== */}
      <section
        style={{
          position: 'relative',
          padding: '10rem 2rem 6rem',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(48,174,180,0.07) 0%, #0B0F19 70%)',
          textAlign: 'center',
        }}
      >
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '700px', margin: '0 auto' }}>
          <SectionReveal>
            <span style={{ color: '#30AEB4', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              START A CONVERSATION
            </span>
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 800,
                marginTop: '0.75rem',
                fontFamily: "'Sora', sans-serif",
                lineHeight: 1.1,
                marginBottom: '1rem',
              }}
            >
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.1rem', lineHeight: 1.8 }}>
              Let's Build Something{' '}
              <span style={{ color: '#30AEB4', fontWeight: 600 }}>Future Ready</span>
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ===== CONTACT INFO CARDS ===== */}
      <section style={{ padding: '2rem 2rem 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {contactInfo.map((info, i) => (
              <SectionReveal key={info.label} delay={i * 80}>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(48,174,180,0.15)',
                    borderRadius: '12px',
                    padding: '1.375rem',
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(48,174,180,0.4)';
                    el.style.boxShadow = '0 0 20px rgba(48,174,180,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(48,174,180,0.15)';
                    el.style.boxShadow = 'none';
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(48,174,180,0.1)',
                      border: '1px solid rgba(48,174,180,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#30AEB4',
                      flexShrink: 0,
                    }}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                      {info.label}
                    </p>
                    <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.2rem' }}>{info.value}</p>
                    <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem' }}>{info.sub}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTACT FORM + MAP ===== */}
      <section style={{ padding: '4rem 2rem 7rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 0.9fr',
              gap: '3rem',
              alignItems: 'start',
            }}
            className="grid-cols-1 lg:grid-cols-2"
          >
            {/* ===== FORM ===== */}
            <SectionReveal direction="left">
              <div
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(48,174,180,0.2)',
                  borderRadius: '20px',
                  padding: '2.5rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Glow corner */}
                <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(48,174,180,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                    <div
                      style={{
                        width: '72px',
                        height: '72px',
                        borderRadius: '50%',
                        background: 'rgba(48,174,180,0.12)',
                        border: '2px solid #30AEB4',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        animation: 'glow-pulse 2s ease infinite',
                      }}
                    >
                      <CheckCircle2 size={32} style={{ color: '#30AEB4' }} />
                    </div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, fontFamily: "'Sora', sans-serif", marginBottom: '0.75rem' }}>
                      Message Sent!
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
                      Thank you for reaching out. Our team will get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setFormState({ name: '', email: '', company: '', service: '', message: '' }); }}
                      style={{
                        marginTop: '1.5rem',
                        background: 'rgba(48,174,180,0.1)',
                        border: '1px solid rgba(48,174,180,0.3)',
                        color: '#30AEB4',
                        padding: '0.625rem 1.5rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: "'Sora', sans-serif", marginBottom: '0.5rem' }}>
                      Send Us a Message
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', marginBottom: '2rem' }}>
                      Fill in the form below and we'll be in touch shortly.
                    </p>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                            Full Name *
                          </label>
                          <input
                            type="text"
                            placeholder="John Doe"
                            value={formState.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            style={inputStyle(!!errors.name)}
                            onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#30AEB4'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 15px rgba(48,174,180,0.2)'; }}
                            onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = errors.name ? '#FF6B6B' : 'rgba(48,174,180,0.2)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                          />
                          {errors.name && <p style={{ color: '#FF6B6B', fontSize: '0.72rem', marginTop: '0.3rem' }}>{errors.name}</p>}
                        </div>
                        <div>
                          <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                            Email Address *
                          </label>
                          <input
                            type="email"
                            placeholder="john@company.com"
                            value={formState.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            style={inputStyle(!!errors.email)}
                            onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#30AEB4'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 15px rgba(48,174,180,0.2)'; }}
                            onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = errors.email ? '#FF6B6B' : 'rgba(48,174,180,0.2)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                          />
                          {errors.email && <p style={{ color: '#FF6B6B', fontSize: '0.72rem', marginTop: '0.3rem' }}>{errors.email}</p>}
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                          Company Name
                        </label>
                        <input
                          type="text"
                          placeholder="Your Company"
                          value={formState.company}
                          onChange={(e) => handleChange('company', e.target.value)}
                          style={inputStyle()}
                          onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#30AEB4'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 15px rgba(48,174,180,0.2)'; }}
                          onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(48,174,180,0.2)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                          Service of Interest
                        </label>
                        <select
                          value={formState.service}
                          onChange={(e) => handleChange('service', e.target.value)}
                          style={{
                            ...inputStyle(),
                            cursor: 'pointer',
                            appearance: 'none',
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2330AEB4' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 1rem center',
                          }}
                          onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#30AEB4'; }}
                          onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(48,174,180,0.2)'; }}
                        >
                          <option value="" style={{ background: '#111827' }}>Select a service...</option>
                          <option value="co-delivery" style={{ background: '#111827' }}>Co-Delivery & Capability Building</option>
                          <option value="app-dev" style={{ background: '#111827' }}>Accelerated Application Development</option>
                          <option value="platform-health" style={{ background: '#111827' }}>Platform Health & Performance</option>
                          <option value="ao-optimization" style={{ background: '#111827' }}>AO Optimization</option>
                          <option value="data-migration" style={{ background: '#111827' }}>Data Migration Excellence</option>
                          <option value="transformation" style={{ background: '#111827' }}>Digital Transformation Strategy</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                          Message *
                        </label>
                        <textarea
                          placeholder="Tell us about your project or challenge..."
                          value={formState.message}
                          onChange={(e) => handleChange('message', e.target.value)}
                          rows={4}
                          style={{
                            ...inputStyle(!!errors.message),
                            resize: 'vertical',
                            minHeight: '110px',
                          }}
                          onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#30AEB4'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 15px rgba(48,174,180,0.2)'; }}
                          onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = errors.message ? '#FF6B6B' : 'rgba(48,174,180,0.2)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                        />
                        {errors.message && <p style={{ color: '#FF6B6B', fontSize: '0.72rem', marginTop: '0.3rem' }}>{errors.message}</p>}
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          background: loading ? 'rgba(48,174,180,0.5)' : 'linear-gradient(135deg, #30AEB4, #1A8E94)',
                          color: '#fff',
                          padding: '1rem',
                          borderRadius: '10px',
                          border: 'none',
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          boxShadow: '0 0 30px rgba(48,174,180,0.35)',
                          transition: 'all 0.3s ease',
                          fontFamily: "'Sora', sans-serif",
                        }}
                        onMouseEnter={(e) => {
                          if (!loading) {
                            const el = e.currentTarget as HTMLElement;
                            el.style.boxShadow = '0 0 50px rgba(48,174,180,0.6)';
                            el.style.transform = 'translateY(-1px)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.boxShadow = '0 0 30px rgba(48,174,180,0.35)';
                          el.style.transform = 'translateY(0)';
                        }}
                      >
                        {loading ? (
                          <>
                            <div style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'ring-rotate 0.8s linear infinite' }} />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </SectionReveal>

            {/* ===== RIGHT SIDE ===== */}
            <SectionReveal direction="right">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Global Network */}
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: "'Sora', sans-serif", marginBottom: '1rem', color: '#fff' }}>
                    🌐 Our Global Presence
                  </h3>
                  <GlobalNetworkViz />
                </div>

                {/* Why Contact */}
                <div
                  style={{
                    background: 'rgba(48,174,180,0.05)',
                    border: '1px solid rgba(48,174,180,0.2)',
                    borderRadius: '16px',
                    padding: '1.75rem',
                  }}
                >
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, fontFamily: "'Sora', sans-serif", marginBottom: '1.25rem', color: '#30AEB4' }}>
                    What Happens Next?
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[
                      { step: '01', text: 'Our team reviews your message and requirements within hours.' },
                      { step: '02', text: 'We schedule a discovery call to understand your goals in detail.' },
                      { step: '03', text: 'We prepare a tailored proposal and engagement plan for you.' },
                      { step: '04', text: 'We kick off your project with a defined roadmap and clear milestones.' },
                    ].map((item) => (
                      <div key={item.step} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
                        <span style={{ color: '#30AEB4', fontWeight: 800, fontSize: '0.8rem', fontFamily: "'Sora', sans-serif", minWidth: '24px', textShadow: '0 0 8px rgba(48,174,180,0.5)' }}>
                          {item.step}
                        </span>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', lineHeight: 1.6 }}>{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Promise */}
                <div
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(48,174,180,0.12)',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ fontSize: '1.75rem' }}>🔒</div>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', lineHeight: 1.6 }}>
                    <span style={{ color: '#fff', fontWeight: 600 }}>Your privacy is protected.</span>{' '}
                    All information is kept strictly confidential and never shared with third parties.
                  </p>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
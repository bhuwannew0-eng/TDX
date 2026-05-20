import { Link } from 'react-router';
import { Mail, Phone, MapPin, Linkedin, Twitter, Github, ArrowRight } from 'lucide-react';
import logo from '../../imports/TechnoDuxx_Logo_CMYK.png';

const footerLinks = {
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Our Team', path: '/about' },
    { label: 'Careers', path: '/contact' },
    { label: 'Blog', path: '/blog' },
  ],
  Services: [
    { label: 'Co-Delivery', path: '/services' },
    { label: 'App Development', path: '/services' },
    { label: 'Platform Health', path: '/services' },
    { label: 'Data Migration', path: '/services' },
  ],
  Technology: [
    { label: 'OutSystems', path: '/technology' },
    { label: 'React & Angular', path: '/technology' },
    { label: 'AI Solutions', path: '/technology' },
    { label: 'Cloud & DevOps', path: '/technology' },
  ],
  Products: [
    { label: 'Lumenore', path: '/lumenore' },
    { label: 'Case Studies', path: '/case-studies' },
    { label: 'Contact Us', path: '/contact' },
  ],
};

export function Footer() {
  return (
    <footer
      style={{
        background: '#060A14',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top teal glow line */}
      <div
        style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, #30AEB4 30%, #7DD3DA 50%, #30AEB4 70%, transparent 100%)',
          boxShadow: '0 0 20px rgba(48, 174, 180, 0.6), 0 0 60px rgba(48, 174, 180, 0.2)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse at bottom right, rgba(48, 174, 180, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 2rem 2rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.8fr 1fr 1fr 1fr 1fr',
            gap: '2.5rem',
            marginBottom: '3rem',
          }}
          className="grid-cols-1 md:grid-cols-3 lg:grid-cols-5"
        >
          {/* Brand Column */}
          <div>
            <img
              src={logo}
              alt="Technoduxx"
              style={{ height: '36px', objectFit: 'contain', marginBottom: '1.25rem', filter: 'brightness(1.1)' }}
            />
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '240px' }}>
              Modern technology consulting company focused on digital transformation and scalable enterprise solutions.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {[
                { icon: <Linkedin size={16} />, href: '#' },
                { icon: <Twitter size={16} />, href: '#' },
                { icon: <Github size={16} />, href: '#' },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    border: '1px solid rgba(48,174,180,0.2)',
                    color: 'rgba(255,255,255,0.5)',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = '#30AEB4';
                    el.style.borderColor = '#30AEB4';
                    el.style.boxShadow = '0 0 12px rgba(48,174,180,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = 'rgba(255,255,255,0.5)';
                    el.style.borderColor = 'rgba(48,174,180,0.2)';
                    el.style.boxShadow = 'none';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { icon: <Mail size={14} />, text: 'hello@technoduxx.com' },
                { icon: <Phone size={14} />, text: '+1 (800) 123-4567' },
                { icon: <MapPin size={14} />, text: 'Global Remote Team' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
                  <span style={{ color: '#30AEB4' }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4
                style={{
                  color: '#30AEB4',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '1.25rem',
                }}
              >
                {title}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {links.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    style={{
                      color: 'rgba(255,255,255,0.45)',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#30AEB4'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'; }}
                  >
                    <ArrowRight size={12} />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(48,174,180,0.1)',
            paddingTop: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>
            © 2025 Technoduxx. All rights reserved. Built for the future.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a
                key={item}
                href="#"
                style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', textDecoration: 'none', transition: 'color 0.3s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#30AEB4'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.3)'; }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import logo from '../../imports/TechnoDuxx_Logo_CMYK.png';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Technology', path: '/technology' },
  { label: 'Lumenore', path: '/lumenore' },
  { label: 'Case Studies', path: '/case-studies' },
  { label: 'Contact', path: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'all 0.4s ease',
          background: scrolled
            ? 'rgba(11, 15, 25, 0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(48, 174, 180, 0.15)'
            : 'none',
          boxShadow: scrolled
            ? '0 4px 30px rgba(0,0,0,0.4)'
            : 'none',
          padding: '0 2rem',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '72px',
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', zIndex: 1001 }}>
            <img
              src={logo}
              alt="Technoduxx"
              style={{ height: '40px', objectFit: 'contain', filter: 'brightness(1.1)' }}
            />
          </Link>

          {/* Desktop Nav Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.75rem',
            }}
            className="hidden md:flex"
          >
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? location.pathname === '/' && !link.path.includes('#')
                  : link.path.startsWith('/#')
                  ? false
                  : location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    color: isActive ? '#30AEB4' : 'rgba(255,255,255,0.75)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                    position: 'relative',
                    paddingBottom: '4px',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = '#30AEB4';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.75)';
                  }}
                >
                  {link.label}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'linear-gradient(90deg, #30AEB4, #7DD3DA)',
                      borderRadius: '1px',
                      boxShadow: '0 0 8px rgba(48, 174, 180, 0.8)',
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <Link
            to="/contact"
            className="hidden md:inline-flex"
            style={{
              background: 'linear-gradient(135deg, #30AEB4, #1A8E94)',
              color: '#fff',
              padding: '0.5rem 1.25rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: 600,
              boxShadow: '0 0 20px rgba(48, 174, 180, 0.3)',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(48,174,180,0.4)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(48, 174, 180, 0.6)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(48, 174, 180, 0.3)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            Get Started
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: mobileOpen ? 'rgba(48,174,180,0.12)' : 'none',
              border: mobileOpen ? '1px solid rgba(48,174,180,0.3)' : 'none',
              borderRadius: '8px',
              color: '#30AEB4',
              cursor: 'pointer',
              padding: '8px',
              zIndex: 1001,
              position: 'relative',
              transition: 'all 0.3s ease',
            }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        onClick={() => setMobileOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 998,
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'all' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Mobile Slide-in Menu */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(320px, 85vw)',
          background: 'rgba(11, 15, 25, 0.97)',
          backdropFilter: 'blur(30px)',
          borderLeft: '1px solid rgba(48, 174, 180, 0.2)',
          zIndex: 999,
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: mobileOpen ? '-20px 0 60px rgba(0,0,0,0.5)' : 'none',
          overflowY: 'auto',
        }}
      >
        {/* Menu Header */}
        <div
          style={{
            padding: '1.5rem 1.75rem',
            borderBottom: '1px solid rgba(48,174,180,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '72px',
          }}
        >
          <img
            src={logo}
            alt="Technoduxx"
            style={{ height: '34px', objectFit: 'contain', filter: 'brightness(1.1)' }}
          />
          <button
            onClick={() => setMobileOpen(false)}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: 'rgba(255,255,255,0.6)',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav Links */}
        <div style={{ padding: '1.5rem 1.75rem', flex: 1 }}>
          {/* Teal accent line */}
          <div
            style={{
              width: '32px',
              height: '3px',
              background: 'linear-gradient(90deg, #30AEB4, transparent)',
              borderRadius: '2px',
              marginBottom: '1.75rem',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {navLinks.map((link, i) => {
              const isActive =
                link.path === '/'
                  ? location.pathname === '/'
                  : link.path.startsWith('/#')
                  ? false
                  : location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    color: isActive ? '#30AEB4' : 'rgba(255,255,255,0.75)',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: isActive ? 700 : 500,
                    padding: '0.875rem 1rem',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: isActive ? 'rgba(48,174,180,0.08)' : 'transparent',
                    border: isActive ? '1px solid rgba(48,174,180,0.2)' : '1px solid transparent',
                    transition: 'all 0.25s ease',
                    animationDelay: `${i * 50}ms`,
                    letterSpacing: '0.01em',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = '#30AEB4';
                      el.style.background = 'rgba(48,174,180,0.05)';
                      el.style.borderColor = 'rgba(48,174,180,0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = 'rgba(255,255,255,0.75)';
                      el.style.background = 'transparent';
                      el.style.borderColor = 'transparent';
                    }
                  }}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#30AEB4',
                        boxShadow: '0 0 8px #30AEB4',
                        flexShrink: 0,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* CTA at bottom */}
        <div
          style={{
            padding: '1.5rem 1.75rem',
            borderTop: '1px solid rgba(48,174,180,0.1)',
          }}
        >
          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              background: 'linear-gradient(135deg, #30AEB4, #1A8E94)',
              color: '#fff',
              padding: '0.875rem 1.5rem',
              borderRadius: '10px',
              textDecoration: 'none',
              textAlign: 'center',
              fontWeight: 700,
              fontSize: '0.95rem',
              boxShadow: '0 0 20px rgba(48,174,180,0.3)',
              transition: 'all 0.3s ease',
              letterSpacing: '0.02em',
            }}
          >
            Get Started →
          </Link>
          <p
            style={{
              color: 'rgba(255,255,255,0.3)',
              fontSize: '0.7rem',
              textAlign: 'center',
              marginTop: '1rem',
              letterSpacing: '0.05em',
            }}
          >
            © 2025 TECHNODUXX
          </p>
        </div>
      </div>
    </>
  );
}
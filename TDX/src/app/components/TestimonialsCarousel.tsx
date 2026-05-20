import { useState, useEffect, useRef, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { SectionReveal } from './SectionReveal';

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
}

const testimonials = [
  {
    id: 1,
    quote: 'Technoduxx modernized our systems faster than expected. Their OutSystems expertise is unmatched in the industry.',
    author: 'Enterprise Client',
    role: 'Chief Technology Officer',
    initials: 'CT',
    accentColor: '#30AEB4',
    rating: 5,
  },
  {
    id: 2,
    quote: 'Strong OutSystems expertise and flawless delivery. Every sprint was a showcase of technical excellence and professionalism.',
    author: 'Operations Head',
    role: 'Digital Operations Head',
    initials: 'OH',
    accentColor: '#A78BFA',
    rating: 5,
  },
  {
    id: 3,
    quote: 'Reliable long-term technology partner. Technoduxx brings both strategic vision and tactical execution to every engagement.',
    author: 'Business Director',
    role: 'Business Director',
    initials: 'BD',
    accentColor: '#F59E0B',
    rating: 5,
  },
  {
    id: 4,
    quote: 'Great communication and execution quality. They understood our requirements from day one and delivered beyond our expectations.',
    author: 'Product Lead',
    role: 'Head of Product',
    initials: 'PL',
    accentColor: '#34D399',
    rating: 5,
  },
  {
    id: 5,
    quote: 'Their automation solutions saved significant time across our operations. A truly transformative partnership.',
    author: 'Transformation Manager',
    role: 'Digital Transformation Lead',
    initials: 'TM',
    accentColor: '#60A5FA',
    rating: 5,
  },
  {
    id: 6,
    quote: 'Highly professional and responsive team. Technoduxx sets the gold standard for low-code delivery partners.',
    author: 'IT Head',
    role: 'Head of Information Technology',
    initials: 'IH',
    accentColor: '#F472B6',
    rating: 5,
  },
];

function StarRating({ count, color }: { count: number; color: string }) {
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={color} stroke="none">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsCarousel() {
  const width = useWindowWidth();
  const slideWidth = width >= 1024 ? '33.333%' : width >= 640 ? '50%' : '100%';
  const [isPaused, setIsPaused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    dragFree: false,
  });

  // Update slide width on resize by reinitializing
  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [width, emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  // Autoplay
  useEffect(() => {
    if (!emblaApi || isPaused) return;
    const id = setInterval(() => emblaApi.scrollNext(), 4200);
    return () => clearInterval(id);
  }, [emblaApi, isPaused]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  return (
    <section
      style={{
        padding: '7rem 0',
        position: 'relative',
        overflow: 'hidden',
        background: 'rgba(17,24,39,0.45)',
        borderTop: '1px solid rgba(48,174,180,0.08)',
      }}
    >
      {/* Background glows */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 70% at 50% 30%, rgba(48,174,180,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div
        style={{
          position: 'absolute',
          top: '-60px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(48,174,180,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div style={{ padding: '0 2rem', marginBottom: '3.5rem' }}>
        <SectionReveal>
          <div style={{ textAlign: 'center' }}>
            <span style={{ color: '#30AEB4', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              CLIENT TESTIMONIALS
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, marginTop: '0.5rem', fontFamily: "'Sora', sans-serif" }}>
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', maxWidth: '480px', margin: '0.75rem auto 0', lineHeight: 1.7, fontSize: '0.9rem' }}>
              Trusted by leading enterprises across industries for quality, speed, and innovation.
            </p>
          </div>
        </SectionReveal>
      </div>

      {/* Embla Carousel */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          ref={emblaRef}
          style={{ overflow: 'hidden', paddingLeft: '2rem' }}
        >
          <div style={{ display: 'flex', touchAction: 'pan-y' }}>
            {testimonials.map((t) => (
              <div
                key={t.id}
                style={{
                  flex: `0 0 ${slideWidth}`,
                  minWidth: 0,
                  paddingRight: '1.25rem',
                }}
              >
                <TestimonialCard testimonial={t} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
            marginTop: '2.5rem',
            padding: '0 2rem',
          }}
        >
          {/* Prev */}
          <NavButton onClick={scrollPrev} direction="left" />

          {/* Dots */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                style={{
                  width: i === selectedIndex ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: i === selectedIndex ? '#30AEB4' : 'rgba(255,255,255,0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.1)',
                  padding: 0,
                  boxShadow: i === selectedIndex ? '0 0 10px rgba(48,174,180,0.5)' : 'none',
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Next */}
          <NavButton onClick={scrollNext} direction="right" />
        </div>

        {/* Counter */}
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
            {selectedIndex + 1} / {testimonials.length}
          </span>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial: t }: { testimonial: typeof testimonials[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(255,255,255,0.025)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${t.accentColor}28`,
        borderTop: `2px solid ${t.accentColor}70`,
        borderRadius: '20px',
        padding: '1.75rem',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: hovered
          ? `0 0 30px ${t.accentColor}14, 0 16px 48px rgba(0,0,0,0.4)`
          : '0 4px 24px rgba(0,0,0,0.25)',
        transition: 'all 0.35s ease',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        cursor: 'default',
        minHeight: '260px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '1.25rem',
      }}
    >
      {/* Corner glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '120px',
          height: '120px',
          background: `radial-gradient(circle, ${t.accentColor}10 0%, transparent 70%)`,
          pointerEvents: 'none',
          opacity: hovered ? 1 : 0.5,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Top section */}
      <div>
        {/* Quote icon + stars */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: `${t.accentColor}15`,
              border: `1px solid ${t.accentColor}30`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: t.accentColor,
              boxShadow: `0 0 12px ${t.accentColor}20`,
            }}
          >
            <Quote size={18} />
          </div>
          <StarRating count={t.rating} color={t.accentColor} />
        </div>

        {/* Quote text */}
        <p
          style={{
            color: 'rgba(255,255,255,0.78)',
            fontSize: '0.875rem',
            lineHeight: 1.75,
            fontStyle: 'italic',
          }}
        >
          "{t.quote}"
        </p>
      </div>

      {/* Author */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.875rem',
          paddingTop: '1rem',
          borderTop: `1px solid rgba(255,255,255,0.06)`,
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${t.accentColor}35, ${t.accentColor}12)`,
            border: `2px solid ${t.accentColor}45`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: t.accentColor,
            fontSize: '0.65rem',
            fontWeight: 800,
            letterSpacing: '0.02em',
            flexShrink: 0,
            boxShadow: `0 0 12px ${t.accentColor}18`,
            fontFamily: "'Sora', sans-serif",
          }}
        >
          {t.initials}
        </div>
        <div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem', fontFamily: "'Sora', sans-serif" }}>
            {t.author}
          </div>
          <div style={{ color: t.accentColor, fontSize: '0.72rem', marginTop: '2px', fontWeight: 500, opacity: 0.85 }}>
            {t.role}
          </div>
        </div>
      </div>
    </div>
  );
}

function NavButton({ onClick, direction }: { onClick: () => void; direction: 'left' | 'right' }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: hovered ? 'rgba(48,174,180,0.15)' : 'rgba(255,255,255,0.06)',
        border: hovered ? '1px solid #30AEB4' : '1px solid rgba(255,255,255,0.12)',
        color: hovered ? '#30AEB4' : 'rgba(255,255,255,0.6)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.25s ease',
        flexShrink: 0,
        boxShadow: hovered ? '0 0 16px rgba(48,174,180,0.2)' : 'none',
      }}
      aria-label={direction === 'left' ? 'Previous' : 'Next'}
    >
      {direction === 'left' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
    </button>
  );
}

import { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
  sublabel?: string;
}

export function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
  duration = 2200,
  label,
  sublabel,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };

    requestAnimationFrame(step);
  }, [visible, target, duration]);

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
      }}
    >
      {/* Animated ring */}
      <div style={{ position: 'relative', width: '140px', height: '140px' }}>
        {/* Outer glow ring */}
        <div
          style={{
            position: 'absolute',
            inset: '-4px',
            borderRadius: '50%',
            background: 'transparent',
            border: '2px solid transparent',
            backgroundImage: 'linear-gradient(#0B0F19, #0B0F19), linear-gradient(135deg, #30AEB4, transparent, #30AEB4)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            animation: 'ring-rotate 3s linear infinite',
            boxShadow: '0 0 20px rgba(48, 174, 180, 0.3)',
          }}
        />
        {/* Inner ring */}
        <div
          style={{
            position: 'absolute',
            inset: '8px',
            borderRadius: '50%',
            border: '1px solid rgba(48, 174, 180, 0.2)',
          }}
        />
        {/* Center circle */}
        <div
          style={{
            position: 'absolute',
            inset: '16px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(48, 174, 180, 0.12) 0%, rgba(11, 15, 25, 0.8) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'glow-pulse 2.5s ease-in-out infinite',
          }}
        >
          <span
            style={{
              fontSize: '1.6rem',
              fontWeight: 800,
              color: '#30AEB4',
              fontFamily: "'Sora', sans-serif",
              textShadow: '0 0 15px rgba(48, 174, 180, 0.8)',
            }}
          >
            {prefix}{count}{suffix}
          </span>
        </div>
      </div>

      {/* Label */}
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: '#ffffff',
            letterSpacing: '0.02em',
          }}
        >
          {label}
        </div>
        {sublabel && (
          <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.25rem' }}>
            {sublabel}
          </div>
        )}
      </div>
    </div>
  );
}

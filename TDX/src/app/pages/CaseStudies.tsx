import { useState, useRef, useEffect } from 'react';
import { ParticleBackground } from '../components/ParticleBackground';
import { SectionReveal } from '../components/SectionReveal';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { Link } from 'react-router';
import { X, ArrowRight, TrendingUp, Clock, Users, BarChart2, ExternalLink, Building2, ChevronRight } from 'lucide-react';

// ─── Case Study Data ───────────────────────────────────────────
const caseStudies = [
  {
    id: 1,
    client: 'Suzlon',
    initials: 'SZ',
    category: 'Risk Management',
    accentColor: '#30AEB4',
    title: 'Enterprise Risk Management',
    summary: 'Built centralized scalable ERM platform for enterprise risk governance.',
    industry: 'Renewable Energy',
    challenge:
      'Suzlon, one of India\'s largest wind energy producers, faced fragmented risk management processes across multiple business units. Without a unified platform, risk data was siloed, compliance reporting was manual, and critical decisions lacked real-time visibility.',
    solution:
      'We designed and delivered a centralized Enterprise Risk Management (ERM) platform on OutSystems. The solution integrated risk registers, automated escalation workflows, real-time dashboards, and compliance reporting modules — all accessible across the enterprise in a single unified interface.',
    result:
      'Risk visibility improved by 70%, compliance reporting timelines were reduced from days to hours, and enterprise-wide risk governance became standardized across all business units. The platform now supports 500+ active risk entries and serves leadership teams daily.',
    metrics: [
      { icon: <TrendingUp size={16} />, label: 'Risk Visibility', value: '+70%' },
      { icon: <Clock size={16} />, label: 'Reporting Speed', value: '10x' },
      { icon: <BarChart2 size={16} />, label: 'Active Risks', value: '500+' },
      { icon: <Users size={16} />, label: 'User Adoption', value: '95%' },
    ],
    tags: ['ERM', 'OutSystems', 'Risk Governance', 'Enterprise', 'Compliance'],
  },
  {
    id: 2,
    client: 'Magenta Mobility',
    initials: 'MM',
    category: 'HR Technology',
    accentColor: '#E879F9',
    title: 'Payroll Management',
    summary: 'Automated complex multi-variable payroll system with compliance workflows.',
    industry: 'Electric Mobility',
    challenge:
      'Magenta Mobility operated a complex payroll structure with variable components including EV fleet incentives, driver performance bonuses, and multi-state tax compliance. Manual payroll processing was error-prone, time-consuming, and difficult to audit.',
    solution:
      'We built a comprehensive Payroll Management System that automated multi-variable salary computation, statutory compliance workflows (PF, ESI, TDS), payslip generation, and audit trail management. The system also integrated with their HR module for seamless employee lifecycle management.',
    result:
      'Payroll processing time dropped by 80%, error rates fell to near zero, and full statutory compliance was achieved across all states. The HR team recovered 40+ hours per month previously spent on manual payroll tasks.',
    metrics: [
      { icon: <TrendingUp size={16} />, label: 'Processing Time', value: '-80%' },
      { icon: <Clock size={16} />, label: 'Hours Saved', value: '40+/mo' },
      { icon: <BarChart2 size={16} />, label: 'Error Rate', value: '~0%' },
      { icon: <Users size={16} />, label: 'Compliance', value: '100%' },
    ],
    tags: ['Payroll', 'HR Tech', 'Automation', 'OutSystems', 'Compliance'],
  },
  {
    id: 3,
    client: 'HDFC',
    initials: 'HF',
    category: 'Process Automation',
    accentColor: '#F59E0B',
    title: 'Digital Process Automation',
    summary: 'Streamlined banking operations through intelligent digital process automation.',
    industry: 'Banking & Finance',
    challenge:
      'HDFC\'s operations teams were handling high-volume manual processes for loan origination, KYC verification, and document management. These bottlenecks were impacting turnaround times, customer satisfaction, and operational costs.',
    solution:
      'Technoduxx implemented a Digital Process Automation framework leveraging OutSystems to digitize and streamline loan origination, e-KYC, document validation, and approval workflows. The platform featured intelligent routing, SLA tracking, and real-time status updates for customers and agents.',
    result:
      'Loan processing TAT reduced by 60%, customer satisfaction scores improved significantly, document error rates dropped by 85%, and the operations team could handle 3x the volume without additional headcount.',
    metrics: [
      { icon: <TrendingUp size={16} />, label: 'TAT Reduction', value: '60%' },
      { icon: <Clock size={16} />, label: 'Volume Handled', value: '3x' },
      { icon: <BarChart2 size={16} />, label: 'Error Reduction', value: '85%' },
      { icon: <Users size={16} />, label: 'CSAT Lift', value: '+40pts' },
    ],
    tags: ['Banking', 'DPA', 'OutSystems', 'Workflow', 'KYC'],
  },
  {
    id: 4,
    client: 'Edelweiss',
    initials: 'EW',
    category: 'Workflow Transformation',
    accentColor: '#60A5FA',
    title: 'Operational Workflow Transformation',
    summary: 'Modernized end-to-end operational workflows for enhanced enterprise efficiency.',
    industry: 'Financial Services',
    challenge:
      'Edelweiss faced operational inefficiencies across their wealth management and financial services divisions. Disconnected legacy systems, manual approvals, and lack of real-time reporting were creating friction and limiting scalability.',
    solution:
      'We conducted a comprehensive workflow audit and delivered a phased Operational Workflow Transformation using OutSystems. Key initiatives included a unified operations dashboard, automated approval chains, real-time reporting, and integration with their core financial systems.',
    result:
      'Operational efficiency improved by 55%, approval cycle times were cut by 70%, and management now has real-time visibility into all workflow KPIs. The transformation supported Edelweiss in scaling their operations without proportional headcount growth.',
    metrics: [
      { icon: <TrendingUp size={16} />, label: 'Efficiency Gain', value: '+55%' },
      { icon: <Clock size={16} />, label: 'Approval Time', value: '-70%' },
      { icon: <BarChart2 size={16} />, label: 'Real-time KPIs', value: '100%' },
      { icon: <Users size={16} />, label: 'Scale Impact', value: '2x' },
    ],
    tags: ['Workflow', 'OutSystems', 'Finance', 'Automation', 'Digital Ops'],
  },
  {
    id: 5,
    client: 'NeoGrowth',
    initials: 'NG',
    category: 'Lending Platform',
    accentColor: '#34D399',
    title: 'Digital Lending Transformation',
    summary: 'Reimagined SME lending platform with automated credit assessment and faster disbursals.',
    industry: 'NBFC / Fintech',
    challenge:
      'NeoGrowth needed to modernize their SME lending platform to handle growing loan volumes while reducing manual credit assessment effort and improving disbursal speed for small business borrowers.',
    solution:
      'Technoduxx built a comprehensive digital lending platform integrating credit bureau data, automated underwriting rules, digital document collection, and workflow-driven approval processes — all on OutSystems for rapid iteration.',
    result:
      'Loan disbursal time reduced from 7 days to under 48 hours, credit assessment accuracy improved by 40%, and the platform now processes 5x more applications with the same team.',
    metrics: [
      { icon: <TrendingUp size={16} />, label: 'Disbursal Time', value: '<48hrs' },
      { icon: <Clock size={16} />, label: 'Volume Growth', value: '5x' },
      { icon: <BarChart2 size={16} />, label: 'Credit Accuracy', value: '+40%' },
      { icon: <Users size={16} />, label: 'Automation', value: '85%' },
    ],
    tags: ['Lending', 'NBFC', 'OutSystems', 'Credit', 'Fintech'],
  },
  {
    id: 6,
    client: 'MSX International',
    initials: 'MX',
    category: 'Operations Platform',
    accentColor: '#F97316',
    title: 'Field Service Management',
    summary: 'Built intelligent field service operations platform for global automotive services.',
    industry: 'Automotive Services',
    challenge:
      'MSX International required a unified platform to manage field service engineers, track automotive service assignments, and provide real-time reporting to OEM clients across multiple geographies.',
    solution:
      'We delivered a Field Service Management platform with real-time technician tracking, automated assignment scheduling, service SLA monitoring, and an OEM reporting portal — built on OutSystems for global scalability.',
    result:
      'Field engineer productivity increased by 45%, SLA compliance reached 98%, OEM reporting was fully automated, and operational costs reduced by 30% through smarter scheduling.',
    metrics: [
      { icon: <TrendingUp size={16} />, label: 'Productivity', value: '+45%' },
      { icon: <Clock size={16} />, label: 'SLA Compliance', value: '98%' },
      { icon: <BarChart2 size={16} />, label: 'Cost Reduction', value: '30%' },
      { icon: <Users size={16} />, label: 'Automation', value: '100%' },
    ],
    tags: ['Field Service', 'Automotive', 'OutSystems', 'SLA', 'Global Ops'],
  },
];

// ─── Tilt Card ──────────────────────────────────────────────────
function TiltCard({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
  };

  return (
    <div
      ref={ref}
      style={{ transition: 'transform 0.3s ease', ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

// ─── Case Study Modal ──────────────────────────────────────────
function CaseStudyModal({
  study,
  onClose,
}: {
  study: typeof caseStudies[0];
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(12px)',
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '780px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'linear-gradient(145deg, rgba(17,24,39,0.98) 0%, rgba(11,15,25,0.99) 100%)',
          border: `1px solid ${study.accentColor}40`,
          borderRadius: '20px',
          boxShadow: `0 0 60px ${study.accentColor}25, 0 40px 80px rgba(0,0,0,0.6)`,
          animation: 'slide-in-up 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1) both',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '2rem 2rem 1.5rem',
            borderBottom: `1px solid rgba(48,174,180,0.1)`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* BG glow */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '250px',
              height: '250px',
              background: `radial-gradient(circle, ${study.accentColor}15 0%, transparent 70%)`,
              pointerEvents: 'none',
            }}
          />

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {/* Client badge */}
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: `linear-gradient(135deg, ${study.accentColor}25, ${study.accentColor}08)`,
                  border: `1px solid ${study.accentColor}50`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: study.accentColor,
                  fontSize: '1rem',
                  fontWeight: 800,
                  fontFamily: "'Sora', sans-serif",
                  flexShrink: 0,
                }}
              >
                {study.initials}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span
                    style={{
                      background: `${study.accentColor}18`,
                      border: `1px solid ${study.accentColor}35`,
                      color: study.accentColor,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '100px',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {study.category}
                  </span>
                </div>
                <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontWeight: 800, color: '#fff', fontFamily: "'Sora', sans-serif", lineHeight: 1.2 }}>
                  {study.title}
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.375rem' }}>
                  <Building2 size={13} style={{ color: 'rgba(255,255,255,0.4)' }} />
                  <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem' }}>
                    {study.client} · {study.industry}
                  </span>
                </div>
              </div>
            </div>
            {/* Close */}
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.color = '#fff';
                el.style.background = 'rgba(255,255,255,0.1)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.color = 'rgba(255,255,255,0.5)';
                el.style.background = 'rgba(255,255,255,0.06)';
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Metrics Row */}
        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid rgba(48,174,180,0.08)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem' }}>
            {study.metrics.map((metric) => (
              <div
                key={metric.label}
                style={{
                  background: `${study.accentColor}08`,
                  border: `1px solid ${study.accentColor}20`,
                  borderRadius: '10px',
                  padding: '0.875rem',
                  textAlign: 'center',
                }}
              >
                <div style={{ color: study.accentColor, fontWeight: 800, fontSize: '1.1rem', fontFamily: "'Sora', sans-serif" }}>
                  {metric.value}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.68rem', marginTop: '0.2rem' }}>
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '1.5rem 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
            {[
              { label: 'THE CHALLENGE', content: study.challenge, color: '#FF6B6B' },
              { label: 'OUR SOLUTION', content: study.solution, color: '#30AEB4' },
              { label: 'THE RESULT', content: study.result, color: '#4ECDC4' },
            ].map((section) => (
              <div
                key={section.label}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <div style={{ width: '3px', height: '14px', background: section.color, borderRadius: '2px' }} />
                  <p style={{ color: section.color, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em' }}>
                    {section.label}
                  </p>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem', lineHeight: 1.75 }}>
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.5rem' }}>
            {study.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: 'rgba(48,174,180,0.06)',
                  border: '1px solid rgba(48,174,180,0.15)',
                  color: 'rgba(255,255,255,0.5)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '100px',
                  fontSize: '0.72rem',
                  fontWeight: 500,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '1.25rem 2rem',
            borderTop: '1px solid rgba(48,174,180,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem' }}>
            Delivered by Technoduxx · {study.industry}
          </p>
          <Link
            to="/contact"
            onClick={onClose}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: `linear-gradient(135deg, ${study.accentColor}, #1A8E94)`,
              color: '#fff',
              padding: '0.625rem 1.25rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.82rem',
              boxShadow: `0 0 20px ${study.accentColor}30`,
              transition: 'all 0.3s ease',
            }}
          >
            Start Similar Project <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Case Study Card ───────────────────────────────────────────
function CaseStudyCard({
  study,
  index,
  onOpen,
}: {
  study: typeof caseStudies[0];
  index: number;
  onOpen: () => void;
}) {
  return (
    <SectionReveal delay={index * 80}>
      <TiltCard
        style={{
          height: '100%',
          cursor: 'pointer',
        }}
      >
        <div
          onClick={onOpen}
          style={{
            background: 'rgba(255,255,255,0.025)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(48,174,180,0.15)',
            borderRadius: '18px',
            padding: '1.75rem',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.35s ease',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = study.accentColor + '80';
            el.style.boxShadow = `0 0 30px ${study.accentColor}20, 0 12px 40px rgba(0,0,0,0.4)`;
            el.style.background = `rgba(48,174,180,0.04)`;
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = 'rgba(48,174,180,0.15)';
            el.style.boxShadow = 'none';
            el.style.background = 'rgba(255,255,255,0.025)';
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
              background: `radial-gradient(circle, ${study.accentColor}12 0%, transparent 70%)`,
              pointerEvents: 'none',
            }}
          />

          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
            {/* Client monogram */}
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${study.accentColor}22, ${study.accentColor}08)`,
                border: `1px solid ${study.accentColor}45`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: study.accentColor,
                fontSize: '0.82rem',
                fontWeight: 800,
                fontFamily: "'Sora', sans-serif",
                flexShrink: 0,
              }}
            >
              {study.initials}
            </div>
            {/* Category badge */}
            <span
              style={{
                background: `${study.accentColor}12`,
                border: `1px solid ${study.accentColor}30`,
                color: study.accentColor,
                padding: '0.2rem 0.6rem',
                borderRadius: '100px',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                flexShrink: 0,
              }}
            >
              {study.category}
            </span>
          </div>

          {/* Client name */}
          <div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', marginBottom: '0.25rem', letterSpacing: '0.03em' }}>
              {study.client}
            </p>
            <h3
              style={{
                fontSize: '1.05rem',
                fontWeight: 800,
                color: '#fff',
                fontFamily: "'Sora', sans-serif",
                lineHeight: 1.3,
              }}
            >
              {study.title}
            </h3>
          </div>

          {/* Summary */}
          <p
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '0.85rem',
              lineHeight: 1.65,
              flex: 1,
            }}
          >
            {study.summary}
          </p>

          {/* Quick metrics */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {study.metrics.slice(0, 2).map((metric) => (
              <div
                key={metric.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  background: `${study.accentColor}08`,
                  border: `1px solid ${study.accentColor}20`,
                  borderRadius: '6px',
                  padding: '0.25rem 0.5rem',
                }}
              >
                <span style={{ color: study.accentColor, display: 'flex' }}>{metric.icon}</span>
                <span style={{ color: study.accentColor, fontWeight: 800, fontSize: '0.75rem', fontFamily: "'Sora', sans-serif" }}>
                  {metric.value}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.65rem' }}>{metric.label}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              background: `linear-gradient(135deg, ${study.accentColor}20, ${study.accentColor}08)`,
              border: `1px solid ${study.accentColor}40`,
              borderRadius: '10px',
              color: study.accentColor,
              padding: '0.625rem 1rem',
              cursor: 'pointer',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.02em',
              transition: 'all 0.3s ease',
              width: '100%',
              backgroundImage: `linear-gradient(90deg, transparent 0%, ${study.accentColor}10 50%, transparent 100%)`,
              backgroundSize: '200% 100%',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = `${study.accentColor}20`;
              el.style.boxShadow = `0 0 15px ${study.accentColor}25`;
              el.style.backgroundPosition = 'right center';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = `linear-gradient(135deg, ${study.accentColor}20, ${study.accentColor}08)`;
              el.style.boxShadow = 'none';
            }}
          >
            <ExternalLink size={13} />
            View Full Case Study
            <ChevronRight size={14} />
          </button>
        </div>
      </TiltCard>
    </SectionReveal>
  );
}

// ─── Main Export ───────────────────────────────────────────────
export function CaseStudies() {
  const [activeStudy, setActiveStudy] = useState<typeof caseStudies[0] | null>(null);

  useEffect(() => {
    if (activeStudy) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeStudy]);

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
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.25 }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto' }}>
          <SectionReveal>
            <span style={{ color: '#30AEB4', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              PROVEN RESULTS
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
              Client{' '}
              <span className="animated-gradient-text">Case Studies</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.1rem', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto' }}>
              Real-world success stories demonstrating how Technoduxx transforms enterprises through technology innovation and expert delivery.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section
        style={{
          padding: '4rem 2rem',
          background: 'rgba(17,24,39,0.5)',
          borderTop: '1px solid rgba(48,174,180,0.08)',
          borderBottom: '1px solid rgba(48,174,180,0.08)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '3rem', justifyItems: 'center' }}>
            <AnimatedCounter target={40} suffix="+" label="Successful Projects" sublabel="Delivered on time" />
            <AnimatedCounter target={15} suffix="+" label="Enterprise Clients" sublabel="Across industries" />
            <AnimatedCounter target={100} suffix="%" label="Client Satisfaction" sublabel="Net promoter score" />
            <AnimatedCounter target={50} suffix="M+" label="Transactions Daily" sublabel="Systems processing" />
          </div>
        </div>
      </section>

      {/* ===== CASE STUDY CARDS GRID ===== */}
      <section style={{ padding: '6rem 2rem 7rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <SectionReveal>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{ color: '#30AEB4', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                CLIENT SUCCESS STORIES
              </span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 800, marginTop: '0.5rem', fontFamily: "'Sora', sans-serif" }}>
                Projects That Made a Difference
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', marginTop: '0.75rem', maxWidth: '500px', margin: '0.75rem auto 0', lineHeight: 1.7 }}>
                Click any card to explore the full case study with detailed challenges, solutions, and results.
              </p>
            </div>
          </SectionReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {caseStudies.map((study, i) => (
              <CaseStudyCard
                key={study.id}
                study={study}
                index={i}
                onOpen={() => setActiveStudy(study)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== INDUSTRIES ===== */}
      <section
        style={{
          padding: '5rem 2rem',
          background: 'rgba(17,24,39,0.3)',
          borderTop: '1px solid rgba(48,174,180,0.08)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <SectionReveal>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span style={{ color: '#30AEB4', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                INDUSTRIES SERVED
              </span>
              <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 800, marginTop: '0.5rem', fontFamily: "'Sora', sans-serif" }}>
                Cross-Industry Expertise
              </h2>
            </div>
          </SectionReveal>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            {[
              'Financial Services', 'Banking', 'NBFC / Fintech', 'Electric Mobility',
              'Renewable Energy', 'Automotive Services', 'Insurance', 'Healthcare',
              'Logistics & Supply Chain', 'Manufacturing', 'Retail & E-Commerce', 'Government',
            ].map((industry, i) => (
              <SectionReveal key={industry} delay={i * 40}>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(48,174,180,0.15)',
                    borderRadius: '100px',
                    padding: '0.5rem 1.25rem',
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = '#30AEB4';
                    el.style.borderColor = '#30AEB4';
                    el.style.background = 'rgba(48,174,180,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = 'rgba(255,255,255,0.6)';
                    el.style.borderColor = 'rgba(48,174,180,0.15)';
                    el.style.background = 'rgba(255,255,255,0.025)';
                  }}
                >
                  {industry}
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ padding: '5rem 2rem', textAlign: 'center' }}>
        <SectionReveal>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, fontFamily: "'Sora', sans-serif", marginBottom: '1rem' }}>
            Ready to Write Your{' '}
            <span className="gradient-text">Success Story?</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '2rem', lineHeight: 1.7, maxWidth: '500px', margin: '0 auto 2rem' }}>
            Join the growing list of enterprises that have transformed their operations with Technoduxx.
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
            Start Your Project <ArrowRight size={18} />
          </Link>
        </SectionReveal>
      </section>

      {/* ===== MODAL ===== */}
      {activeStudy && (
        <CaseStudyModal study={activeStudy} onClose={() => setActiveStudy(null)} />
      )}
    </div>
  );
}

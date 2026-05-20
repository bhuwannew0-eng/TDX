import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router';
import { X, MessageCircle, Send, Minus } from 'lucide-react';

interface Message {
  id: number;
  role: 'bot' | 'user';
  text: string;
}

const quickReplies = [
  { label: 'Our Services', color: '#30AEB4' },
  { label: 'Request Consultation', color: '#A78BFA' },
  { label: 'Case Studies', color: '#F59E0B' },
  { label: 'Contact Team', color: '#34D399' },
];

const routeMap: Record<string, string> = {
  'Our Services': '/services',
  'Request Consultation': '/contact',
  'Case Studies': '/case-studies',
  'Contact Team': '/contact',
};

const getBotResponse = (text: string): string => {
  const lower = text.toLowerCase();
  if (lower.includes('service')) {
    return 'We offer 5 core services: Accelerated App Development, Platform Health Management, Data Migration Excellence, Co-Delivery & Capability, and AO Optimization. Which would you like to know more about? 🚀';
  }
  if (lower.includes('consult')) {
    return "Great choice! Our experts provide free strategy sessions tailored to your business. Please visit our Contact page or share your email and we'll reach out within 24 hours. 📅";
  }
  if (lower.includes('case') || lower.includes('stud')) {
    return "We've delivered transformative projects for Suzlon, HDFC, Magenta Mobility, Edelweiss, NeoGrowth, and MSX International. Each case study showcases measurable ROI! 📊";
  }
  if (lower.includes('contact') || lower.includes('team')) {
    return "Our team is ready to assist! Visit our Contact page to fill the form, or email us at info@technoduxx.com. We typically respond within a few hours. 💬";
  }
  if (lower.includes('outsystem') || lower.includes('low-code') || lower.includes('low code')) {
    return "OutSystems is our core expertise! We have 150+ certified professionals across Associate, Professional, and Specialist levels. The world's leading low-code platform! ⚡";
  }
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return "Hello! 👋 Great to connect with you. I'm here to help you learn about Technoduxx. What can I assist you with today?";
  }
  return "Thanks for reaching out! Our team will get back to you shortly. In the meantime, feel free to explore our services, technology stack, or case studies. 😊";
};

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'bot',
      text: 'Hello 👋 Welcome to Technoduxx. How can we help you today?',
    },
  ]);
  const [usedQuickReplies, setUsedQuickReplies] = useState<Set<string>>(new Set());

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (open && !minimized) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [open, minimized]);

  const addMessage = (msg: Omit<Message, 'id'>) => {
    setMessages((prev) => [...prev, { ...msg, id: Date.now() + Math.random() }]);
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    addMessage({ role: 'user', text: text.trim() });
    setInputValue('');
    setIsTyping(true);
    const delay = 900 + Math.random() * 500;
    setTimeout(() => {
      setIsTyping(false);
      addMessage({ role: 'bot', text: getBotResponse(text) });
    }, delay);
  };

  const handleQuickReply = (label: string) => {
    setUsedQuickReplies((prev) => new Set(prev).add(label));
    addMessage({ role: 'user', text: label });
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage({ role: 'bot', text: getBotResponse(label) });
    }, 1000 + Math.random() * 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputValue);
    }
  };

  const handleOpen = () => {
    setOpen(true);
    setMinimized(false);
  };

  const remainingQuickReplies = quickReplies.filter((q) => !usedQuickReplies.has(q.label));

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.75rem',
        right: '1.75rem',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.875rem',
      }}
    >
      {/* ===== CHAT PANEL ===== */}
      {open && (
        <div
          style={{
            width: 'min(380px, calc(100vw - 2rem))',
            background: 'rgba(10,14,22,0.98)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(48,174,180,0.22)',
            borderRadius: '22px',
            overflow: 'hidden',
            boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 50px rgba(48,174,180,0.08)',
            animation: 'chatbot-panel-in 0.38s cubic-bezier(0.175, 0.885, 0.32, 1.1) both',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: minimized ? '68px' : 'min(540px, calc(100vh - 8rem))',
            transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* ── HEADER ── */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(48,174,180,0.18) 0%, rgba(10,14,22,0.9) 100%)',
              borderBottom: minimized ? 'none' : '1px solid rgba(48,174,180,0.12)',
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              position: 'relative',
              overflow: 'hidden',
              cursor: minimized ? 'pointer' : 'default',
            }}
            onClick={() => { if (minimized) setMinimized(false); }}
          >
            {/* Header glow */}
            <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(48,174,180,0.14) 0%, transparent 70%)', pointerEvents: 'none' }} />

            {/* Avatar + info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #30AEB4, #1A7E84)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 0 16px rgba(48,174,180,0.4)',
                  fontSize: '1rem',
                }}
              >
                🤖
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.875rem', fontFamily: "'Sora', sans-serif" }}>
                  Technoduxx Support
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '2px' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#34D399', boxShadow: '0 0 5px #34D399' }} />
                  <span style={{ color: '#34D399', fontSize: '0.65rem', fontWeight: 600 }}>Online · Replies instantly</span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', gap: '0.4rem', position: 'relative', zIndex: 1 }}>
              <IconBtn
                onClick={(e) => { e.stopPropagation(); setMinimized(!minimized); }}
                title={minimized ? 'Expand' : 'Minimize'}
              >
                <Minus size={14} />
              </IconBtn>
              <IconBtn onClick={() => { setOpen(false); setMinimized(false); }} title="Close">
                <X size={14} />
              </IconBtn>
            </div>
          </div>

          {!minimized && (
            <>
              {/* ── MESSAGES AREA ── */}
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '1.25rem 1.25rem 0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(48,174,180,0.3) transparent',
                }}
              >
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', animation: 'msg-slide-up 0.3s ease both' }}>
                    <BotAvatar />
                    <div
                      style={{
                        background: 'rgba(48,174,180,0.1)',
                        border: '1px solid rgba(48,174,180,0.2)',
                        borderRadius: '16px 16px 16px 4px',
                        padding: '0.75rem 1rem',
                        display: 'flex',
                        gap: '4px',
                        alignItems: 'center',
                      }}
                    >
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: '#30AEB4',
                            animation: `typing-dot 1.2s ease infinite`,
                            animationDelay: `${i * 0.2}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick replies */}
                {!isTyping && remainingQuickReplies.length > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      paddingTop: '0.25rem',
                      animation: 'msg-slide-up 0.4s ease both',
                    }}
                  >
                    {remainingQuickReplies.map((q) => (
                      <button
                        key={q.label}
                        onClick={() => handleQuickReply(q.label)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          background: `${q.color}10`,
                          border: `1px solid ${q.color}35`,
                          borderRadius: '100px',
                          padding: '0.35rem 0.875rem',
                          color: q.color,
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          letterSpacing: '0.02em',
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget;
                          el.style.background = `${q.color}20`;
                          el.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget;
                          el.style.background = `${q.color}10`;
                          el.style.transform = 'translateY(0)';
                        }}
                      >
                        {q.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Route links (after quick replies are used) */}
                {!isTyping && usedQuickReplies.size > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {[...usedQuickReplies].slice(-2).map((label) => (
                      <Link
                        key={`link-${label}`}
                        to={routeMap[label] || '/'}
                        onClick={() => setOpen(false)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          background: 'rgba(48,174,180,0.06)',
                          border: '1px solid rgba(48,174,180,0.2)',
                          borderRadius: '8px',
                          padding: '0.3rem 0.7rem',
                          color: 'rgba(48,174,180,0.8)',
                          fontSize: '0.68rem',
                          fontWeight: 600,
                          textDecoration: 'none',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.background = 'rgba(48,174,180,0.15)';
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.background = 'rgba(48,174,180,0.06)';
                        }}
                      >
                        Visit {label} page →
                      </Link>
                    ))}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* ── INPUT AREA ── */}
              <div
                style={{
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  padding: '0.875rem 1.25rem',
                  display: 'flex',
                  gap: '0.625rem',
                  alignItems: 'center',
                  background: 'rgba(255,255,255,0.02)',
                  flexShrink: 0,
                }}
              >
                <input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    padding: '0.625rem 0.875rem',
                    color: '#fff',
                    fontSize: '0.82rem',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = 'rgba(48,174,180,0.4)'; }}
                  onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
                />
                <button
                  onClick={() => handleSend(inputValue)}
                  disabled={!inputValue.trim()}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: inputValue.trim() ? 'linear-gradient(135deg, #30AEB4, #1A7E84)' : 'rgba(255,255,255,0.08)',
                    border: 'none',
                    cursor: inputValue.trim() ? 'pointer' : 'default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: inputValue.trim() ? '#fff' : 'rgba(255,255,255,0.3)',
                    flexShrink: 0,
                    transition: 'all 0.2s ease',
                    boxShadow: inputValue.trim() ? '0 0 14px rgba(48,174,180,0.3)' : 'none',
                  }}
                  aria-label="Send"
                >
                  <Send size={16} />
                </button>
              </div>

              {/* Footer */}
              <div
                style={{
                  textAlign: 'center',
                  padding: '0.5rem',
                  borderTop: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: '0.6rem', letterSpacing: '0.06em' }}>
                  Powered by <span style={{ color: 'rgba(48,174,180,0.5)' }}>Technoduxx</span>
                </span>
              </div>
            </>
          )}
        </div>
      )}

      {/* ===== FLOATING BUTTON ===== */}
      <button
        onClick={open ? () => setOpen(false) : handleOpen}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Open chat"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: hovered && !open ? '0.6rem' : '0',
          background: open
            ? 'linear-gradient(135deg, #1A5A5E, #0E4044)'
            : 'linear-gradient(135deg, #30AEB4 0%, #1A8E94 100%)',
          border: 'none',
          borderRadius: '100px',
          cursor: 'pointer',
          padding: '0.875rem',
          paddingRight: hovered && !open ? '1.25rem' : '0.875rem',
          boxShadow: open
            ? '0 0 20px rgba(48,174,180,0.3)'
            : '0 0 20px rgba(48,174,180,0.35)',
          animation: open ? 'none' : 'chatbot-pulse 2.8s ease-in-out infinite',
          transition: 'padding 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.1), box-shadow 0.3s ease, transform 0.25s ease, background 0.3s ease',
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        <div style={{ color: '#fff', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          {open ? <X size={22} /> : <MessageCircle size={22} />}
        </div>
        {hovered && !open && (
          <span
            style={{
              color: '#fff',
              fontSize: '0.82rem',
              fontWeight: 700,
              fontFamily: "'Sora', sans-serif",
              animation: 'msg-slide-up 0.25s ease both',
              whiteSpace: 'nowrap',
            }}
          >
            Chat With Us
          </span>
        )}
      </button>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isBot = message.role === 'bot';
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: '0.5rem',
        flexDirection: isBot ? 'row' : 'row-reverse',
        animation: 'msg-slide-up 0.35s ease both',
      }}
    >
      {isBot && <BotAvatar />}
      <div
        style={{
          maxWidth: '78%',
          background: isBot
            ? 'rgba(48,174,180,0.1)'
            : 'linear-gradient(135deg, #30AEB4, #1A8E94)',
          border: isBot ? '1px solid rgba(48,174,180,0.2)' : 'none',
          borderRadius: isBot ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
          padding: '0.7rem 0.95rem',
          color: '#fff',
          fontSize: '0.82rem',
          lineHeight: 1.65,
          boxShadow: isBot ? 'none' : '0 4px 16px rgba(48,174,180,0.25)',
          wordBreak: 'break-word',
        }}
      >
        {message.text}
      </div>
    </div>
  );
}

function BotAvatar() {
  return (
    <div
      style={{
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #30AEB4, #1A7E84)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        fontSize: '0.7rem',
        boxShadow: '0 0 8px rgba(48,174,180,0.3)',
      }}
    >
      🤖
    </div>
  );
}

function IconBtn({
  onClick,
  children,
  title,
}: {
  onClick: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  title?: string;
}) {
  const [h, setH] = useState(false);
  return (
    <button
      onClick={onClick}
      title={title}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: h ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px',
        color: h ? '#fff' : 'rgba(255,255,255,0.5)',
        cursor: 'pointer',
        padding: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
      }}
    >
      {children}
    </button>
  );
}

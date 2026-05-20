import { useState } from 'react';
import { Link } from 'react-router';
import { Search, ArrowRight, Clock, Tag, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import { SectionReveal } from '../components/SectionReveal';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ParticleBackground } from '../components/ParticleBackground';

/* ─────────────── DATA ─────────────── */

const CATEGORIES = [
  'All Topics',
  'AI Analytics',
  'Digital Transformation',
  'Low Code Development',
  'Business Intelligence',
  'OutSystems',
  'Enterprise Technology',
  'Lumenore Product Updates',
];

const POSTS = [
  {
    id: 1,
    title: 'The Future of AI-Powered Analytics: What 2026 Holds for Enterprise Data',
    category: 'AI Analytics',
    date: 'May 15, 2026',
    readTime: '5 min read',
    excerpt: 'AI-driven analytics platforms are reshaping how enterprises make decisions. Explore how conversational BI, predictive models, and autonomous AI agents are becoming essential tools for data teams worldwide.',
    image: 'https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?w=800&q=80',
    featured: true,
    author: 'Sarah Mitchell',
    authorRole: 'Head of Analytics',
    tags: ['AI', 'Analytics', 'Enterprise'],
  },
  {
    id: 2,
    title: 'Accelerating Digital Transformation with Low-Code Platforms in 2026',
    category: 'Digital Transformation',
    date: 'May 10, 2026',
    readTime: '4 min read',
    excerpt: 'Low-code development is democratizing software creation. Discover how organizations are cutting development time by 60% and launching products faster with platforms like OutSystems.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80',
    featured: false,
    author: 'James Chen',
    authorRole: 'CTO, Technoduxx',
    tags: ['Low-Code', 'OutSystems', 'Transformation'],
  },
  {
    id: 3,
    title: 'OutSystems: Reshaping Enterprise Application Development at Scale',
    category: 'OutSystems',
    date: 'May 5, 2026',
    readTime: '6 min read',
    excerpt: 'OutSystems continues to lead the low-code market with AI-assisted development, advanced integrations, and enterprise-grade security. Here\'s how it compares in 2026.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80',
    featured: false,
    author: 'Priya Sharma',
    authorRole: 'OutSystems Architect',
    tags: ['OutSystems', 'Architecture', 'Enterprise'],
  },
  {
    id: 4,
    title: 'Business Intelligence in the Age of Conversational AI',
    category: 'Business Intelligence',
    date: 'Apr 28, 2026',
    readTime: '5 min read',
    excerpt: 'Natural language queries are transforming how business users interact with data. No more waiting for IT to build reports — just ask your data in plain English and get visual answers instantly.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    featured: false,
    author: 'Alex Kumar',
    authorRole: 'BI Consultant',
    tags: ['BI', 'NLQ', 'AI'],
  },
  {
    id: 5,
    title: 'Lumenore Launches AI Dashboard Creation — Build Dashboards in Seconds',
    category: 'Lumenore Product Updates',
    date: 'Apr 20, 2026',
    readTime: '3 min read',
    excerpt: 'The latest Lumenore update brings AI-powered dashboard creation. Describe your analytics needs in plain English and watch Lumenore generate a complete, interactive dashboard automatically.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    featured: false,
    author: 'Lumenore Team',
    authorRole: 'Product Team',
    tags: ['Lumenore', 'AI', 'Dashboards'],
  },
  {
    id: 6,
    title: 'Enterprise Technology Trends Defining the Second Half of 2026',
    category: 'Enterprise Technology',
    date: 'Apr 15, 2026',
    readTime: '7 min read',
    excerpt: 'From agentic AI to edge computing and quantum-ready architectures, we explore the top enterprise technology trends every CTO, CDO, and IT leader needs on their radar for H2 2026.',
    image: 'https://images.unsplash.com/photo-1548092372-0d1bd40894a3?w=600&q=80',
    featured: false,
    author: 'Michael Torres',
    authorRole: 'Enterprise Analyst',
    tags: ['Trends', 'AI Agents', 'Cloud'],
  },
  {
    id: 7,
    title: 'Why Low-Code is the Future of Enterprise Software Development',
    category: 'Low Code Development',
    date: 'Apr 8, 2026',
    readTime: '5 min read',
    excerpt: 'The debate between traditional and low-code development is settling. Here\'s why enterprise software teams are embracing visual development, and what it means for professional developers.',
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&q=80',
    featured: false,
    author: 'Emma Lawson',
    authorRole: 'Dev Lead',
    tags: ['Low-Code', 'Development', 'Future'],
  },
];

const RECENT_POSTS = POSTS.slice(0, 4);
const POSTS_PER_PAGE = 6;

const CATEGORY_COLORS: Record<string, string> = {
  'AI Analytics': '#30AEB4',
  'Digital Transformation': '#7DD3DA',
  'Low Code Development': '#4BC3C9',
  'Business Intelligence': '#30AEB4',
  'OutSystems': '#1A8E94',
  'Enterprise Technology': '#7DD3DA',
  'Lumenore Product Updates': '#30AEB4',
};

/* ─────────────── BLOG CARD ─────────────── */

function BlogCard({ post }: { post: typeof POSTS[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: `1px solid ${hovered ? 'rgba(48,174,180,0.4)' : 'rgba(48,174,180,0.12)'}`,
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'all 0.35s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 0 30px rgba(48,174,180,0.1)' : 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={{ overflow: 'hidden', height: '200px', position: 'relative', flexShrink: 0 }}>
        <ImageWithFallback
          src={post.image}
          alt={post.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
        />
        <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
          <span style={{ background: CATEGORY_COLORS[post.category] || '#30AEB4', borderRadius: '6px', padding: '0.2rem 0.6rem', fontSize: '0.68rem', color: '#fff', fontWeight: 700 }}>{post.category}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Clock size={11} /> {post.readTime}
          </span>
          <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)' }}>{post.date}</span>
        </div>

        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: '0.65rem', fontFamily: "'Sora', sans-serif", flex: 1 }}>
          {post.title}
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.48)', fontSize: '0.82rem', lineHeight: 1.65, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {post.excerpt}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #30AEB4, #1A8E94)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
              {post.author.charAt(0)}
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>{post.author}</div>
              <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.35)' }}>{post.authorRole}</div>
            </div>
          </div>
          <span style={{ color: hovered ? '#30AEB4' : 'rgba(255,255,255,0.3)', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '0.25rem', transition: 'color 0.3s ease', fontWeight: 600 }}>
            Read <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── MAIN PAGE ─────────────── */

export function Blog() {
  const [activeCategory, setActiveCategory] = useState('All Topics');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const featuredPost = POSTS.find(p => p.featured)!;

  const filteredPosts = POSTS.filter(p => {
    if (p.featured) return false;
    const matchesCategory = activeCategory === 'All Topics' || p.category === activeCategory;
    const matchesSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const pagedPosts = filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  return (
    <div style={{ background: '#0B0F19' }}>

      {/* ===== HERO BANNER ===== */}
      <section style={{ position: 'relative', padding: '10rem 2rem 6rem', overflow: 'hidden', background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(48,174,180,0.08) 0%, #0B0F19 70%)' }}>
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
        <div style={{ position: 'absolute', inset: 0 }}>
          <ParticleBackground count={40} />
        </div>
        <div style={{ position: 'absolute', top: '20%', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(48,174,180,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <SectionReveal>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(48,174,180,0.1)', border: '1px solid rgba(48,174,180,0.3)', borderRadius: '100px', padding: '0.375rem 1rem', marginBottom: '1.5rem' }}>
                <TrendingUp size={14} style={{ color: '#30AEB4' }} />
                <span style={{ color: '#30AEB4', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.05em' }}>INSIGHTS & INNOVATION</span>
              </div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem', fontFamily: "'Sora', sans-serif" }}>
                The <span className="animated-gradient-text">Technoduxx Blog</span>
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                Expert perspectives on AI analytics, digital transformation, low-code development, and enterprise technology.
              </p>

              {/* Search bar */}
              <div style={{ maxWidth: '520px', margin: '0 auto', position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: '1.1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.35)', pointerEvents: 'none' }} />
                <input
                  type="text"
                  placeholder="Search articles, topics, or keywords..."
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(48,174,180,0.25)',
                    borderRadius: '12px',
                    padding: '0.875rem 1.25rem 0.875rem 2.8rem',
                    color: '#fff',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#30AEB4'; e.currentTarget.style.boxShadow = '0 0 20px rgba(48,174,180,0.15)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(48,174,180,0.25)'; e.currentTarget.style.boxShadow = 'none'; }}
                />
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ===== FEATURED ARTICLE ===== */}
      <section style={{ padding: '0 2rem 5rem', position: 'relative' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <SectionReveal>
            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '3px', height: '20px', background: '#30AEB4', borderRadius: '2px' }} />
              <span style={{ color: '#30AEB4', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Featured Article</span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(48,174,180,0.2)',
                borderRadius: '20px',
                overflow: 'hidden',
                transition: 'all 0.35s ease',
                cursor: 'pointer',
              }}
              className="grid-cols-1 md:grid-cols-2"
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(48,174,180,0.45)'; el.style.boxShadow = '0 0 50px rgba(48,174,180,0.1)'; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(48,174,180,0.2)'; el.style.boxShadow = 'none'; }}
            >
              <div style={{ overflow: 'hidden', minHeight: '320px', position: 'relative' }}>
                <ImageWithFallback
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '320px', transition: 'transform 0.5s ease' }}
                />
                <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                  <span style={{ background: '#30AEB4', borderRadius: '8px', padding: '0.3rem 0.75rem', fontSize: '0.72rem', color: '#fff', fontWeight: 700 }}>FEATURED</span>
                </div>
              </div>

              <div style={{ padding: '2.5rem' }}>
                <span style={{ display: 'inline-block', background: 'rgba(48,174,180,0.1)', border: '1px solid rgba(48,174,180,0.25)', borderRadius: '6px', padding: '0.2rem 0.65rem', fontSize: '0.72rem', color: '#30AEB4', fontWeight: 600, marginBottom: '1rem' }}>
                  {featuredPost.category}
                </span>
                <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)', fontWeight: 800, color: '#fff', lineHeight: 1.3, marginBottom: '1rem', fontFamily: "'Sora', sans-serif" }}>
                  {featuredPost.title}
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                  {featuredPost.excerpt}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  {featuredPost.tags.map(tag => (
                    <span key={tag} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '0.2rem 0.55rem', fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)' }}>
                      <Tag size={9} /> {tag}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #30AEB4, #1A8E94)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: '#fff' }}>
                      {featuredPost.author.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>{featuredPost.author}</div>
                      <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Clock size={10} /> {featuredPost.readTime} · {featuredPost.date}
                      </div>
                    </div>
                  </div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#30AEB4', fontSize: '0.82rem', fontWeight: 700 }}>
                    Read More <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ===== BLOG GRID + SIDEBAR ===== */}
      <section style={{ padding: '0 2rem 6rem', position: 'relative' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '3rem', alignItems: 'start' }} className="grid-cols-1 lg:grid-cols-blog">
            {/* Main: Blog grid */}
            <div>
              {/* Category filters */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    style={{
                      background: activeCategory === cat ? '#30AEB4' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${activeCategory === cat ? '#30AEB4' : 'rgba(48,174,180,0.2)'}`,
                      borderRadius: '100px',
                      padding: '0.4rem 1rem',
                      fontSize: '0.78rem',
                      color: activeCategory === cat ? '#fff' : 'rgba(255,255,255,0.55)',
                      fontWeight: activeCategory === cat ? 700 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={(e) => { if (activeCategory !== cat) { const el = e.currentTarget; el.style.borderColor = 'rgba(48,174,180,0.5)'; el.style.color = '#30AEB4'; } }}
                    onMouseLeave={(e) => { if (activeCategory !== cat) { const el = e.currentTarget; el.style.borderColor = 'rgba(48,174,180,0.2)'; el.style.color = 'rgba(255,255,255,0.55)'; } }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid */}
              {pagedPosts.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  {pagedPosts.map((post, i) => (
                    <SectionReveal key={post.id} delay={i * 80}>
                      <BlogCard post={post} />
                    </SectionReveal>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'rgba(255,255,255,0.35)' }}>
                  <Search size={40} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
                  <p style={{ fontSize: '1rem' }}>No articles found. Try a different search or category.</p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '3rem' }}>
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(48,174,180,0.08)', border: '1px solid rgba(48,174,180,0.2)', color: currentPage === 1 ? 'rgba(255,255,255,0.2)' : '#30AEB4', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.25s ease' }}
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      style={{
                        width: '38px', height: '38px', borderRadius: '50%',
                        background: currentPage === i + 1 ? '#30AEB4' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${currentPage === i + 1 ? '#30AEB4' : 'rgba(48,174,180,0.2)'}`,
                        color: currentPage === i + 1 ? '#fff' : 'rgba(255,255,255,0.55)',
                        cursor: 'pointer', fontSize: '0.82rem', fontWeight: currentPage === i + 1 ? 700 : 400,
                        transition: 'all 0.25s ease',
                      }}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(48,174,180,0.08)', border: '1px solid rgba(48,174,180,0.2)', color: currentPage === totalPages ? 'rgba(255,255,255,0.2)' : '#30AEB4', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.25s ease' }}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside style={{ position: 'sticky', top: '6rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="hidden lg:flex">
              {/* Categories */}
              <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(48,174,180,0.12)', borderRadius: '16px', padding: '1.5rem' }}>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#30AEB4', marginBottom: '1.25rem' }}>Categories</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {CATEGORIES.filter(c => c !== 'All Topics').map(cat => {
                    const count = POSTS.filter(p => p.category === cat).length;
                    return (
                      <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          background: activeCategory === cat ? 'rgba(48,174,180,0.1)' : 'transparent',
                          border: `1px solid ${activeCategory === cat ? 'rgba(48,174,180,0.3)' : 'transparent'}`,
                          borderRadius: '8px', padding: '0.5rem 0.65rem',
                          color: activeCategory === cat ? '#30AEB4' : 'rgba(255,255,255,0.55)',
                          cursor: 'pointer', fontSize: '0.82rem', textAlign: 'left', transition: 'all 0.25s ease',
                        }}
                        onMouseEnter={(e) => { if (activeCategory !== cat) { const el = e.currentTarget; el.style.color = '#30AEB4'; el.style.background = 'rgba(48,174,180,0.05)'; } }}
                        onMouseLeave={(e) => { if (activeCategory !== cat) { const el = e.currentTarget; el.style.color = 'rgba(255,255,255,0.55)'; el.style.background = 'transparent'; } }}
                      >
                        <span>{cat}</span>
                        <span style={{ background: 'rgba(48,174,180,0.12)', borderRadius: '100px', padding: '0.1rem 0.45rem', fontSize: '0.68rem', color: '#30AEB4', fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Recent posts */}
              <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(48,174,180,0.12)', borderRadius: '16px', padding: '1.5rem' }}>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#30AEB4', marginBottom: '1.25rem' }}>Recent Posts</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {RECENT_POSTS.map(post => (
                    <div key={post.id} style={{ display: 'flex', gap: '0.75rem', cursor: 'pointer', padding: '0.4rem', borderRadius: '8px', transition: 'all 0.25s ease' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(48,174,180,0.05)'; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                      <div style={{ width: '56px', height: '48px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                        <ImageWithFallback src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.75)', lineHeight: 1.35, marginBottom: '0.25rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.title}</div>
                        <div style={{ fontSize: '0.66rem', color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Clock size={9} /> {post.readTime}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter CTA */}
              <div style={{ background: 'linear-gradient(135deg, rgba(48,174,180,0.12) 0%, rgba(11,15,25,0.8) 100%)', border: '1px solid rgba(48,174,180,0.25)', borderRadius: '16px', padding: '1.5rem', textAlign: 'center' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem', fontFamily: "'Sora', sans-serif" }}>Stay Updated</h4>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Get weekly insights delivered to your inbox.
                </p>
                <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'linear-gradient(135deg, #30AEB4, #1A8E94)', color: '#fff', padding: '0.625rem 1.25rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 700, boxShadow: '0 0 20px rgba(48,174,180,0.3)', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 0 30px rgba(48,174,180,0.5)'; }} onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 0 20px rgba(48,174,180,0.3)'; }}>
                  Subscribe <ArrowRight size={13} />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

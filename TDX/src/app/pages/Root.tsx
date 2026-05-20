import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ChatbotWidget } from '../components/ChatbotWidget';

export function Root() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div style={{ minHeight: '100vh', background: '#0B0F19', color: '#fff' }}>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
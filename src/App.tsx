import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';

// ── Route-level code splitting ────────────────────────────────────────────────
// Each page is a separate JS chunk — mobile only downloads what it visits.
const Home        = lazy(() => import('./pages/Home'));
const AgencyPage  = lazy(() => import('./pages/AgencyPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ClientsPage = lazy(() => import('./pages/ClientsPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const TeamPage    = lazy(() => import('./pages/TeamPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// ── Branded loading fallback ──────────────────────────────────────────────────
function PageLoader() {
  return (
    <div
      role="status"
      aria-label="Loading page"
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
      }}
    >
      <div style={{
        width: '40px',
        height: '40px',
        border: '2px solid #1f1f1f',
        borderTopColor: '#ff6a00',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <span style={{
        fontFamily: 'monospace',
        fontSize: '10px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: '#525252',
      }}>
        Loading...
      </span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="bg-black text-neutral-100 min-h-screen relative selection:bg-orange-500/20 selection:text-orange-400 font-sans tracking-normal overflow-x-hidden">

        {/* Living animated background */}
        <AnimatedBackground />

        {/* Navigation */}
        <Header />

        {/* Page routes — each chunk loaded on demand */}
        <main className="relative">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/"         element={<Home />} />
              <Route path="/agency"   element={<AgencyPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/clients"  element={<ClientsPage />} />
              <Route path="/pricing"  element={<PricingPage />} />
              <Route path="/team"     element={<TeamPage />} />
              <Route path="/contact"  element={<ContactPage />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

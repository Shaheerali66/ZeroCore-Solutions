import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';

// Pages
import Home from './pages/Home';
import AgencyPage from './pages/AgencyPage';
import ServicesPage from './pages/ServicesPage';
import ClientsPage from './pages/ClientsPage';
import PricingPage from './pages/PricingPage';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  return (
    <Router>
      <div className="bg-black text-neutral-100 min-h-screen relative selection:bg-orange-500/20 selection:text-orange-400 font-sans tracking-normal overflow-x-hidden">

        {/* Living animated background */}
        <AnimatedBackground />

        {/* Navigation */}
        <Header />

        {/* Page routes */}
        <main className="relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/agency" element={<AgencyPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

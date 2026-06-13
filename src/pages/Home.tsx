import React, { lazy, Suspense } from 'react';

// Hero loads eagerly — it is the first visible content (above the fold)
import Hero from '../components/Hero';

// All below-fold sections are lazy-loaded — mobile only parses them as the
// user scrolls, keeping the initial JS parse budget minimal.
const About       = lazy(() => import('../components/About'));
const Services    = lazy(() => import('../components/Services'));
const Clients     = lazy(() => import('../components/Clients'));
const Pricing     = lazy(() => import('../components/Pricing'));
const Team        = lazy(() => import('../components/Team'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const Contact     = lazy(() => import('../components/Contact'));

// Lightweight inline fallback — avoids layout shift while sections load
function SectionLoader() {
  return (
    <div
      aria-hidden="true"
      style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div style={{
        width: '24px',
        height: '24px',
        border: '2px solid #1f1f1f',
        borderTopColor: '#ff6a00',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<SectionLoader />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Services />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Clients />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Pricing />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Team />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>
    </>
  );
}
